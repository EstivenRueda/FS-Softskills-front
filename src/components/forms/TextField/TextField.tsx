import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {
  TextField as BaseTextField,
  type TextFieldProps as BaseTextFieldProps,
  type StackProps,
  InputAdornment,
  InputLabel,
  Stack,
  Tooltip,
  Grid,
} from '@mui/material';
import { CopyButton } from '../CopyButton';
import { useFormError } from '../FormErrorProvider';
import { SpeechButton } from '../SpeechButton';
import { PhoneMaskInput } from './PhoneMaskInput';

export type TextFieldProps<T extends FieldValues = FieldValues> = Omit<BaseTextFieldProps, 'name'> & {
  /**
   * The validation rules for the field.
   */
  validation?: ControllerProps<T>['rules'];
  /**
   * The name of the field.
   */
  name: Path<T>;
  /**
   * Custom error message parser.
   */
  parseError?: (error: FieldError) => ReactNode;
  /**
   * The control object from react-hook-form.
   */
  control?: Control<T>;
  /**
   * You override the MUI's TextField component by passing a reference of the component you want to use.
   *
   * This is especially useful when you want to use a customized version of TextField.
   */
  component?: typeof BaseTextField;
  /**
   * If true, the input will handle speech recognition.
   */
  speech?: boolean;
  /**
   * If true, the input will handle copy input.
   */
  copy?: boolean;
  /**
   * The mask for the input.
   */
  mask?: string;
  /**
   * The help icon tooltip.
   */
  helpIconTooltip?: string;
  /**
   * The props for the Stack component.
   */
  stackProps?: StackProps;
};

export function TextField<TFieldValues extends FieldValues = FieldValues>(props: TextFieldProps<TFieldValues>) {
  const {
    validation = {},
    parseError,
    type,
    required,
    name,
    control,
    component: TextFieldComponent = BaseTextField,
    speech = false,
    copy = false,
    mask,
    label,
    helpIconTooltip,
    stackProps,
    disabled,
    ...rest
  } = props;
  const { setValue } = useFormContext<TFieldValues>();
  const errorMsgFn = useFormError();
  const [focused, setFocused] = useState(false);

  const customErrorFn = parseError || errorMsgFn;

  if (required && !validation.required) {
    validation.required = 'Este campo es obligatorio';
  }

  if (type === 'email' && !validation.pattern) {
    validation.pattern = {
      value:
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter a valid email address',
    };
  }

  if (speech) {
    rest.InputProps = {
      ...rest.InputProps,
      endAdornment: focused && (
        <InputAdornment position="end">
          <SpeechButton
            onTranscribe={(transcript) => setValue(name, transcript as PathValue<TFieldValues, Path<TFieldValues>>)}
            size={rest.size}
          />
        </InputAdornment>
      ),
    };
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
        if (copy) {
          rest.InputProps = {
            ...rest.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <CopyButton text={value} size={rest.size} />
              </InputAdornment>
            ),
          };
        }

        return (
          <Stack width="100%" {...stackProps}>
            {label && (
              <Grid display="flex" gap={1}>
                <InputLabel htmlFor={name} required={required} error={!!error} sx={{ mb: 1, fontWeight: 400 }}>
                  {label}
                </InputLabel>
                {helpIconTooltip && (
                  <Tooltip title={helpIconTooltip} arrow>
                    <HelpOutlineOutlinedIcon color="info" fontSize={rest.size ?? 'small'} />
                  </Tooltip>
                )}
              </Grid>
            )}
            <TextFieldComponent
              {...rest}
              name={name}
              value={value ?? ''}
              onChange={(ev) => {
                onChange(type === 'number' ? (ev.target.value ? +ev.target.value : null) : ev.target.value);
                if (typeof rest.onChange === 'function') {
                  rest.onChange(ev);
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                onBlur();
              }}
              required={required}
              type={type}
              error={!!error}
              helperText={
                error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : rest.helperText
              }
              inputRef={ref}
              InputProps={{
                ...rest.InputProps,
                readOnly: disabled,
                sx: { ...rest?.InputProps?.sx, borderRadius: '10px' },
                inputComponent: mask ? (PhoneMaskInput as any) : rest.InputProps?.inputComponent,
                inputProps: {
                  ...rest.InputProps?.inputProps,
                  mask,
                },
              }}
              size="small"
            />
          </Stack>
        );
      }}
    />
  );
}

import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import type { Control, ControllerProps, FieldError, PathValue, FieldValues, Path } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextareaAutosize as BaseTextareaAutosize,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { useFormError } from '../FormErrorProvider';
import { SpeechButton } from '../SpeechButton';

export type TextareaAutosizeProps<T extends FieldValues = FieldValues> = Omit<TextFieldProps, 'name' | 'type'> & {
  validation?: ControllerProps<T>['rules'];
  name: Path<T>;
  parseError?: (error: FieldError) => ReactNode;
  control?: Control<T>;
  resizeStyle?: CSSProperties['resize'];
  /**
   * If true, the input will handle speech recognition.
   */
  speech?: boolean;
  disabled?: boolean;
};

export function TextareaAutosize<TFieldValues extends FieldValues = FieldValues>(
  props: TextareaAutosizeProps<TFieldValues>
) {
  const {
    validation = {},
    parseError,
    required,
    name,
    control,
    rows,
    resizeStyle,
    label,
    speech,
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
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <Stack width="100%">
          {label && (
            <InputLabel htmlFor={name} required={required} error={!!error} sx={{ mb: 1 }}>
              {label}
            </InputLabel>
          )}
          <TextField
            {...rest}
            name={name}
            value={value ?? ''}
            onChange={(ev) => {
              onChange(ev.target.value);
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
            error={!!error}
            helperText={
              error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : rest.helperText
            }
            inputRef={ref}
            multiline
            size="small"
            InputProps={{
              ...rest.InputProps,
              readOnly: disabled,
              sx: { ...rest?.InputProps?.sx, borderRadius: '10px' },
              inputComponent: BaseTextareaAutosize,
              inputProps: {
                minRows: rows,
                style: {
                  resize: resizeStyle || 'both',
                },
              },
            }}
          />
        </Stack>
      )}
    />
  );
}

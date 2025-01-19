import { forwardRef } from 'react';
import { Control, Controller, FieldError, FieldValues, Path, ControllerProps } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {
  type TextFieldProps as BaseTextFieldProps,
  Grid,
  InputLabel,
  Stack,
  StackProps,
  TextField as BaseTextField,
  Tooltip,
} from '@mui/material';
import { useFormError } from '../FormErrorProvider';

export type CustomProps<T extends FieldValues = FieldValues> = Omit<BaseTextFieldProps, 'name'> & {
  onChange?: (event: { target: { name: string; value?: number | null } }) => void;
  parseError?: (error: FieldError) => React.ReactNode;
  name: Path<T>;
  stackProps?: StackProps;
  label?: string;
  helpIconTooltip?: string;
  control?: Control<T>;
  component?: typeof BaseTextField;
  validation?: ControllerProps<T>['rules'];
  disabled?: boolean;
};

const NumericFormatCustom = forwardRef<HTMLInputElement, NumericFormatProps & CustomProps>(
  function NumericFormatCustom(innerProps, ref) {
    const { onChange, name, ...restProps } = innerProps;
    return (
      <NumericFormat
        {...restProps}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange?.({
            target: {
              name: name as string,
              value: values.floatValue ?? null,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
      />
    );
  }
);

export function NumericTextField<T extends FieldValues>(props: CustomProps<T>) {
  const {
    validation = {},
    stackProps,
    label,
    helpIconTooltip,
    required,
    control,
    name,
    parseError,
    disabled,
    component: TextFieldComponent = BaseTextField,
    ...rest
  } = props;
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  if (required && !validation.required) {
    validation.required = 'Este campo es obligatorio';
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
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
              onChange={(e) => {
                const newValue = e.target.value === '' ? null : e.target.value;
                onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: newValue,
                  },
                });
              }}
              required={required}
              error={!!error}
              helperText={
                error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : rest.helperText
              }
              InputProps={{
                readOnly: disabled,
                sx: { borderRadius: '10px' },
                inputComponent: NumericFormatCustom as any,
              }}
              inputRef={ref}
              size="small"
            />
          </Stack>
        );
      }}
    />
  );
}

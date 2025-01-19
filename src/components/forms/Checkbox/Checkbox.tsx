import type { ReactNode } from 'react';
import type { Control, FieldValues, ControllerProps, FieldError, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { CheckboxProps as BaseCheckboxProps, FormControlLabelProps } from '@mui/material';
import { Checkbox as BaseCheckbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from '@mui/material';
import { useFormError } from '../FormErrorProvider';

export type CheckboxProps<T extends FieldValues> = Omit<BaseCheckboxProps, 'name'> & {
  validation?: ControllerProps<T>['rules'];
  name: Path<T>;
  parseError?: (error: FieldError) => ReactNode;
  label?: FormControlLabelProps['label'];
  helperText?: string;
  control?: Control<T>;
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control'>;
};

export function Checkbox<TFieldValues extends FieldValues>(props: CheckboxProps<TFieldValues>) {
  const { name, validation = {}, required, parseError, label, control, helperText, labelProps, ...rest } = props;
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  if (required && !validation.required) {
    validation.required = 'Este campo es obligatorio';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        const parsedHelperText = error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : helperText;
        return (
          <FormControl required={required} error={!!error}>
            <FormGroup row>
              <FormControlLabel
                {...labelProps}
                label={label || ''}
                control={
                  <BaseCheckbox
                    {...rest}
                    color={rest.color || 'primary'}
                    sx={[
                      ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
                      {
                        color: error ? 'error.main' : undefined,
                      },
                    ]}
                    value={value}
                    checked={!!value}
                    onChange={(ev) => {
                      onChange(!value);
                      if (typeof rest.onChange === 'function') {
                        rest.onChange(ev, !value);
                      }
                    }}
                    inputRef={ref}
                  />
                }
              />
            </FormGroup>
            {parsedHelperText && <FormHelperText error={!!error}>{parsedHelperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}

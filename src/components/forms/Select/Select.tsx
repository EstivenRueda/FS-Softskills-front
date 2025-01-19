import { type ReactNode, createElement } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { StackProps, TextFieldProps } from '@mui/material';
import { InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import type { SelectOption } from '@/types';
import { useFormError } from '../FormErrorProvider';

export type SelectProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'type' | 'onChange'> & {
  validation?: ControllerProps<T>['rules'];
  name: Path<T>;
  options?: readonly SelectOption[] | readonly any[];
  valueKey?: string;
  labelKey?: string;
  type?: 'string' | 'number';
  parseError?: (error: FieldError) => ReactNode;
  objectOnChange?: boolean;
  onChange?: (value: any) => void;
  control?: Control<T>;
  stackProps?: StackProps;
};

export function Select<TFieldValues extends FieldValues>(props: SelectProps<TFieldValues>) {
  const {
    name,
    required,
    valueKey = 'id',
    labelKey = 'label',
    options = [],
    parseError,
    type,
    objectOnChange,
    validation = {},
    control,
    label,
    placeholder,
    stackProps,
    ...rest
  } = props;
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const isNativeSelect = !!rest.SelectProps?.native;
  const ChildComponent = isNativeSelect ? 'option' : MenuItem;

  if (required && !validation.required) {
    validation.required = 'Este campo es obligatorio';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { onBlur, onChange, value, ref }, fieldState: { error } }) => {
        // handle shrink on number input fields
        if (type === 'number' && typeof value !== 'undefined') {
          rest.InputLabelProps = rest.InputLabelProps || {};
          rest.InputLabelProps.shrink = true;
        }

        value = value?.[valueKey] ?? value; // try fetch key value

        return (
          <Stack width="100%" {...stackProps}>
            {label && (
              <InputLabel error={!!error} htmlFor={name} required={required} sx={{ mb: 1 }}>
                {label}
              </InputLabel>
            )}
            <TextField
              {...rest}
              InputProps={{
                ...rest.InputProps,
                sx: { ...rest?.InputProps?.sx, borderRadius: '10px' },
              }}
              name={name}
              value={value ?? ''}
              onBlur={onBlur}
              onChange={(event) => {
                let item: number | string = event.target.value;
                if (type === 'number' && item) {
                  item = Number(item);
                }
                onChange(item);
                if (typeof rest.onChange === 'function') {
                  if (objectOnChange) {
                    item = options.find((i) => i[valueKey] === item);
                  }
                  rest.onChange(item);
                }
              }}
              select
              SelectProps={{
                ...rest.SelectProps,
                displayEmpty: !label || !!placeholder,
              }}
              required={required}
              error={!!error}
              helperText={
                error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : rest.helperText
              }
              inputRef={ref}
            >
              {placeholder && (
                <MenuItem disabled value="">
                  {placeholder}
                </MenuItem>
              )}
              {isNativeSelect && <option />}
              {options.map((item: any) =>
                createElement(
                  ChildComponent,
                  {
                    key: `${name}_${item[valueKey]}`,
                    value: item?.[valueKey] ?? item,
                    disabled: item?.disabled ?? false,
                  },
                  item[labelKey]
                )
              )}
            </TextField>
          </Stack>
        );
      }}
    />
  );
}

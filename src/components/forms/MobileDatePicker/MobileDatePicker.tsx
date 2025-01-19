import type { ReactNode } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';
import { InputLabel, Stack } from '@mui/material';
import type {
  MobileDatePickerProps as BaseMobileDatePickerProps,
  MobileDatePickerSlotProps,
} from '@mui/x-date-pickers';
import { MobileDatePicker as BaseMobileDatePicker } from '@mui/x-date-pickers';
import { useFormError } from '../FormErrorProvider';

export type MobileDatePickerProps<
  T extends FieldValues,
  TInputDate extends Date,
  TDate extends Date = TInputDate,
> = Omit<BaseMobileDatePickerProps<TDate>, 'value' | 'slotProps'> & {
  name: Path<T>;
  required?: boolean;
  isDate?: boolean;
  parseError?: (error: FieldError) => ReactNode;
  validation?: ControllerProps<T>['rules'];
  control?: Control<T>;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  slotProps?: Omit<MobileDatePickerSlotProps<TDate, any>, 'textField'>;
};

export function MobileDatePicker<TFieldValues extends FieldValues>(
  props: MobileDatePickerProps<TFieldValues, any, any>
) {
  const { parseError, name, required, validation = {}, inputProps, control, slotProps, label, ...rest } = props;
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
      defaultValue={null as any}
      render={({ field, fieldState: { error } }) => {
        if (field?.value && typeof field?.value === 'string') {
          field.value = new Date(field.value) as any; // need to see if this works for all localization adaptors
        }

        return (
          <Stack width="100%">
            {label && (
              <InputLabel htmlFor={name} required={required} error={!!error} sx={{ mb: 1 }}>
                {label}
              </InputLabel>
            )}
            <BaseMobileDatePicker
              {...rest}
              {...field}
              ref={(r) => {
                field.ref(r?.querySelector('input'));
              }}
              onClose={(...args) => {
                field.onBlur();
                if (rest.onClose) {
                  rest.onClose(...args);
                }
              }}
              onChange={(v, keyboardInputValue) => {
                field.onChange(v, keyboardInputValue);
                if (typeof rest.onChange === 'function') {
                  rest.onChange(v, keyboardInputValue);
                }
              }}
              slotProps={{
                ...slotProps,
                textField: {
                  ...inputProps,
                  required,
                  error: !!error,
                  helperText: error
                    ? typeof customErrorFn === 'function'
                      ? customErrorFn(error)
                      : error.message
                    : inputProps?.helperText || rest.helperText,
                },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}

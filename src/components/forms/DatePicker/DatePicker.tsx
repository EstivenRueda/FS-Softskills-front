import type { ReactNode } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';
import { InputLabel, Stack } from '@mui/material';
import type {
  DatePickerProps as BaseDatePickerProps,
  DatePickerSlotProps,
  DateValidationError,
} from '@mui/x-date-pickers';
import { DatePicker as BaseDatePicker, validateDate } from '@mui/x-date-pickers';
import { useLocalizationContext } from '@mui/x-date-pickers/internals';
import { useFormError } from '../FormErrorProvider';
import { defaultErrorMessages } from './errorMessages';

export type DatePickerProps<T extends FieldValues, TInputDate extends Date, TDate extends Date = TInputDate> = Omit<
  BaseDatePickerProps<TDate>,
  'value' | 'slotProps'
> & {
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  isDate?: boolean;
  parseError?: (error: FieldError | DateValidationError) => ReactNode;
  validation?: ControllerProps<T>['rules'];
  control?: Control<T>;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  textReadOnly?: boolean;
  slotProps?: Omit<DatePickerSlotProps<TDate, any>, 'textField'>;
  overwriteErrorMessages?: typeof defaultErrorMessages;
};

export function DatePicker<TFieldValues extends FieldValues>(props: DatePickerProps<TFieldValues, any, any>) {
  const {
    parseError,
    name,
    required,
    validation = {},
    inputProps,
    control,
    textReadOnly,
    slotProps,
    overwriteErrorMessages,
    label,
    disabled,
    ...rest
  } = props;
  const errorMessages = {
    ...defaultErrorMessages,
    ...overwriteErrorMessages,
  };
  const errorMsgFn = useFormError();
  const adapter = useLocalizationContext();
  const customErrorFn = parseError || errorMsgFn;
  if (required && !validation.required) {
    validation.required = 'Este campo es obligatorio';
  }

  validation.validate = {
    internal: (value) => {
      const inputTimezone = value == null || !adapter.utils.isValid(value) ? null : adapter.utils.getTimezone(value);
      const internalError = validateDate({
        props: {
          shouldDisableDate: rest.shouldDisableDate,
          shouldDisableMonth: rest.shouldDisableMonth,
          shouldDisableYear: rest.shouldDisableYear,
          disablePast: Boolean(rest.disablePast),
          disableFuture: Boolean(rest.disableFuture),
          minDate: rest.minDate,
          maxDate: rest.maxDate,
        },
        timezone: rest.timezone ?? inputTimezone ?? 'default',
        value,
        adapter,
      });
      return internalError == null || errorMessages[internalError];
    },
    ...validation.validate,
  };

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

        const errorMessage = error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : null;

        return (
          <Stack width="100%">
            {label && (
              <InputLabel htmlFor={name} required={required} error={!!errorMessage} sx={{ mb: 1 }}>
                {label}
              </InputLabel>
            )}
            <BaseDatePicker
              {...rest}
              {...field}
              readOnly={disabled}
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
                  size: 'small',
                  onBlur: (event) => {
                    field.onBlur();
                    if (typeof inputProps?.onBlur === 'function') {
                      inputProps.onBlur(event);
                    }
                  },
                  error: !!errorMessage,
                  helperText: errorMessage ? errorMessage : inputProps?.helperText || rest.helperText,
                  inputProps: {
                    readOnly: !!textReadOnly,
                    ...inputProps?.inputProps,
                  },
                  InputProps: {
                    ...inputProps?.InputProps,
                    sx: { ...inputProps?.InputProps?.sx, borderRadius: '10px' },
                  },
                },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}

import type { ReactNode } from 'react';
import type { ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Control, Controller } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';
import { InputLabel, Stack } from '@mui/material';
import type { DateTimePickerProps as BaseDateTimePickerProps, DateTimePickerSlotProps } from '@mui/x-date-pickers';
import { DateTimePicker as BaseDateTimePicker, validateDateTime } from '@mui/x-date-pickers';
import { useLocalizationContext } from '@mui/x-date-pickers/internals';
import { useFormError } from '../FormErrorProvider';
import { defaultErrorMessages } from './errorMessages';

export type DateTimePickerProps<T extends FieldValues, TInputDate extends Date, TDate extends Date = TInputDate> = Omit<
  BaseDateTimePickerProps<TDate>,
  'value' | 'slotProps'
> & {
  name: Path<T>;
  required?: boolean;
  isDate?: boolean;
  parseError?: (error: FieldError) => ReactNode;
  validation?: ControllerProps<T>['rules'];
  control?: Control<T>;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  textReadOnly?: boolean;
  slotProps?: Omit<DateTimePickerSlotProps<TDate, any>, 'textField'>;
  overwriteErrorMessages?: typeof defaultErrorMessages;
};

export function DateTimePicker<TFieldValues extends FieldValues>(props: DateTimePickerProps<TFieldValues, any, any>) {
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
      const internalError = validateDateTime({
        props: {
          shouldDisableDate: rest.shouldDisableDate,
          shouldDisableMonth: rest.shouldDisableMonth,
          shouldDisableYear: rest.shouldDisableYear,
          disablePast: Boolean(rest.disablePast),
          disableFuture: Boolean(rest.disableFuture),
          minDate: rest.minDate,
          maxDate: rest.maxDate,
          disableIgnoringDatePartForTimeValidation: rest.disableIgnoringDatePartForTimeValidation,
          maxTime: rest.maxTime,
          minTime: rest.minTime,
          minutesStep: rest.minutesStep,
          shouldDisableTime: rest.shouldDisableTime,
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
        return (
          <Stack width="100%">
            {label && (
              <InputLabel htmlFor={name} required={required} error={!!error} sx={{ mb: 1 }}>
                {label}
              </InputLabel>
            )}
            <BaseDateTimePicker
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
                  size: 'small',
                  error: !!error,
                  helperText: error
                    ? typeof customErrorFn === 'function'
                      ? customErrorFn(error)
                      : error.message
                    : inputProps?.helperText || rest.helperText,
                  inputProps: {
                    readOnly: textReadOnly,
                    ...inputProps?.inputProps,
                    sx: { ...inputProps?.inputProps?.sx, borderRadius: '10px' },
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

import type { ReactNode } from 'react';
import type { ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Control, Controller } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';
import { InputLabel, Stack } from '@mui/material';
import type { TimePickerProps as BaseTimePickerProps, TimePickerSlotProps } from '@mui/x-date-pickers';
import { TimePicker as BaseTimePicker, validateTime } from '@mui/x-date-pickers';
import { useLocalizationContext } from '@mui/x-date-pickers/internals';
import { useFormError } from '../FormErrorProvider';
import { defaultErrorMessages } from './errorMessages';

export type TimePickerProps<T extends FieldValues, TInputDate extends Date, TDate extends Date = TInputDate> = Omit<
  BaseTimePickerProps<TDate>,
  'value' | 'renderInput'
> & {
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  isDate?: boolean;
  parseError?: (error: FieldError) => ReactNode;
  validation?: ControllerProps<T>['rules'];
  control?: Control<T>;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps['helperText'];
  textReadOnly?: boolean;
  slotProps?: Omit<TimePickerSlotProps<TDate, any>, 'textField'>;
  overwriteErrorMessages?: typeof defaultErrorMessages;
};

export function TimePicker<TFieldValues extends FieldValues>(props: TimePickerProps<TFieldValues, Date>) {
  const {
    parseError,
    name,
    required,
    disabled,
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
      const internalError = validateTime({
        props: {
          minTime: rest.minTime,
          maxTime: rest.maxTime,
          minutesStep: rest.minutesStep,
          shouldDisableTime: rest.shouldDisableTime,
          disableIgnoringDatePartForTimeValidation: rest.disableIgnoringDatePartForTimeValidation,
          disablePast: Boolean(rest.disablePast),
          disableFuture: Boolean(rest.disableFuture),
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
            <BaseTimePicker
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

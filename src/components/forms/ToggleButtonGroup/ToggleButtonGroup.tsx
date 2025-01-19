import type { ReactNode } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type {
  ToggleButtonGroupProps as BaseToggleButtonGroupProps,
  FormLabelProps,
  ToggleButtonProps,
} from '@mui/material';
import {
  ToggleButtonGroup as BaseToggleButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  ToggleButton,
} from '@mui/material';
import { useFormError } from '../FormErrorProvider';

type SingleToggleButtonProps = Omit<ToggleButtonProps, 'value' | 'children'> & {
  id: number | string;
  label: ReactNode;
};

export type ToggleButtonGroupProps<T extends FieldValues> = BaseToggleButtonGroupProps & {
  required?: boolean;
  label?: string;
  validation?: ControllerProps<T>['rules'];
  name: Path<T>;
  parseError?: (error: FieldError) => ReactNode;
  control?: Control<T>;
  options: SingleToggleButtonProps[];
  formLabelProps?: FormLabelProps;
  helperText?: string;
  enforceAtLeastOneSelected?: boolean;
};

export function ToggleButtonGroup<TFieldValues extends FieldValues = FieldValues>(
  props: ToggleButtonGroupProps<TFieldValues>
) {
  const {
    name,
    control,
    label,
    validation = {},
    required,
    options = [],
    parseError,
    helperText,
    formLabelProps,
    enforceAtLeastOneSelected = false,
    exclusive,
    ...toggleButtonGroupProps
  } = props;
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  if (required && !validation.required) {
    validation.required = 'Este campo es obligatorio';
  }

  const isRequired = required || !!validation?.required;
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        const renderHelperText = error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : helperText;
        return (
          <FormControl error={!!error} required={isRequired} fullWidth={toggleButtonGroupProps?.fullWidth}>
            {label && (
              <FormLabel
                {...formLabelProps}
                error={!!error}
                required={isRequired}
                sx={{
                  mb: 2,
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  '&.Mui-focused': {
                    color: 'text.primary',
                  },
                  ...formLabelProps?.sx,
                }}
              >
                {label}
              </FormLabel>
            )}
            <BaseToggleButtonGroup
              {...toggleButtonGroupProps}
              exclusive={exclusive}
              value={value}
              onBlur={onBlur}
              onChange={(event, val) => {
                if (enforceAtLeastOneSelected) {
                  if (exclusive && val === null) return;
                  if (!exclusive && val.length === 0) return;
                }
                onChange(val);
                if (typeof toggleButtonGroupProps.onChange === 'function') {
                  toggleButtonGroupProps.onChange(event, val);
                }
              }}
              sx={{
                gap: 2,
                '& .MuiToggleButton-root': {
                  border: 'none',
                  borderRadius: '10px !important',
                  px: 4,
                  py: 1,
                  fontSize: '1rem',
                  textTransform: 'none',
                  backgroundColor: '#f5f5f5',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#5BB5C7',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#4CA3B5',
                    },
                  },
                },
              }}
            >
              {options.map(({ label, id, ...toggleProps }) => (
                <ToggleButton value={id} {...toggleProps} key={id}>
                  {label}
                </ToggleButton>
              ))}
            </BaseToggleButtonGroup>

            {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}

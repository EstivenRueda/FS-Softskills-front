import type { ReactNode } from 'react';
import type { Control, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { CheckboxProps, FormControlLabelProps } from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, useTheme } from '@mui/material';
import { useFormError } from '../FormErrorProvider';

export type CheckboxButtonGroupProps<T extends FieldValues> = {
  options: { id: string | number; label: string }[] | any[];
  helperText?: ReactNode;
  name: Path<T>;
  required?: boolean;
  parseError?: (error: FieldError) => ReactNode;
  label?: string;
  labelKey?: string;
  valueKey?: string;
  onChange?: (data: any) => void;
  returnObject?: boolean;
  disabled?: boolean;
  row?: boolean;
  control?: Control<T>;
  rules?: ControllerProps<T>['rules'];
  checkboxColor?: CheckboxProps['color'];
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control'>;
};

export function CheckboxButtonGroup<TFieldValues extends FieldValues>(props: CheckboxButtonGroupProps<TFieldValues>) {
  let {
    helperText,
    options,
    label,
    name,
    parseError,
    required,
    labelKey = 'label',
    valueKey = 'id',
    returnObject,
    disabled,
    row,
    control,
    checkboxColor,
    rules,
    labelProps,
    ...rest
  } = props;
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const theme = useTheme();
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    rules: required ? { required: 'Este campo es obligatorio' } : rules,
    control,
  });

  helperText = error ? (typeof customErrorFn === 'function' ? customErrorFn(error) : error.message) : helperText;

  const handleChange = (index: number | string) => {
    const newArray: (string | number)[] | any[] = [...value];
    const exists = value.findIndex((i: any) => (returnObject ? i[valueKey] === index : i === index)) === -1;
    if (exists) {
      newArray.push(returnObject ? options.find((i) => i[valueKey] === index) : index);
    } else {
      newArray.splice(
        value.findIndex((i: any) => (returnObject ? i[valueKey] === index : i === index)),
        1
      );
    }
    // setValue(name, newArray, { shouldValidate: true })
    onChange(newArray);
    if (typeof rest.onChange === 'function') {
      rest.onChange(newArray);
    }
  };

  return (
    <FormControl error={!!error} required={required}>
      {label && <FormLabel error={!!error}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any) => {
          const optionKey = option[valueKey];
          if (!optionKey) {
            console.error(`CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`, option);
          }
          const isChecked =
            value.findIndex((item: any) => (returnObject ? item[valueKey] === optionKey : item === optionKey)) !== -1;
          return (
            <FormControlLabel
              {...labelProps}
              control={
                <Checkbox
                  sx={{
                    color: error ? theme.palette.error.main : undefined,
                  }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleChange(optionKey)}
                />
              }
              label={option[labelKey]}
              key={optionKey}
            />
          );
        })}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

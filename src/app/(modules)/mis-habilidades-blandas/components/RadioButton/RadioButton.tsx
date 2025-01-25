import type { ChangeEvent, ReactNode } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup, TableCell, useTheme } from '@mui/material';
import { useFormError } from '../../../../../components/forms/FormErrorProvider';

export type RadioButtonProps<T extends FieldValues> = {
  options: { label: string; id: string | number }[] | any[];
  name: Path<T>;
  required?: boolean;
  parseError?: (error: FieldError) => ReactNode;
  valueKey?: string;
  type?: 'number' | 'string';
  emptyOptionLabel?: string;
  onChange?: (value: any) => void;
  returnObject?: boolean;
  row?: boolean;
  control?: Control<T>;
};

export function RadioButton<TFieldValues extends FieldValues>(props: RadioButtonProps<TFieldValues>) {
  let { options, name, parseError, valueKey = 'id', required, returnObject, row, control, type, ...rest } = props;
  const theme = useTheme();
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    rules: required ? { required: 'Este campo es obligatorio' } : undefined,
    control,
  });

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value;
    const returnValue = returnObject ? options.find((items) => items[valueKey] === radioValue) : radioValue;
    // setValue(name, returnValue, { shouldValidate: true })
    onChange(returnValue);
    if (typeof rest.onChange === 'function') {
      rest.onChange(returnValue);
    }
  };

  return (
    <>
      {options.map((option: any) => {
        const optionKey = option[valueKey];
        if (!optionKey) {
          console.error(`CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`, option);
        }
        let val = returnObject ? value?.[valueKey] : value;
        if (type === 'number') {
          val = Number(val);
        }
        const isChecked = val === optionKey;
        return (
          <TableCell key={optionKey} align="center">
            <Radio
              sx={{
                color: error ? theme.palette.error.main : undefined,
              }}
              checked={isChecked}
              value={optionKey}
              onChange={onRadioChange}
            />
          </TableCell>
        );
      })}
    </>
  );
}

import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { SwitchProps as BaseSwitchProps, FormControlLabelProps } from '@mui/material';
import { Switch as BaseSwitch, FormControlLabel } from '@mui/material';

export type SwitchProps<T extends FieldValues> = Omit<FormControlLabelProps, 'control'> & {
  name: Path<T>;
  control?: Control<T>;
  switchProps?: BaseSwitchProps;
};

export function Switch<TFieldValues extends FieldValues>(props: SwitchProps<TFieldValues>) {
  const { name, control, switchProps, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel control={<BaseSwitch {...switchProps} {...field} checked={!!field.value} />} {...rest} />
      )}
    />
  );
}

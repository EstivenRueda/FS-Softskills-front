import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { IconButton, type IconButtonProps, InputAdornment } from '@mui/material';
import { TextField, type TextFieldProps } from '../TextField';

export type PasswordProps<T extends FieldValues> = TextFieldProps<T> & {
  iconColor?: IconButtonProps['color'];
  renderIcon?: (password: boolean) => ReactNode;
};

export function Password<TFieldValues extends FieldValues>(props: PasswordProps<TFieldValues>) {
  const {
    iconColor,
    renderIcon = (password) => (password ? <VisibilityIcon /> : <VisibilityOffIcon />),
    ...rest
  } = props;
  const [password, setPassword] = useState<boolean>(true);
  return (
    <TextField
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position={'end'}>
            <IconButton
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={() => setPassword(!password)}
              tabIndex={-1}
              color={iconColor ?? 'default'}
            >
              {renderIcon(password)}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={password ? 'password' : 'text'}
    />
  );
}

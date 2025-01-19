import type { FieldValues, Path } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { Password, type PasswordProps } from './Password';

export type PasswordRepeatProps<T extends FieldValues> = PasswordProps<T> & {
  passwordFieldName: Path<T>;
  customInvalidFieldMessage?: string;
};

export function PasswordRepeat<TFieldValues extends FieldValues>(props: PasswordRepeatProps<TFieldValues>) {
  const { passwordFieldName, customInvalidFieldMessage, ...rest } = props;
  const pwValue = useWatch({
    name: passwordFieldName,
    control: rest.control,
  });
  const invalidFieldMessage = customInvalidFieldMessage ?? 'Password should match';
  return (
    <Password
      {...rest}
      validation={{
        validate: (value: string) => {
          return value === pwValue || invalidFieldMessage;
        },
      }}
    />
  );
}

import { forwardRef, type Ref } from 'react';
import { IMaskInput } from 'react-imask';

export type PhoneMaskInputProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask?: string;
};

function BasePhoneMaskInput(props: PhoneMaskInputProps, ref: Ref<HTMLInputElement>) {
  const { onChange, mask = '0000000000000', ...rest } = props;

  return (
    <IMaskInput
      {...rest}
      mask={mask}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
}

export const PhoneMaskInput = forwardRef<HTMLInputElement, PhoneMaskInputProps>(BasePhoneMaskInput);
// (#00) 000-0000

import { FC, InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  maskChar?: string;
  alwaysShowMask?: boolean;
}

export const Input: FC<Props> = ({
  className,
  alwaysShowMask,
  mask = '',
  maskChar,
  ...props
}) => {
  return (
    <InputMask
      mask={mask}
      maskChar={maskChar}
      alwaysShowMask={alwaysShowMask}
      className={
        'h-8 min-w-0 rounded-[5px] border border-black px-2 py-1.5 ' + className
      }
      {...props}
    />
  );
};

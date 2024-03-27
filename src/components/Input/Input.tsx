import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={
        'h-8 rounded-[5px] border border-black px-2 py-1.5 ' + className
      }
      {...props}
    />
  );
};

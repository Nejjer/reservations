import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

export const IconButton: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={'h-7 w-7 rounded-3xl bg-green'} {...props}>
      {children}
    </button>
  );
};

import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

export const Button: FC<Props> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={
        `text-1xl rounded-md bg-green p-1 text-center font-bold shadow-button ${!disabled && 'active:shadow-none'} disabled:bg-green/30 disabled:text-black/50 ` +
        className
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  forwardRef,
  ReactNode,
} from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

export const Button: FC<Props> = forwardRef(
  ({ children, className, disabled, ...props }, ref) => (
    <button
      className={
        `text-1xl rounded-md bg-green p-1 text-center font-bold shadow-button ${!disabled && 'active:shadow-none'} disabled:bg-green/30 disabled:text-black/50 ` +
        className
      }
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);

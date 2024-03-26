import { FC, ReactNode } from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

export const Button: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={
        'bg-green shadow-button text-1xl rounded-md p-1 text-center font-bold active:shadow-none ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

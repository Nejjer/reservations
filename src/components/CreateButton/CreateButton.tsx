import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { Button } from '../Button';
import PlusIcon from '../../icons/plus.svg?react';

export const CreateButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ onClick, className, ...props }) => {
  return (
    <Button
      onClick={onClick}
      {...props}
      className={'h-12 w-12 !rounded-[50%] ' + className}
    >
      <PlusIcon />
    </Button>
  );
};

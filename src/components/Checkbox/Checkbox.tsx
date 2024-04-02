import { FC, ReactNode } from 'react';
import * as DefaultCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

interface Props {
  children?: ReactNode;
  onChange?: (checked: boolean) => void;
  value?: boolean;
}

export const Checkbox: FC<Props> = ({ children, onChange, value }) => {
  return (
    <div className={'flex items-center gap-2'}>
      <DefaultCheckbox.Root
        onCheckedChange={onChange}
        checked={value}
        id={'c1'}
        className={'h-[18px] w-[18px] rounded-[4px] border border-black'}
      >
        <DefaultCheckbox.Indicator>
          <CheckIcon />
        </DefaultCheckbox.Indicator>
      </DefaultCheckbox.Root>
      <label className='Label' htmlFor='c1'>
        {children}
      </label>
    </div>
  );
};

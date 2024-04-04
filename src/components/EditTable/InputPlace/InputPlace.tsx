import { FC } from 'react';
import { Input } from '../../Input';
import CancelIcon from '../../../icons/cancel.svg?react';
import CheckIcon from '../../../icons/check.svg?react';

interface Props {
  number?: number;
  title: string;
  setTitle: (title: string) => void;
  setNumber: (number: number) => void;
  handleAddPlace: () => void;
  setIsAdding: (isAdding: boolean) => void;
}

export const InputPlace: FC<Props> = ({
  title,
  setTitle,
  setNumber,
  number,
  setIsAdding,
  handleAddPlace,
}) => {
  return (
    <div
      className={'flex items-center gap-4 rounded-[4px] bg-black/25 px-1 py-1'}
    >
      <Input
        placeholder={'№'}
        className={'h-6 w-8 shrink border-none px-1'}
        value={number}
        type={'number'}
        onChange={(e) => setNumber(+e.target.value)}
      />
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={'Название места'}
        className={'h-6 grow border-none'}
      />
      <CheckIcon className={'cursor-pointer'} onClick={handleAddPlace} />
      <CancelIcon
        className={'cursor-pointer'}
        onClick={() => setIsAdding(false)}
      />
    </div>
  );
};

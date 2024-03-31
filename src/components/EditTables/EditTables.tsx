import { FC } from 'react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import PencilIcon from '../../icons/pencil.svg?react';
import CanIcon from '../../icons/can.svg?react';
import CancelIcon from '../../icons/cancel.svg?react';
import CheckIcon from '../../icons/check.svg?react';

interface Props {}

export const EditTables: FC<Props> = () => {
  return (
    <div>
      <Input placeholder={'Название'} className={'mb-3 w-[420px]'} />
      <Checkbox>Бронировать целиком</Checkbox>
      <div className={'mt-8'}>
        <h5 className={'text-xl font-bold'}>Места</h5>
        <ul>
          <li className={'flex gap-2 border-t border-black/30  px-1 py-1'}>
            <span className={'shrink'}>1</span>
            <span className={'grow'}>Название столика</span>
            <PencilIcon />
            <CanIcon />
          </li>
          <li className={'flex gap-2 border-t border-black/30  px-1 py-1'}>
            <span className={'shrink'}>1</span>
            <span className={'grow'}>Название столика</span>
            <PencilIcon />
            <CanIcon />
          </li>
          <li className={'flex gap-2 border-t border-black/30  px-1 py-1'}>
            <span className={'shrink'}>1</span>
            <span className={'grow'}>Название места</span>
            <PencilIcon />
            <CanIcon />
          </li>
        </ul>
        <div
          className={
            'flex items-center gap-4 rounded-[4px] bg-black/25 px-1 py-1'
          }
        >
          <Input
            placeholder={'№'}
            className={'h-6 w-8 shrink border-none px-1'}
          />
          <Input
            placeholder={'Название места'}
            className={'h-6 grow border-none'}
          />
          <CheckIcon />
          <CancelIcon />
        </div>
      </div>
    </div>
  );
};

import { FC, useState } from 'react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import PencilIcon from '../../icons/pencil.svg?react';
import CanIcon from '../../icons/can.svg?react';
import CancelIcon from '../../icons/cancel.svg?react';
import CheckIcon from '../../icons/check.svg?react';
import PlusIcon from '../../icons/plus.svg?react';
import { ICreateTableDto } from '../../api/tableApi.ts';

interface Props {
  table: ICreateTableDto;
  onEditTable: (table: ICreateTableDto) => void;
}

export const EditTable: FC<Props> = ({ table, onEditTable }) => {
  const [number, setNumber] = useState<number>();
  const [title, setTitle] = useState('');
  const [isAddable, setIsAddable] = useState(false);

  const handleAddPlace = () => {
    number &&
      title &&
      onEditTable({ ...table, places: [...table.places, { title, number }] });
    setTitle('');
    setNumber(undefined);
  };

  return (
    <div>
      <Input
        placeholder={'Название'}
        className={'mb-3 w-[420px]'}
        value={table.title}
        onChange={(e) => onEditTable({ ...table, title: e.target.value })}
      />
      <Checkbox
        value={table.reserveAll}
        onChange={(e) => onEditTable({ ...table, reserveAll: e })}
      >
        Бронировать целиком
      </Checkbox>
      <div className={'mt-8'}>
        <h5 className={'flex items-center text-xl font-bold'}>
          <p className={'mb-2'}>Места </p>
          <PlusIcon
            className={'h-6 cursor-pointer'}
            onClick={() => setIsAddable(true)}
          />
        </h5>
        <ul>
          {table.places.map((place) => (
            <li className={'flex gap-2 border-t border-black/30  px-1 py-1'}>
              <span className={'shrink'}>{place.number}</span>
              <span className={'grow'}>{place.title}</span>
              <PencilIcon className={'cursor-pointer'} />
              <CanIcon className={'cursor-pointer'} />
            </li>
          ))}
        </ul>
        {isAddable && (
          <div
            className={
              'flex items-center gap-4 rounded-[4px] bg-black/25 px-1 py-1'
            }
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
              onClick={() => setIsAddable(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

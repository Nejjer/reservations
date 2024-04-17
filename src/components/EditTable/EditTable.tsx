import { FC, useState } from 'react';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import PencilIcon from '../../icons/pencil.svg?react';
import CanIcon from '../../icons/can.svg?react';

import PlusIcon from '../../icons/plus.svg?react';
import { ICreateTableDto } from '../../api/tableApi.ts';
import { InputPlace } from './InputPlace';

interface Props {
  table: ICreateTableDto;
  onEditTable: (table: ICreateTableDto) => void;
}

export const EditTable: FC<Props> = ({ table, onEditTable }) => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [indexIsEdit, setIndexIsEdit] = useState(-1);
  const handleAddPlace = () => {
    number &&
      title &&
      onEditTable({
        ...table,
        places: [...table.places, { title, number: +number }],
      });
    setTitle('');
    setNumber('');
    setIndexIsEdit(-1);
  };

  const handleEditPlace = () => {
    if (number && title) {
      const newPlaces = [...table.places].map((place, index) =>
        index === indexIsEdit ? { title, number: +number } : place,
      );

      number && title && onEditTable({ ...table, places: newPlaces });
      setIndexIsEdit(-1);
      setTitle('');
      setNumber('');
    }
  };

  const handleDeletePlace = (i: number) => {
    const newPlaces = [...table.places];
    newPlaces.splice(i, 1);
    onEditTable({ ...table, places: newPlaces });
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
            onClick={() => {
              setIsAdding(true);
              setIndexIsEdit(-1);
            }}
          />
        </h5>
        <ul>
          {table.places.map((place, index) => (
            <>
              {indexIsEdit === index ? (
                <InputPlace
                  key={place.title + index}
                  title={title}
                  number={number}
                  setTitle={setTitle}
                  setNumber={setNumber}
                  handleAddPlace={handleEditPlace}
                  setIsAdding={() => setIndexIsEdit(-1)}
                />
              ) : (
                <li
                  key={place.title + index}
                  className={'flex gap-2 border-t border-black/30  px-1 py-1'}
                >
                  <span className={'shrink'}>{place.number}</span>
                  <span className={'grow'}>{place.title}</span>
                  <PencilIcon
                    className={'cursor-pointer'}
                    onClick={() => setIndexIsEdit(index)}
                  />
                  <CanIcon
                    className={'cursor-pointer'}
                    onClick={() => handleDeletePlace(index)}
                  />
                </li>
              )}
            </>
          ))}
        </ul>
        {isAdding && indexIsEdit === -1 && (
          <InputPlace
            number={number}
            setIsAdding={setIsAdding}
            setNumber={setNumber}
            title={title}
            setTitle={setTitle}
            handleAddPlace={handleAddPlace}
          />
        )}
      </div>
    </div>
  );
};

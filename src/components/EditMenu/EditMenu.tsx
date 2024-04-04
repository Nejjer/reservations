import { FC, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { IMenuPosition } from '../../api/restaurantApi.ts';
import { Menu } from '../Menu';

interface Props {
  onChange: (menu: IMenuPosition[]) => void;
  menu: IMenuPosition[];
}

export const EditMenu: FC<Props> = ({ onChange, menu }) => {
  const [cost, setCost] = useState<number>();
  const [weight, setWeight] = useState('');
  const [title, setTitle] = useState('');

  const isValid = cost && weight && title;
  const handleAddClick = () => {
    isValid && onChange([...menu, { cost, title, weight }]);
    setCost(0);
    setWeight('');
    setTitle('');
  };

  return (
    <div className={'flex h-[560px] flex-col justify-between'}>
      <Menu positions={menu} />
      <div
        className={
          'col-auto grid grid-cols-4 justify-between gap-1 border-t border-black p-2'
        }
      >
        <Input
          placeholder={'Название'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder={'Цена'}
          type={'number'}
          value={cost}
          onChange={(e) => setCost(+e.target.value)}
        />
        <Input
          placeholder={'Весь/Кол-во'}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Button disabled={!isValid} onClick={handleAddClick}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

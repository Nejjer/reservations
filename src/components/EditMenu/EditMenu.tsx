import { FC, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { IMenuPosition } from '../../api/restaurantApi.ts';
import { Menu } from '../Menu';

interface Props {
  onChange: (menu: IMenuPosition[]) => void;
}

export const EditMenu: FC<Props> = ({ onChange }) => {
  const [menu, setMenu] = useState<IMenuPosition[]>([]);
  const [cost, setCost] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [title, setTitle] = useState('');

  const isValid = cost && weight && title;
  const handleAddClick = () => {
    isValid && setMenu([...menu, { Cost: cost, Title: title, Weight: weight }]);
    isValid &&
      onChange([...menu, { Cost: cost, Title: title, Weight: weight }]);
    setCost(0);
    setWeight(0);
    setTitle('');
  };

  return (
    <div>
      <Menu positions={menu} />
      <div className={'flex justify-between gap-2 border-t border-black p-2'}>
        <Input
          placeholder={'Название'}
          className={'w-40'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder={'Цена'}
          type={'number'}
          className={'w-40'}
          value={cost}
          onChange={(e) => setCost(+e.target.value)}
        />
        <Input
          placeholder={'Весь/Гр'}
          type={'number'}
          className={'w-40'}
          value={weight}
          onChange={(e) => setWeight(+e.target.value)}
        />
        <Button disabled={!isValid} onClick={handleAddClick}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

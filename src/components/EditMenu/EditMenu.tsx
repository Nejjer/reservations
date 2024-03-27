import { FC } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

interface Props {}

export const EditMenu: FC<Props> = () => {
  return (
    <div className={'flex justify-between gap-2 border-t border-black p-2'}>
      <Input placeholder={'Название'} className={'w-40'} />
      <Input placeholder={'Цена'} type={'number'} className={'w-40'} />
      <Input placeholder={'Весь/Гр'} type={'number'} className={'w-40'} />
      <Button>Добавить</Button>
    </div>
  );
};

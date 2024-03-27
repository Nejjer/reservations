import { FC } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';

interface Props {}

export const Menu: FC<Props> = () => {
  return (
    <div className={'flex min-h-[450px] flex-col justify-between'}>
      {/*<ul className={'flex gap-x-2 border-b border-black p-2'}>*/}
      {/*  <li className={'h-8 border border-black px-2 py-1 text-center'}>*/}
      {/*    Завтраки*/}
      {/*  </li>*/}
      {/*  <li className={'h-8 border border-black px-2 py-1 text-center'}>*/}
      {/*    Завтраки*/}
      {/*  </li>*/}
      {/*  <li className={'h-8 border border-black px-2 py-1 text-center'}>*/}
      {/*    Завтраки*/}
      {/*  </li>*/}
      {/*  <li className={'h-8 border border-black px-2 py-1 text-center'}>*/}
      {/*    Завтраки*/}
      {/*  </li>*/}
      {/*</ul>*/}
      <ul>
        <li className={'flex justify-between border-b border-black px-3 py-4'}>
          <div>Еда Name</div>
          <div>100 ₽</div>
        </li>

        <li className={'flex justify-between border-b border-black px-3 py-4'}>
          <div>Еда Name</div>
          <div>100 ₽</div>
        </li>

        <li className={'flex justify-between border-b border-black px-3 py-4'}>
          <div>Еда Name</div>
          <div>100 ₽</div>
        </li>
      </ul>
      <div className={'flex justify-between gap-2 border-t border-black p-2'}>
        <Input placeholder={'Название'} className={'w-40'} />
        <Input placeholder={'Цена'} type={'number'} className={'w-40'} />
        <Input placeholder={'Весь/Гр'} type={'number'} className={'w-40'} />
        <Button>Добавить</Button>
      </div>
    </div>
  );
};

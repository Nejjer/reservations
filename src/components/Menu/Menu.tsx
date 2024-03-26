import { FC } from 'react';

interface Props {}

export const Menu: FC<Props> = () => {
  return (
    <div>
      <ul className={'flex gap-x-2 border-b border-black p-2'}>
        <li className={'h-8 border border-black px-2 py-1 text-center'}>
          Завтраки
        </li>
        <li className={'h-8 border border-black px-2 py-1 text-center'}>
          Завтраки
        </li>
        <li className={'h-8 border border-black px-2 py-1 text-center'}>
          Завтраки
        </li>
        <li className={'h-8 border border-black px-2 py-1 text-center'}>
          Завтраки
        </li>
      </ul>

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
    </div>
  );
};

import { FC } from 'react';
import { IMenuPosition } from '../../api/restaurantApi.ts';

export const Menu: FC<{ positions: IMenuPosition[] }> = ({ positions }) => {
  return (
    <div
      className={
        'flex max-h-[600px] min-h-[450px] flex-col justify-between overflow-auto'
      }
    >
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
        {positions.map((position, i) => (
          <li
            key={position.Title + i}
            className={'flex justify-between border-b border-black px-3 py-4'}
          >
            <div>{position.Title}</div>
            <div>{position.Cost} ₽</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

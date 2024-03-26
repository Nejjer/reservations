/// <reference types="vite-plugin-svgr/client" />
import { FC } from 'react';
import ClockIcon from '../../icons/clock.svg?react';
import WalletIcon from '../../icons/wallet.svg?react';

interface Props {}

export const RestaurantItem: FC<Props> = () => {
  return (
    <div
      className={
        'grid-cols-restaurantItem grid h-36 w-full gap-x-2 rounded-[5px] border border-black'
      }
    >
      <img
        src='/public/restaurant.jpeg'
        alt='Фото ресторана'
        className={'block h-full'}
      />
      <div className={'h-full py-4'}>
        <h3 className={'text-lg font-bold'}>Ресторан</h3>
        <p className={'text-sm'}>Европейская, Авторская</p>
        <div className={'mt-2 flex text-sm'}>
          <ClockIcon />
          <span>12:00 - 23:00</span>
        </div>
        <div className={'mt-1 flex text-sm'}>
          <WalletIcon />
          <span>~2000 ₽</span>
        </div>
      </div>
    </div>
  );
};

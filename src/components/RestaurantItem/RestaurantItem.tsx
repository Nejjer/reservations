/// <reference types="vite-plugin-svgr/client" />
import { FC } from 'react';
import ClockIcon from '../../icons/clock.svg?react';
import WalletIcon from '../../icons/wallet.svg?react';
import { IRestaurant } from '../../api/restaurantApi.ts';

import { getKitchenName } from '../../utils/getKitchenName.ts';
import { useNavigate } from 'react-router-dom';

export const RestaurantItem: FC<IRestaurant> = (restaurant) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`restaurant/${restaurant.Id}`)}
      className={
        'grid h-36 w-full cursor-pointer grid-cols-restaurantItem gap-x-2 rounded-[5px] border border-black'
      }
    >
      <img
        src='/public/restaurant.jpeg'
        alt='Фото ресторана'
        className={'block h-full'}
      />
      <div className={'h-full py-4'}>
        <h3 className={'text-lg font-bold'}>{restaurant.Title}</h3>
        <p className={'text-sm'}>{getKitchenName(restaurant.KitchenType)}</p>
        <div className={'mt-2 flex text-sm'}>
          <ClockIcon />
          <span>
            {restaurant.StartWorkTimeUtc} - {restaurant.EndWorkTimeUtc}
          </span>
        </div>
        <div className={'mt-1 flex text-sm'}>
          <WalletIcon />
          <span>~{restaurant.Cost} ₽</span>
        </div>
      </div>
    </div>
  );
};

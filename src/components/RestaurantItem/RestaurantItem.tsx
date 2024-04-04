/// <reference types="vite-plugin-svgr/client" />
import { FC } from 'react';
import ClockIcon from '../../icons/clock.svg?react';
import WalletIcon from '../../icons/wallet.svg?react';
import { IRestaurant } from '../../api/restaurantApi.ts';

import { getKitchenName } from '../../utils/getKitchenName.ts';
import { useNavigate } from 'react-router-dom';

export const RestaurantItem: FC<IRestaurant> = (restaurant) => {
  const navigate = useNavigate();
  console.log(restaurant);

  return (
    <div
      onClick={() => navigate(`restaurant/${restaurant.id}`)}
      className={
        'grid h-36 w-full cursor-pointer grid-cols-restaurantItem gap-x-2 rounded-[5px] border border-black'
      }
    >
      <img
        src={
          restaurant.pictures[0]?.url
            ? restaurant.pictures[0].url
            : '/public/restaurant.jpeg'
        }
        alt='Фото ресторана'
        className={'block h-full'}
      />
      <div className={'h-full py-4'}>
        <h3 className={'text-lg font-bold'}>{restaurant.title}</h3>
        <p className={'text-sm'}>{getKitchenName(restaurant.kitchenType)}</p>
        <div className={'mt-2 flex text-sm'}>
          <ClockIcon />
          <span>
            {restaurant.startWorkTime} - {restaurant.endWorkTime}
          </span>
        </div>
        <div className={'mt-1 flex text-sm'}>
          <WalletIcon />
          <span>~{restaurant.cost} ₽</span>
        </div>
      </div>
    </div>
  );
};

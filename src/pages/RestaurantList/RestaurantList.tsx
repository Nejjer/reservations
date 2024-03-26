import { FC } from 'react';
import { RestaurantItem } from '../../components/RestaurantItem';

interface Props {}

export const RestaurantList: FC<Props> = () => {
  return (
    <div className={'container mt-6'}>
      <h1 className={'pb-4 text-4xl font-bold'}>Рестораны Екатеринбурга</h1>
      <div className={'grid grid-cols-3 gap-x-6 gap-y-6'}>
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
        <RestaurantItem />
      </div>
    </div>
  );
};

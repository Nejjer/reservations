import { FC, useEffect } from 'react';
import { RestaurantItem } from '../../components/RestaurantItem';
import { useFetch } from '../../hooks/useFetch.ts';
import { restaurantApi } from '../../api/restaurantApi.ts';

interface Props {}

export const RestaurantList: FC<Props> = () => {
  const [loading, restaurants, fetchRestaurants] = useFetch(
    restaurantApi.getRestaurants,
  );

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading || !restaurants) {
    return null;
  }

  return (
    <div className={'container mt-6'}>
      <h1 className={'pb-4 text-4xl font-bold'}>Рестораны Екатеринбурга</h1>
      <div className={'grid grid-cols-3 gap-x-6 gap-y-6'}>
        {restaurants.map((restaurant) => (
          <RestaurantItem {...restaurant} />
        ))}
      </div>
    </div>
  );
};

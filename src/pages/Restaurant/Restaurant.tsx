import { FC, useEffect } from 'react';
import CalendarIcon from '../../icons/calendar.svg?react';
import WalletIcon from '../../icons/wallet20.svg?react';
import InfoIcon from '../../icons/info20.svg?react';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { ImageList } from '../../components/ImageList';
import { Menu } from '../../components/Menu';
import { useFetch } from '../../hooks/useFetch.ts';
import { IRestaurant, restaurantApi } from '../../api/restaurantApi.ts';
import { getKitchenName } from '../../utils/getKitchenName.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../utils/PATHS.ts';

interface Props {}

export const Restaurant: FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, restaurant, fetchRestaurant] = useFetch<IRestaurant>(
    async () => {
      return restaurantApi.getRestaurant(+id!);
    },
  );

  const handleDeleteRestaurant = async () => {
    await restaurantApi.deleteRestaurant(+id!);
    navigate('/');
  };

  const handleClickEdit = () => {
    navigate(`/${PATHS.restaurantEdit}/${id}`);
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (loading || !restaurant) {
    return null;
  }
  console.log(restaurant);

  return (
    <div
      className={
        'container mt-8 flex flex-col gap-y-16 px-12 xl:flex-row xl:gap-x-16'
      }
    >
      <div>
        <div className={'flex items-center gap-4'}>
          <h1 className={'pb-4 text-4xl font-bold'}>{restaurant.title}</h1>
          <p className={'py bg-green px-2'}>
            {getKitchenName(restaurant.kitchenType)}
          </p>
        </div>
        <div className={'mt-8 flex gap-16'}>
          <div
            className={
              'grid min-w-[200px] grid-cols-restaurantInfo gap-x-5 gap-y-4'
            }
          >
            <WalletIcon className={'mt-0.5'} />
            <p>Средний чек - {restaurant.cost} ₽</p>
            <CalendarIcon className={'mt-0.5'} />
            <p className={'grid grid-cols-2 gap-y-2'}>
              Открытие&nbsp;
              <p>{restaurant.startWorkTime}</p>
              Закрытие&nbsp;
              <p>{restaurant.endWorkTime}</p>
            </p>
          </div>
          <div className={'grid grid-cols-restaurantInfo gap-x-5 gap-y-4'}>
            <InfoIcon className={'mt-1'} />
            <p>
              {restaurant.contact.address} <br />
              Телефон: {restaurant.contact.phone} <br />
              {restaurant.contact.email}
            </p>
          </div>
        </div>
        <article className={'mt-8'}>{restaurant.description}</article>
        <div className={'flex gap-6'}>
          <Button className={'mt-8 w-44'} onClick={handleClickEdit}>
            Редактировать
          </Button>
          <Button
            className={'mt-8 w-44 bg-red'}
            onClick={handleDeleteRestaurant}
          >
            Удалить
          </Button>
        </div>
      </div>
      <Tabs tab1={<ImageList />} tab2={<Menu positions={restaurant.menu} />} />
    </div>
  );
};

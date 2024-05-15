import { FC } from 'react';
import ClockIcon from '../../icons/clock.svg?react';
import CalendarIcon from '../../icons/calendar24.svg?react';
import { IRestaurant } from '../../api/restaurantApi.ts';
import { getKitchenName } from '../../utils/getKitchenName.ts';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { ID } from '../../api/axiosInstance.ts';

export interface IClientBooks extends IRestaurant {
  date: string;
  restaurantId: ID;
}

export const ClientBooks: FC<IClientBooks> = (book) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${book.restaurantId}`)}
      className={
        'grid h-36 w-full cursor-pointer grid-cols-restaurantItem gap-x-2 rounded-[5px] border border-black'
      }
    >
      <img
        alt='Фото ресторана'
        className={'block h-full'}
        src={book.pictures.find((i) => !!i.url)?.url}
      />
      <div className={'h-full py-4'}>
        <h3 className={'text-lg font-bold'}>{book.title}</h3>
        <p className={'text-sm'}>{getKitchenName(book.kitchenType)}</p>
        <div className={'mt-2 flex gap-1 text-sm'}>
          <ClockIcon />
          <span>
            {book.startWorkTime} - {book.endWorkTime}
          </span>
        </div>
        <div className={'mt-1 flex gap-1 text-sm'}>
          <CalendarIcon />
          <span>
            {DateTime.fromMillis(+book.date)
              .toUTC()
              .toLocaleString(DateTime.DATE_SHORT)}
          </span>
        </div>
      </div>
    </div>
  );
};

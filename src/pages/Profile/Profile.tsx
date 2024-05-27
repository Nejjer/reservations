import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, IProfile } from '../../api/authApi.ts';
import { PATHS } from '../../utils/PATHS.ts';
import PersonIcon from '../../icons/person.svg?react';
import PhoneIcon from '../../icons/phone.svg?react';
import MailIcon from '../../icons/mail.svg?react';
import { bookApi } from '../../api/bookApi.ts';
import { restaurantApi } from '../../api/restaurantApi.ts';
import { ClientBooks, IClientBooks } from '../../components/ClientBooks';
import { DateTime } from 'luxon';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { observer } from 'mobx-react';
import { Role } from '../../stores/ProfileStore.ts';

interface Props {}

const Profile: FC<Props> = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IProfile>();
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<IClientBooks[]>([]);

  const {
    appStore: { profileStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    authApi
      .getProfile()
      .then((res) => setUser(res))
      .catch((e) => {
        console.error(e);
        navigate(`/${PATHS.auth}`);
      });
  }, []);

  useEffect(() => {
    profileStore.role === Role.Client && fetchBooks();
  }, [profileStore.role]);

  const fetchBooks = async () => {
    setLoading(true);
    const books = await bookApi.getBooks();
    const restaurants = await Promise.all(
      books.map((book) => restaurantApi.getRestaurant(book.restaurantId)),
    );
    setReservations(
      books.map((book, i) => ({
        ...restaurants[i],
        date: book.date.toString(),
        startWorkTime: DateTime.fromMillis(book.date)
          .toUTC()
          .toLocaleString(DateTime.TIME_24_SIMPLE),
        endWorkTime: DateTime.fromMillis(book.date)
          .toUTC()
          .plus({ minute: restaurants[i].reservationThreshold })
          .toLocaleString(DateTime.TIME_24_SIMPLE),
        id: book.id,
        restaurantId: restaurants[i].id,
      })),
    );
    setLoading(false);
  };

  if (!user) return;
  return (
    <div>
      <div className={'mb-4 mt-8'}>
        <h2 className={'text-3xl font-bold'}>Личный кабинет</h2>
      </div>
      <div className={'grid grid-cols-[auto_1fr] gap-8'}>
        <div className={'grid grid-cols-profileInfo gap-4 [&>*]:self-center'}>
          <PersonIcon />
          <p>{user.name}</p>
          <MailIcon />
          <p>{user.email}</p>
        </div>
        <div className={'grid grid-cols-profileInfo gap-4 [&>*]:self-end'}>
          <PhoneIcon />
          <p>{user.phoneNumber}</p>
        </div>
      </div>
      {!loading && (
        <div className={'mt-4 flex flex-col gap-4'}>
          <div className={'text-2xl font-bold'}>Текущие бронирования</div>
          <div
            className={
              'grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3'
            }
          >
            {reservations.map(
              (reserv) =>
                +reserv.date > new Date().getTime() && (
                  <ClientBooks {...reserv} key={reserv.id} />
                ),
            )}
          </div>
        </div>
      )}
      {!loading && profileStore.role === Role.Client && (
        <div className={'mt-4 flex flex-col gap-4'}>
          <div className={'text-2xl font-bold'}>История бронирований</div>
          <div
            className={
              'grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3'
            }
          >
            {reservations.map(
              (reserv) =>
                +reserv.date < new Date().getTime() && (
                  <ClientBooks {...reserv} key={reserv.id} />
                ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const connected = observer(Profile);
export { connected as Profile };

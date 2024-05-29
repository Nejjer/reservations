import { FC, ReactNode, useContext, useEffect } from 'react';
import { EBookStatus, IBook } from '../../api/bookApi.ts';
import { Loading } from '../../components/Loading';
import { DateTime } from 'luxon';
import PersonIcon from '../../icons/person.svg?react';
import PlusIcon from '../../icons/plusSmall.svg?react';
import { Button } from '../../components/Button';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { ShowBookModalEmployee } from './ShowBookModalEmployee';
import { IRestaurant } from '../../api/restaurantApi.ts';
import { EmployeeBookModal } from './EmployeeBookModal/index.ts';

const isBusy = (book: IBook, rests: IRestaurant[]) => {
  const rest = rests.find((rest) => rest.id == book.restaurantId);
  if (!rest) return false;
  return (
    book.date < new Date().getTime() &&
    new Date().getTime() < book.date + rest.reservationThreshold * 60 * 1000
  );
};

const renderList = (title: string, list?: ReactNode[]) => {
  return (
    <div className={'rounded-[5px] bg-blue/60 p-[10px]'}>
      <div className={'mb-2 text-center text-xl font-bold'}>{title}</div>
      <div className={'grid grid-cols-1 gap-y-2'}>
        {list?.map((item) => item)}
      </div>
    </div>
  );
};

const renderTable = (
  number: number,
  name: string,
  time: number,
  personCount: number,
  onClick: () => void,
) => {
  return (
    <div
      className={
        'grid-cols-bookItem grid h-10 cursor-pointer items-center gap-x-1 overflow-hidden rounded-[5px]'
      }
      onClick={onClick}
    >
      <div className={'flex h-10 items-center justify-center bg-white'}>
        №{number}
      </div>
      <div className={'flex h-10 items-center justify-between bg-white px-2'}>
        <div>{name}</div>
        <div>
          {DateTime.fromMillis(time).toLocaleString(DateTime.TIME_24_SIMPLE)}
        </div>
      </div>
      <div className={'flex h-10 items-center justify-center  bg-white'}>
        <PersonIcon />
        {personCount}
      </div>
    </div>
  );
};

const EmployeeBookList: FC = () => {
  const {
    appStore: { employeeBookStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    employeeBookStore.getBooks();
  }, []);

  if (employeeBookStore.loading) {
    return <Loading className={'h-[560px] pt-5'} />;
  }

  return (
    <div className={'container mt-6'}>
      <div className={'flex items-center gap-6'}>
        <h1 className={'pb-4 text-4xl font-bold'}>Список бронирований</h1>
        <Button
          className={'h-8 w-8 !rounded-[50%] '}
          onClick={() => employeeBookStore.openNewBookModal()}
        >
          <PlusIcon />
        </Button>
      </div>

      <div className={'grid grid-cols-3 gap-x-4'}>
        {renderList(
          'Ожидают подтверждения',
          employeeBookStore.books
            ?.filter((book) => book.status === EBookStatus.Requested)
            .map((book) =>
              renderTable(
                book.tableId,
                book.clientName,
                book.date,
                book.reservedPlacesCount,
                () => employeeBookStore.showBook(book),
              ),
            ),
        )}
        {renderList(
          'Забронированы',
          employeeBookStore.books
            ?.filter(
              (book) =>
                book.status === EBookStatus.AcceptedByManager &&
                !isBusy(book, employeeBookStore.restaurants),
            )
            .map((book) =>
              renderTable(
                book.tableId,
                book.clientName,
                book.date,
                book.reservedPlacesCount,
                () => employeeBookStore.showBook(book),
              ),
            ),
        )}
        {renderList(
          'Заняты сейчас',
          employeeBookStore.books
            ?.filter(
              (book) =>
                book.status === EBookStatus.AcceptedByManager &&
                isBusy(book, employeeBookStore.restaurants),
            )
            .map((book) =>
              renderTable(
                book.tableId,
                book.clientName,
                book.date,
                book.reservedPlacesCount,
                () => employeeBookStore.showBook(book),
              ),
            ),
        )}
        <ShowBookModalEmployee />
        <EmployeeBookModal />
      </div>
    </div>
  );
};

const connected = observer(EmployeeBookList);
export { connected as EmployeeBookList };

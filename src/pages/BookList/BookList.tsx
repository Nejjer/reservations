import { FC, useContext, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { DateTime } from 'luxon';
import { mapEbookStatus } from '../../api/bookApi.ts';
import { ShowBookModal } from '../../components/ShowBookModal';

const BookList: FC = () => {
  const {
    appStore: { adminBookStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    adminBookStore.getBooks();
  }, []);

  return (
    <div className={'container mt-6'}>
      <div className={'flex justify-between'}>
        <h1 className={'pb-4 text-3xl font-bold'}>Актуальные брони</h1>
        <div className={'flex grow justify-end gap-8'}>
          <Button className={'h-8 basis-[240px] bg-green'}>
            Создать бронь
          </Button>
          <Button className={'h-8 basis-[240px] bg-red'}>
            Удалить выделенные
          </Button>
        </div>
      </div>

      <table className={'table'}>
        <thead>
          <tr>
            <th>
              <div className={'flex justify-between'}>
                Все
                <Checkbox
                  value={!adminBookStore.books.some((book) => !book.selected)}
                  onChange={(state) => adminBookStore.selectAllBooks(state)}
                />
              </div>
            </th>
            <th>
              <div>ID брони</div>
            </th>
            <th>
              <div>Название заведения</div>
            </th>
            <th>
              <div>ФИО пользователя</div>
            </th>
            <th>
              <div>Дата и время брони</div>
            </th>
            <th>
              <div>Кол-во персон</div>
            </th>
            <th>
              <div>№ стола</div>
            </th>
            <th>
              <div>Статус брони</div>
            </th>
            <th>
              <div>Изменить</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {adminBookStore.books?.map((book) => (
            <tr key={book.id} onClick={() => adminBookStore.showBook(book)}>
              <td>
                <div className={'flex justify-end'}>
                  <Checkbox
                    value={book.selected}
                    onChange={(state) =>
                      adminBookStore.selectBook(book.id, state)
                    }
                  />
                </div>
              </td>
              <td>{book.id}</td>
              <td>{book.restaurantName}</td>
              <td>{book.name}</td>
              <td>{DateTime.fromMillis(book.date).toUTC().toLocaleString()}</td>
              <td>{book.countOfPerson}</td>
              <td>{book.numberTable}</td>
              <td>{mapEbookStatus(book.status)}</td>
              <td>
                <div className={'flex justify-center'}>
                  <Button>Изменить</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShowBookModal />
    </div>
  );
};

const connected = observer(BookList);
export { connected as BookList };

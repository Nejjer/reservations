import { FC, useContext, useEffect, useState } from 'react';
import { Dialog } from '../Dialog';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import ClockIcon from '../../icons/clock.svg?react';
import CalendarIcon from '../../icons/calendar.svg?react';
import PersonIcon from '../../icons/person.svg?react';
import { DateTime } from 'luxon';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import { bookApi, EBookStatus } from '../../api/bookApi.ts';

const ChangeBookModal: FC = () => {
  const [comment, setComment] = useState('');

  const {
    appStore: { adminBookStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    adminBookStore.showingBook &&
      setComment(adminBookStore.showingBook?.comment);
  }, [adminBookStore.showingBook]);

  return (
    <Dialog
      disabled={false}
      open={adminBookStore.isOpenChangeBookModal}
      title={
        <span className={'flex gap-4'}>
          {adminBookStore.showingBook?.clientName}{' '}
        </span>
      }
      onOpenChange={(open) => {
        console.log(open);
      }}
      onCloseClick={() => adminBookStore.closeChangeBookModal()}
      onCancel={() => adminBookStore.closeChangeBookModal()}
      trigger={null}
      onConfirm={async () => {
        if (!adminBookStore.showingBook) return;
        await bookApi.changeBook(adminBookStore.showingBook.id, {
          ...adminBookStore.showingBook,
          comment,
        });

        await adminBookStore.getBooks();
        adminBookStore.closeChangeBookModal();
      }}
      className={'w-[90vw] md:max-w-[480px]'}
      buttonsClassName={
        'flex !justify-center gap-[14px] [&>*]:basis-[200px] [&>*]:last:bg-red'
      }
      declineBtnText={'Отмена'}
      confirmBtnText={'Сохранить'}
      hideButtons={
        adminBookStore.showingBook?.status === EBookStatus.DeclinedByClient ||
        adminBookStore.showingBook?.status === EBookStatus.AcceptedByManager
      }
    >
      {adminBookStore.showingBook && (
        <div>
          <div className={'flex flex-col gap-2 '}>
            <div>{adminBookStore.showingBook.clientEmail}</div>
            <div>{adminBookStore.showingBook.clientPhone}</div>
          </div>
          <div className={'mt-6 grid grid-cols-2'}>
            <div className={'grid grid-cols-restaurantInfo gap-4'}>
              <ClockIcon />
              <div>
                {DateTime.fromMillis(adminBookStore.showingBook.date)
                  .toUTC()
                  .toLocaleString(DateTime.DATE_SHORT)}
              </div>
              <CalendarIcon />
              <div>
                {DateTime.fromMillis(adminBookStore.showingBook.date)
                  .toUTC()
                  .toLocaleString(DateTime.TIME_24_SIMPLE)}
              </div>
            </div>
            <div className={'grid grid-cols-restaurantInfo gap-4'}>
              <PersonIcon />
              <div>{adminBookStore.showingBook.reservedPlacesCount}</div>
              <TableRestaurantOutlinedIcon />
              <div>{adminBookStore.showingBook.tableName}</div>
            </div>
          </div>
          <div className={'mt-6 flex flex-col gap-1'}>
            <div className={'font-bold'}>Комментарий</div>
            <textarea
              rows={3}
              cols={65}
              placeholder={'Комментарий, пожелание к брони'}
              className={
                'resize-none rounded-[5px] border border-black px-2 py-1.5'
              }
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

const connected = observer(ChangeBookModal);
export { connected as ChangeBookModal };

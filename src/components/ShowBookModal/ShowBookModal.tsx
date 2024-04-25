import { FC, useContext } from 'react';
import { Dialog } from '../Dialog';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import ClockIcon from '../../icons/clock.svg?react';
import CalendarIcon from '../../icons/calendar.svg?react';
import PersonIcon from '../../icons/person.svg?react';
import InfoIcon from '../../icons/info20.svg?react';
import { DateTime } from 'luxon';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import { EBookStatus } from '../../api/bookApi.ts';

const ShowBookModal: FC = () => {
  const {
    appStore: { adminBookStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <Dialog
      disabled={false}
      open={adminBookStore.isOpenShowBookModal}
      title={
        <span className={'flex gap-4'}>
          {adminBookStore.showingBook?.clientName}{' '}
          {adminBookStore.showingBook?.status === EBookStatus.Requested && (
            <div className={'flex items-center text-[12px] font-normal'}>
              <InfoIcon className={'mr-2'} />
              Ожидает подтверждения
            </div>
          )}
        </span>
      }
      onOpenChange={(open) => {
        !open && adminBookStore.hideBook();
      }}
      onCancel={() => console.log()}
      trigger={null}
      onConfirm={async () => console.log()}
      className={'w-[90vw] md:max-w-[480px]'}
      buttonsClassName={
        'flex !justify-center gap-[14px] [&>*]:basis-[200px] [&>*]:last:bg-red'
      }
      declineBtnText={'Отклонить'}
      confirmBtnText={'Подтвердить'}
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
              <div>{adminBookStore.showingBook.numberTable}</div>
            </div>
          </div>
          <div className={'mt-6 flex flex-col gap-1'}>
            <div className={'font-bold'}>Комментарий</div>
            <div className={'text-[14px]'}>
              {adminBookStore.showingBook.comment}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

const connected = observer(ShowBookModal);
export { connected as ShowBookModal };

import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import ClockIcon from '../../../icons/clock.svg?react';
import CalendarIcon from '../../../icons/calendar.svg?react';
import PersonIcon from '../../../icons/person.svg?react';
import InfoIcon from '../../../icons/info20.svg?react';
import { DateTime } from 'luxon';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import { AppStoreContext, StoreCtx } from '../../../stores/WithStore.tsx';
import { Dialog } from '../../../components/Dialog';
import { EBookStatus } from '../../../api/bookApi.ts';

const ShowBookModalEmployee: FC = () => {
  const {
    appStore: { employeeBookStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <Dialog
      disabled={false}
      open={employeeBookStore.isOpenShowBookModal}
      title={
        <span className={'flex gap-4'}>
          {employeeBookStore.showingBook?.clientName}{' '}
          {employeeBookStore.showingBook?.status === EBookStatus.Requested && (
            <div className={'flex items-center text-[12px] font-normal'}>
              <InfoIcon className={'mr-2'} />
              Ожидает подтверждения
            </div>
          )}
        </span>
      }
      onOpenChange={(open) => {
        console.log(open);
      }}
      onCloseClick={() => employeeBookStore.hideBook()}
      onCancel={() => employeeBookStore.cancelShowingBook()}
      trigger={null}
      onConfirm={async () => await employeeBookStore.submitShowingBook()}
      className={'w-[90vw] md:max-w-[480px]'}
      buttonsClassName={
        'flex !justify-center gap-[14px] [&>*]:basis-[200px] [&>*]:last:bg-red'
      }
      declineBtnText={'Отклонить'}
      confirmBtnText={'Подтвердить'}
      hideButtons={
        employeeBookStore.showingBook?.status ===
          EBookStatus.DeclinedByClient ||
        employeeBookStore.showingBook?.status === EBookStatus.AcceptedByManager
      }
    >
      {employeeBookStore.showingBook && (
        <div>
          <div className={'flex flex-col gap-2 '}>
            <div>{employeeBookStore.showingBook.clientEmail}</div>
            <div>{employeeBookStore.showingBook.clientPhone}</div>
          </div>
          <div className={'mt-6 grid grid-cols-2'}>
            <div className={'grid grid-cols-restaurantInfo gap-4'}>
              <ClockIcon />
              <div>
                {DateTime.fromMillis(employeeBookStore.showingBook.date)
                  .toUTC()
                  .toLocaleString(DateTime.DATE_SHORT)}
              </div>
              <CalendarIcon />
              <div>
                {DateTime.fromMillis(employeeBookStore.showingBook.date)
                  .toUTC()
                  .toLocaleString(DateTime.TIME_24_SIMPLE)}
              </div>
            </div>
            <div className={'grid grid-cols-restaurantInfo gap-4'}>
              <PersonIcon />
              <div>{employeeBookStore.showingBook.reservedPlacesCount}</div>
              <TableRestaurantOutlinedIcon />
              <div>{employeeBookStore.showingBook.tableName}</div>
            </div>
          </div>
          <div className={'mt-6 flex flex-col gap-1'}>
            <div className={'font-bold'}>Комментарий</div>
            <div className={'text-[14px]'}>
              {employeeBookStore.showingBook.comment}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

const connected = observer(ShowBookModalEmployee);
export { connected as ShowBookModalEmployee };

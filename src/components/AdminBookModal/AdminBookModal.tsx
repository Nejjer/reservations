import { FC, useContext, useEffect, useState } from 'react';
import { Dialog } from '../Dialog';
import { Input } from '../Input';
import { PickAvailableTime } from '../PickAvailableTime';
import ClockIcon from '../../icons/clock.svg?react';
import { ITimeSlot, reservationApi } from '../../api/reservationApi.ts';
import { DateTime } from 'luxon';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { observer } from 'mobx-react';
import { Select } from '../Select';

const AdminBookModal: FC = () => {
  const [openPickTime, setOpenPickTime] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(0);
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [personsCount, setPersonsCount] = useState('');
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [tableId, setTableId] = useState(0);
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);
  const [restaurantId, setRestaurantId] = useState(0);

  const {
    appStore: { toastStore, adminBookStore },
  } = useContext<AppStoreContext>(StoreCtx);

  const fetchTimeSlots = async () => {
    if (!adminBookStore.isOpenNewBookModal) return;
    try {
      setTimeSlots(
        await reservationApi.getTimeSlots(
          restaurantId,
          new Date(date).getTime(),
        ),
      );
    } catch (e) {
      console.error(e);
      toastStore.showSnackBar('Не удалось получить свободные столики');
    }
  };

  useEffect(() => {
    date && fetchTimeSlots();
  }, [date, adminBookStore.restaurants]);

  useEffect(() => {
    setTimeSlots(
      timeSlots?.filter((slot) => slot.availablePlaces >= +personsCount),
    );
  }, [date, personsCount]);

  useEffect(() => {
    setIsValid(!!secondname && !!phone && !!+personsCount && !!time);
  }, [secondname, phone, personsCount, time]);

  useEffect(() => {
    adminBookStore.getRestaurants();
  }, [adminBookStore.isOpenNewBookModal]);

  const handleReserve = async () => {
    try {
      await adminBookStore.createBook({
        date: time,
        comment,
        restaurantId,
        clientEmail: email,
        clientName: firstname,
        clientPhone: phone,
        tableId,
        personsCount: +personsCount,
      });
    } catch (e) {
      console.error(e);
      toastStore.showSnackBar('Не удалось зарезервировать столик');
    } finally {
      setTime(0);
      setSecondName('');
      setFirstname('');
      setPersonsCount('');
      setComment('');
      setEmail('');
      setPhone('');
      setDate('');
    }
  };

  return (
    <Dialog
      disabled={!isValid}
      open={adminBookStore.isOpenNewBookModal}
      title={'Забронировать столик'}
      onOpenChange={() => console.log()}
      onCancel={() => adminBookStore.closeNewBookModal()}
      onCloseClick={() => adminBookStore.closeNewBookModal()}
      trigger={null}
      onConfirm={handleReserve}
      className={'w-[90vw] md:max-w-[560px]'}
      buttonsClassName={'flex !justify-start gap-[14px] [&>*]:basis-1/3'}
    >
      <div className={'flex flex-col gap-4'}>
        {adminBookStore.restaurants && (
          <Select
            className={'h-8 w-full py-1'}
            onValueChange={(value) => setRestaurantId(+value)}
            values={adminBookStore.restaurants.map((rest) => ({
              value: rest.id.toString(),
              title: rest.title,
            }))}
          />
        )}
        <Input
          placeholder={'Имя'}
          onChange={({ target }) => setFirstname(target.value)}
        />
        <Input
          placeholder={'Фамилия*'}
          onChange={({ target }) => setSecondName(target.value)}
        />
        <Input
          placeholder={'+7 (___) ___-__-__*'}
          mask={'+7 (999) 999-99-99'}
          onChange={({ target }) => setPhone(target.value)}
        />
        <Input
          placeholder={'E-mail'}
          onChange={({ target }) => setEmail(target.value)}
        />
        <div className={'flex gap-4'}>
          <Input
            type={'date'}
            className={'basis-1/3'}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            placeholder={'Кол-во персон*'}
            mask={'99'}
            maskChar={''}
            className={'person-input basis-1/3'}
            onChange={({ target }) => setPersonsCount(target.value)}
          />
          <PickAvailableTime
            timeSlots={timeSlots}
            open={openPickTime}
            onOpenChange={setOpenPickTime}
            trigger={
              <button
                className={`flex basis-1/3 items-center gap-2 rounded-[5px] border border-black pl-1 ${!time && 'text-black/50'}`}
                disabled={!timeSlots || !personsCount}
                title={'Сначала выберите дату'}
              >
                <ClockIcon className={'h-5'} />{' '}
                {!time
                  ? 'Время *'
                  : DateTime.fromMillis(time)
                      .toUTC()
                      .toLocaleString(DateTime.TIME_24_SIMPLE)}
              </button>
            }
            onTimePick={(time) => {
              setTime(time.dateTime);
              setTableId(time.tableId);
              setOpenPickTime(false);
            }}
          />
        </div>
        <textarea
          rows={3}
          cols={65}
          placeholder={'Комментарий, пожелание к брони'}
          className={
            'resize-none rounded-[5px] border border-black px-2 py-1.5'
          }
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <div className={'text-[12px]'}>
        <span className={'text-red'}>*</span> Поля, обязательные для заполнения
      </div>
    </Dialog>
  );
};

const connected = observer(AdminBookModal);
export { connected as AdminBookModal };

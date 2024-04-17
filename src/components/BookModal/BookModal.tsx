import { FC, ReactNode, useEffect, useState } from 'react';
import { Dialog } from '../Dialog';
import { Input } from '../Input';
import { PickAvailableTime } from '../PickAvailableTime';
import ClockIcon from '../../icons/clock.svg?react';
import { useFetch } from '../../hooks/useFetch.ts';
import { ITimeSlot, reservationApi } from '../../api/reservationApi.ts';
import { ID } from '../../api/axiosInstance.ts';
import { DateTime } from 'luxon';

interface Props {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  trigger: ReactNode;
  restaurantId: ID;
}

export const BookModal: FC<Props> = ({
  onOpenChange,
  open,
  trigger,
  restaurantId,
}) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, timeSlots, fetchTimeSlots] = useFetch<ITimeSlot[]>(
    async () =>
      await reservationApi.getTimeSlots(restaurantId, new Date(date).getTime()),
  );

  useEffect(() => {
    date && fetchTimeSlots();
  }, [date]);

  useEffect(() => {
    setIsValid(!!secondname && !!phone && !!+personsCount && !!time);
  }, [secondname, phone, personsCount, time]);

  const handleReserve = async () => {
    await reservationApi.reserve({
      date: time,
      comment,
      restaurantId,
      clientEmail: email,
      clientName: firstname,
      clientPhone: phone,
      tableId: 3,
      personsCount: +personsCount,
    });
  };

  return (
    <Dialog
      disabled={!isValid}
      open={open}
      title={'Забронировать столик'}
      onOpenChange={onOpenChange}
      onCancel={() => onOpenChange(false)}
      trigger={trigger}
      onConfirm={handleReserve}
      className={'w-[90vw] md:max-w-[560px]'}
      buttonsClassName={'flex !justify-start gap-[14px] [&>*]:basis-1/3'}
    >
      <div className={'flex flex-col gap-4'}>
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
          <PickAvailableTime
            times={timeSlots?.map((timeSlot) => timeSlot.dateTime)}
            open={openPickTime}
            onOpenChange={setOpenPickTime}
            trigger={
              <button
                className={`flex basis-1/3 items-center gap-2 rounded-[5px] border border-black pl-1 ${!time && 'text-black/50'}`}
                disabled={!timeSlots}
                title={'Сначала выберите дату'}
              >
                <ClockIcon className={'h-5'} />{' '}
                {!time
                  ? 'Время *'
                  : DateTime.fromMillis(time).toLocaleString(
                      DateTime.TIME_24_SIMPLE,
                    )}
              </button>
            }
            onTimePick={(time) => {
              setTime(time);
              setOpenPickTime(false);
            }}
          />
          <Input
            placeholder={'Кол-во персон*'}
            mask={'99'}
            maskChar={''}
            className={'person-input basis-1/3'}
            onChange={({ target }) => setPersonsCount(target.value)}
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
    </Dialog>
  );
};

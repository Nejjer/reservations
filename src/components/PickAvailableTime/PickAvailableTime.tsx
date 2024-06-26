import { FC, ReactNode } from 'react';
import { Dialog } from '../Dialog';
import { DateTime } from 'luxon';
import { ITimeSlot } from '../../api/reservationApi.ts';

interface Props {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  trigger: ReactNode;
  timeSlots: ITimeSlot[] | null;
  onTimePick: (date: ITimeSlot) => void;
}

export const PickAvailableTime: FC<Props> = ({
  open,
  onOpenChange,
  trigger,
  onTimePick,
  timeSlots,
}) => {
  const renderTime = (time: ITimeSlot) => (
    <li
      className={
        'flex w-12 cursor-pointer items-center justify-center rounded-[5px] bg-gray px-2 py-1'
      }
      key={time.dateTime}
      onClick={() => onTimePick(time)}
    >
      {DateTime.fromMillis(time.dateTime)
        .toUTC()
        .toLocaleString(DateTime.TIME_24_SIMPLE)}
    </li>
  );

  const timesSet = [
    ...new Map(timeSlots?.map((item) => [item.dateTime, item])).values(),
  ];

  const morning = timesSet?.filter(
    (time) =>
      DateTime.fromMillis(time.dateTime).toUTC().hour >= 5 &&
      DateTime.fromMillis(time.dateTime).toUTC().hour <= 12,
  );
  const day = timesSet?.filter(
    (time) =>
      DateTime.fromMillis(time.dateTime).toUTC().hour >= 13 &&
      DateTime.fromMillis(time.dateTime).toUTC().hour <= 17,
  );
  const evening = timesSet?.filter(
    (time) =>
      (DateTime.fromMillis(time.dateTime).toUTC().hour >= 18 &&
        DateTime.fromMillis(time.dateTime).toUTC().hour <= 23) ||
      (DateTime.fromMillis(time.dateTime).toUTC().hour >= 0 &&
        DateTime.fromMillis(time.dateTime).toUTC().hour <= 4),
  );

  return (
    <Dialog
      open={open}
      title={'Забронировать столик'}
      onOpenChange={onOpenChange}
      onCancel={() => onOpenChange(false)}
      trigger={trigger}
      onConfirm={async () => console.log('')}
      className={'w-[90vw] md:max-w-[560px]'}
      buttonsClassName={'flex !justify-start gap-[14px] [&>*]:basis-1/3'}
      hideButtons
    >
      <div className={'flex flex-col gap-4'}>
        {!!morning?.length && (
          <div>
            <div className={'mb-1'}>Утро</div>
            <ul className={'flex flex-wrap gap-3'}>
              {morning?.map(renderTime)}
            </ul>
          </div>
        )}
        {!!day?.length && (
          <div>
            <div className={'mb-1'}>День</div>
            <ul className={'flex flex-wrap gap-3'}>{day?.map(renderTime)}</ul>
          </div>
        )}
        {!!evening?.length && (
          <div>
            <div className={'mb-1'}>Вечер</div>
            <ul className={'flex flex-wrap gap-3'}>
              {evening?.map(renderTime)}
            </ul>
          </div>
        )}
      </div>
    </Dialog>
  );
};

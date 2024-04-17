import { FC, ReactNode } from 'react';
import { Dialog } from '../Dialog';

interface Props {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  trigger: ReactNode;
}

const times = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

export const PickAvailableTime: FC<Props> = ({
  open,
  onOpenChange,
  trigger,
}) => {
  const renderTime = (time: string) => (
    <li
      className={
        'bg-gray flex w-12 cursor-pointer items-center justify-center rounded-[5px] px-2 py-1'
      }
      key={time}
    >
      {time}
    </li>
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
        <div>
          <p className={'mb-1'}>Утро</p>
          <ul className={'flex flex-wrap gap-3'}>{times.map(renderTime)}</ul>
        </div>
        <div>
          <p className={'mb-1'}>День</p>
          <ul className={'flex flex-wrap gap-3'}>{times.map(renderTime)}</ul>
        </div>
        <div>
          <p className={'mb-1'}>Вечер</p>
          <ul className={'flex flex-wrap gap-3'}>{times.map(renderTime)}</ul>
        </div>
      </div>
    </Dialog>
  );
};

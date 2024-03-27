import { FC } from 'react';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { ImageList } from '../../components/ImageList';
import { Menu } from '../../components/Menu';
import CalendarIcon from '../../icons/calendar.svg?react';
import WalletIcon from '../../icons/wallet20.svg?react';
import InfoIcon from '../../icons/info20.svg?react';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';

interface Props {}

export const CreateEditRestaurant: FC<Props> = () => {
  return (
    <div
      className={
        'container mt-8 flex flex-col gap-y-16 px-12 xl:flex-row xl:gap-x-16'
      }
    >
      <div>
        <div className={'flex items-center gap-4'}>
          <Input className={'h-11'} placeholder={'Название'} />
          <Select onValueChange={() => console.log()} />
        </div>
        <div className={'mt-8 flex gap-16'}>
          <div className={'grid grid-cols-restaurantInfo gap-x-5 gap-y-4'}>
            <WalletIcon className={'mt-0.5'} />
            <p>
              Средний чек - <Input type={'number'} className={'w-16'} /> ₽
            </p>
            <CalendarIcon className={'mt-0.5'} />
            <p className={'grid grid-cols-2 gap-y-2'}>
              Открытие&nbsp;
              <Input type={'time'} />
              Закрытие&nbsp;
              <Input type={'time'} />
            </p>
          </div>
          <div className={'grid grid-cols-restaurantInfo gap-x-5 gap-y-4'}>
            <InfoIcon className={'mt-1'} />
            <p className={'grid grid-cols-1'}>
              <Input placeholder={'Адрес'} />
              <Input placeholder={'Телефон'} />
              <Input placeholder={'Почта'} />
            </p>
          </div>
        </div>
        <textarea
          rows={6}
          cols={65}
          className={'mt-8 w-max rounded-[5px] border border-black px-2 py-1.5'}
        />
        <Button className={'mt-8 w-72'}>Изменить</Button>
      </div>

      <div className={'basis-1/2'}>
        <Tabs tab1={<ImageList />} tab2={<Menu />} />
      </div>
    </div>
  );
};

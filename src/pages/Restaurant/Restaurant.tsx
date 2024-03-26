import { FC } from 'react';
import CalendarIcon from '../../icons/calendar.svg?react';
import WalletIcon from '../../icons/wallet20.svg?react';
import InfoIcon from '../../icons/info20.svg?react';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { ImageList } from '../../components/ImageList';
import { Menu } from '../../components/Menu';

interface Props {}

export const Restaurant: FC<Props> = () => {
  return (
    <div
      className={
        'container mt-8 flex flex-col gap-y-16 px-12 xl:flex-row xl:gap-x-16'
      }
    >
      <div>
        <div className={'flex items-center gap-4'}>
          <h1 className={'pb-4 text-5xl font-bold'}>Неизвестный</h1>
          <ul className={'flex gap-3'}>
            <li className={'py bg-green px-2'}>Европейская кухня</li>
            <li className={'py bg-green px-2'}>Авторская кухня</li>
            <li className={'py bg-green px-2'}>Винный ресторан</li>
          </ul>
        </div>
        <div className={'mt-8 flex gap-16'}>
          <div className={'grid-cols-restaurantInfo grid gap-x-5 gap-y-4'}>
            <WalletIcon className={'mt-0.5'} />
            <p>Средний чек - 2000 ₽</p>
            <CalendarIcon className={'mt-0.5'} />
            <p>
              ПН - ЧТ 12:00 - 23:00 <br /> ПТ - ВС 10:00 - 00:00
            </p>
          </div>
          <div className={'grid-cols-restaurantInfo grid gap-x-5 gap-y-4'}>
            <InfoIcon className={'mt-1'} />
            <p>
              Екатеринбург, ул. Чернышевского, 8 <br />
              Телефон: +7 (982) 694 88 08 <br />
              neizvestny_bistro@mail.ru
            </p>
          </div>
        </div>
        <article className={'mt-8'}>
          Неизвестный - бистро с авторской кухней в доме, где проживала семья
          скульптора Эрнста Неизвестного. Большое внимание уделяется музыке. В
          заведении слушают винил, а по пятницам и субботам играют диджеи и
          селекторы - коллекционеры. <br />
          На летней веранде создано уникальное городское пространство -
          фонотека, для наслаждения музыкальными композициями. В интерьере
          сохранена старинная отделка деревом, в зимнее время зажигают дровяной
          камин, а сменные экспозиции знакомят гостей заведения с работами
          современных художников.
        </article>
        <Button className={'mt-8 w-72'}>Изменить</Button>
      </div>

      <Tabs tab1={<ImageList />} tab2={<Menu />} />
    </div>
  );
};

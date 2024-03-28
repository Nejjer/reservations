import { FC, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { ImageList } from '../../components/ImageList';
import CalendarIcon from '../../icons/calendar.svg?react';
import WalletIcon from '../../icons/wallet20.svg?react';
import InfoIcon from '../../icons/info20.svg?react';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { EditMenu } from '../../components/EditMenu';
import {
  EKitchenType,
  IMenuPosition,
  restaurantApi,
} from '../../api/restaurantApi.ts';
import { useFetch } from '../../hooks/useFetch.ts';
import { useNavigate, useParams } from 'react-router-dom';

export enum EMode {
  Create,
  Edit,
}

interface Props {
  mode: EMode;
}

export const CreateEditRestaurant: FC<Props> = ({ mode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cost, setCost] = useState<number>();
  const [menu, setMenu] = useState<IMenuPosition[]>([]);
  const [kitchen, setKitchen] = useState<EKitchenType>(EKitchenType.Asian);

  const navigate = useNavigate();
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, _, postRestaurant] = useFetch(async () => {
    if (cost && kitchen) {
      const rest = {
        cost: cost,
        startWorkTime: start,
        endWorkTime: end,
        title: title,
        kitchenType: +kitchen as never,
        menu: menu,
        description: description,
        contact: {
          email: email,
          phone: phone,
          address: address,
        },
        reservationThreshold: 0,
      };

      mode == EMode.Edit
        ? await restaurantApi.updateRestaurant(+id!, rest)
        : await restaurantApi.createRestaurant(rest);
    }
    navigate('/');
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [___, restaurant, fetchRestaurant] = useFetch(() =>
    restaurantApi.getRestaurant(+id!),
  );

  useEffect(() => {
    mode == EMode.Edit && fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurant) {
      console.log(restaurant.endWorkTime);

      setMenu(restaurant.menu);
      setCost(restaurant.cost);
      setEnd(restaurant.endWorkTime);
      setStart(restaurant.startWorkTime);
      setAddress(restaurant.contact.address);
      setEmail(restaurant.contact.email);
      setPhone(restaurant.contact.phone);
      setTitle(restaurant.title);
      setDescription(restaurant.description);
      setKitchen(restaurant.kitchenType);
    }
  }, [restaurant]);

  return (
    <div
      className={
        'container mt-8 flex flex-col gap-y-16 px-12 xl:flex-row xl:gap-x-16'
      }
    >
      <div>
        <div className={'flex items-center gap-4'}>
          <Input
            className={'!h-11'}
            placeholder={'Название'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            onValueChange={(value) => setKitchen(value as EKitchenType)}
            value={kitchen}
          />
        </div>
        <div className={'mt-8 flex gap-16'}>
          <div
            className={
              'grid min-w-[200px] grid-cols-restaurantInfo gap-x-5 gap-y-4'
            }
          >
            <WalletIcon className={'mt-0.5'} />
            <p>
              Средний чек -{' '}
              <Input
                type={'number'}
                className={'w-16'}
                value={cost}
                onChange={(e) => setCost(+e.target.value)}
              />
              &nbsp; ₽
            </p>
            <CalendarIcon className={'mt-0.5'} />
            <p className={'grid grid-cols-2 gap-y-2'}>
              Открытие&nbsp;
              <Input
                type={'time'}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
              Закрытие&nbsp;
              <Input
                type={'time'}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </p>
          </div>
          <div className={'grid grid-cols-restaurantInfo gap-x-5 gap-y-4'}>
            <InfoIcon className={'mt-1'} />
            <p className={'grid grid-cols-1'}>
              <Input
                placeholder={'Адрес'}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                placeholder={'Телефон'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder={'Почта'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
          </div>
        </div>
        <textarea
          rows={6}
          cols={65}
          className={'mt-8 w-max rounded-[5px] border border-black px-2 py-1.5'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button className={'mt-8 w-72'} onClick={postRestaurant}>
          {mode == EMode.Create ? 'Создать' : 'Изменить'}
        </Button>
      </div>

      <div className={'basis-1/2'}>
        <Tabs
          tab1={<ImageList />}
          tab2={<EditMenu onChange={(menu) => setMenu(menu)} menu={menu} />}
        />
      </div>
    </div>
  );
};

import { FC, useContext, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { ImageList } from '../../components/ImageList';
import CalendarIcon from '../../icons/calendar.svg?react';
import WalletIcon from '../../icons/wallet20.svg?react';
import InfoIcon from '../../icons/info20.svg?react';
import ClockIcon from '../../icons/clock.svg?react';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { EditMenu } from '../../components/EditMenu';
import { EKitchenType, ICreateRestaurantDto } from '../../api/restaurantApi.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { Tables } from '../../components/Tables';
import { Employees } from '../../components/Employees';

export enum EMode {
  Create,
  Edit,
}

interface Props {
  mode: EMode;
}

const CreateEditRestaurant: FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    appStore: { restaurantStore },
  } = useContext<AppStoreContext>(StoreCtx);

  useEffect(() => {
    mode === EMode.Edit && id && restaurantStore.getRestaurant(+id);
    return () => restaurantStore.clearRestaurant();
  }, []);

  const handleSaveRestaurant = async () => {
    await restaurantStore.saveRestaurant(mode, id);
    navigate('/admin/restaurants');
  };

  const handleUpdateField = (
    field: keyof ICreateRestaurantDto,
    value: ICreateRestaurantDto[keyof ICreateRestaurantDto],
  ) => {
    const rest = { ...restaurantStore.restaurant };
    if (typeof value === 'number') {
      value = +value;
    }
    rest[field] = value as never;
    restaurantStore.updateRestaurant(rest);
  };

  const { restaurant } = restaurantStore;

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
            value={restaurant.title}
            onChange={(e) => handleUpdateField('title', e.target.value)}
          />
          <Select
            onValueChange={(value) => handleUpdateField('kitchenType', value)}
            value={restaurant.kitchenType.toString()}
            defaultValue={restaurant.kitchenType.toString()}
            values={[
              {
                value: EKitchenType.Asian.toString(),
                title: 'Азиатская кухня',
              },
              {
                value: EKitchenType.Russian.toString(),
                title: 'Русская кухня',
              },
              {
                value: EKitchenType.Indian.toString(),
                title: 'Индийская кухня',
              },
            ]}
          />
        </div>
        <div className={'mt-8 flex gap-16'}>
          <div
            className={
              'grid min-w-[200px] grid-cols-restaurantInfo gap-x-5 gap-y-4'
            }
          >
            <WalletIcon className={'mt-0.5'} />
            <p className={'whitespace-nowrap'}>
              Средний чек -{' '}
              <Input
                mask={'999999'}
                maskChar={''}
                className={'w-16'}
                value={restaurant.cost}
                onChange={(e) => handleUpdateField('cost', e.target.value)}
              />
              &nbsp;₽
            </p>
            <CalendarIcon className={'mt-0.5'} />
            <p className={'grid grid-cols-2 gap-y-2'}>
              Открытие&nbsp;
              <Input
                type={'time'}
                value={restaurant.startWorkTime}
                onChange={(e) =>
                  handleUpdateField('startWorkTime', e.target.value)
                }
              />
              Закрытие&nbsp;
              <Input
                type={'time'}
                value={restaurant.endWorkTime}
                onChange={(e) =>
                  handleUpdateField('endWorkTime', e.target.value)
                }
              />
            </p>
            <ClockIcon className={'mt-0.5'} />
            <p className={'whitespace-nowrap'}>
              Резервировать стол на{' '}
              <Input
                mask={'9999'}
                maskChar={''}
                value={restaurant.reservationThreshold}
                onChange={(e) =>
                  handleUpdateField('reservationThreshold', e.target.value)
                }
              />
              &nbsp;минут
            </p>
          </div>
          <div className={'grid grid-cols-restaurantInfo gap-x-5 gap-y-4'}>
            <InfoIcon className={'mt-1'} />
            <p className={'grid grid-cols-1'}>
              <Input
                placeholder={'Адрес'}
                value={restaurant.contact.address}
                onChange={(e) =>
                  handleUpdateField('contact', {
                    ...restaurant.contact,
                    address: e.target.value,
                  })
                }
              />
              <Input
                placeholder={'Телефон'}
                mask={'+7 (999) 999-99-99'}
                value={restaurant.contact.phone}
                onChange={(e) =>
                  handleUpdateField('contact', {
                    ...restaurant.contact,
                    phone: e.target.value,
                  })
                }
              />
              <Input
                placeholder={'Почта'}
                value={restaurant.contact.email}
                onChange={(e) =>
                  handleUpdateField('contact', {
                    ...restaurant.contact,
                    email: e.target.value,
                  })
                }
              />
            </p>
          </div>
        </div>
        <textarea
          rows={6}
          cols={65}
          className={'mt-8 w-max rounded-[5px] border border-black px-2 py-1.5'}
          value={restaurant.description}
          onChange={(e) => handleUpdateField('description', e.target.value)}
        />
        <div className={'flex gap-6'}>
          <Button className={'mt-8 w-44'} onClick={handleSaveRestaurant}>
            {mode == EMode.Create ? 'Создать' : 'Сохранить'}
          </Button>
          <Button className={'mt-8 w-44 bg-blue'} onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </div>
      </div>

      <div className={'basis-1/2'}>
        <Tabs
          tab1={
            <ImageList
              canEdit
              onChange={(pictures) => handleUpdateField('pictures', pictures)}
              pictures={restaurant.pictures}
            />
          }
          tab2={
            <EditMenu
              onChange={(menu) => handleUpdateField('menu', menu)}
              menu={restaurant.menu}
            />
          }
          tab3={
            mode == EMode.Edit && id && <Tables restaurantId={+id} canEdit />
          }
          tab4={mode == EMode.Edit && <Employees canEdit />}
        />
      </div>
    </div>
  );
};

const connected = observer(CreateEditRestaurant);
export { connected as CreateEditRestaurant };

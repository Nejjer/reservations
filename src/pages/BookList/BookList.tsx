import { FC } from 'react';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Select } from '../../components/Select';

export const BookList: FC = () => {
  return (
    <div className={'container mt-6'}>
      <div className={'flex justify-between'}>
        <h1 className={'pb-4 text-3xl font-bold'}>Актуальные брони</h1>
        <div className={'flex grow justify-end gap-8'}>
          <Button className={'h-8 basis-[240px] bg-green'}>
            Создать бронь
          </Button>
          <Button className={'h-8 basis-[240px] bg-red'}>
            Удалить выделенные
          </Button>
        </div>
      </div>

      <table className={'table'}>
        <thead>
          <tr>
            <th>
              <div>Все</div>
            </th>
            <th>
              <div>ID брони</div>
            </th>
            <th>
              <div>Название заведения</div>
            </th>
            <th>
              <div>ФИО пользователя</div>
            </th>
            <th>
              <div>Дата и время брони</div>
            </th>
            <th>
              <div>Кол-во персон</div>
            </th>
            <th>
              <div>№ стола</div>
            </th>
            <th>
              <div>Статус брони</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox />
            </td>
            <td>123456</td>
            <td>неизвестный</td>
            <td>Рейчел Грин</td>
            <td>03.03.2024 14:00</td>
            <td>6</td>
            <td>5</td>
            <td className={'w-[220px] p-0'}>
              <Select
                onValueChange={(value) => console.log(value)}
                values={[
                  { value: 'Confirmed', title: 'Подтверждено' },
                  { value: 'Cancel', title: 'Отклонено' },
                  { value: 'Wait', title: 'Ожидает' },
                ]}
                defaultValue={'Wait'}
                placeholder={'Выберите '}
                className={'h-10 w-full rounded-[0] border-0'}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox />
            </td>
            <td>123456</td>
            <td>неизвестный</td>
            <td>Рейчел Грин</td>
            <td>03.03.2024 14:00</td>
            <td>6</td>
            <td>5</td>
            <td className={'w-[220px] p-0'}>
              <Select
                onValueChange={(value) => console.log(value)}
                values={[
                  { value: 'Confirmed', title: 'Подтверждено' },
                  { value: 'Cancel', title: 'Отклонено' },
                  { value: 'Wait', title: 'Ожидает' },
                ]}
                defaultValue={'Wait'}
                placeholder={'Выберите '}
                className={'h-10 w-full rounded-[0] border-0'}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

import { FC, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch.ts';
import { employeesApi, IEmployee } from '../../api/employeesApi.ts';
import { Loading } from '../Loading';
import { Dialog } from '../Dialog';
import { CreateButton } from '../CreateButton';
import { Input } from '../Input';
import CanIcon from '../../icons/can.svg?react';
import { ID } from '../../api/axiosInstance.ts';
import { Select } from '../Select';

interface Props {
  canEdit?: boolean;
  restaurantId: ID;
}

export const Employees: FC<Props> = ({ canEdit, restaurantId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [loading, employees, fetchEmployees] = useFetch(() =>
    employeesApi.getEmployees(restaurantId),
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmitEmployee = async () => {
    if (isEdit) {
      await employeesApi.changeEmployee({
        name,
        phoneNumber: phone,
        position,
        email,
        restaurantId,
        password,
      });
    } else {
      await employeesApi.submitEmployee({
        name,
        phoneNumber: phone,
        position,
        email,
        restaurantId,
        password,
      });
    }
    clearForm();
    fetchEmployees();
  };

  const clearForm = () => {
    setPhone('');
    setPosition('');
    setName('');
    setEmail('');
    setIsEdit(false);
    setPassword('');
  };

  const handleDeleteEmployee = async (id: ID) => {
    await employeesApi.deleteEmployee(id);
    fetchEmployees();
  };

  const handleClickChangeEmployee = async (employee: IEmployee) => {
    setName(employee.name);
    setEmail(employee.email);
    setPosition(employee.position.toString());
    setPhone(employee.phoneNumber);
    setIsEdit(true);
    setOpenModal(true);
  };

  if (loading) {
    return <Loading className={'h-[560px] pt-5'} />;
  }

  return (
    <div
      className={
        'relative flex max-h-[600px] min-h-[450px] flex-col justify-between overflow-auto'
      }
    >
      <ul>
        {employees?.map((empl, i) => (
          <li
            key={empl.id + i}
            className={
              'flex cursor-pointer justify-between border-b border-black px-3 py-4'
            }
            onClick={() => handleClickChangeEmployee(empl)}
          >
            <div>{empl.name}</div>
            <CanIcon
              className={'cursor-pointer'}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEmployee(empl.id);
              }}
            />
          </li>
        ))}
      </ul>
      {canEdit && (
        <Dialog
          trigger={
            <CreateButton
              className={'absolute bottom-4 right-4'}
              onClick={() => setOpenModal(true)}
            />
          }
          title={isEdit ? 'Добавить сотрудника' : 'Карточка сотрудника'}
          onConfirm={handleSubmitEmployee}
          onCancel={() => setOpenModal(false)}
          open={openModal}
          onOpenChange={setOpenModal}
          buttonsClassName={
            'flex !justify-center gap-[14px] [&>*]:basis-[200px]'
          }
          disabled={!name || !position || !phone || !email || !password}
        >
          <div className={'flex flex-col gap-4'}>
            <Input
              value={name}
              placeholder={'ФИО'}
              onChange={(e) => setName(e.target.value)}
            />
            <div className={'flex gap-4'}>
              <Input
                placeholder={'Телефон'}
                mask={'+7 (999) 999-99-99'}
                className={'basis-1/2'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Select
                onValueChange={(value) => setPosition(value)}
                values={[
                  { value: 'waiter', title: 'официант' },
                  { value: 'administrator', title: 'администратор' },
                ]}
                value={position}
                className={'h-8 py-0.5'}
              />
            </div>
            <Input
              value={email}
              placeholder={'E-mail'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              type={'password'}
              placeholder={'пароль'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
};

import { FC, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch.ts';
import { employeesApi, IEmployee } from '../../api/employeesApi.ts';
import { Loading } from '../Loading';
import { Dialog } from '../Dialog';
import { CreateButton } from '../CreateButton';
import { Input } from '../Input';
import CanIcon from '../../icons/can.svg?react';
import { ID } from '../../api/axiosInstance.ts';

interface Props {
  canEdit?: boolean;
}

export const Employees: FC<Props> = ({ canEdit }) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [loading, employees, fetchEmployees] = useFetch(
    employeesApi.getEmployees,
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmitEmployee = async () => {
    if (isEdit) {
      await employeesApi.changeEmployee({
        name,
        phone,
        birthday: +birthdate,
        email,
      });
    } else {
      await employeesApi.submitEmployee({
        name,
        phone,
        birthday: +birthdate,
        email,
      });
    }
    setPhone('');
    setBirthdate('');
    setName('');
    setEmail('');
    setIsEdit(false);
  };

  const handleDeleteEmployee = async (id: ID) => {
    await employeesApi.deleteEmployee(id);
    fetchEmployees();
  };

  const handleClickChangeEmployee = async (employee: IEmployee) => {
    setName(employee.name);
    setEmail(employee.email);
    setBirthdate(employee.birthday.toString());
    setPhone(employee.phone);
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
          disabled={!name || !birthdate || !phone || !email}
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
              <Input
                type={'date'}
                value={birthdate}
                className={'basis-1/2'}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
            <Input
              value={email}
              placeholder={'E-mail'}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
};

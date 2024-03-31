import { FC } from 'react';
import PersonIcon from '../../icons/person.svg?react';
import CanIcon from '../../icons/can.svg?react';
import { Dialog } from '../Dialog';
import { EditTables } from '../EditTables';
import { CreateButton } from '../CreateButton';

interface Props {}

export const Tables: FC<Props> = () => {
  return (
    <div className={'relative h-[560px]'}>
      <ul>
        <li className={'flex items-center border-b border-black px-4 py-2'}>
          <PersonIcon />
          <span className={'ml-1'}>4</span>

          <span className={'grow px-6'}>Название столика</span>
          <CanIcon />
        </li>
        <li className={'flex items-center border-b border-black px-4 py-2'}>
          <PersonIcon />
          <span className={'ml-1'}>4</span>

          <span className={'grow px-6'}>Название столика</span>
          <CanIcon />
        </li>
        <li className={'flex items-center border-b border-black px-4 py-2'}>
          <PersonIcon />
          <span className={'ml-1'}>4</span>

          <span className={'grow px-6'}>Название столика</span>
          <CanIcon />
        </li>
      </ul>

      <Dialog
        trigger={<CreateButton className={'absolute bottom-4 right-4'} />}
        title={'Создать'}
        onConfirm={async () => {}}
        onCancel={() => {}}
      >
        <EditTables />
      </Dialog>
    </div>
  );
};

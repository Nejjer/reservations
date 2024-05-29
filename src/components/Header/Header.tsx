import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '../../icons/person.svg?react';
import Restaurant from '../../icons/restaurant.svg?react';
import ClockIcon from '../../icons/clock.svg?react';
import { PATHS } from '../../utils/PATHS.ts';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';
import { Role } from '../../stores/ProfileStore.ts';

interface Props {}

const Header: FC<Props> = () => {
  const {
    appStore: { profileStore },
  } = useContext<AppStoreContext>(StoreCtx);

  console.log(profileStore.role);

  const navigate = useNavigate();
  return (
    <div
      className={'flex h-16 w-full bg-sky-300 px-12'}
      onClick={() => navigate('/')}
    >
      <div className={'ml-auto flex gap-9'}>
        {profileStore.role === Role.Admin && (
          <div
            className={
              'flex cursor-pointer flex-col items-center justify-center gap-1 text-[12px]'
            }
            onClick={(e) => {
              navigate(`/admin/${PATHS.bookList}`);
              e.stopPropagation();
            }}
          >
            <ClockIcon />
            <span>брони</span>
          </div>
        )}
        {profileStore.role === Role.Employee && (
          <div
            className={
              'flex cursor-pointer flex-col items-center justify-center gap-1 text-[12px]'
            }
            onClick={(e) => {
              navigate(`/employee/${PATHS.bookList}`);
              e.stopPropagation();
            }}
          >
            <ClockIcon />
            <span>брони</span>
          </div>
        )}
        <div
          className={
            'flex cursor-pointer flex-col items-center justify-center gap-1 text-[12px]'
          }
          onClick={(e) => {
            navigate(`/${profileStore.role === Role.Admin ? 'admin/' : ''}`);
            e.stopPropagation();
          }}
        >
          <Restaurant />
          <span>рестораны</span>
        </div>
        <div
          className={
            'flex cursor-pointer flex-col items-center justify-center gap-1 text-[12px]'
          }
          onClick={(e) => {
            navigate(`/${PATHS.profile}`);
            e.stopPropagation();
          }}
        >
          <PersonIcon />
          <span>Профиль</span>
        </div>
      </div>
    </div>
  );
};

const connected = observer(Header);
export { connected as Header };

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '../../icons/person.svg?react';
import { PATHS } from '../../utils/PATHS.ts';

interface Props {}

export const Header: FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div
      className={'flex h-12 w-full bg-sky-300 px-12'}
      onClick={() => navigate('/')}
    >
      <div
        className={
          'ml-auto  flex cursor-pointer flex-col items-center justify-center gap-1 text-[12px]'
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
  );
};

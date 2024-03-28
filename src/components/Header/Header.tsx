import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {}

export const Header: FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className={'h-12 w-full bg-sky-300'} onClick={() => navigate('/')}>
      {' '}
    </div>
  );
};

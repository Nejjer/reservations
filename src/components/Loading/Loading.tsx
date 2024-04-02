import { FC } from 'react';

interface Props {
  className?: string;
}

export const Loading: FC<Props> = ({ className }) => {
  return <div className={'text-center ' + className}>Загрузка</div>;
};

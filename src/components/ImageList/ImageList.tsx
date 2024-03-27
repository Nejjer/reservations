import { FC } from 'react';

interface Props {}

export const ImageList: FC<Props> = () => {
  return (
    <div>
      <div className={'grid grid-cols-1 md:grid-cols-2'}>
        <img
          className={'h-auto max-w-full'}
          src='/restaurant.jpeg'
          alt='Изображение из галереи ресторана'
        />
        <img
          className={'h-auto max-w-full'}
          src='/restaurant.jpeg'
          alt='Изображение из галереи ресторана'
        />
        <img
          className={'h-auto max-w-full'}
          src='/restaurant.jpeg'
          alt='Изображение из галереи ресторана'
        />
        <img
          className={'h-auto max-w-full'}
          src='/restaurant.jpeg'
          alt='Изображение из галереи ресторана'
        />
      </div>
    </div>
  );
};

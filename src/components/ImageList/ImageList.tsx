import { FC, useState } from 'react';
import { Dialog } from '../Dialog';
import { CreateButton } from '../CreateButton';
import { RestaurantPictureDto } from '../../api/restaurantApi.ts';
import { Input } from '../Input';
import { Button } from '../Button';

interface Props {
  canEdit?: boolean;
  pictures: RestaurantPictureDto[];
  onChange?: (pictures: RestaurantPictureDto[]) => void;
}

export const ImageList: FC<Props> = ({ canEdit, pictures, onChange }) => {
  const [addingImage, setAddingImage] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAddImage = async () => {
    onChange?.([...pictures, { title, url }]);
    setTitle('');
    setUrl('');
  };

  const handleDeleteImage = (i: number) => {
    const newPlaces = [...pictures];
    newPlaces.splice(i, 1);
    onChange?.(newPlaces);
  };

  return (
    <div className={'relative grid h-[560px] '}>
      <div className={'grid-cols-1 md:grid-cols-2'}>
        {pictures?.map((pic, index) => (
          <div key={pic.url} className={'group relative'}>
            <img
              className={'h-auto max-w-full'}
              src={pic.url}
              alt={pic.title}
            />
            <Button
              className={`absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-[50%] bg-red ${canEdit ? 'group-hover:flex' : ''}`}
              onClick={() => handleDeleteImage(index)}
            >
              -
            </Button>
          </div>
        ))}
      </div>

      {canEdit && (
        <Dialog
          trigger={
            <CreateButton
              className={'absolute bottom-4 right-4'}
              onClick={() => setAddingImage(true)}
            />
          }
          title={'Добавить фото'}
          onConfirm={handleAddImage}
          onCancel={() => setAddingImage(false)}
          open={addingImage}
          onOpenChange={setAddingImage}
        >
          <div className={'flex flex-col gap-4'}>
            <Input
              value={title}
              placeholder={'Название'}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              value={url}
              placeholder={'Ссылка'}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
};

import { FC } from 'react';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { Input } from '../Input';

interface Props {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const BookModal: FC<Props> = ({ onOpenChange, open }) => {
  return (
    <Dialog
      open={open}
      title={'Забронировать столик'}
      onOpenChange={onOpenChange}
      onCancel={() => onOpenChange(false)}
      trigger={<Button>Забронировать</Button>}
      onConfirm={async () => console.log('')}
      className={'w-[90vw] md:max-w-[560px]'}
      buttonsClassName={'flex !justify-start gap-[14px] [&>*]:basis-1/3'}
    >
      <div className={'flex flex-col gap-4'}>
        <Input placeholder={'Имя'} />
        <Input placeholder={'Фамилия*'} />
        <Input
          placeholder={'+7 (___) ___-__-__*'}
          mask={'+7 (999) 999-99-99'}
        />
        <Input placeholder={'E-mail'} />
        <div className={'flex gap-4'}>
          <Input type={'date'} className={'basis-1/3'} />
          <Input
            placeholder={'Время*'}
            className={'book-time-input basis-1/3'}
          />
          <Input
            placeholder={'Кол-во персон*'}
            mask={'99'}
            className={'person-input basis-1/3'}
          />
        </div>
        <textarea
          rows={3}
          cols={65}
          placeholder={'Комментарий, пожелание к брони'}
          className={
            'resize-none rounded-[5px] border border-black px-2 py-1.5'
          }
        />
      </div>
    </Dialog>
  );
};

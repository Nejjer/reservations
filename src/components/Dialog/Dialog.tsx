import { FC, ReactNode, useState } from 'react';
import * as DialogDefault from '@radix-ui/react-dialog';
import { Button } from '../Button';
import CloseIcon from '../../icons/close.svg?react';

interface Props {
  trigger: ReactNode;
  children: ReactNode;
  title: ReactNode;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const Dialog: FC<Props> = ({
  children,
  trigger,
  title,
  onConfirm,
  onCancel,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogDefault.Root open={open} onOpenChange={setOpen}>
      <DialogDefault.Trigger asChild>{trigger}</DialogDefault.Trigger>
      <DialogDefault.Portal>
        <DialogDefault.Overlay
          className={'animate-overlayShow fixed inset-0 bg-black/10'}
        />
        <DialogDefault.Content
          className={
            'fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white py-5 pl-6 pr-8'
          }
        >
          <DialogDefault.Title>
            <h4 className={'mb-6 text-2xl font-bold'}>{title}</h4>
          </DialogDefault.Title>
          <DialogDefault.Description>{children}</DialogDefault.Description>
          <div className={'mt-6 flex justify-between'}>
            <DialogDefault.Close asChild>
              <Button onClick={() => onConfirm().then(() => setOpen(false))}>
                Сохранить
              </Button>
            </DialogDefault.Close>
            <DialogDefault.Close asChild>
              <Button onClick={onCancel}>Отмена</Button>
            </DialogDefault.Close>
          </div>
          <DialogDefault.Close
            className={'absolute right-[10px] top-[10px] cursor-pointer'}
          >
            <CloseIcon />
          </DialogDefault.Close>
        </DialogDefault.Content>
      </DialogDefault.Portal>
    </DialogDefault.Root>
  );
};

import { FC, ReactNode } from 'react';
import * as DialogDefault from '@radix-ui/react-dialog';
import { Button } from '../Button';
import CloseIcon from '../../icons/close.svg?react';

interface Props {
  trigger: ReactNode;
  children: ReactNode;
  title: ReactNode;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  buttonsClassName?: string;
  hideButtons?: boolean;
  disabled?: boolean;
}

export const Dialog: FC<Props> = ({
  children,
  trigger,
  title,
  onConfirm,
  onCancel,
  open,
  onOpenChange,
  className,
  buttonsClassName,
  hideButtons,
  disabled,
}) => {
  return (
    <DialogDefault.Root open={open} onOpenChange={onOpenChange}>
      <DialogDefault.Trigger asChild>{trigger}</DialogDefault.Trigger>
      <DialogDefault.Portal>
        <DialogDefault.Overlay
          className={'fixed inset-0 animate-overlayShow bg-black/10'}
        />
        <DialogDefault.Content
          className={
            'fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-white py-5 pl-6 pr-8 ' +
            className
          }
        >
          <DialogDefault.Title>
            <div className={'mb-6 text-2xl font-bold'}>{title}</div>
          </DialogDefault.Title>
          <DialogDefault.Description>{children}</DialogDefault.Description>
          {!hideButtons && (
            <div className={buttonsClassName + ' mt-6 flex justify-between'}>
              <DialogDefault.Close asChild>
                <Button
                  onClick={() => onConfirm().then(() => onOpenChange(false))}
                  disabled={disabled}
                >
                  Сохранить
                </Button>
              </DialogDefault.Close>
              <DialogDefault.Close asChild>
                <Button onClick={onCancel} className={'!bg-blue'}>
                  Отмена
                </Button>
              </DialogDefault.Close>
            </div>
          )}
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

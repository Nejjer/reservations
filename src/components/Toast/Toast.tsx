import { FC, useContext } from 'react';
import * as ToastDefault from '@radix-ui/react-toast';
import CloseIcon from '../../icons/close.svg?react';
import { observer } from 'mobx-react';
import { AppStoreContext, StoreCtx } from '../../stores/WithStore.tsx';

interface Props {}

const Toast: FC<Props> = () => {
  const {
    appStore: { toastStore },
  } = useContext<AppStoreContext>(StoreCtx);

  return (
    <ToastDefault.Provider>
      <ToastDefault.Root
        open={toastStore.isOpen}
        className={'flex gap-2 rounded-[20px] bg-black/40 px-4 py-2'}
      >
        <div className={'flex min-w-20 flex-col gap-1'}>
          <ToastDefault.Title>{toastStore.message}</ToastDefault.Title>
          {/*{description && (*/}
          {/*  <ToastDefault.Description className={'text-[14px]'}>*/}
          {/*    {description}*/}
          {/*  </ToastDefault.Description>*/}
          {/*)}*/}
        </div>

        <ToastDefault.Action altText={'Закрыть'}>
          <CloseIcon onClick={() => toastStore.onClose()} />
        </ToastDefault.Action>
      </ToastDefault.Root>
      <ToastDefault.Viewport className={'fixed bottom-3 right-3'} />
    </ToastDefault.Provider>
  );
};

const connected = observer(Toast);
export { connected as Toast };

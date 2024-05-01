import { FC, ReactNode, useState } from 'react';
import * as DefaultTabs from '@radix-ui/react-tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ArrowDown from '../../icons/arrowDown.svg?react';

interface Props {
  tab1: ReactNode;
  tab2: ReactNode;
  tab3?: ReactNode;
  tab4?: ReactNode;
}

export const Tabs: FC<Props> = ({ tab1, tab2, tab3, tab4 }) => {
  const [title, setTitle] = useState('Галерея');
  const triggerClasses =
    'last:border-b border-t border-r border-l border-black w-40  box-content px-2 cursor-pointer bg-white h-[24px]';

  return (
    <DefaultTabs.Root
      defaultValue='tab1'
      className={'w-full border border-black xl:w-[430px]'}
    >
      <DefaultTabs.List
        className={'flex  border-b border-black text-center text-xl'}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            className={'ml-2 flex  items-center gap-4 py-2'}
          >
            <button className={'mt-0.5 flex items-center'}>
              <ArrowDown />
            </button>
            <div className={'font-bold'}>{title}</div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content align={'start'} alignOffset={-9}>
              <DropdownMenu.Item className={triggerClasses}>
                <DefaultTabs.Trigger
                  onClick={() => setTitle('Галерея')}
                  value='tab1'
                  className={'w-full text-left'}
                >
                  Галерея
                </DefaultTabs.Trigger>
              </DropdownMenu.Item>

              <DropdownMenu.Item className={triggerClasses}>
                <DefaultTabs.Trigger
                  onClick={() => setTitle('Меню')}
                  value='tab2'
                  className={'w-full text-left'}
                >
                  Меню
                </DefaultTabs.Trigger>
              </DropdownMenu.Item>
              {tab3 && (
                <DropdownMenu.Item className={triggerClasses}>
                  <DefaultTabs.Trigger
                    onClick={() => setTitle('Столики')}
                    value='tab3'
                    className={'w-full text-left'}
                  >
                    Столики
                  </DefaultTabs.Trigger>
                </DropdownMenu.Item>
              )}
              {tab4 && (
                <DropdownMenu.Item className={triggerClasses}>
                  <DefaultTabs.Trigger
                    onClick={() => setTitle('Сотрудники')}
                    value='tab4'
                    className={'w-full text-left'}
                  >
                    Сотрудники
                  </DefaultTabs.Trigger>
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </DefaultTabs.List>
      <DefaultTabs.Content value='tab1'>{tab1}</DefaultTabs.Content>
      <DefaultTabs.Content value='tab2'>{tab2}</DefaultTabs.Content>
      {tab3 && <DefaultTabs.Content value='tab3'>{tab3}</DefaultTabs.Content>}
      {tab4 && <DefaultTabs.Content value='tab4'>{tab4}</DefaultTabs.Content>}
    </DefaultTabs.Root>
  );
};

import { FC, ReactNode } from 'react';
import * as DefaultTabs from '@radix-ui/react-tabs';

interface Props {
  tab1: ReactNode;
  tab2: ReactNode;
  tab3?: ReactNode;
}

export const Tabs: FC<Props> = ({ tab1, tab2, tab3 }) => {
  const triggerClasses =
    'first:border-r border-b border-black data-[state=active]:bg-yellow w-full';

  return (
    <DefaultTabs.Root
      defaultValue='tab1'
      className={'w-full border border-black xl:w-[430px]'}
    >
      <DefaultTabs.List className={'flex h-8 text-center text-xl'}>
        <DefaultTabs.Trigger value='tab1' className={triggerClasses}>
          Галерея
        </DefaultTabs.Trigger>
        <DefaultTabs.Trigger value='tab2' className={triggerClasses}>
          Меню
        </DefaultTabs.Trigger>
        {tab3 && (
          <DefaultTabs.Trigger value='tab3' className={triggerClasses}>
            Столики
          </DefaultTabs.Trigger>
        )}
      </DefaultTabs.List>
      <DefaultTabs.Content value='tab1'>{tab1}</DefaultTabs.Content>
      <DefaultTabs.Content value='tab2'>{tab2}</DefaultTabs.Content>
      {tab3 && <DefaultTabs.Content value='tab3'>{tab3}</DefaultTabs.Content>}
    </DefaultTabs.Root>
  );
};

import { FC, forwardRef, ReactNode } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { CheckIcon } from '@radix-ui/react-icons';
import ArrowDown from '../../icons/arrowDown.svg?react';
import { EKitchenType } from '../../api/restaurantApi.ts';

interface Props {
  onValueChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

export const Select: FC<Props> = ({ onValueChange, value, defaultValue }) => {
  return (
    <RadixSelect.Root
      onValueChange={onValueChange}
      value={value}
      defaultValue={defaultValue}
    >
      <RadixSelect.Trigger
        className={
          'flex h-11 w-44 justify-between gap-2 rounded-[5px] border border-black p-2 data-[placeholder=]:text-black/40'
        }
      >
        <RadixSelect.Value placeholder={'Выберите кухню'} />
        <RadixSelect.Icon className={'mt-1'}>
          <ArrowDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content position={'popper'} className={'bg-white'}>
          <RadixSelect.Viewport>
            <RadixSelect.Group>
              <SelectItem value={EKitchenType.Russian}>
                Русская кухня
              </SelectItem>
              <SelectItem value={EKitchenType.Asian}>
                Азиатская кухня
              </SelectItem>
              <SelectItem value={EKitchenType.Indian}>
                Индийская кухня
              </SelectItem>
            </RadixSelect.Group>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

const SelectItem = forwardRef<
  HTMLDivElement,
  { children: ReactNode; value: string }
>(({ children, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={'flex w-44 cursor-pointer border border-black bg-green p-2'}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator>
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

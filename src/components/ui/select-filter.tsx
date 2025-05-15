import {
  Select,
  Portal,
  ConditionalValue,
  createListCollection,
} from '@chakra-ui/react';
import React from 'react';

interface SelectFilterProps<T> {
  label: string;
  placeholder: string;
  collection: ReturnType<typeof createListCollection<T>>;
  size?: ConditionalValue<'sm' | 'md' | 'lg' | 'xs' | undefined>;
  flex?: number;
  minW?: number;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export default function SelectFilter<
  T extends { label: string; value: string }
>({
  label,
  placeholder,
  collection,
  size = 'sm',
  flex = 1,
  minW = 0,
  value,
  onChange,
}: SelectFilterProps<T>) {
  return (
    <Select.Root
      collection={collection}
      size={size}
      flex={flex}
      minW={minW}
      value={value ? [value] : []}
      onValueChange={(details) => onChange?.(details.value[0] ?? null)}
    >
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

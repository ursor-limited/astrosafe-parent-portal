import React, { useState } from 'react';
import _ from 'lodash';
import { Stack } from '@mui/system';
import FilterIcon from '@/images/icons/FilterIcon.svg';
import { PALETTE, UrsorButton } from '@/ui';
import UrsorSelectList from './UrsorSelectList';
import UrsorPopover from '@/components/UrsorPopover';

export interface IClassSortButtonProps<T extends string> {
  selected: T;
  types: T[];
  displayNames: { [id in T]: string };
  callback: (sortType: T) => void;
  darkMode?: boolean;
  iconOnly?: boolean;
  width?: string;
  text?: string;
  noText?: boolean;
  disabled?: boolean;
}

const SortButton = <T extends string>(
  props: IClassSortButtonProps<T> & { children?: React.ReactNode }
) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <UrsorSelectList
          selected={[props.selected]}
          items={props.types.map((sortType) => ({
            id: sortType,
            value: props.displayNames[sortType],
          }))}
          callback={(id) => {
            props.callback(id as T);
            setOpen(false);
          }}
        />
      }
      closeCallback={() => setOpen(false)}
      placement="right"
      disabled={props.disabled}
      buttonWidth
    >
      {props.iconOnly ? (
        <Stack
          height="28px"
          width="28px"
          borderRadius="28px"
          justifyContent="center"
          alignItems="center"
        >
          <FilterIcon height="14px" width="14px" />
        </Stack>
      ) : (
        <UrsorButton
          size="small"
          dark
          endIcon={FilterIcon}
          onClick={() => setOpen(true)}
          shadow
          backgroundColor="rgb(255,255,255)"
          fontColor={PALETTE.secondary.grey[5]}
          iconColor={PALETTE.secondary.grey[5]}
          iconSize={16}
          hoverOpacity={0.6}
          width={props.width}
        >
          {props.noText
            ? props.displayNames[props.selected]
            : `${props.text || 's ort by'}: ${
                props.displayNames[props.selected]
              }`}
        </UrsorButton>
      )}
    </UrsorPopover>
  );
};

export default SortButton;

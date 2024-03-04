import React, { useState } from "react";
import _ from "lodash";
import { Stack } from "@mui/system";
import UrsorPopover from "./UrsorPopover";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import { UrsorButton } from "ui";
import UrsorSelectList from "./UrsorSelectList";

export interface IClassSortButtonProps<T extends string> {
  selected: T;
  types: T[];
  displayNames: { [id in T]: string };
  callback: (sortType: T) => void;
  darkMode?: boolean;
  iconOnly?: boolean;
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
        >
          {/* @ts-ignore */}
          {`Sort by: ${props.displayNames[props.selected]}`}
        </UrsorButton>
      )}
    </UrsorPopover>
  );
};

export default SortButton;

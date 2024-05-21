import React, { useState } from "react";
import UrsorPopover, {
  IUrsorPopoverProps,
} from "../../../components/UrsorPopover";
import UrsorSelectList from "../../../components/inputs/UrsorSelectList";
import LightMode from "../../../components/LightMode";
import { ReactComponent as FilterIcon } from "../../../images/icons/FilterIcon.svg";
import _ from "lodash";
import { Stack } from "@mui/system";
import { PALETTE } from "../../../palette";

export interface ISortButtonRoundProps<T extends string> {
  selected: T;
  types: T[];
  displayNames: { [id in T]: string };
  callback: (sortType: T) => void;
  darkMode?: boolean;
  placement?: IUrsorPopoverProps["placement"];
}

const SortButtonRound = <T extends string>(
  props: ISortButtonRoundProps<T> & { children?: React.ReactNode }
) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <LightMode>
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
        </LightMode>
      }
      closeCallback={() => setOpen(false)}
      placement={props.placement}
    >
      <Stack
        height="32px"
        width="32px"
        borderRadius="28px"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgb(255,255,255)"
        sx={{
          svg: {
            transform: "translateY(1px)",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <FilterIcon height="15px" width="15px" />
      </Stack>
    </UrsorPopover>
  );
};

export default SortButtonRound;

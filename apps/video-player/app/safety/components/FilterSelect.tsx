import React, { useState } from "react";
import UrsorPopover from "../../../components/UrsorPopover";
import UrsorSelectList from "../../../components/inputs/UrsorSelectList";
import LightMode from "../../../components/LightMode";
import { ReactComponent as ChevronDownIcon } from "../../../images/icons/ChevronDown.svg";
import _ from "lodash";
import { Stack } from "@mui/system";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";

export type Sort = "modified" | "created" | "releaseDate" | "abc";
export const DISPLAY_NAMES: Record<Sort, string> = {
  modified: "Last Edited",
  created: "Date Created",
  releaseDate: "Release Date",
  abc: "Alphabetical",
};

export interface IFilterSelectProps<T> {
  selected: T;
  options: { id: T; value: string }[];
  callback: (selected: T) => void;
  light?: boolean;
}

const FilterSelect = <T extends string>(
  props: IFilterSelectProps<T> & { children?: React.ReactNode }
) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <LightMode>
          <UrsorSelectList
            selected={[props.selected]}
            items={props.options}
            callback={(id) => {
              setOpen(false);
              props.callback(id as T);
            }}
          />
        </LightMode>
      }
      closeCallback={() => setOpen(false)}
      placement="left"
    >
      <Stack
        direction="row"
        spacing="8px"
        alignItems="center"
        onClick={() => setOpen(true)}
        sx={{
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
          svg: {
            path: {
              fill: props.light ? PALETTE.font.light : PALETTE.font.dark,
            },
          },
        }}
      >
        <Typography bold>
          {props.options.find((o) => o.id === props.selected)?.value}
        </Typography>
        <ChevronDownIcon height="24px" width="24px" />
      </Stack>
    </UrsorPopover>
  );
};

export default FilterSelect;

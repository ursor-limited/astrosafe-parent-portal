import React, { useState } from "react";
import UrsorPopover from "../../../components/UrsorPopover";
import UrsorSelectList from "../../../components/inputs/UrsorSelectList";
import LightMode from "../../../components/LightMode";
import { ReactComponent as ChevronDownIcon } from "../../../images/icons/ChevronDown.svg";
import _ from "lodash";
import { Box, Stack } from "@mui/system";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";

export type FeedFilter = "all" | "classroom";

export interface IFeedPopupFilterSelectProps {
  selected: FeedFilter;
  callback: (selected: FeedFilter) => void;
}

const FeedPopupFilterSelect = (props: IFeedPopupFilterSelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <UrsorSelectList
          selected={[props.selected]}
          items={[
            {
              id: "all",
              value: "All Classrooms",
            },
            {
              id: "classroom",
              value: "This Classroom",
            },
          ]}
          callback={(id) => {
            setOpen(false);
            props.callback(id as FeedFilter);
          }}
        />
      }
      closeCallback={() => setOpen(false)}
      placement="left"
    >
      <Stack
        width="100%"
        direction="row"
        spacing="8px"
        alignItems="center"
        onClick={() => setOpen(true)}
        sx={{
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
      >
        <Typography bold variant="small">
          {props.selected === "all" ? "All Classrooms" : "This Classroom"}
        </Typography>
        <Stack alignItems="center">
          <ChevronDownIcon height="16px" width="16px" />
        </Stack>
      </Stack>
    </UrsorPopover>
  );
};

export default FeedPopupFilterSelect;

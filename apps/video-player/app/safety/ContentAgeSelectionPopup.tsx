import React, { useState } from "react";
import { Stack } from "@mui/system";
import ChevronDown from "../../images/icon/ChevronDown.svg";
import { ContentAgeMode, IDevice } from "../browserApi";
import UrsorPopover from "../components/UrsorPopover";
import UrsorSelectList from "../components/UrsorSelectList";
import ContentAgeModeIcon from "../monitor/ContentAgeModeIcon";

// export const getContentAgeMode: (age: number) => ContentAgeMode = (age) =>
//   age < 6 ? "trailblazer" : age < 10 ? "explorer" : "adventurer";

export interface IContentAgeSelectionPopupProps {
  contentAgeMode: IDevice["contentAgeMode"];
  callback: (mode: ContentAgeMode) => void;
}

export default function ContentAgeSelectionPopup(
  props: IContentAgeSelectionPopupProps
) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <UrsorSelectList
          selected={[props.contentAgeMode]}
          items={[
            {
              icon: <ContentAgeModeIcon mode="trailblazer" size={14} />,
              id: "trailblazer",
              value: "Trailblazer",
            },
            {
              icon: <ContentAgeModeIcon mode="explorer" size={14} />,
              id: "explorer",
              value: "Explorer",
            },
            // {
            //   icon: <ContentAgeModeIcon mode="adventurer" size="14px" />,
            //   id: "adventurer",
            //   value: "Adventurer",
            // },
          ]}
          callback={(id) => {
            props.callback(id as ContentAgeMode);
            setOpen(false);
          }}
        />
      }
      closeCallback={() => setOpen(false)}
      placement="right"
    >
      <Stack
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
      >
        <ChevronDown height="18px" width="18px" />
      </Stack>
    </UrsorPopover>
  );
}

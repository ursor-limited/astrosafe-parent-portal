import InfoIcon from "@/images/icons/InfoIcon.svg";
import { Stack } from "@mui/system";
import UrsorPopover from "./UrsorPopover";
import { useState } from "react";
import { Typography } from "ui";

export interface IInfoButtonProps {
  title: string;
  body: string;
}

const InfoButton = (props: { title: string; body: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          p="16px"
          boxSizing="border-box"
          spacing="6px"
          maxWidth="333px"
        >
          <Typography variant="small" bold>
            {props.title}
          </Typography>
          <Typography variant="small">{props.body}</Typography>
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      placement="left"
      noPadding
    >
      <Stack
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
      >
        <InfoIcon width="16px" height="16px" />
      </Stack>
    </UrsorPopover>
  );
};

export default InfoButton;

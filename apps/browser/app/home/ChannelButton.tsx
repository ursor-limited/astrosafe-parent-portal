import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IChannel } from "../api";

const ChannelButton = (props: {
  title: IChannel["title"];
  color: IChannel["color"];
}) => {
  return (
    <Stack
      height="39px"
      minWidth="201px"
      px="10px"
      boxSizing="border-box"
      borderRadius="8px"
      spacing="8px"
      direction="row"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
      }}
    >
      <Stack
        height="12px"
        width="12px"
        bgcolor={props.color || PALETTE.secondary.pink[2]}
        borderRadius="100%"
      />
      <Typography bold>{props.title}</Typography>
    </Stack>
  );
};

export default ChannelButton;

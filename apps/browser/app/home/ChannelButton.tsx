import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IChannel } from "../api";

const ChannelButton = (props: {
  title: IChannel["title"];
  color: IChannel["color"];
  selected: boolean;
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
      bgcolor={
        props.selected ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"
      }
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
      <Typography
        bold
        noWrap
        color={props.selected ? PALETTE.font.light : undefined}
        sx={{
          transition: "0.2s",
        }}
      >
        {props.title}
      </Typography>
    </Stack>
  );
};

export default ChannelButton;

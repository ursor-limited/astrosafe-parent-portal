import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const IntroBox = (props: { title: string; content: string }) => {
  return (
    <Stack
      width="277px"
      height="116px"
      boxSizing="border-box"
      borderRadius="16px"
      bgcolor="rgba(0,0,0,0.2)"
      p="24px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="medium" bold color={PALETTE.font.light}>
        {props.title}
      </Typography>
      <Typography
        variant="small"
        color={PALETTE.font.light}
        sx={{
          textAlign: "center",
        }}
      >
        {props.content}
      </Typography>
    </Stack>
  );
};

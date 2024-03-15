import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const IntroBox = (props: {
  title: string;
  content: string;
  mobile?: boolean;
}) => {
  return (
    <Stack
      width={props.mobile ? undefined : "277px"}
      height={props.mobile ? undefined : "116px"}
      boxSizing="border-box"
      borderRadius="16px"
      bgcolor="rgba(0,0,0,0.2)"
      p={props.mobile ? "16px" : "24px"}
      alignItems="center"
      justifyContent={props.mobile ? "center" : "space-between"}
      sx={{
        backdropFilter: props.mobile ? "blur(2px)" : "blur(5px)",
      }}
      spacing={props.mobile ? "5px" : undefined}
    >
      <Typography
        variant={props.mobile ? "normal" : "medium"}
        bold
        color={PALETTE.font.light}
        sx={{ textAlign: "center" }}
      >
        {props.title}
      </Typography>
      <Typography
        variant="small"
        color={PALETTE.font.light}
        sx={{
          textAlign: "center",
          fontSize: 12,
          lineHeight: "18px",
        }}
      >
        {props.content}
      </Typography>
    </Stack>
  );
};

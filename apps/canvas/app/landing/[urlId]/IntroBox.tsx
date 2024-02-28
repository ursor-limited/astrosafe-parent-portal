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
      bgcolor={PALETTE.secondary.grey[1]}
      p={props.mobile ? "16px" : "24px"}
      alignItems="center"
      justifyContent={props.mobile ? "center" : "space-between"}
      sx={{
        backdropFilter: props.mobile ? "blur(2px)" : "blur(3px)",
      }}
      spacing={props.mobile ? "5px" : undefined}
    >
      <Typography variant={props.mobile ? "normal" : "medium"} bold>
        {props.title}
      </Typography>
      <Typography
        variant="small"
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

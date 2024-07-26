import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const DesktopOnBoardingViewLayout = (props: {
  title: string | { value: string; color?: string }[];
  subtitle: string;
  button?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Stack
    width="100%"
    height="100%"
    justifyContent="space-between"
    alignItems="center"
    spacing="30px"
  >
    <Stack width="850px" spacing="24px" alignItems="center">
      {typeof props.title === "string" ? (
        <Typography
          color="rgba(255,255,255,0.88)"
          variant="h3"
          sx={{ textAlign: "center" }}
        >
          {props.title}
        </Typography>
      ) : (
        <Stack direction="row" spacing="10px">
          {props.title.map((x, i) => (
            <Typography
              key={i}
              variant="h3"
              color={x.color || "rgba(255,255,255,0.88)"}
            >
              {x.value}
            </Typography>
          ))}
        </Stack>
      )}
      <Stack width="85%" alignItems="center">
        <Typography
          variant="medium"
          bold
          color="rgba(255,255,255,0.88)"
          sx={{ textAlign: "center" }}
        >
          {props.subtitle}
        </Typography>
      </Stack>
    </Stack>
    {props.children}
    <Stack>{props.button}</Stack>
  </Stack>
);

import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export const MobileOnBoardingViewLayout = (props: {
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
    <Stack spacing="12px" alignItems="center" width="100%">
      {typeof props.title === "string" ? (
        <Typography
          color="rgba(255,255,255,0.88)"
          variant="h5"
          sx={{ textAlign: "center" }}
        >
          {props.title}
        </Typography>
      ) : (
        <Grid container columnGap="10px" rowGap="4px" justifyContent="center">
          {props.title.map((x, i) => (
            <Grid key={i} item>
              <Typography
                key={i}
                variant="h5"
                color={x.color || "rgba(255,255,255,0.88)"}
              >
                {x.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <Stack width="85%" alignItems="center">
        <Typography
          variant="small"
          bold
          color={PALETTE.secondary.grey[3]}
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

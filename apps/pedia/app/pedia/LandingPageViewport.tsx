import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export default function LandingPageViewport(props: {
  supertitle: string;
  subtitle: string;
  title: string;
  mobile?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Stack
      flex={1}
      bgcolor="rgb(255,255,255)"
      alignItems="center"
      zIndex={1} // covers the SpaceGlow's bottom border
      spacing={props.mobile ? "10px" : "32px"}
    >
      <Stack spacing="12px" maxWidth="616px" alignItems="center">
        <Stack spacing="6px" alignItems="center">
          <Typography
            variant={props.mobile ? "normal" : "large"}
            bold
            color={PALETTE.secondary.grey[4]}
          >
            {props.supertitle}
          </Typography>
          <Typography
            variant={props.mobile ? "h5" : "h3"}
            bold
            color={PALETTE.secondary.grey[5]}
            sx={{
              textAlign: "center",
              fontWeight: 470,
              width: props.mobile ? "300px" : undefined,
            }}
          >
            {props.title}
          </Typography>
        </Stack>
        <Stack maxWidth="455px">
          <Typography
            bold
            color={PALETTE.secondary.grey[4]}
            variant={props.mobile ? "small" : "normal"}
            sx={{
              textAlign: "center",
              width: props.mobile ? "280px" : undefined,
            }}
          >
            {props.subtitle}
          </Typography>
        </Stack>
      </Stack>
      {props.children}
    </Stack>
  );
}

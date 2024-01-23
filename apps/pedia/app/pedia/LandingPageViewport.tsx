import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export default function LandingPageViewport(props: {
  supertitle: string;
  subtitle: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Stack
      flex={1}
      bgcolor="rgb(255,255,255)"
      py="30px"
      alignItems="center"
      zIndex={1} // covers the SpaceGlow's bottom border
      spacing="32px"
    >
      <Stack spacing="12px" maxWidth="616px" alignItems="center">
        <Stack spacing="6px" alignItems="center">
          <Typography variant="large" bold color={PALETTE.secondary.grey[4]}>
            {props.supertitle}
          </Typography>
          <Typography
            variant="h3"
            bold
            color={PALETTE.secondary.grey[5]}
            sx={{ textAlign: "center", fontWeight: 470 }}
          >
            {props.title}
          </Typography>
        </Stack>
        <Stack maxWidth="455px">
          <Typography
            bold
            color={PALETTE.secondary.grey[4]}
            sx={{ textAlign: "center" }}
          >
            {props.subtitle}
          </Typography>
        </Stack>
      </Stack>
      {props.children}
    </Stack>
  );
}

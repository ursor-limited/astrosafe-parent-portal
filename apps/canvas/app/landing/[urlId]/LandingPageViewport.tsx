import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";

export default function LandingPageViewport(props: {
  supertitle: string;
  subtitle?: string;
  title: string;
  mobile?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Stack
      flex={1}
      alignItems="center"
      zIndex={1} // covers the SpaceGlow's bottom border
      spacing={props.mobile ? "10px" : "32px"}
      position="relative"
    >
      <Stack spacing="8px" maxWidth="616px" alignItems="center">
        <Stack spacing="6px" alignItems="center">
          <Typography
            variant={props.mobile ? "normal" : "large"}
            bold
            color={PALETTE.secondary.grey[4]}
            sx={{
              fontWeight: 500,
            }}
            htmlTag="h3"
          >
            {props.supertitle}
          </Typography>
          <Typography
            variant={props.mobile ? "h5" : "h3"}
            bold
            color={PALETTE.secondary.grey[5]}
            sx={{
              textAlign: "center",
              fontWeight: 500,
              width: props.mobile ? "300px" : undefined,
            }}
            htmlTag="h2"
          >
            {props.title}
          </Typography>
        </Stack>
        {props.subtitle ? (
          <Stack maxWidth="455px">
            <Typography
              bold
              color={PALETTE.secondary.grey[4]}
              variant={props.mobile ? "small" : "normal"}
              sx={{
                fontWeight: 400,
                textAlign: "center",
                width: props.mobile ? "280px" : undefined,
              }}
              htmlTag="h4"
            >
              {props.subtitle}
            </Typography>
          </Stack>
        ) : null}
      </Stack>
      {props.children}
    </Stack>
  );
}

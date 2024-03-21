import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography } from "ui";

export default function LandingPageViewport(props: {
  supertitle?: string;
  subtitle?: string;
  title?: string;
  leftImageUrl?: string;
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
      px="20px"
    >
      <Stack spacing="10px" maxWidth="816px" alignItems="center">
        <Stack spacing="6px" alignItems="center">
          <Typography
            variant={props.mobile ? "normal" : "large"}
            bold
            color={PALETTE.secondary.grey[4]}
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
              width: props.mobile ? "300px" : undefined,
            }}
            htmlTag="h2"
          >
            {props.title}
          </Typography>
        </Stack>
        {props.subtitle ? (
          <Stack
            pt="5px"
            direction={props.mobile ? "column" : "row"}
            spacing="20px"
          >
            {props.leftImageUrl ? (
              <div
                style={{
                  position: "relative",
                  width: "279px",
                  minWidth: "279px",
                  height: "279px",
                  transform: "translateY(5px)",
                }}
              >
                <Image
                  src={props.leftImageUrl}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="left image"
                />
              </div>
            ) : null}
            <Typography
              color={PALETTE.secondary.grey[4]}
              variant={props.mobile ? "small" : "normal"}
              sx={{
                textAlign:
                  props.leftImageUrl && !props.mobile ? "left" : "center",
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

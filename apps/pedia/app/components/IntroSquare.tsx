import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const MAX_TOPICS = 4;
const CHARACTER_LIMIT = 30;
const DEFAULT_WIDTH = 340;

export const IntroSquare = (props: {
  image: StaticImport;
  title: string;
  text: string;
  imageHeight?: string;
}) => (
  <Stack
    bgcolor="rgba(0,0,0,0.2)"
    maxWidth={`${DEFAULT_WIDTH}px`}
    width={`${DEFAULT_WIDTH}px`}
    maxHeight={`${DEFAULT_WIDTH}px`}
    height={`${DEFAULT_WIDTH}px`}
    borderRadius="16px"
    alignItems="center"
    boxSizing="border-box"
    px="35px"
    py="30px"
    justifyContent="space-between"
  >
    <Stack
      width={props.imageHeight ? undefined : "215px"}
      height={props.imageHeight}
    >
      <Image
        src={props.image}
        loader={({ src }) => {
          return src;
        }}
        alt="Footer"
      />
    </Stack>
    <Stack spacing="2px" alignItems="center">
      <Typography variant="large" bold color={PALETTE.font.light}>
        {props.title}
      </Typography>
      <Typography
        variant="small"
        color={PALETTE.font.light}
        sx={{ textAlign: "center" }}
      >
        {props.text}
      </Typography>
    </Stack>
  </Stack>
);

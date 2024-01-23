import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const MAX_TOPICS = 4;
const CHARACTER_LIMIT = 30;
const DEFAULT_WIDTH = 318;
const DEFAULT_HEIGHT = 338;

export const IntroSquare2 = (props: {
  image: StaticImport;
  title: string;
  text: string;
}) => (
  <Stack
    bgcolor={PALETTE.secondary.grey[1]}
    minWidth={`${DEFAULT_WIDTH}px`}
    maxWidth={`${DEFAULT_WIDTH}px`}
    width={`${DEFAULT_WIDTH}px`}
    minHeight={`${DEFAULT_HEIGHT}px`}
    maxHeight={`${DEFAULT_HEIGHT}px`}
    height={`${DEFAULT_HEIGHT}px`}
    borderRadius="16px"
    alignItems="center"
    boxSizing="border-box"
    px="24px"
    py="24px"
    justifyContent="space-between"
  >
    <Stack width="179px" height="179px" justifyContent="space-between">
      <Image
        src={props.image}
        loader={({ src }) => {
          return src;
        }}
        alt="Intro square"
      />
    </Stack>
    <Stack spacing="2px" alignItems="center" height="96px" minHeight="96px">
      <Typography variant="large" bold color={PALETTE.secondary.grey[5]}>
        {props.title}
      </Typography>
      <Typography
        variant="small"
        color={PALETTE.secondary.grey[5]}
        sx={{ textAlign: "center" }}
      >
        {props.text}
      </Typography>
    </Stack>
  </Stack>
);

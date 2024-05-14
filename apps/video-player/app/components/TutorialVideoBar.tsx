import { Stack } from "@mui/system";
import PlayIcon from "@/images/icons/PlayIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import Image from "next/image";
import X from "@/images/icons/X.svg";

const TutorialVideoBar = (props: {
  title: string;
  subtitle: string;
  callback: () => void;
  xCallback: () => void;
}) => (
  <Stack
    borderRadius="12px"
    spacing="20px"
    direction="row"
    bgcolor={PALETTE.secondary.orange[1]}
    p="8px"
    mb="24px"
    position="relative"
  >
    <Stack borderRadius="8px">
      <Image
        src="https://ursorassets.s3.eu-west-1.amazonaws.com/intro_to_astrosafe.webp"
        alt="intro video"
        width={158}
        height={119}
      />
    </Stack>
    <Stack spacing="8px" justifyContent="center">
      <Typography bold variant="medium">
        {props.title}
      </Typography>
      <Typography variant="small" bold color={PALETTE.secondary.grey[4]}>
        {props.subtitle}
      </Typography>
      <UrsorButton
        size="small"
        variant="secondary"
        backgroundColor="transparent"
        endIcon={PlayIcon}
        onClick={props.callback}
      >
        Watch tutorial
      </UrsorButton>
    </Stack>
    <Stack
      onClick={props.xCallback}
      right="12px"
      top="12px"
      position="absolute"
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { opacity: 0.7 },
      }}
    >
      <X height="20px" width="20px" />
    </Stack>
  </Stack>
);

export default TutorialVideoBar;

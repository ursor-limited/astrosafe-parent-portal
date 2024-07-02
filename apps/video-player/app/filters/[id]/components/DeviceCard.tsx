import { Stack } from "@mui/system";
import AstroCard from "./AstroCard";
import Image from "next/image";
import { Typography } from "ui";
import XIcon from "@/images/icons/X.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import { DeviceType, IDevice_new } from "../FilterPageContents";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

const DeviceCard = (props: IDevice_new) => {
  return (
    <AstroCard height={90}>
      <Stack direction="row" spacing="8px" position="relative">
        <Stack
          height="74px"
          width="74px"
          borderRadius="100%"
          overflow="hidden"
          bgcolor={props.backgroundColor}
        >
          <Image
            src={props.profileAvatarUrl}
            height={74}
            width={74}
            alt="device profile"
          />
        </Stack>
        <Stack
          position="absolute"
          top="8px"
          right={0}
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
        >
          <XIcon height={16} width={16} />
        </Stack>
        <Stack justifyContent="center" spacing="4px">
          <Typography bold>{props.name}</Typography>
          <Stack direction="row" spacing="4px" alignItems="center">
            <PhoneIcon height="8px" width="8px" />
            <Typography variant="tiny">
              {DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </AstroCard>
  );
};

export default DeviceCard;

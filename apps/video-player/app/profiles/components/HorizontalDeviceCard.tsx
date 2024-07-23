import { Stack } from "@mui/system";
import AstroCard from "../../filters/[id]/components/AstroCard";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import LinkExternalIcon from "@/images/icons/LinkExternalIcon.svg";
import { DeviceType, IDevice } from "../../filters/[id]/contents/common";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DeviceCardBrowsingStatusSection,
  DeviceCardCurrentUrlSection,
  DeviceCardScreenTimeSection,
} from "./DeviceCard";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

const HorizontalDeviceCard = (props: IDevice) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  const router = useRouter();
  const onClick = () => router.push(`/profiles/${props.id}`);
  return (
    <AstroCard>
      <Stack direction="row" alignItems="center" px="16px" spacing="20px">
        <Stack
          direction="row"
          spacing="20px"
          position="relative"
          height="104px"
          alignItems="center"
          boxSizing="border-box"
        >
          <Stack
            minHeight="70px"
            minWidth="70px"
            borderRadius="100%"
            overflow="hidden"
            bgcolor={props.backgroundColor}
            onClick={onClick}
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.6 },
            }}
          >
            <Image
              src={props.profileAvatarUrl}
              height={70}
              width={70}
              alt="device profile"
            />
          </Stack>
        </Stack>
        <Stack spacing="12px" direction="row" flex={1}>
          <DeviceCardCurrentUrlSection
            url="nintendo.com"
            title="Got to bind this up with API"
            faviconUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg"
          />
          <DeviceCardScreenTimeSection totalTime={5004} elapsedTime={4020} />
          <DeviceCardBrowsingStatusSection
            browsingEnabled={browsingEnabled}
            flipBrowsingEnabled={() => setBrowsingEnabled(!browsingEnabled)}
          />
        </Stack>
      </Stack>
    </AstroCard>
  );
};

export default HorizontalDeviceCard;

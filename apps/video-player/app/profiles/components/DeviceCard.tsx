import { Stack } from "@mui/system";
import AstroCard from "../../filters/[id]/components/AstroCard";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import { DeviceType, IDevice } from "../../filters/[id]/contents/common";
import AstroSwitch from "@/app/components/AstroSwitch";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

const DeviceCardSection = (props: {
  title: string;
  children: React.ReactNode;
}) => (
  <Stack
    height="72px"
    boxSizing="border-box"
    px="12px"
    py="10px"
    justifyContent="space-between"
    borderRadius="8px"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
  >
    <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
      {props.title}
    </Typography>
    {props.children}
  </Stack>
);

const DeviceCardBrowsingStatusSection = (props: {
  browsingEnabled: boolean;
  flipBrowsingEnabled: () => void;
}) => (
  <DeviceCardSection title="Browsing status">
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="6px"
    >
      <Stack
        spacing="8px"
        direction="row"
        alignItems="center"
        sx={{
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4],
            },
          },
        }}
      >
        <GlobeIcon height="20px" width="20px" />
        <Typography bold color={PALETTE.secondary.grey[5]}>
          Browsing is enabled
        </Typography>
      </Stack>
      <AstroSwitch
        on={props.browsingEnabled}
        callback={props.flipBrowsingEnabled}
      />
    </Stack>
  </DeviceCardSection>
);

const DeviceCard = (
  props: IDevice & {
    hideToggles?: boolean;
    showBrowsing?: boolean;
    url?: string;
    button?: React.ReactNode;
    small?: boolean;
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  const router = useRouter();
  const onClick = () => router.push(`/profiles/${props.id}`);
  return (
    <AstroCard>
      <Stack p="20px" pb={0} boxSizing="border-box" position="relative">
        <Stack
          position="absolute"
          top="8px"
          right="8px"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
          zIndex={2}
        >
          {props.button}
        </Stack>
        <Stack
          direction="row"
          spacing="8px"
          position="relative"
          height={props.small ? "58px" : "90px"}
          sx={{
            opacity: browsingEnabled ? 1 : 0.5,
          }}
          alignItems="center"
        >
          <Stack
            minHeight={props.small ? "40px" : "74px"}
            minWidth={props.small ? "40px" : "74px"}
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
              height={props.small ? 40 : 74}
              width={props.small ? 40 : 74}
              alt="device profile"
            />
          </Stack>
          <Stack justifyContent="center" spacing="4px">
            <Stack
              onClick={onClick}
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.6 },
              }}
            >
              <Typography bold variant="h5" maxLines={1}>
                {props.name}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="8px" alignItems="center">
              <PhoneIcon height="16px" width="16px" />
              <Typography maxLines={1}>
                {DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing="8px"
              alignItems="center"
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.system.orange,
                  },
                },
              }}
            >
              <FilterIcon height="16px" width="16px" />
              <Typography maxLines={1}>Explorer Filter</Typography>
            </Stack>
          </Stack>
        </Stack>
        <DeviceCardBrowsingStatusSection
          browsingEnabled={browsingEnabled}
          flipBrowsingEnabled={() => setBrowsingEnabled(!browsingEnabled)}
        />
        <Stack
          minHeight="70px"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing="8px"
        >
          <Typography bold variant="small" color={PALETTE.primary.indigo}>
            Go to Device
          </Typography>
          <ChevronRightIcon height="16px" width="16px" />
        </Stack>
      </Stack>
    </AstroCard>
  );
};

export default DeviceCard;

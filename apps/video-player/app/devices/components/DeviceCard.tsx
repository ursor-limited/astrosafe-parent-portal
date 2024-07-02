import { Stack } from "@mui/system";
import AstroCard from "../../filters/[id]/components/AstroCard";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import XIcon from "@/images/icons/X.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import { DeviceType, IDevice_new } from "../../filters/[id]/FilterPageContents";
import AstroSwitch from "@/app/components/AstroSwitch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAbsoluteUrl } from "@/app/browserApi";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

const DeviceCard = (
  props: IDevice_new & { showBrowsing?: boolean; url?: string }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);

  const router = useRouter();
  const onClick = () => router.push(`/devices/${props.id}`);
  return (
    <AstroCard>
      <Stack px="12px" boxSizing="border-box" position="relative">
        <Stack
          position="absolute"
          top="8px"
          right="8px"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
        >
          <XIcon height={16} width={16} />
        </Stack>
        <Stack
          direction="row"
          spacing="8px"
          position="relative"
          height="90px"
          sx={{
            opacity: browsingEnabled ? 1 : 0.5,
          }}
          alignItems="center"
        >
          <Stack
            height="74px"
            width="74px"
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
              height={74}
              width={74}
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
              <Typography bold>{props.name}</Typography>
            </Stack>
            <Stack direction="row" spacing="4px" alignItems="center">
              <PhoneIcon height="8px" width="8px" />
              <Typography variant="tiny" maxLines={1}>
                {DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
              </Typography>
            </Stack>
            {props.url ? (
              <Stack
                sx={{
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { opacity: 0.6 },
                  svg: {
                    path: {
                      fill: PALETTE.secondary.blue[3],
                    },
                  },
                }}
                alignItems="center"
                spacing="4px"
                direction="row"
                onClick={() => router.push(getAbsoluteUrl(props.url ?? ""))}
              >
                <GlobeIcon height="8px" width="8px" />
                <Typography
                  variant="tiny"
                  color={PALETTE.secondary.blue[3]}
                  maxLines={1}
                >
                  {props.url}
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          borderTop={`1px solid ${PALETTE.secondary.grey[2]}`}
          py="8px"
        >
          <Stack
            direction="row"
            sx={{ svg: { path: { fill: PALETTE.secondary.grey[4] } } }}
            alignItems="center"
            spacing="4px"
          >
            <GlobeIcon height="16px" width="16px" />
            <Typography variant="tiny">{`Browsing is ${
              !browsingEnabled ? "disabled" : "enabled"
            }`}</Typography>
          </Stack>
          <AstroSwitch
            small
            on={browsingEnabled}
            callback={() => setBrowsingEnabled(!browsingEnabled)}
          />
        </Stack>
      </Stack>
    </AstroCard>
  );
};

export default DeviceCard;

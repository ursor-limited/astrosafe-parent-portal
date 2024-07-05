import { Stack } from "@mui/system";
import AstroCard from "../../filters/[id]/components/AstroCard";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import { DeviceType, IDevice_new } from "../../filters/[id]/FilterPageContents";
import AstroSwitch from "@/app/components/AstroSwitch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAbsoluteUrl } from "@/app/browserApi";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

const DeviceCard = (
  props: IDevice_new & {
    hideToggles?: boolean;
    showBrowsing?: boolean;
    url?: string;
    button: React.ReactNode;
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  const [videoModeOn, setVideoModeOn] = useState<boolean>(false);

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
          zIndex={2}
        >
          {props.button}
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
        {!props.hideToggles ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderTop={`1px solid ${PALETTE.secondary.grey[2]}`}
            py="8px"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flex={1}
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
            {!browsingEnabled ? (
              <>
                <Stack height="100%" width="20px" alignItems="center">
                  <Stack
                    height="100%"
                    width="1.5px"
                    bgcolor={PALETTE.secondary.grey[2]}
                  />
                </Stack>
                <Stack flex={1}>
                  <UrsorFadeIn duration={800} fullWidth>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flex={1}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          svg: { path: { fill: PALETTE.secondary.grey[4] } },
                        }}
                        alignItems="center"
                        spacing="4px"
                      >
                        <CirclePlayIcon height="16px" width="16px" />
                        <Typography variant="tiny">{`Video mode ${
                          videoModeOn ? "on" : "off"
                        }`}</Typography>
                      </Stack>
                      <AstroSwitch
                        small
                        on={videoModeOn}
                        callback={() => setVideoModeOn(!videoModeOn)}
                      />
                    </Stack>
                  </UrsorFadeIn>
                </Stack>
              </>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </AstroCard>
  );
};

export default DeviceCard;

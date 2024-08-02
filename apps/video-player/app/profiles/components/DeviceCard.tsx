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
import AstroSwitch from "@/app/components/AstroSwitch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IFilterUrl } from "@/app/filters/contents/common";
import Link from "next/link";
import ApiController, { getAbsoluteUrl } from "@/app/api";
import { IEnrichedDevice } from "../contents/common";
import { useElementSize } from "usehooks-ts";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

export const DeviceCardSection = (props: {
  title: string;
  children: React.ReactNode;
}) => (
  <Stack
    flex={1}
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

export const DeviceCardBrowsingStatusSection = (props: {
  browsingEnabled: boolean;
  flipBrowsingEnabled: () => void;
}) => {
  const [setRef, size] = useElementSize();
  console.log(size);
  return (
    <Stack ref={setRef} flex={1}>
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
            {(size.width ?? 0) > 276 ? (
              <GlobeIcon height="20px" width="20px" />
            ) : null}
            <Typography
              bold
              color={PALETTE.secondary.grey[5]}
              maxLines={1}
              sx={{ maxWidth: "100%", minWidth: 0 }}
            >
              {`Browsing is ${props.browsingEnabled ? "enabled" : "disabled"}`}
            </Typography>
          </Stack>
          <AstroSwitch
            on={props.browsingEnabled}
            callback={props.flipBrowsingEnabled}
          />
        </Stack>
      </DeviceCardSection>
    </Stack>
  );
};

export const DeviceCardScreenTimeSection = (props: {
  totalTime: number;
  elapsedTime: number;
  onClickView: () => void;
}) => (
  <DeviceCardSection title="Screen time left today">
    <Stack direction="row" alignItems="center" spacing="38px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        width="100%"
      >
        <Stack
          flex={1}
          height="11px"
          bgcolor={PALETTE.secondary.grey[2]}
          borderRadius="6px"
          position="relative"
        >
          <Stack
            height="100%"
            width={`${(100 * props.elapsedTime) / props.totalTime}%`}
            bgcolor={PALETTE.secondary.purple[1]}
            borderRadius="6px"
          />
        </Stack>
        <Typography bold color={PALETTE.secondary.grey[3]}>
          {`${Math.floor(
            (props.totalTime - props.elapsedTime) / 60
          )}h ${Math.floor((props.totalTime - props.elapsedTime) % 60)}m`}
        </Typography>
      </Stack>
      <UrsorButton variant="secondary" size="small" onClick={props.onClickView}>
        View
      </UrsorButton>
    </Stack>
  </DeviceCardSection>
);

export const DeviceCardCurrentUrlSection = (props: {
  url: IFilterUrl["url"];
  title: IFilterUrl["title"];
  faviconUrl: IFilterUrl["imageUrl"];
}) => (
  <DeviceCardSection title="Browsing status">
    <Link
      href={getAbsoluteUrl(props.url)}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        sx={{
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": { opacity: 0.7 },
          svg: {
            path: {
              fill: PALETTE.secondary.purple[2],
            },
          },
        }}
      >
        <Stack direction="row" spacing="8px">
          <Stack
            height="20px"
            width="20px"
            borderRadius="5px"
            overflow="hidden"
          >
            <Image
              src={props.faviconUrl}
              height={20}
              width={20}
              alt="favicon"
            />
          </Stack>
          <Typography bold color={PALETTE.secondary.purple[2]} maxLines={1}>
            {props.title}
          </Typography>
        </Stack>
        <LinkExternalIcon height="20px" width="20px" />
      </Stack>
    </Link>
  </DeviceCardSection>
);

const DeviceCard = (
  props: IEnrichedDevice & {
    hideToggles?: boolean;
    showBrowsing?: boolean;
    url?: string;
    button?: React.ReactNode;
    small?: boolean;
    noExtras?: boolean;
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  useEffect(
    () => setBrowsingEnabled(!!props.config?.browsingAllowed),
    [props.config?.browsingAllowed]
  );
  const router = useRouter();
  const onClick = () => router.push(`/profiles/${props.id}`);
  return (
    <AstroCard>
      <Stack
        p="20px"
        pb={props.noExtras ? undefined : 0}
        boxSizing="border-box"
        position="relative"
      >
        <Stack
          position="absolute"
          top="28px"
          right="15px"
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
          alignItems="center"
          width="94%"
        >
          <Stack
            minHeight={props.small ? "40px" : "92px"}
            minWidth={props.small ? "40px" : "92px"}
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
              height={props.small ? 40 : 92}
              width={props.small ? 40 : 92}
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
              <Typography
                bold
                variant="h5"
                maxLines={1}
                sx={{ wordBreak: "break-all" }}
              >
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
        {!props.noExtras ? (
          <>
            <Stack spacing="12px" pt="20px">
              <DeviceCardCurrentUrlSection
                url="nintendo.com"
                title="Got to bind this up with API"
                faviconUrl="https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg"
              />
              <DeviceCardScreenTimeSection
                totalTime={props.screenTime?.allowed ?? 0}
                elapsedTime={props.screenTime?.current ?? 0}
                onClickView={() =>
                  router.push(`/profiles/${props.id}?tab=limits`)
                }
              />
              <DeviceCardBrowsingStatusSection
                browsingEnabled={browsingEnabled}
                flipBrowsingEnabled={() => {
                  setBrowsingEnabled(!browsingEnabled);
                  ApiController.flipBrowsingAllowed(props.id, !browsingEnabled);
                }}
              />
            </Stack>
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
              onClick={() => router.push(`/profiles/${props.id}`)}
            >
              <Typography bold variant="small" color={PALETTE.primary.indigo}>
                Go to Device
              </Typography>
              <ChevronRightIcon height="16px" width="16px" />
            </Stack>
          </>
        ) : null}
      </Stack>
    </AstroCard>
  );
};

export default DeviceCard;

import { Stack } from "@mui/system";
import AstroCard from "../../filters/[id]/components/AstroCard";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import CheckCircleFillIcon from "@/images/icons/CheckCircleFillIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import { DeviceType, IDevice } from "../../filters/[id]/contents/common";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DeviceCardBrowsingStatusSection,
  DeviceCardCurrentUrlSection,
  DeviceCardScreenTimeSection,
  DeviceCardSection,
} from "./DeviceCard";
import AstroSwitch from "@/app/components/AstroSwitch";
import { IFilter } from "@/app/filters/contents/common";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-desktop";
import ApiController from "@/app/api";
import UrsorPopover from "@/app/components/UrsorPopover";
import AstroSettingCard from "@/app/filters/[id]/components/AstroSettingCard";

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

export const DeviceCardFilterSection = (props: {
  selectedFilter: IFilter["id"];
}) => {
  const [allFilters, setAllFilters] = useState<IFilter[]>([]);
  useEffect(() => {
    ApiController.getGroupFilters(DUMMY_GROUP_ID).then(setAllFilters);
  }, []);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <Stack bgcolor="rgb(255,255,255)" borderRadius="12px" spacing="12px">
          {allFilters.map((f, i) => (
            <Stack
              key={i}
              sx={{
                opacity: props.selectedFilter != f.id ? 0.6 : 1,
                pointerEvents:
                  props.selectedFilter == f.id ? "none" : undefined,
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              <AstroSettingCard
                image={
                  <Stack
                    sx={{
                      svg: {
                        path: {
                          fill: PALETTE.system.orange,
                        },
                      },
                    }}
                  >
                    <FilterIcon height="20px" width="20px" />
                  </Stack>
                }
                title={f.title}
                rightContent={
                  props.selectedFilter == f.id ? (
                    <CheckCircleFillIcon height="24px" width="24px" />
                  ) : undefined
                }
                textColor={
                  props.selectedFilter == f.id
                    ? PALETTE.secondary.purple[2]
                    : undefined
                }
              />
            </Stack>
          ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      buttonWidth
      flexButton
    >
      <Stack onClick={() => setOpen(true)} flex={1}>
        <DeviceCardSection title="Filter">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
              transition: "0.2s",
            }}
          >
            <Stack
              spacing="8px"
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.system.orange,
                  },
                },
              }}
              direction="row"
            >
              <Stack justifyContent="center">
                <FilterIcon direction="row" height="20px" width="20px" />
              </Stack>
              <Typography bold color={PALETTE.secondary.grey[5]}>
                {allFilters?.find((f) => f.id == props.selectedFilter)?.title}
              </Typography>
            </Stack>
            <ChevronDownIcon height="20px" width="20px" />
          </Stack>
        </DeviceCardSection>
      </Stack>
    </UrsorPopover>
  );
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
          <DeviceCardScreenTimeSection
            totalTime={5004}
            elapsedTime={4020}
            onClickView={() => router.push(`/profiles/${props.id}?tab=limits`)}
          />
          <DeviceCardFilterSection selectedFilter={1} />
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
import { Stack } from "@mui/system";
import AstroCard from "../../filters/[id]/components/AstroCard";
import Image from "next/image";
import { PALETTE, Typography } from "ui";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import ChevronDownIcon from "@/images/icons/ChevronDown.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import FilterIcon from "@/images/icons/FilterIcon.svg";
import CheckCircleFillIcon from "@/images/icons/CheckCircleFillIcon.svg";
import AstroSwitch from "@/app/components/AstroSwitch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IFilter, IFilterUrl } from "@/app/filters/contents/common";
import ApiController, { getAbsoluteUrl } from "@/app/api";
import { IEnrichedDevice } from "../contents/common";
import UrsorPopover from "@/app/components/UrsorPopover";
import { DUMMY_GROUP_ID } from "@/app/filters/contents/body-desktop";
import { DEVICE_TYPE_DISPLAY_NAMES } from "./DeviceCard";

export const MobileDeviceCardFilterRow = (props: {
  filterId: IFilter["id"];
  changeFilter: (id: IFilter["id"]) => void;
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
                opacity: props.filterId != f.id ? 0.6 : 1,
                pointerEvents: props.filterId == f.id ? "none" : undefined,
                cursor: "pointer",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
              }}
              onClick={() => {
                setOpen(false);
                props.changeFilter(f.id);
              }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="small">{f.title}</Typography>
              {props.filterId === f.id ? (
                <CheckCircleFillIcon height="16px" width="16px" />
              ) : null}
            </Stack>
          ))}
        </Stack>
      }
      closeCallback={() => setOpen(false)}
      buttonWidth
      flexButton
    >
      <Stack onClick={() => setOpen(true)} flex={1}>
        <MobileDeviceCardRow
          text={allFilters?.find((f) => f.id == props.filterId)?.title ?? ""}
          rightSideElement={<ChevronDownIcon height="16px" width="16px" />}
          icon={FilterIcon}
          iconColor={PALETTE.secondary.orange[3]}
        />
      </Stack>
    </UrsorPopover>
  );
};

export const MobileDeviceCardRow = (props: {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  rightSideElement?: React.ReactNode;
}) => (
  <Stack
    maxHeight="20px"
    height="20px"
    direction="row"
    alignItems="center"
    spacing="12px"
    justifyContent="space-between"
  >
    <Stack
      alignItems="center"
      spacing="6px"
      direction="row"
      sx={{
        svg: {
          path: {
            fill: props.iconColor,
          },
        },
      }}
    >
      <props.icon height="16px" width="16px" />
      <Typography variant="small">{props.text}</Typography>
    </Stack>
    {props.rightSideElement}
  </Stack>
);

// export const DeviceCardScreenTimeSection = (props: {
//   totalTime: number;
//   elapsedTime: number;
//   onClickView: () => void;
// }) => (
//   <DeviceCardSection title="Screen time left today">
//     <Stack direction="row" alignItems="center" spacing="38px">
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing="8px"
//         width="100%"
//       >
//         <Stack
//           flex={1}
//           height="11px"
//           bgcolor={PALETTE.secondary.grey[2]}
//           borderRadius="6px"
//           position="relative"
//         >
//           <Stack
//             height="100%"
//             width={`${(100 * props.elapsedTime) / props.totalTime}%`}
//             bgcolor={PALETTE.secondary.purple[1]}
//             borderRadius="6px"
//           />
//         </Stack>
//         <Typography bold color={PALETTE.secondary.grey[3]}>
//           {`${Math.floor(
//             (props.totalTime - props.elapsedTime) / 60
//           )}h ${Math.floor((props.totalTime - props.elapsedTime) % 60)}m`}
//         </Typography>
//       </Stack>
//       <UrsorButton variant="secondary" size="small" onClick={props.onClickView}>
//         View
//       </UrsorButton>
//     </Stack>
//   </DeviceCardSection>
// );

// export const DeviceCardCurrentUrlSection = (props: {
//   url: IFilterUrl["url"];
//   title: IFilterUrl["title"];
//   faviconUrl: IFilterUrl["imageUrl"];
// }) => (
//   <DeviceCardSection title="Browsing status">
//     <Link
//       href={getAbsoluteUrl(props.url)}
//       target="_blank"
//       style={{
//         textDecoration: "none",
//       }}
//     >
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing="8px"
//         sx={{
//           cursor: "pointer",
//           transition: "0.2s",
//           "&:hover": { opacity: 0.7 },
//           svg: {
//             path: {
//               fill: PALETTE.secondary.purple[2],
//             },
//           },
//         }}
//       >
//         <Stack direction="row" spacing="8px">
//           <Stack
//             height="20px"
//             width="20px"
//             borderRadius="5px"
//             overflow="hidden"
//           >
//             <Image
//               src={props.faviconUrl}
//               height={20}
//               width={20}
//               alt="favicon"
//             />
//           </Stack>
//           <Typography bold color={PALETTE.secondary.purple[2]} maxLines={1}>
//             {props.title}
//           </Typography>
//         </Stack>
//         <LinkExternalIcon height="20px" width="20px" />
//       </Stack>
//     </Link>
//   </DeviceCardSection>
// );

const MobileDeviceCard = (
  props: IEnrichedDevice & {
    showBrowsing?: boolean;
    noExtras?: boolean;
    noDeviceTypeUnderAvatar?: boolean;
    onUpdate?: () => void;
    onClickViewScreenTime?: () => void;
    button?: React.ReactNode;
    onClick?: () => void;
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  useEffect(
    () => setBrowsingEnabled(!!props.config?.browsingAllowed),
    [props.config?.browsingAllowed]
  );
  const router = useRouter();
  const onClick = () => router.push(`/profiles/${props.id}`);
  const changeFilter = (id: IFilter["id"]) =>
    ApiController.addFilterToDevice(id, props.id).then(props.onUpdate);
  return (
    <AstroCard>
      <Stack
        px="16px"
        py="12px"
        boxSizing="border-box"
        position="relative"
        justifyContent="center"
      >
        <Stack
          position="absolute"
          top="12px"
          right="12px"
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
          spacing="20px"
          direction="row"
          justifyContent="center"
          alignItems="center"
          onClick={props.onClick}
        >
          <Stack
            spacing="8px"
            position="relative"
            alignItems="center"
            width={props.noExtras ? undefined : "91px"}
          >
            <Stack position="relative">
              <Stack
                minHeight="80px"
                minWidth="80px"
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
                  height={80}
                  width={80}
                  alt="device profile"
                />
              </Stack>
              {props.online && browsingEnabled ? (
                <Stack
                  position="absolute"
                  bottom={-2}
                  right={-2}
                  height="22px"
                  width="22px"
                  borderRadius="100%"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={PALETTE.secondary.green[4]}
                  border={`2px solid rgb(255,255,255)`}
                  sx={{
                    svg: {
                      path: {
                        fill: "rgb(255,255,255)",
                      },
                    },
                  }}
                >
                  <GlobeIcon height="12px" width="12px" />
                </Stack>
              ) : null}
            </Stack>
            <Stack spacing="2px" alignItems="center">
              <Typography
                variant="small"
                bold
                maxLines={1}
                sx={{ wordBreak: "break-all" }}
              >
                {props.name}
              </Typography>
              {!props.noDeviceTypeUnderAvatar ? (
                <Stack direction="row" spacing="6px" alignItems="center">
                  <PhoneIcon height="16px" width="16px" />
                  <Typography maxLines={1}>
                    {DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
                  </Typography>
                </Stack>
              ) : null}
            </Stack>
          </Stack>

          {!props.noExtras ? (
            <Stack spacing="8px" flex={1}>
              <MobileDeviceCardRow
                text={DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
                icon={PhoneIcon}
                iconColor={PALETTE.primary.navy}
              />
              <Stack
                onClick={() => router.push(`/profiles/${props.id}?tab=limits`)}
              >
                <MobileDeviceCardRow
                  text={`${Math.floor(
                    Math.max(
                      0,
                      (props.screenTime?.allowed ?? 0) -
                        (props.screenTime?.current ?? 0)
                    ) / 60
                  )}h ${Math.floor(
                    Math.max(
                      0,
                      (props.screenTime?.allowed ?? 0) -
                        (props.screenTime?.current ?? 0)
                    ) % 60
                  )}m left`}
                  icon={ClockIcon}
                  iconColor={PALETTE.secondary.purple[1]}
                  rightSideElement={<PencilIcon width="16px" height="16px" />}
                />
              </Stack>
              <Stack>
                <MobileDeviceCardFilterRow
                  filterId={props.filterId}
                  changeFilter={changeFilter}
                />
              </Stack>
              <MobileDeviceCardRow
                text={`Browsing is ${browsingEnabled ? "enabled" : "disabled"}`}
                icon={GlobeIcon}
                iconColor={PALETTE.secondary.grey[3]}
                rightSideElement={
                  <AstroSwitch
                    on={browsingEnabled}
                    small
                    callback={() => {
                      setBrowsingEnabled(!browsingEnabled);
                      ApiController.flipBrowsingAllowed(
                        props.id,
                        !browsingEnabled
                      );
                    }}
                  />
                }
              />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </AstroCard>
  );
};

export default MobileDeviceCard;

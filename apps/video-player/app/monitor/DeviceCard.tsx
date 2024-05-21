import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import CheckBoxIcon from "@/images/icons/CheckboxIcon.svg";
import EmptyCheckboxIcon from "@/images/icons/EmptyCheckboxIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import BrowserApiController, { IDevice } from "@/app/browserApi";
import NotificationContext from "@/app/components/NotificationContext";
import { IActionPopupItem } from "../components/ActionPopup";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import ContentAgeModeIcon from "./ContentAgeModeIcon";
import UrsorActionButton from "../components/UrsorActionButton";
import { getPrefixRemovedUrl } from "../components/LinkCard";
import dayjs from "dayjs";
import DeviceEditingDialog from "./DeviceDialog/DeviceEditingDialog";
import DeviceRemovalDialog from "./DeviceDialog/DeviceRemovalDialog";

export const getCardBorder = (new_: boolean) =>
  `${new_ ? 3 : 0}px solid ${PALETTE.secondary.orange[3]}`;

export const getTimeSpentText = (minutes: number) =>
  minutes > 0
    ? minutes == 1
      ? `1 minute`
      : `${minutes} minutes`
    : "a few seconds";

const WIDTH = "1184px";
const HEIGHT = "726px";
const PIN_IMAGE_SIZE = "42px";
const LEFT_SECTION_WIDTH = "315px";

export const getLastOnlineText = (lastOnline?: string) => {
  if (!lastOnline) {
    return "Never active yet";
  } else {
    const days = dayjs().diff(dayjs(lastOnline), "days");
    if (days > 0) {
      return days === 1 ? "Yesterday" : `${days} days ago`;
    } else {
      const hours = dayjs().diff(dayjs(lastOnline), "hours");
      if (hours > 0) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
      } else {
        const minutes = dayjs().diff(dayjs(lastOnline), "minutes");
        return minutes <= 1 ? "Now" : `${minutes} minutes ago`;
      }
    }
  }
};

const PADDING = "12px";

export const sxBox = {
  width: "100%",
  height: "71px",
  borderRadius: "8px",
  backgroundColor: "neutral2.main",
  display: "flex",
  justifyContent: "space-between",
  paddingRight: "2px",
};

export const sxImage = {
  width: "83px",
  height: "71px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px 0px 0px 8px",
};

export type LinkActions = "edit" | "delete";

export interface IDeviceCardProps {
  device: IDevice;
  lockingMode?: boolean;
  lockingSelectionCallback?: () => void;
  lockingSelectionOn?: boolean;
  locked?: boolean;
  disabled?: boolean;
  lastOnline?: string;
  online: boolean;
  pending?: boolean;
  url?: string;
  updateCallback: () => void;
  openDeviceDialogCallback: () => void;
}

export default function DeviceCard(props: IDeviceCardProps) {
  const notificationCtx = React.useContext(NotificationContext);
  const userCtx = useBrowserUserContext();

  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);
  const [removalDialogOpen, setRemovalDialogOpen] = useState<boolean>(false);

  const [newBorder, setNewBorder] = React.useState(false);
  const [hovering, setHovering] = useState<boolean>(false);

  const actions: IActionPopupItem[] = [
    {
      text: "View",
      icon: ListUnorderedIcon,
      kallback: props.openDeviceDialogCallback,
      // dialogCtx.setDeviceDialogProps({
      //   open: true,
      //   closeCallback: () => null,
      //   deviceId: props.device.id,
      // }),
    },
    {
      icon: PencilIcon,
      text: "Edit",
      kallback: () => setEditingDialogOpen(true),
    },
    {
      icon: TrashcanIcon,
      text: "Remove",
      kallback: () => setRemovalDialogOpen(true),
      color: PALETTE.system.red,
    },
  ];

  return (
    <Stack
      direction="row"
      borderRadius="12px"
      sx={{
        justifyContent: "space-between",
        outline: props.locked
          ? `3px solid ${PALETTE.system.red}`
          : getCardBorder(newBorder),
        transition: "0.2s",
        background: props.pending
          ? PALETTE.secondary.orange[1]
          : "rgb(255,255,255)",
        opacity: props.online ? 1 : 0.66,
      }}
      boxSizing="border-box"
      overflow="hidden"
      width="100%"
      p={PADDING}
      position="relative"
    >
      <Stack
        direction="row"
        alignItems="space-between"
        width="100%"
        overflow="visible"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
        }}
        onClick={props.openDeviceDialogCallback}
      >
        <Stack direction="row" height="100%" width="100%">
          <Stack
            justifyContent="center"
            alignItems="center"
            bgcolor={PALETTE.secondary.grey[props.pending ? 1 : 2]}
            boxShadow={
              props.pending
                ? `0 0 12px ${PALETTE.secondary.orange[2]}`
                : undefined
            }
            borderRadius="4px"
            minWidth="52px"
            minHeight="52px"
            position="relative"
          >
            {props.device.type === "chrome" ? (
              <img
                height="auto"
                width="46px"
                src={
                  "https://ursorassets.s3.eu-west-1.amazonaws.com/ChromeDeviceIllustration.png"
                }
              />
            ) : (
              <img
                height="auto"
                width="36px"
                src={
                  "https://ursorassets.s3.eu-west-1.amazonaws.com/iPadIllustration.png"
                }
              />
            )}
            <Stack position="absolute" bottom="-5px" right="-5px">
              <ContentAgeModeIcon
                size={14}
                mode={props.device.contentAgeMode}
              />
            </Stack>
          </Stack>
          <Stack width={"100%"} pl={"15px"} overflow="hidden" spacing="4px">
            <Box
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              sx={{
                ...(!props.disabled && { opacity: hovering ? 0.6 : 1 }),
                transition: "0.2s",
              }}
              width="90%"
            >
              <Typography
                noWrap
                bold
                color={props.pending ? PALETTE.secondary.orange[5] : undefined}
                sx={{
                  maxWidth: 0,
                  minWidth: "100%",
                }}
              >
                {props.device.name}
              </Typography>
            </Box>
            {!props.pending ? (
              <Stack
                direction="row"
                spacing="4px"
                sx={{ svg: { path: { fill: PALETTE.secondary.grey[4] } } }}
                alignItems="center"
              >
                {props.online ? (
                  <Box
                    borderRadius="100%"
                    height="8px"
                    width="8px"
                    bgcolor={PALETTE.secondary.green[3]}
                  />
                ) : (
                  <ClockIcon width="8px" height="8px" />
                )}
                <Typography
                  variant="tiny"
                  color={
                    props.online
                      ? PALETTE.secondary.green[3]
                      : PALETTE.secondary.grey[4]
                  }
                >
                  {props.online
                    ? "Online"
                    : `Offline - ${
                        props.lastOnline ? "Active " : ""
                      }${getLastOnlineText(props.lastOnline)}`}
                </Typography>
              </Stack>
            ) : null}
            {/* <Box sx={{ ...(props.link && ursorHoverFadeStyle) }}>
              <a
                target="_blank"
                href={props.link ? getAbsoluteUrl(props.subtitle) : undefined}
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography noWrap variant="small" sx={{ opacity: 0.8 }}>
                  {props.subtitle}
                </Typography>
              </a>
            </Box> */}
            {props.url ? (
              <Stack
                direction="row"
                spacing="4px"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                  svg: {
                    path: {
                      fill: PALETTE.secondary.blue[3],
                    },
                  },
                }}
              >
                <Stack>
                  <LinkIcon width="8px" height="8px" />
                </Stack>
                <a
                  target="_blank"
                  href={props.url}
                  style={{
                    textDecoration: "none",
                    minWidth: "95%",
                    maxWidth: 0,
                  }}
                >
                  <Typography
                    color={PALETTE.secondary.blue[3]}
                    noWrap
                    variant="tiny"
                  >
                    {getPrefixRemovedUrl(props.url)}
                  </Typography>
                </a>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      {!props.pending ? (
        props.lockingMode ? (
          <Stack
            pt="3px"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }}
            onClick={props.lockingSelectionCallback}
          >
            {props.lockingSelectionOn ? (
              <CheckBoxIcon width="16px" height="16px" />
            ) : (
              <EmptyCheckboxIcon width="16px" height="16px" />
            )}
          </Stack>
        ) : (
          <Stack
            position="absolute"
            top="7px"
            right="2px"
            justifyContent="center"
          >
            <UrsorActionButton
              size="30px"
              actions={actions}
              background="rgb(255,255,255)"
            />
          </Stack>
        )
      ) : (
        <Stack
          position="absolute"
          bottom={PADDING}
          right={PADDING}
          direction="row"
          spacing="6px"
          flex={1}
          justifyContent="flex-end"
        >
          <UrsorButton
            size="tiny"
            backgroundColor={PALETTE.secondary.green[4]}
            hoverOpacity={0.7}
            onClick={() =>
              BrowserApiController.approveDevice(
                props.device.id,
                userCtx.userDetails?.id ?? ""
              )
                .then(props.updateCallback)
                .then(() => notificationCtx.success("Approved Device"))
            }
          >
            Approve
          </UrsorButton>
          <UrsorButton
            size="tiny"
            backgroundColor="transparent"
            borderColor={PALETTE.system.red}
            fontColor={PALETTE.system.red}
            hoverOpacity={0.7}
            onClick={() =>
              BrowserApiController.rejectDevice(
                props.device.id,
                userCtx.userDetails?.id ?? ""
              )
                .then(props.updateCallback)
                .then(() => notificationCtx.negativeSuccess("Rejected Device"))
            }
          >
            Reject
          </UrsorButton>
        </Stack>
      )}
      <DeviceEditingDialog
        open={editingDialogOpen}
        onCloseCallback={() => setEditingDialogOpen(false)}
        device={props.device}
        submitCallback={(name) => {
          BrowserApiController.updateDeviceName(props.device.id, name)
            .then(props.updateCallback)
            .then(() => notificationCtx.success("Name changed"));
          setEditingDialogOpen(false);
        }}
      />
      <DeviceRemovalDialog
        open={removalDialogOpen}
        onCloseCallback={() => setRemovalDialogOpen(false)}
        updateCallback={props.updateCallback}
        device={props.device}
      />
    </Stack>
  );
}

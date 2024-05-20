import React, { useContext, useEffect, useState } from "react";
import { Dialog, Stack } from "@mui/material";
import CalendarIcon from "@/images/icons/CalendarIcon.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import X from "@/images/icons/X.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import ChevronDown from "@/images/icons/ChevronDown.svg";
import InfoIcon from "@/images/icons/InfoIcon.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import {
  ITeacher,
  useBrowserUserContext,
} from "@/app/components/BrowserUserContext";
import BrowserApiController, {
  ContentAgeMode,
  IDevice,
} from "@/app/browserApi";
import UrsorPopover from "@/app/components/UrsorPopover";
import UrsorSelectList from "@/app/components/UrsorSelectList";
import ContentAgeModeIcon from "../ContentAgeModeIcon";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import NotificationContext from "@/app/components/NotificationContext";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { getIsOnline } from "../DevicesPageContents";
import { BACKDROP_STYLE, BORDER_RADIUS } from "@/app/components/UrsorDialog";
import { getLastOnlineText, getTimeSpentText } from "../DeviceCard";
import DetailsSection from "./DetailsSection";
import DeviceDialogHistoryTab from "./DeviceDialogHistoryTab";
import UrsorLoading from "@/app/components/UrsorLoading";
import DeviceEditingDialog from "./DeviceEditingDialog";
import DeviceRemovalDialog from "./DeviceRemovalDialog";
import ContentAgeInfoDialog from "../ContentAgeInfoDialog";

export const DATE_FORMAT = "MM/DD/YYYY";
export const TIME_FORMAT = "hh:mm A";

export const UPDATE_PERIOD = 10000;

export const MIN_AGE = 4;
export const MAX_AGE = 8;

const WIDTH = "1184px";
const HEIGHT = "726px";
const LEFT_SECTION_WIDTH = "315px";

const ContentAgeModeSelectionButton = (props: {
  selectedMode: ContentAgeMode;
  callback: (age: ContentAgeMode) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UrsorPopover
      open={open}
      content={
        <UrsorSelectList
          selected={[props.selectedMode]}
          items={[
            {
              icon: <ContentAgeModeIcon mode="trailblazer" size={14} />,
              id: "trailblazer",
              value: "Trailblazer",
            },
            {
              icon: <ContentAgeModeIcon mode="explorer" size={14} />,
              id: "explorer",
              value: "Explorer",
            },
            // {
            //   icon: <ContentAgeModeIcon mode="adventurer" size="14px" />,
            //   id: "adventurer",
            //   value: "Adventurer",
            // },
          ]}
          callback={(mode) => {
            props.callback(mode as ContentAgeMode);
            setOpen(false);
          }}
        />
      }
      closeCallback={() => setOpen(false)}
      placement="left"
      noFloatButton
      width="100%"
    >
      <Stack
        width="100%"
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[4],
            },
          },
        }}
        direction="row"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing="8px" alignItems="center">
          <ContentAgeModeIcon mode={props.selectedMode} size={16} />
          <Typography color={PALETTE.secondary.grey[4]} variant="medium">
            {_.capitalize(props.selectedMode)}
          </Typography>
        </Stack>
        <ChevronDown width="20px" height="20px" />
      </Stack>
    </UrsorPopover>
  );
};

export const getTimeOnSiteText = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
};

export interface IBrowsingState {
  deviceId: string;
  studentId?: string;
  url: string;
  title: string;
  favIconUrl?: string;
  duration: number;
  timestamp: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IDeviceHistoryDatedItem {
  date: string;
  items: IBrowsingState[];
}

export interface IDeviceDialogProps {
  open: boolean;
  closeCallback: () => void;
  updateCallback: () => void;
  deviceId: string;
}

export const minutesSpent = (items: IBrowsingState[]) =>
  Math.round(items.reduce((acc, cur) => acc + (cur?.duration ?? 0), 0) / 60);

export default function DeviceDialog(props: IDeviceDialogProps) {
  const notificationCtx = useContext(NotificationContext);
  const userCtx = useBrowserUserContext();

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(
      userCtx?.userDetails?.schoolId ?? ""
    ).then((t) => setTeachers(t));
  useEffect(() => {
    loadTeachers();
  }, []);

  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [history, setHistory] = useState<IDeviceHistoryDatedItem[]>([]);
  const [printableCardRef, setPrintableCardRef] =
    useState<HTMLDivElement | null>(null);
  const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);
  useEffect(() => {
    if (printableCardRef) {
      openPrintCardDialog();
    }
  }, [printableCardRef]);
  const openPrintCardDialog = useReactToPrint({
    content: () => printableCardRef,
    documentTitle: "ASTRO Student Login Card",
    onAfterPrint: () => setPrintDialogOpen(false),
  });

  const [device, setDevice] = useState<IDevice | undefined>(undefined);
  const loadDevice = () =>
    BrowserApiController.getSchool(userCtx.userDetails?.id ?? "").then(
      (school) =>
        setDevice(school.devices?.find((d: IDevice) => d.id === props.deviceId))
    );
  useEffect(() => {
    loadDevice();
  }, [props.deviceId]);

  const loadHistory = () =>
    BrowserApiController.getHistoryForDevice(props.deviceId)
      .then((response) => {
        const historyItems: IBrowsingState[] = response;
        const dateFormattedHistory: IBrowsingState[] = response
          .filter((item: IBrowsingState) => item.url.startsWith("https:"))
          .map((item: IBrowsingState) => ({
            ...item,
            createdAt: dayjs(item.createdAt).format(DATE_FORMAT),
          }));
        const dateGroupedHistory = _.groupBy(
          dateFormattedHistory,
          (item) => item?.createdAt
        );
        const datedHistoryArray = Object.entries(dateGroupedHistory).map(
          ([date, items]) => ({
            date,
            items,
          })
        );
        setHistory(datedHistoryArray as IDeviceHistoryDatedItem[]);

        const todayContents = historyItems.filter(
          (item) =>
            new Date().toDateString() ===
            new Date(item.createdAt).toDateString()
        );
        setTotalDuration(minutesSpent(todayContents));
      })
      .catch((error) => notificationCtx.error(error.message));

  const [latestBrowsingState, setLatestBrowsingState] = useState<
    IBrowsingState | undefined
  >(undefined);

  const loadBrowsingState = () =>
    BrowserApiController.getLatestBrowsingState(props.deviceId).then((bs) =>
      setLatestBrowsingState(
        bs //bs.find((item: IBrowsingState) => item.deviceId === props.deviceId)
      )
    );

  useEffect(() => {
    if (!props.open) {
      return;
    }
    loadHistory();
    loadBrowsingState();
    const interval = setInterval(() => {
      loadHistory();
      loadBrowsingState();
    }, UPDATE_PERIOD);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [props.open]);

  const [online, setOnline] = useState<boolean>(false);
  useEffect(() => {
    device?.lastOnline && setOnline(getIsOnline(device.lastOnline));
  }, [device?.lastOnline]);

  const [editingDialogOpen, setEditingDialogOpen] = useState<boolean>(false);
  const [removalDialogOpen, setRemovalDialogOpen] = useState<boolean>(false);

  const [contentAgeMode, setContentAgeMode] =
    useState<ContentAgeMode>("trailblazer");
  useEffect(() => {
    device?.contentAgeMode && setContentAgeMode(device?.contentAgeMode);
  }, [device?.contentAgeMode]);

  const [contentAgeModeInfoDialogOpen, setContentAgeModeInfoDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <Dialog
        transitionDuration={600}
        open={props.open}
        onClose={props.closeCallback}
        PaperProps={{
          style: {
            width: WIDTH,
            maxWidth: WIDTH,
            maxHeight: HEIGHT,
            height: "100%",
            borderRadius: BORDER_RADIUS,
          },
        }}
        sx={{
          //zIndex: zIndices.POPUP,
          py: "10px",
          ".MuiBackdrop-root": BACKDROP_STYLE,
        }}
      >
        {device ? (
          <Stack
            direction="row"
            spacing="31px"
            p="24px"
            height="100%"
            width="100%"
          >
            <Stack
              bgcolor={PALETTE.secondary.grey[1]}
              borderRadius="12px"
              alignItems="center"
              minHeight="100%"
              height="fit-content"
              width={LEFT_SECTION_WIDTH}
              minWidth={LEFT_SECTION_WIDTH}
              justifyContent="space-between"
              pb="32px"
              pt="40px"
            >
              <Stack alignItems="center" spacing="13px">
                {device.type === "chrome" ? (
                  <img
                    height="140px"
                    width="230px"
                    src={
                      "https://ursorassets.s3.eu-west-1.amazonaws.com/ChromeDeviceIllustration.png"
                    }
                  />
                ) : (
                  <img
                    height="140px"
                    width="230px"
                    src={
                      "https://ursorassets.s3.eu-west-1.amazonaws.com/iPadIllustration.png"
                    }
                  />
                )}
                <Typography variant="h5">{device.name}</Typography>
                <Stack
                  direction="row"
                  spacing="6px"
                  sx={{ svg: { path: { fill: PALETTE.secondary.grey[4] } } }}
                  alignItems="center"
                >
                  {online ? (
                    <Stack
                      borderRadius="100%"
                      height="12px"
                      width="12px"
                      bgcolor={PALETTE.secondary.green[3]}
                    />
                  ) : (
                    <ClockIcon width="14px" height="14px" />
                  )}
                  <Typography
                    variant="medium"
                    bold
                    color={
                      online
                        ? PALETTE.secondary.green[3]
                        : PALETTE.secondary.grey[4]
                    }
                  >
                    {online
                      ? "Online"
                      : `Offline - ${
                          device.lastOnline ? "Active " : ""
                        }${getLastOnlineText(device.lastOnline)}`}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing="12px" direction="row">
                <UrsorButton
                  size="small"
                  variant="secondary"
                  backgroundColor="transparent"
                  onClick={() => setEditingDialogOpen(true)}
                  width="86px"
                >
                  Edit
                </UrsorButton>
                <UrsorButton
                  size="small"
                  backgroundColor="transparent"
                  // variant="nippon"
                  onClick={() => setRemovalDialogOpen(true)}
                >
                  Remove
                </UrsorButton>
              </Stack>
              <Stack spacing="16px" px="40px" width="100%">
                <Stack height="1px" width="100%" bgcolor="#EBEBEB" />
                <Stack spacing="12px">
                  <DetailsSection
                    title="Content age"
                    icon={SearchIcon}
                    titleSize="medium"
                    contentFontSize="medium"
                    contentFontColor={PALETTE.secondary.grey[4]}
                    iconSize="17px"
                    titleExtraElement={
                      <Stack
                        onClick={() => setContentAgeModeInfoDialogOpen(true)}
                        sx={{
                          cursor: "pointer",
                          transition: "0.2s",
                          "&:hover": { opacity: 0.6 },
                        }}
                      >
                        <InfoIcon width="18px" height="18px" />
                      </Stack>
                    }
                  >
                    <ContentAgeModeSelectionButton
                      selectedMode={contentAgeMode}
                      callback={(mode) => {
                        setContentAgeMode(mode);
                        BrowserApiController.updateDeviceAge(
                          props.deviceId,
                          mode
                        ).then(props.updateCallback);
                      }}
                    />
                  </DetailsSection>
                </Stack>
                <Stack height="1px" width="100%" bgcolor="#EBEBEB" />
                <Stack spacing="12px">
                  <DetailsSection
                    title="Time spent today"
                    icon={ClockIcon}
                    titleSize="medium"
                    contentFontSize="medium"
                    contentFontColor={PALETTE.secondary.grey[4]}
                    iconSize="17px"
                  >
                    {getTimeSpentText(totalDuration)}
                  </DetailsSection>
                </Stack>
                {device.reviewerId ? (
                  <Stack spacing="12px">
                    <DetailsSection
                      title="Approved by"
                      icon={PersonIcon}
                      titleSize="medium"
                      contentFontSize="medium"
                      contentFontColor={PALETTE.secondary.grey[4]}
                      iconSize="17px"
                    >
                      {
                        teachers.find((t) => t.id === device.reviewerId)
                          ?.teacherName
                      }
                    </DetailsSection>
                  </Stack>
                ) : null}
                <Stack spacing="12px" width="100%">
                  <DetailsSection
                    title="Device added on"
                    icon={CalendarIcon}
                    titleSize="medium"
                    contentFontSize="medium"
                    contentFontColor={PALETTE.secondary.grey[4]}
                    iconSize="17px"
                  >
                    {dayjs(device.lastOnline).format("MM/DD/YY")}
                  </DetailsSection>
                </Stack>
              </Stack>
            </Stack>

            <Stack spacing="25px" width="100%" overflow="hidden">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="large" bold>
                  Browsing history
                </Typography>
                <Stack
                  top="20px"
                  right="20px"
                  onClick={props.closeCallback}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                    zIndex: 2,
                  }}
                >
                  <X height="27px" />
                </Stack>
              </Stack>
              <DeviceDialogHistoryTab
                history={history}
                latest={online ? latestBrowsingState : undefined}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack
            height="100%"
            width="100%"
            justifyContent="center"
            alignItems="center"
            sx={{ background: "white" }}
          >
            <UrsorLoading />
          </Stack>
        )}
      </Dialog>

      {printDialogOpen && device ? (
        <Stack
          ref={setPrintableCardRef}
          position="absolute"
          zIndex={-1}
        ></Stack>
      ) : null}
      {device ? (
        <DeviceEditingDialog
          open={editingDialogOpen}
          onCloseCallback={() => setEditingDialogOpen(false)}
          device={device}
          submitCallback={(name) => {
            BrowserApiController.updateDeviceName(props.deviceId, name)
              .then(loadDevice)
              .then(() => notificationCtx.success("Name changed"));
            setEditingDialogOpen(false);
          }}
        />
      ) : null}
      {device ? (
        <DeviceRemovalDialog
          open={removalDialogOpen}
          onCloseCallback={() => setEditingDialogOpen(false)}
          updateCallback={props.updateCallback}
          device={device}
          callback={props.closeCallback}
        />
      ) : null}
      <ContentAgeInfoDialog
        open={contentAgeModeInfoDialogOpen}
        closeCallback={() => setContentAgeModeInfoDialogOpen(false)}
      />
    </>
  );
}

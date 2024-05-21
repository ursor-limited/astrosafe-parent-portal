"use client";

import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import dayjs from "dayjs";
import NotificationContext from "../components/NotificationContext";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import X from "@/images/icons/X.svg";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import BrowserApiController, { IDevice, ISchool } from "../browserApi";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import PageLayout, { SIDEBAR_X_MARGIN } from "../dashboard/PageLayout";
import UrsorFadeIn from "../components/UrsorFadeIn";
import DynamicCardGrid from "../components/DynamicCardGrid";
import DeviceCard from "./DeviceCard";
import _ from "lodash";
import { createPortal } from "react-dom";
import AddDeviceDialog from "./AddDeviceDialog";
import LockDialog from "./LockDialog";
import DeviceDialog from "./DeviceDialog/DeviceDialog";
import dynamic from "next/dynamic";

const UrsorLoading = dynamic(
  () => import("../components/UrsorLoading"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

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

export const getIsPast = (date: string) => dayjs(date) < dayjs();

export const getIsToday = (date: string) =>
  dayjs(date) < dayjs().endOf("day") && dayjs(date) >= dayjs().startOf("day");

export const getIsTomorrow = (date: string) =>
  dayjs(date) < dayjs().add(1, "days").endOf("day") &&
  dayjs(date) >= dayjs().add(1, "days").startOf("day");

export const getIsYesterday = (date: string) =>
  dayjs(date) < dayjs().subtract(1, "days").endOf("day") &&
  dayjs(date) >= dayjs().subtract(1, "days").startOf("day");

export const EmptyStateIllustration = (props: {
  children: React.ReactNode;
}) => (
  <Stack
    position="absolute"
    top={0}
    width="100%"
    height="100%"
    justifyContent="center"
    alignItems="center"
    sx={{
      pointerEvents: "none",
      filter: "grayscale(1)",
    }}
  >
    <Stack position="relative">
      <Stack sx={{ opacity: 0.3 }}>
        <img
          height="207px"
          width="217px"
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/graphIllustration.png"
        />
      </Stack>
      <Stack width="100%" alignItems="center" position="absolute" top="170px">
        <Typography
          bold
          color={PALETTE.secondary.grey[3]}
          sx={{ textAlign: "center" }}
        >
          {props.children}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);

const ONLINE_THRESHOLD = 60; // seconds. Needs to be as high as 60 in order to make sure that online devices are shown as online even with poor wifi.
export const MONITORING_UPDATE_PERIOD = 10 * 1000; // milliseconds

export const DEFAULT_DEVICE_LIMIT = 9999;

const CARD_FADEIN_DURATION = 600;

export const getIsOnline = (lastOnline: string) =>
  dayjs().diff(lastOnline, "seconds") < ONLINE_THRESHOLD;

export interface IDevicesPageProps {}

export default function DevicesPageContents(props: IDevicesPageProps) {
  const notificationCtx = useContext(NotificationContext);
  const userCtx = useBrowserUserContext();

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] =
    useState<boolean>(false);

  const [school, setSchool] = useState<ISchool | undefined>(undefined);
  const loadSchool = () =>
    BrowserApiController.getSchool(userCtx.userDetails?.schoolId ?? "")
      .then((school) => {
        setSchool(school);
      })
      .catch((error) => notificationCtx.error(error.message));

  useEffect(() => {
    userCtx.userDetails?.schoolId && loadSchool();
  }, [userCtx.userDetails?.schoolId]);

  useEffect(() => {
    school && setDeviceLimit(school?.deviceLimit || DEFAULT_DEVICE_LIMIT);
  }, [school?.deviceLimit]);

  const [pendingDeviceIds, setPendingDeviceIds] = useState<string[]>([]);
  const [onlineDeviceIds, setOnlineDeviceIds] = useState<string[]>([]);
  const [offlineDeviceIds, setOfflineDeviceIds] = useState<string[]>([]);
  const [deviceLimit, setDeviceLimit] = useState<number | undefined>(undefined);

  useEffect(() => {
    setPendingDeviceIds(
      school?.devices?.filter((d) => !d.connected).map((d) => d.id) || []
    );
    setOnlineDeviceIds(
      school?.devices
        ?.filter(
          (d) =>
            d.connected === "approved" &&
            d.lastOnline &&
            getIsOnline(d.lastOnline)
        )
        .map((d) => d.id) || []
    );
    setOfflineDeviceIds(
      school?.devices
        ?.filter(
          (d) =>
            d.connected === "approved" &&
            (!d.lastOnline ||
              dayjs().diff(d.lastOnline, "seconds") >= ONLINE_THRESHOLD)
        )
        .map((d) => d.id) || []
    );
  }, [school?.devices]);

  const [browsingStates, setBrowsingStates] = useState<IBrowsingState[]>([]);
  const loadBrowsingStates = () =>
    BrowserApiController.getLatestBrowsingStates(
      userCtx.userDetails?.schoolId ?? ""
    ).then((bs) => setBrowsingStates(bs));

  useEffect(() => {
    userCtx.userDetails?.schoolId && loadBrowsingStates();
  }, [userCtx.userDetails?.schoolId]);
  useEffect(() => {
    const interval = setInterval(() => {
      loadBrowsingStates();
    }, MONITORING_UPDATE_PERIOD);
    return () => clearInterval(interval);
  }, [onlineDeviceIds.length]);

  const [reachedDeviceLimit, setReachedDeviceLimit] = useState<boolean>(false);
  useEffect(() => {
    deviceLimit &&
      setReachedDeviceLimit(
        onlineDeviceIds.length +
          offlineDeviceIds.length +
          pendingDeviceIds.length >=
          deviceLimit
      );
  }, [
    onlineDeviceIds.length,
    offlineDeviceIds.length,
    pendingDeviceIds.length,
    deviceLimit,
  ]);

  //const sidebarCtx = useSidebarNotificationContext();

  const [lockingModeOn, setLockingModeOn] = useState<boolean>(false);
  useEffect(() => setLockingModeOn(!!school?.lock), [school?.lock]);

  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>([]);
  useEffect(
    () => school?.lock?.devices && setSelectedDeviceIds(school.lock.devices),
    [school?.lock?.devices]
  );

  const lockingSelectionCallback = (id: string) =>
    setSelectedDeviceIds(
      selectedDeviceIds.includes(id)
        ? selectedDeviceIds.filter((did) => did !== id)
        : [id, ...selectedDeviceIds]
    );

  const startLock = (duration: number) =>
    BrowserApiController.startLock(
      school?.id ?? "",
      selectedDeviceIds,
      dayjs().add(duration, "minutes").toISOString()
    )
      .then(() => notificationCtx.success("Locked devices."))
      .then(loadSchool);

  // const updateLockedDevices = (ids: string[]) =>
  //   ApiController.startLock(school?.id, ids)
  //     .then(() => notificationCtx.success("Updated lock devices."))
  //     .then(loadSchool);

  const endLock = () => {
    setSelectedDeviceIds([]);
    BrowserApiController.endLock(school?.id ?? "")
      .then(() => notificationCtx.success("Unlocked devices."))
      .then(loadSchool);
  };

  const [lockDialogOpen, setLockDialogOpen] = useState<boolean>(false);
  const [minutesLeft, setMinutesLeft] = useState<number>(0);

  useEffect(() => {
    if (!school?.lock?.endTime) {
      return;
    }
    setMinutesLeft(dayjs(school?.lock?.endTime).diff(dayjs(), "minutes") + 1);
    const interval = setInterval(() => {
      school?.lock?.endTime && getIsPast(school.lock.endTime) && endLock();
      setMinutesLeft(dayjs(school?.lock?.endTime).diff(dayjs(), "minutes") + 1);
    }, 10000);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [school?.lock?.endTime]);

  const [deviceDialogId, setDeviceDialogId] = useState<string | undefined>();

  return (
    <>
      <PageLayout
        title="Devices"
        selectedSidebarItemId="monitor"
        secondaryButton={{
          text: "Add Device",
          callback: () => setAddDeviceDialogOpen(true),
          icon: PlusIcon,
          tourId: "add-device-button",
          disabled: lockingModeOn,
        }}
        button={{
          text: "Lock screens",
          callback: () => setLockingModeOn(!lockingModeOn),
          icon: LockIcon,
          disabled: lockingModeOn,
        }}
        scrollable
        description="All of the devices connected to your school are displayed here. Click ‘Connect device’ to add more!"
      >
        {lockingModeOn ? (
          <Stack
            position="fixed"
            bottom="30px"
            left={0}
            right={0}
            margin="auto"
            width="fit-content"
            zIndex={1}
          >
            <UrsorFadeIn duration={800}>
              {school?.lock ? (
                <Stack spacing="24px" direction="row">
                  <Stack direction="row" spacing="6px" alignItems="center">
                    <Typography variant="large" bold>
                      {minutesLeft}
                    </Typography>
                    <Typography
                      variant="medium"
                      bold
                      color={PALETTE.secondary.grey[4]}
                    >
                      {`minute${minutesLeft === 1 ? "" : "s"} left`}
                    </Typography>
                  </Stack>
                  <UrsorButton
                    variant="secondary"
                    endIcon={X}
                    onClick={endLock}
                  >
                    Unlock
                  </UrsorButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing="10px">
                  <UrsorButton
                    variant="secondary"
                    endIcon={X}
                    onClick={() => setLockingModeOn(false)}
                  >
                    Cancel
                  </UrsorButton>
                  <UrsorButton
                    variant="tertiary"
                    endIcon={ChevronRight}
                    onClick={() => {
                      setLockDialogOpen(true);
                    }}
                    disabled={selectedDeviceIds.length === 0}
                  >
                    Lock
                  </UrsorButton>
                </Stack>
              )}
            </UrsorFadeIn>
          </Stack>
        ) : null}
        <Stack
          overflow="scroll"
          flex={1}
          pb="141px"
          spacing="30px"
          pl={`${SIDEBAR_X_MARGIN}px`}
          pt="30px"
        >
          {pendingDeviceIds.length > 0 ? (
            <Stack>
              <UrsorFadeIn duration={800}>
                <Stack spacing="12px">
                  <Typography variant="medium" bold>
                    Pending Devices
                  </Typography>
                  <DynamicCardGrid
                    cardWidth="278px"
                    rowGap="20px"
                    columnGap="20px"
                  >
                    {_.compact(
                      pendingDeviceIds.map(
                        (deviceId) =>
                          school?.devices?.find((d) => d.id === deviceId)
                      )
                    ).map((d, index) => (
                      <Stack key={d.id}>
                        <UrsorFadeIn
                          duration={CARD_FADEIN_DURATION}
                          delay={(index + 1) * 100}
                        >
                          <DeviceCard
                            device={d}
                            pending={true}
                            online={true}
                            updateCallback={() => {
                              //sidebarCtx.refreshPendingDevicesCount();
                              //dataCtx.refreshDevicesAndSessions();
                              loadSchool();
                            }}
                            openDeviceDialogCallback={() =>
                              setDeviceDialogId(d.id)
                            }
                          />
                        </UrsorFadeIn>
                      </Stack>
                    ))}
                  </DynamicCardGrid>
                </Stack>
              </UrsorFadeIn>
            </Stack>
          ) : null}
          {school?.devices && onlineDeviceIds.length > 0 ? (
            <Stack>
              <UrsorFadeIn duration={800}>
                <Stack spacing="12px">
                  <Typography variant="medium" bold>
                    Online Devices
                  </Typography>
                  <Stack px="3px">
                    <DynamicCardGrid
                      cardWidth="278px"
                      rowGap="20px"
                      columnGap="20px"
                    >
                      {_.compact(
                        onlineDeviceIds.map(
                          (deviceId) =>
                            school?.devices?.find((d) => d.id === deviceId)
                        )
                      ).map((d, index) => (
                        <Stack key={d.id}>
                          <UrsorFadeIn
                            duration={CARD_FADEIN_DURATION}
                            delay={(index + 1) * 100}
                          >
                            <DeviceCard
                              device={d}
                              online={true}
                              url={
                                browsingStates.find(
                                  (bs) => bs.deviceId === d.id
                                )?.url
                              }
                              updateCallback={loadSchool}
                              lockingMode={
                                lockingModeOn && !school?.lock?.endTime
                              }
                              lockingSelectionCallback={() => {
                                lockingSelectionCallback(d.id);
                                // updateLockedDevices([d.id, ...selectedDeviceIds]);
                              }}
                              lockingSelectionOn={selectedDeviceIds.includes(
                                d.id
                              )}
                              locked={school?.lock?.devices.includes(d.id)}
                              openDeviceDialogCallback={() =>
                                setDeviceDialogId(d.id)
                              }
                            />
                          </UrsorFadeIn>
                        </Stack>
                      ))}
                    </DynamicCardGrid>
                  </Stack>
                </Stack>
              </UrsorFadeIn>
            </Stack>
          ) : null}
          {school?.devices && offlineDeviceIds.length > 0 ? (
            <Stack>
              <UrsorFadeIn duration={800}>
                <Stack spacing="12px">
                  <Typography variant="medium" bold>
                    Offline Devices
                  </Typography>
                  <Stack px="3px">
                    <DynamicCardGrid
                      cardWidth="278px"
                      rowGap="20px"
                      columnGap="20px"
                    >
                      {_.compact(
                        offlineDeviceIds.map(
                          (deviceId) =>
                            school.devices?.find((d) => d.id === deviceId)
                        )
                      ).map((d, index) => (
                        <Stack key={d.id}>
                          <UrsorFadeIn
                            duration={CARD_FADEIN_DURATION}
                            delay={(index + 1) * 100}
                          >
                            <DeviceCard
                              device={d}
                              lastOnline={d?.lastOnline}
                              online={false}
                              updateCallback={loadSchool}
                              lockingMode={
                                lockingModeOn && !school?.lock?.endTime
                              }
                              lockingSelectionCallback={() => {
                                lockingSelectionCallback(d.id);
                                // updateLockedDevices(
                                //   selectedDeviceIds.includes(d.id)
                                //     ? selectedDeviceIds.filter(
                                //         (did) => did !== d.id
                                //       )
                                //     : [d.id, ...selectedDeviceIds]
                                // );
                              }}
                              lockingSelectionOn={selectedDeviceIds.includes(
                                d.id
                              )}
                              locked={school?.lock?.devices.includes(d.id)}
                              openDeviceDialogCallback={() =>
                                setDeviceDialogId(d.id)
                              }
                            />
                          </UrsorFadeIn>
                        </Stack>
                      ))}
                    </DynamicCardGrid>
                  </Stack>
                </Stack>
              </UrsorFadeIn>
            </Stack>
          ) : null}
        </Stack>
      </PageLayout>

      {!school?.devices
        ? createPortal(
            <Stack
              position="absolute"
              top={0}
              width="100vw"
              height="100vh"
              justifyContent="center"
              alignItems="center"
              sx={{
                pointerEvents: "none",
              }}
            >
              <UrsorLoading />
            </Stack>,
            document.body
          )
        : null}

      {school?.devices?.length === 0
        ? createPortal(
            <EmptyStateIllustration>No Devices yet.</EmptyStateIllustration>,
            document.body
          )
        : null}
      {/* {selectedSessionForViewing ? (
        <SessionCodeDialog
          open={sessionCodeDialogOpen}
          closeCallback={() => setSessionCodeDialogOpen(false)}
          code={selectedSessionForViewing.joinCode}
        />
      ) : null} */}
      {/* <AddDeviceTutorialDialog
        open={addDeviceTutorialDialogOpen}
        closeCallback={() => setAddDeviceTutorialDialogOpen(false)}
      /> */}
      {deviceDialogId ? (
        <DeviceDialog
          open={true}
          closeCallback={() => setDeviceDialogId(undefined)}
          deviceId={deviceDialogId}
          updateCallback={loadSchool}
        />
      ) : null}
      <AddDeviceDialog
        open={addDeviceDialogOpen}
        closeCallback={() => setAddDeviceDialogOpen(false)}
        updateCallback={() => {
          loadSchool();
        }}
        limitReached={reachedDeviceLimit}
      />
      {/* <GCSync /> */}
      <LockDialog
        open={lockDialogOpen}
        closeCallback={() => setLockDialogOpen(false)}
        startCallback={(duration) => startLock(duration)}
      />
    </>
  );
}

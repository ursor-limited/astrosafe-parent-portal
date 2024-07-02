import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import InfoIcon from "@/images/icons/InfoIcon.svg";
import X from "@/images/icons/X.svg";
import ContentAgeInfoDialog from "./ContentAgeInfoDialog";
import _ from "lodash";
import BrowserApiController, {
  ContentAgeMode,
  IDevice,
  ISchool,
} from "../browserApi";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../components/UrsorTable";
import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import Image from "next/image";
import ContentAgeSelectionPopup from "./ContentAgeSelectionPopup";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import AddDeviceDialog from "../monitor_old/AddDeviceDialog";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";
import { BORDER_RADIUS } from "ui/ursor-input-field";
import DeviceDialog from "../monitor_old/DeviceDialog/DeviceDialog";
import ContentAgeModeIcon from "../monitor_old/ContentAgeModeIcon";

const WIDTH = "850px";
const MIN_HEIGHT = "470px";
const ILLUST_SIZE = 14;

const CONTENT_AGE_MODE_YEARS_TEXT: Record<ContentAgeMode, string> = {
  trailblazer: "Years 4-5",
  explorer: "Years 6-9",
  adventurer: "Years 10+",
};
export const DEFAULT_CONTENT_AGE_MODE: ContentAgeMode = "explorer";

interface IDeviceFiltersTableRowItems {
  name: string;
  mode: IDevice["contentAgeMode"];
}

export interface IDeviceFiltersDialogProps {
  open: boolean;
  closeCallback: () => void;
  updateCallback: () => void;
}

export default function DeviceFiltersDialog(props: IDeviceFiltersDialogProps) {
  const [contentAgePopupOpen, setContentAgePopupOpen] =
    useState<boolean>(false);

  const [school, setSchool] = useState<ISchool | undefined>(undefined);

  const userCtx = useBrowserUserContext();

  const loadSchool = () => {
    userCtx.userDetails?.schoolId &&
      BrowserApiController.getSchool(userCtx.userDetails?.schoolId).then(
        (school) => {
          setSchool(school);
        }
      );
  };
  useEffect(() => {
    loadSchool();
  }, []);

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "name",
      displayName: "Device name",
      sortable: true,
      getAvatar: (id) => {
        const deviceType = school?.devices?.find((d) => d.id === id)?.type;
        return (
          <Stack
            width="22px"
            minWidth="22px"
            height="20px"
            bgcolor={PALETTE.secondary.grey[2]}
            borderRadius="3px"
            justifyContent="center"
            alignItems="center"
          >
            <div
              style={{
                width: deviceType === "chrome" ? "100%" : "86%",
                height: "100%",
                position: "relative",
              }}
            >
              <Image
                fill
                style={{ objectFit: "contain" }}
                src={
                  deviceType === "chrome"
                    ? "https://ursorassets.s3.eu-west-1.amazonaws.com/ChromeDeviceIllustrationSmall.png"
                    : "https://ursorassets.s3.eu-west-1.amazonaws.com/iPadIllustrationSmall.png"
                }
                alt="device illustration"
              />
            </div>
          </Stack>
        );
      },
    },
    {
      name: "mode",
      displayName: "Content age",
      headerButton: (
        <Stack
          onClick={() => setContentAgePopupOpen(true)}
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.6 },
          }}
        >
          <InfoIcon width="18px" height="18px" />
        </Stack>
      ),
      itemDisplay: (mode: ContentAgeMode) => (
        <Stack direction="row" spacing="9px" alignItems="center">
          <ContentAgeModeIcon
            mode={mode || DEFAULT_CONTENT_AGE_MODE}
            size={ILLUST_SIZE}
          />
          <Typography>
            {_.capitalize(mode || DEFAULT_CONTENT_AGE_MODE)}
          </Typography>
          <Typography color={alpha(PALETTE.secondary.grey[4], 0.8)}>
            {`${CONTENT_AGE_MODE_YEARS_TEXT[mode || DEFAULT_CONTENT_AGE_MODE]}`}
          </Typography>
        </Stack>
      ),
      getExtraElement: (id) => (
        <ContentAgeSelectionPopup
          contentAgeMode={
            rows.find((row) => row.id === id)?.items.mode ??
            DEFAULT_CONTENT_AGE_MODE
          }
          callback={(mode) =>
            BrowserApiController.updateDeviceAge(id, mode)
              .then(props.updateCallback)
              .then(loadSchool)
          }
        />
      ),
      link: true,
    },
  ];

  const [rows, setRows] = useState<
    IUrsorTableRow<IDeviceFiltersTableRowItems>[]
  >([]);
  useEffect(() => {
    const deviceRows: IUrsorTableRow<IDeviceFiltersTableRowItems>[] =
      school?.devices
        ?.filter((d) => !d.connected || d.connected === "approved")
        ?.map((d) => ({
          id: d.id,
          tags: [],
          disabled: false,
          items: {
            name: d.name,
            mode: d.contentAgeMode,
          },
        })) || [];
    setRows(deviceRows);
  }, [school?.devices]);

  const [sortedColumn, setSortedColumn] = useState<string>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [addDeviceDialogOpen, setAddDeviceDialogOpen] =
    React.useState<boolean>(false);

  const [deviceDialogId, setDeviceDialogId] = useState<string | undefined>();
  return (
    <>
      <Dialog
        transitionDuration={DEFAULT_FADEIN_DURATION}
        open={props.open}
        onClose={props.closeCallback}
        PaperProps={{
          style: {
            width: WIDTH,
            maxWidth: WIDTH,
            height: "74%",
            minHeight: MIN_HEIGHT,
            borderRadius: BORDER_RADIUS,
          },
        }}
        sx={{
          p: "10px",
          ".MuiBackdrop-root": BACKDROP_STYLE,
        }}
      >
        <Stack
          position="absolute"
          right="30px"
          top="30px"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
          onClick={props.closeCallback}
          zIndex={2}
        >
          <X height="26px" width="26px" />
        </Stack>
        <Stack flex={1} p="32px" spacing="24px" overflow="hidden">
          <Typography variant="large" bold>
            Customize Device Filters
          </Typography>
          <Stack overflow="scroll">
            <UrsorTable
              columns={TABLE_COLUMNS}
              rows={rows}
              defaultSortedByColumn="creationDate"
              defaultSortedAscending
              selectedSort={sortedColumn}
              ascending={sortDirection === "asc"}
              sortSelectionCallback={(columnId) => {
                if (columnId === sortedColumn) {
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                } else {
                  setSortedColumn(columnId);
                  setSortDirection("asc");
                }
              }}
              getEndButton={(id) => (
                <UrsorButton
                  size="small"
                  onClick={
                    () => setDeviceDialogId(id)
                    // dialogCtx.setDeviceDialogProps({
                    //   open: true,
                    //   closeCallback: () => null,
                    //   deviceId: id,
                    // })
                  }
                >
                  Go to Device
                </UrsorButton>
              )}
              noHeaderGradient
            />
          </Stack>
          {rows.length === 0 ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <Stack position="relative">
                <Stack sx={{ opacity: 0.3, filter: "grayscale(1)" }}>
                  <Image
                    src="https://ursorassets.s3.eu-west-1.amazonaws.com/graphIllustration.png"
                    width={250}
                    height={240}
                    alt="graph illustration"
                  />
                </Stack>
                <Stack
                  position="absolute"
                  bottom="-2px"
                  width="100%"
                  alignItems="center"
                >
                  <UrsorButton
                    endIcon={PlusIcon}
                    onClick={() => setAddDeviceDialogOpen(true)}
                    dark
                    variant="tertiary"
                  >
                    Add Device
                  </UrsorButton>
                </Stack>
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Dialog>
      <ContentAgeInfoDialog
        open={contentAgePopupOpen}
        closeCallback={() => setContentAgePopupOpen(false)}
      />
      <AddDeviceDialog
        open={addDeviceDialogOpen}
        closeCallback={() => {
          setAddDeviceDialogOpen(false);
        }}
        updateCallback={loadSchool}
      />
      {deviceDialogId ? (
        <DeviceDialog
          open={true}
          closeCallback={() => setDeviceDialogId(undefined)}
          deviceId={deviceDialogId}
          updateCallback={loadSchool}
        />
      ) : null}
    </>
  );
}

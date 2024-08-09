import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { useState } from "react";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { IContentBucket } from "@/app/profiles/[id]/components/ContentTab";
import MobileAllDevicesDialog from "@/app/components/MobileAllDevicesDialog";
import MobileDeviceCard from "@/app/profiles/components/MobileDeviceCard";
import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import FolderDeviceRemovalConfirmationDialog from "./FolderDeviceRemovalConfirmationDialog";

const MobileDevicesSection = (props: {
  title: string;
  devices: IDevice[];
  folderId: IContentBucket["id"];
  onAdd: () => void;
  onRemove: (id: IDevice["id"]) => void;
}) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false);

  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] =
    useState<number | undefined>();

  // const removeDevice = (id: IDevice["id"]) =>
  //   ApiController.removeFolderFromDevice(props.folderId, id);
  // .then(
  //     props.onRemove
  //   );

  return (
    <>
      <AstroBentoCard title={props.title} notCollapsible isMobile>
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="150px" rowGap="12px" columnGap="12px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={d.id} duration={800} delay={i * 150}>
                <MobileDeviceCard
                  {...d}
                  button={
                    <Stack onClick={() => setRemovalConfirmationDialogId(d.id)}>
                      <XIcon height={16} width={16} />
                    </Stack>
                  }
                  noExtras
                />
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        ) : (
          <Stack
            height="90px"
            spacing="1px"
            borderRadius="8px"
            border={`1px solid ${PALETTE.secondary.grey[2]}`}
            justifyContent="center"
            alignItems="center"
            bgcolor={
              hoveringOnButton ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"
            }
            sx={{
              transition: "0.2s",
              cursor: "pointer",
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            onMouseEnter={() => setHoveringOnButton(true)}
            onMouseLeave={() => setHoveringOnButton(false)}
            onClick={props.onAdd}
          >
            <PlusIcon height="32px" width="32px" />
            <Typography
              bold
              color={PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]}
            >
              Add a Device
            </Typography>
          </Stack>
        )}
        <Stack direction="row" spacing="8px" pt="14px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
            onClick={() => setDevicesGridDialogOpen(true)}
            width="100%"
          >
            View all
          </UrsorButton>
          <UrsorButton
            dark
            variant="tertiary"
            size="small"
            endIcon={PlusIcon}
            onClick={props.onAdd}
            width="100%"
          >
            Add Device
          </UrsorButton>
        </Stack>
      </AstroBentoCard>
      <MobileAllDevicesDialog
        title={`${props.devices.length} ${
          props.devices.length === 1 ? "Device has" : "Devices have"
        } access to this Folder`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          props.onAdd();
          setDevicesGridDialogOpen(false);
        }}
        onRemove={setRemovalConfirmationDialogId}
      />
      {removalConfirmationDialogId ? (
        <FolderDeviceRemovalConfirmationDialog
          open={true}
          onClose={() => setRemovalConfirmationDialogId(undefined)}
          onSubmit={() => props.onRemove(removalConfirmationDialogId)}
          deviceName={
            props.devices.find((d) => d.id === removalConfirmationDialogId)
              ?.name ?? ""
          }
          isMobile
        />
      ) : null}
    </>
  );
};

export default MobileDevicesSection;

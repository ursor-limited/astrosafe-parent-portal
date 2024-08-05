import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { useState } from "react";
import ApiController from "@/app/api";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { IContentBucket } from "@/app/profiles/[id]/components/ContentTab";
import AllDevicesDialog from "@/app/components/AllDevicesDialog";
import DeviceCard from "@/app/profiles/components/DeviceCard";
import DeviceRemovalConfirmationDialog from "./DeviceRemovalConfirmationDialog";

const DevicesSection = (props: {
  title: string;
  devices: IDevice[];
  folderId: IContentBucket["id"];
  onAdd: () => void;
  onRemove: () => void;
}) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);

  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false);

  const removeDevice = (id: IDevice["id"]) =>
    ApiController.removeFolderFromDevice(props.folderId, id).then(
      props.onRemove
    );

  const [removalConfirmationDialogId, setRemovalConfirmationDialogId] =
    useState<number | undefined>();

  return (
    <>
      <AstroBentoCard
        title={props.title}
        notCollapsible
        topRightStuff={
          <Stack direction="row" spacing="12px">
            <UrsorButton
              size="small"
              variant="secondary"
              endIcon={ChevronRightIcon}
              iconSize={16}
              onClick={() => setDevicesGridDialogOpen(true)}
            >
              View all
            </UrsorButton>
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
              iconSize={16}
              onClick={props.onAdd}
            >
              Add Device
            </UrsorButton>
          </Stack>
        }
      >
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={i} duration={800} delay={i * 150}>
                <DeviceCard
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
      </AstroBentoCard>
      <AllDevicesDialog
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
        <DeviceRemovalConfirmationDialog
          open={true}
          onClose={() => setRemovalConfirmationDialogId(undefined)}
          onSubmit={() => removeDevice(removalConfirmationDialogId)}
          deviceName={
            props.devices.find((d) => d.id === removalConfirmationDialogId)
              ?.name ?? ""
          }
        />
      ) : null}
    </>
  );
};

export default DevicesSection;

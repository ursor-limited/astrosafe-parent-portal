import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import DeviceCard from "@/app/profiles/components/DeviceCard";
import { useState } from "react";
import ApiController from "@/app/api";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { IContentBucket } from "@/app/profiles/[id]/components/ContentTab";
import AllDevicesDialog from "@/app/components/AllDevicesDialog";

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
              onClick={() => setDevicesGridDialogOpen(true)}
            >
              View all
            </UrsorButton>
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
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
                    <Stack onClick={() => removeDevice(d.id)}>
                      <XIcon height={16} width={16} />
                    </Stack>
                  }
                  hideToggles
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
        title={`${props.devices.length} Device${
          props.devices.length === 1 ? "" : "s"
        } have access to this Folder`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={() => {
          props.onAdd();
          setDevicesGridDialogOpen(false);
        }}
      />
    </>
  );
};

export default DevicesSection;

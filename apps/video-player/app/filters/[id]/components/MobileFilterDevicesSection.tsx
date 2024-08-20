import React from "react";
import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import XIcon from "@/images/icons/X.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import { IDevice } from "../contents/common";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MobileDeviceCard from "@/app/profiles/components/MobileDeviceCard";
import MobileAllDevicesDialog from "@/app/components/MobileAllDevicesDialog";
import { INFOS } from "@/app/profiles/[id]/components/ProfilePageTabLayout";

const MobileFilterPageDevicesSection = (props: {
  devices: IDevice[];
  onAdd: () => void;
  openChangeFilterDialogForDevice: (device: IDevice) => void;
}) => {
  const router = useRouter();
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <AstroBentoCard
        title={
          props.devices.length === 0
            ? "No Devices yet have this Filter applied"
            : props.devices.length === 1
            ? "Filter applied to this Device"
            : `Filter applied to these ${props.devices.length ?? 0} Devices`
        }
        info={INFOS.filterDevice}
        isMobile
        notCollapsible
      >
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="150px" rowGap="12px" columnGap="12px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={i} duration={800} delay={i * 150}>
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                  }}
                >
                  <MobileDeviceCard
                    {...d}
                    button={
                      <Stack
                        onClick={() => props.openChangeFilterDialogForDevice(d)}
                      >
                        <XIcon height={16} width={16} />
                      </Stack>
                    }
                    noExtras
                    onClick={() => router.push(`/profiles/${d.id}`)}
                  />
                </Stack>
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
        <Stack direction="row" spacing="12px" pt="14px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
            iconSize={16}
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
            iconSize={16}
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
        } this Filter applied`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={props.onAdd}
        onRemove={(id) => {
          const device = props.devices.find((d) => d.id === id);
          device && props.openChangeFilterDialogForDevice(device);
        }}
      />
    </>
  );
};

export default MobileFilterPageDevicesSection;

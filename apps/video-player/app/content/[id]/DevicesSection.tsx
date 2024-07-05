import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import _ from "lodash";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { IDevice_new } from "@/app/filters/[id]/FilterPageContents";
import DeviceCard from "@/app/devices/components/DeviceCard";
import { useState } from "react";

const ContentPageDevicesSection = (props: { devices: IDevice_new[] }) => {
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);
  return (
    <AstroBentoCard
      title={`${props.devices.length} Devices have access to this Folder`}
      notCollapsible
      topRightStuff={
        <Stack direction="row" spacing="12px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
          >
            View all
          </UrsorButton>
          <UrsorButton dark variant="tertiary" size="small" endIcon={PlusIcon}>
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
                  <Stack onClick={() => null}>
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
        >
          <PlusIcon height="32px" width="32px" />
          <Typography
            bold
            color={PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]}
          >
            Add a device to see this content
          </Typography>
        </Stack>
      )}
    </AstroBentoCard>
  );
};

export default ContentPageDevicesSection;

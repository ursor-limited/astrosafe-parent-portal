import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { UrsorButton } from "ui";
import _ from "lodash";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { IDevice_new } from "@/app/filters/[id]/FilterPageContents";
import DeviceCard from "@/app/devices/components/DeviceCard";

const ContentPageDevicesSection = (props: { devices: IDevice_new[] }) => {
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
            />
          </UrsorFadeIn>
        ))}
      </DynamicCardGrid>
    </AstroBentoCard>
  );
};

export default ContentPageDevicesSection;

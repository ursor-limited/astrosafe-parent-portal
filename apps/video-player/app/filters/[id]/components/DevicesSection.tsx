import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroSectionCard } from "./AstroSectionCard";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import _ from "lodash";
import { DeviceType, IDevice_new } from "../FilterPageContents";
import DeviceCard from "../../../devices/components/DeviceCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

const FilterPageDevicesSection = (props: { devices: IDevice_new[] }) => {
  return (
    <AstroSectionCard
      title={`Filter applied to these ${props.devices.length} devices`}
      subtitle="Add sites here that you always want to be accessible. Even if you block their corresponding category. Be careful this overrides the filter!"
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
    </AstroSectionCard>
  );
};

export default FilterPageDevicesSection;

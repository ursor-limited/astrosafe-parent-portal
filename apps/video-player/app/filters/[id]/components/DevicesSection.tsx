import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { AstroBentoCard } from "./AstroBentoCard";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import XIcon from "@/images/icons/X.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import _ from "lodash";
import { DeviceType, IDevice } from "../contents/common";
import DeviceCard from "../../../profiles/components/DeviceCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useRouter } from "next/navigation";

const FilterPageDevicesSection = (props: { devices: IDevice[] }) => {
  const router = useRouter();
  return (
    <AstroBentoCard
      title={`Filter applied to these ${props.devices.length} devices`}
      subtitle="Add sites here that you always want to be accessible. Even if you block their corresponding Category. Be careful this overrides the Filter!"
      notCollapsible
      topRightStuff={
        <Stack direction="row" spacing="12px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
            onClick={() => router.push(`/devices`)}
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

export default FilterPageDevicesSection;

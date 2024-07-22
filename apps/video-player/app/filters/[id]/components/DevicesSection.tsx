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

const FilterPageDevicesSection = (props: {
  devices: IDevice[];
  onAdd: () => void;
  onRemove: () => void;
}) => {
  const router = useRouter();
  return (
    <AstroBentoCard
      title={
        props.devices.length === 1
          ? "Filter applied to this Device"
          : `Filter applied to these ${props.devices.length ?? 0} Devices`
      }
      notCollapsible
      topRightStuff={
        <Stack direction="row" spacing="12px">
          <UrsorButton
            size="small"
            variant="secondary"
            endIcon={ChevronRightIcon}
            iconSize={16}
            onClick={() => router.push(`/profiles`)}
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
      <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
        {props.devices.map((d, i) => (
          <UrsorFadeIn key={i} duration={800} delay={i * 150}>
            <DeviceCard
              {...d}
              // button={
              //   <Stack onClick={() => null}>
              //     <XIcon height={16} width={16} />
              //   </Stack>
              // }
            />
          </UrsorFadeIn>
        ))}
      </DynamicCardGrid>
    </AstroBentoCard>
  );
};

export default FilterPageDevicesSection;

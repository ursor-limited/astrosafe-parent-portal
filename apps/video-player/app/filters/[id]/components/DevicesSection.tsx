import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { FilterPageSection } from "./FilterPageSection";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import XIcon from "@/images/icons/X.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import AstroSwitch from "@/app/components/AstroSwitch";
import {
  IFilter,
  IFilterCategory,
  IFilterUrl,
} from "../../FiltersPageContents";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "@/app/components/UrsorTable";
import Image from "next/image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import _ from "lodash";
import { DeviceType, IDevice_new } from "../FilterPageContents";
import AstroCard from "./AstroCard";

interface IAllowedSitesTableRowItems {
  title: string;
  url: string;
  createdAt: string;
}

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: "Android",
  chrome: "Chromebook",
  ios: "iOS",
};

const FilterPageDevicesSection = (props: { devices: IDevice_new[] }) => {
  return (
    <FilterPageSection
      title={`Filter applied to these ${props.devices.length} devices`}
      subtitle="Add sites here that you always want to be accessible. Even if you block their corresponding category. Be careful this overrides the filter!"
    >
      <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
        {props.devices.map((d) => (
          <AstroCard key={d.id} height={90}>
            <Stack direction="row" spacing="8px" position="relative">
              <Stack
                height="74px"
                width="74px"
                borderRadius="100%"
                overflow="hidden"
                bgcolor={d.backgroundColor}
              >
                <Image
                  src={d.profileAvatarUrl}
                  height={74}
                  width={74}
                  alt="device profile"
                />
              </Stack>
              <Stack
                position="absolute"
                top="8px"
                right={0}
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
              >
                <XIcon height={16} width={16} />
              </Stack>
              <Stack justifyContent="center" spacing="4px">
                <Typography bold>{d.name}</Typography>
                <Stack direction="row" spacing="4px" alignItems="center">
                  <PhoneIcon height="8px" width="8px" />
                  <Typography variant="tiny">{d.deviceType}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </AstroCard>
        ))}
      </DynamicCardGrid>
    </FilterPageSection>
  );
};

export default FilterPageDevicesSection;

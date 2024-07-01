import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import { Stack } from "@mui/system";
import { IFilter, IFilterUrl } from "../../FiltersPageContents";
import { PALETTE, Typography } from "ui";
import Image from "next/image";
import AstroSwitch from "@/app/components/AstroSwitch";
import { FilterPageSection } from "./FilterPagerSection";

const FilterPageServicesSection = (props: {
  filter: IFilter;
  services: IFilterUrl[];
  allowedServices: IFilterUrl["id"][];
  flipService: (id: string) => void;
}) => (
  <FilterPageSection
    icon={DesktopIcon}
    title={`${props.filter.allowedServices.length} allowed Services`}
    subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
  >
    <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
      {props.services.map((s) => (
        <Stack
          key={s.id}
          height="72px"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          border={`1px solid ${PALETTE.secondary.grey[2]}`}
          px="16px"
          boxSizing="border-box"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack justifyContent="space-between">
            <Stack spacing="16px" alignItems="center" direction="row">
              <Stack
                borderRadius="8px"
                overflow="hidden"
                boxShadow="0 0 16px rgba(0,0,0,0.08)"
              >
                <Image
                  src={s.imageUrl}
                  height={41}
                  width={41}
                  alt="platform image"
                />
              </Stack>
              <Typography maxLines={1} bold>
                {s.title}
              </Typography>
            </Stack>
          </Stack>
          <AstroSwitch
            on={props.allowedServices.includes(s.id)}
            callback={() => props.flipService(s.id)}
          />
        </Stack>
      ))}
    </DynamicCardGrid>
  </FilterPageSection>
);

export default FilterPageServicesSection;

import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import { IFilter, IFilterUrl } from "../../FiltersPageContents";
import { AstroBentoCard } from "./AstroBentoCard";
import { FilterLegend } from "./CategoriesSection";
import AstroToggleCard from "./AstroToggleCard";
import { Stack } from "@mui/system";
import Image from "next/image";

const FilterPageServicesSection = (props: {
  filter: IFilter;
  services: IFilterUrl[];
  allowedServices: IFilterUrl["id"][];
  flipService: (id: number) => void;
}) => (
  <AstroBentoCard
    icon={DesktopIcon}
    title={`${props.filter.allowedServices.length} allowed Service${
      props.filter.allowedServices.length === 1 ? "" : "s"
    }`}
    subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
    topRightStuff={<FilterLegend />}
  >
    <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
      {props.services.map((s) => (
        <AstroToggleCard
          on={props.allowedServices.includes(s.id)}
          callback={() => props.flipService(s.id)}
          title={s.title}
          image={
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
          }
          key={s.id}
        />
      ))}
    </DynamicCardGrid>
  </AstroBentoCard>
);

export default FilterPageServicesSection;

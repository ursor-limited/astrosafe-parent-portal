import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import { AstroBentoCard } from "./AstroBentoCard";
import { FilterLegend } from "./CategoriesSection";
import AstroToggleCard from "./AstroToggleCard";
import { Stack } from "@mui/system";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { PALETTE } from "ui";
import { IFilter, IFilterUrl } from "../../contents/common";

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
      {props.services.map((s, i) => (
        <UrsorFadeIn key={s.id} duration={800} delay={i * 80}>
          <AstroToggleCard
            on={props.allowedServices.includes(s.id)}
            callback={() => props.flipService(s.id)}
            title={s.title}
            image={
              <Stack position="relative">
                {props.allowedServices.includes(s.id) ? (
                  <Stack
                    position="absolute"
                    top="-6px"
                    right="-10px"
                    width="20px"
                    height="20px"
                    bgcolor={PALETTE.secondary.green[4]}
                    sx={{ svg: { path: { fill: "rgb(255,255,255)" } } }}
                    borderRadius="100%"
                    overflow="hidden"
                    border="1.5px solid white"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CheckIcon width="12px" height="12px" />
                  </Stack>
                ) : null}
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
              </Stack>
            }
            key={s.id}
          />
        </UrsorFadeIn>
      ))}
    </DynamicCardGrid>
  </AstroBentoCard>
);

export default FilterPageServicesSection;

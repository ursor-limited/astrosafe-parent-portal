import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import { AstroBentoCard } from "../../../filters/[id]/components/AstroBentoCard";
import { FilterLegend } from "../../../filters/[id]/components/CategoriesSection";
import AstroToggleCard from "../../../filters/[id]/components/AstroToggleCard";
import { Stack } from "@mui/system";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { PALETTE } from "ui";
import { IFilterUrl } from "../../../filters/contents/common";

export interface IApp {
  id: number;
  title: string;
  url: string;
  logoUrl: string;
  description: string;
}

const AppsTab = (props: {
  apps: IApp[];
  allowedServices: IFilterUrl["id"][];
  flipService: (id: number) => void;
}) => (
  <AstroBentoCard
    icon={DesktopIcon}
    title={`${props.apps.length} allowed Service${
      props.apps.length === 1 ? "" : "s"
    }`}
    subtitle="Turn the switch on to allow the Category to be browsed on the assigned Devices."
    topRightStuff={<FilterLegend />}
  >
    <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
      {props.apps.map((a, i) => (
        <UrsorFadeIn key={a.id} duration={800} delay={i * 80}>
          <AstroToggleCard
            on={props.allowedServices.includes(a.id)}
            callback={() => props.flipService(a.id)}
            title={a.title}
            image={
              <Stack position="relative">
                {props.allowedServices.includes(a.id) ? (
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
                    src={a.logoUrl}
                    height={41}
                    width={41}
                    alt="platform image"
                  />
                </Stack>
              </Stack>
            }
            key={a.id}
          />
        </UrsorFadeIn>
      ))}
    </DynamicCardGrid>
  </AstroBentoCard>
);

export default AppsTab;

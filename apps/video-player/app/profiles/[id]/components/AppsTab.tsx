import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import { AstroBentoCard } from "../../../filters/[id]/components/AstroBentoCard";
import { FilterLegend } from "../../../filters/[id]/components/CategoriesSection";
import AppToggleCard from "../components/AppToggleCard";
import { Stack } from "@mui/system";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { PALETTE, UrsorButton } from "ui";
import { IFilterUrl } from "../../../filters/contents/common";
import ProfilePageTabLayout from "./ProfilePageTabLayout";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { useEffect, useState } from "react";
import ApiController from "@/app/api";
import AstroCard from "@/app/filters/[id]/components/AstroCard";
import _ from "lodash";

const PAGE_SIZE = 20;

export interface IAppCategory {
  id: number;
  title: string;
}

export interface IApp {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  categoryId: IAppCategory["id"];
  description: string;
  enabled: boolean;
}

const DevicePageAppsTab = (props: { deviceId: IDevice["id"] }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [apps, setApps] = useState<IApp[]>([]);
  useEffect(() => {
    ApiController.getApps(props.deviceId, pageIndex + 1, PAGE_SIZE).then(
      (apps_) => setApps(_.sortBy(apps_, (a) => a.id))
    );
  }, [props.deviceId, pageIndex]);
  return (
    <ProfilePageTabLayout
      title="Apps"
      rightSideElement={<FilterLegend />}
      explanation="Donkey Kong 64 is a sequel to the Donkey Kong Country trilogy and is so far the only game in the series without the word 'Country' in the title alongside Chunky Kong's only significant video game appearance. It received generally positive reviews with an average score of 88% according to gamerankings."
    >
      <Stack pb="32px">
        <AstroCard>
          <Stack p="16px">
            <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
              {apps.map((a, i) => (
                <UrsorFadeIn key={a.id} duration={800} delay={i * 80}>
                  <AppToggleCard
                    {...a}
                    callback={() => {
                      setApps(
                        apps.map((app) =>
                          app.id === a.id
                            ? { ...app, enabled: !app.enabled }
                            : app
                        )
                      );
                      (a.enabled
                        ? ApiController.disableApp
                        : ApiController.enableApp)(props.deviceId, a.id);
                    }}
                  />
                </UrsorFadeIn>
              ))}
            </DynamicCardGrid>
          </Stack>
        </AstroCard>
      </Stack>
    </ProfilePageTabLayout>
  );
};

export default DevicePageAppsTab;

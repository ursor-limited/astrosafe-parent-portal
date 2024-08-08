import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChevronLeftIcon from "@/images/icons/ChevronLeft.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import { AstroBentoCard } from "../../../filters/[id]/components/AstroBentoCard";
import { FilterLegend } from "../../../filters/[id]/components/CategoriesSection";
import AppToggleCard from "../components/AppToggleCard";
import { Stack } from "@mui/system";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IFilterUrl } from "../../../filters/contents/common";
import ProfilePageTabLayout from "./ProfilePageTabLayout";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { useEffect, useState } from "react";
import ApiController from "@/app/api";
import AstroCard from "@/app/filters/[id]/components/AstroCard";
import _ from "lodash";

const PAGE_SIZE = 20;
const N_PAGES = 6;

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
          <Stack px="16px" pt="16px" justifyContent="center">
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
            <Stack
              direction="row"
              spacing="22px"
              alignItems="center"
              justifyContent="center"
              py="20px"
            >
              {[
                <Stack
                  key="left"
                  sx={{
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.7 },
                    pointerEvents: pageIndex === 0 ? "none" : undefined,
                    opacity: pageIndex === 0 ? 0.4 : 1,
                  }}
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  <ChevronLeftIcon height="15px" width="15px" />
                </Stack>,
                ...[...Array(N_PAGES).keys()].map((i) => (
                  <Stack
                    key={i}
                    sx={{
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": { opacity: 0.7 },
                      pointerEvents: pageIndex === i ? "none" : undefined,
                    }}
                    onClick={() => setPageIndex(i)}
                  >
                    <Typography
                      bold
                      sx={{ fontSize: 14 }}
                      color={
                        i === pageIndex
                          ? PALETTE.secondary.purple[2]
                          : PALETTE.secondary.grey[3]
                      }
                    >
                      {i + 1}
                    </Typography>
                  </Stack>
                )),
                <Stack
                  key="right"
                  sx={{
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.7 },
                    pointerEvents:
                      pageIndex === N_PAGES - 1 ? "none" : undefined,
                    opacity: pageIndex === N_PAGES - 1 ? 0.4 : 1,
                  }}
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  <ChevronRightIcon height="15px" width="15px" />
                </Stack>,
              ]}
            </Stack>
          </Stack>
        </AstroCard>
      </Stack>
    </ProfilePageTabLayout>
  );
};

export default DevicePageAppsTab;

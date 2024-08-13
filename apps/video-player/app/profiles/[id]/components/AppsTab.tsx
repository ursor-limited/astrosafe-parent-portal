import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { FilterLegend } from "../../../filters/[id]/components/CategoriesSection";
import AppToggleCard from "../components/AppToggleCard";
import { Stack } from "@mui/system";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton } from "ui";
import {
  IFilterSubcategory,
  IFilterUrl,
} from "../../../filters/contents/common";
import ProfilePageTabLayout from "./ProfilePageTabLayout";
import { IDevice } from "@/app/filters/[id]/contents/common";
import { useContext, useEffect, useState } from "react";
import ApiController from "@/app/api";
import AstroCard from "@/app/filters/[id]/components/AstroCard";
import _ from "lodash";
import NotificationContext from "@/app/components/NotificationContext";
import PageSelector from "../../../components/PageSelector";
import { SearchInput } from "@/app/components/SearchInput";

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

const DevicePageAppsTab = (props: {
  deviceId: IDevice["id"];
  isMobile?: boolean;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [categories, setCategories] = useState<IFilterSubcategory[]>([]);
  useEffect(() => {
    ApiController.getAllFilterCategories().then(setCategories);
  }, []);

  const [nPages, setNPages] = useState<number>(1);

  const [pageIndex, setPageIndex] = useState<number>(0);
  useEffect(() => setPageIndex(0), [selectedCategory]);

  const [apps, setApps] = useState<IApp[]>([]);
  useEffect(() => {
    ApiController.getApps(
      props.deviceId,
      pageIndex + 1,
      PAGE_SIZE,
      selectedCategory
    ).then((response) => {
      setApps(_.sortBy(response.apps, (a) => a.id));
      setNPages(response.pages);
    });
  }, [props.deviceId, pageIndex, selectedCategory]);

  const notificationCtx = useContext(NotificationContext);

  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredApps, setFilteredApps] = useState<IApp[]>([]);
  useEffect(
    () =>
      setFilteredApps(
        apps.filter(
          (d) =>
            !searchValue ||
            d.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [apps, searchValue]
  );

  return (
    <ProfilePageTabLayout
      title="Apps"
      rightSideElement={!props.isMobile ? <FilterLegend /> : undefined}
      explanation="Donkey Kong 64 is a sequel to the Donkey Kong Country trilogy and is so far the only game in the series without the word 'Country' in the title alongside Chunky Kong's only significant video game appearance. It received generally positive reviews with an average score of 88% according to gamerankings."
    >
      {props.isMobile ? (
        <Stack alignItems="flex-end">
          <FilterLegend small={props.isMobile} />
        </Stack>
      ) : null}
      <Stack pb="32px">
        <AstroCard>
          <Stack px="16px" pt="16px" justifyContent="center">
            <Stack direction="row" spacing="12px">
              <Stack overflow="scroll">
                <Stack direction="row" spacing="12px" pb="20px">
                  {[
                    <Stack
                      key="all"
                      height="32px"
                      borderRadius="6px"
                      bgcolor={PALETTE.secondary.grey[1]}
                      justifyContent="center"
                      alignItems="center"
                      px="12px"
                      onClick={() => setSelectedCategory(undefined)}
                      sx={{
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": { opacity: 0.7 },
                      }}
                    >
                      <Typography
                        bold
                        sx={{ fontSize: 14, whiteSpace: "nowrap" }}
                        color={
                          _.isUndefined(selectedCategory)
                            ? PALETTE.secondary.purple[2]
                            : undefined
                        }
                      >
                        All
                      </Typography>
                    </Stack>,
                    ...categories.map((c) => (
                      <Stack
                        key={c.categoryId}
                        height="32px"
                        borderRadius="6px"
                        bgcolor={PALETTE.secondary.grey[1]}
                        justifyContent="center"
                        alignItems="center"
                        px="12px"
                        onClick={() => setSelectedCategory(c.categoryId)}
                        sx={{
                          cursor: "pointer",
                          transition: "0.2s",
                          "&:hover": { opacity: 0.7 },
                        }}
                      >
                        <Typography
                          bold
                          sx={{ fontSize: 14, whiteSpace: "nowrap" }}
                          color={
                            selectedCategory === c.categoryId
                              ? PALETTE.secondary.purple[2]
                              : undefined
                          }
                        >
                          {c.title}
                        </Typography>
                      </Stack>
                    )),
                  ]}
                </Stack>
              </Stack>
              <Stack pt="2px">
                <SearchInput
                  value={searchValue}
                  callback={setSearchValue}
                  clearCallback={() => setSearchValue("")}
                  grey
                />
              </Stack>
            </Stack>
            <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
              {filteredApps.map((a, i) => (
                <UrsorFadeIn key={a.id} duration={800} delay={i * 80}>
                  <AppToggleCard
                    {...a}
                    callback={() => {
                      setApps(
                        filteredApps.map((app) =>
                          app.id === a.id
                            ? { ...app, enabled: !app.enabled }
                            : app
                        )
                      );
                      (a.enabled
                        ? ApiController.disableApp
                        : ApiController.enableApp)(props.deviceId, a.id).then(
                        () =>
                          notificationCtx.success(
                            a.enabled
                              ? `Disabled ${a.title}`
                              : `Enabled ${a.title}`
                          )
                      );
                    }}
                  />
                </UrsorFadeIn>
              ))}
            </DynamicCardGrid>
            <Stack py="20px">
              <PageSelector
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                nPages={nPages}
              />
            </Stack>
          </Stack>
        </AstroCard>
      </Stack>
    </ProfilePageTabLayout>
  );
};

export default DevicePageAppsTab;

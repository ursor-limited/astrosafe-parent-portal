import DynamicCardGrid from "@/components/DynamicCardGrid";
import AppToggleCard from "./AppToggleCard";
import { Stack } from "@mui/system";
import UrsorFadeIn from "@/components/UrsorFadeIn";
import { PALETTE, Typography, UrsorButton } from "@/ui";
import {
  IFilterSubcategory,
  IFilterUrl,
} from "../../../filters/contents/common";
import ProfilePageTabLayout from "./ProfilePageTabLayout";
import { IDevice } from "@/filters/[id]/contents/common";
import { useContext, useEffect, useState } from "react";
import ApiController from "@/app/api";
import AstroCard from "@/filters/[id]/components/AstroCard";
import _ from "lodash";
import NotificationContext from "@/components/NotificationContext";
import PageSelector from "../../../components/PageSelector";
import { SearchInput } from "@/components/SearchInput";

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

export const AppsLegend = (props: { small?: boolean }) => (
  <Stack direction="row" spacing="20px">
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? "7px" : "10px"}
      >
        <Typography variant={props.small ? "small" : "normal"} bold>
          Enabled
        </Typography>
        <Stack
          height={props.small ? "12px" : "16px"}
          width={props.small ? "12px" : "16px"}
          borderRadius="100%"
          bgcolor={PALETTE.system.green}
        />
      </Stack>
    </Stack>
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={props.small ? "7px" : "10px"}
      >
        <Typography variant={props.small ? "small" : "normal"} bold>
          Disabled
        </Typography>
        <Stack
          height={props.small ? "12px" : "16px"}
          width={props.small ? "12px" : "16px"}
          borderRadius="100%"
          bgcolor={PALETTE.secondary.grey[3]}
        />
      </Stack>
    </Stack>
  </Stack>
);

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

  const [searchValue, setSearchValue] = useState<string>("");
  const [apps, setApps] = useState<IApp[]>([]);
  const [filteredApps, setFilteredApps] = useState<IApp[]>([]);

  useEffect(() => {
    ApiController.getApps(
      props.deviceId,
      pageIndex + 1,
      PAGE_SIZE,
      selectedCategory,
      searchValue
    ).then((response) => {
      setApps(_.sortBy(response.apps, (a) => a.id));
      setNPages(response.pages);
    });
  }, [props.deviceId, pageIndex, selectedCategory, searchValue]);

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

  const notificationCtx = useContext(NotificationContext);

  return (
    <ProfilePageTabLayout
      title="Apps"
      rightSideElement={!props.isMobile ? <AppsLegend /> : undefined}
      info={{
        title: "How do apps work?",
        text: "Apps provide quick access on your kid's Browser to hand-picked resources that provide a lot of value. Toggle them on and they"ll be accessible on your kid's Device and we'll make sure the Filter doesn"t interfere with access to them. Please note that we do override the Filter to allow access to the Apps that you select! So if you have social media access turned off but toggle on a social media app we will allow access to it.",
      }}
    >
      {props.isMobile ? (
        <Stack alignItems="flex-end">
          <AppsLegend small={props.isMobile} />
        </Stack>
      ) : null}
      <Stack pb="32px">
        <AstroCard>
          <Stack px="16px" pt="16px" justifyContent="center">
            <Stack
              direction="row"
              spacing="12px"
              justifyContent="space-between"
            >
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
                      setFilteredApps(
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

"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";

import PlusIcon from "@/images/icons/PlusIcon.svg";
import DesktopIcon from "@/images/icons/DesktopIcon.svg";
import ThumbsUpIcon from "@/images/icons/ThumbsUpIcon.svg";
import PageLayout from "@/app/dashboard/PageLayout";
import {
  DUMMY_BLOCKED_SITES,
  DUMMY_CATEGORIES,
  DUMMY_FILTERS,
  DUMMY_SERVICES,
  IFilter,
  IFilterCategory,
  IFilterUrl,
} from "../FiltersPageContents";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import Image from "next/image";
import AstroSwitch from "@/app/components/AstroSwitch";

const FilterPageSection = (props: {
  title: string;
  subtitle: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}) => (
  <Stack bgcolor="rgb(255,255,255)" borderRadius="12px" spacing="20px" p="16px">
    <Stack>
      <Stack justifyContent="space-between" direction="row">
        <Stack>
          <Stack
            direction="row"
            sx={{ svg: { path: { fill: PALETTE.system.green } } }}
            alignItems="center"
            spacing="8px"
          >
            <props.icon height="20px" width="20px" />
            <Typography variant="large" bold>
              {props.title}
            </Typography>
          </Stack>
          <Typography color={PALETTE.secondary.grey[4]} variant="small">
            {props.subtitle}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="20px">
          <Stack>
            <Stack direction="row" alignItems="center" spacing="10px">
              <Typography bold>Allowed</Typography>
              <Stack
                height="15px"
                width="16px"
                borderRadius="100%"
                bgcolor={PALETTE.system.green}
              />
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" alignItems="center" spacing="10px">
              <Typography bold>Blocked</Typography>
              <Stack
                height="15px"
                width="16px"
                borderRadius="100%"
                bgcolor={PALETTE.secondary.grey[3]}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    {props.children}
  </Stack>
);

export default function FilterPageContents() {
  // const [fl, setChannels] = useState<IChannel[] | undefined>(undefined);
  // const loadChannels = () =>
  //   BrowserApiController.getChannelsInSchool(userDetails?.schoolId ?? "")
  //     .then((c) => setChannels(c))
  //     .catch((error) => notificationCtx.error(error.message));
  // useEffect(() => {
  //   userDetails?.schoolId && loadChannels();
  // }, [userDetails?.schoolId]);

  const [filter, setFilter] = useState<IFilter>(DUMMY_FILTERS[0]);
  const [blockedSites, setBlockedSites] =
    useState<IFilterUrl[]>(DUMMY_BLOCKED_SITES);
  const [allowedSites, setAllowedSites] = useState<IFilterUrl[]>([]);

  const [categories, setCategories] =
    useState<IFilterCategory[]>(DUMMY_CATEGORIES);
  const [allowedCategories, setAllowedCategories] = useState<
    IFilterUrl["id"][]
  >([]);
  useEffect(() => setAllowedServices(filter.allowedCategories), [filter]);

  const [services, setServices] = useState<IFilterUrl[]>(DUMMY_SERVICES);
  const [allowedServices, setAllowedServices] = useState<IFilterUrl["id"][]>(
    []
  );
  useEffect(() => setAllowedServices(filter.allowedServices), [filter]);

  return (
    <PageLayout
      title="My Filters"
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="channels"
      button={{
        text: "Add a Filter",
        callback: () => null,
        icon: PlusIcon,
      }}
      maxWidth={834}
    >
      <Stack px="49px" spacing="20px">
        <FilterPageSection
          icon={DesktopIcon}
          title={`${filter.allowedServices.length} allowed Services`}
          subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
        >
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {services.map((s) => (
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
                  on={allowedServices.includes(s.id)}
                  callback={() =>
                    setAllowedServices(
                      allowedServices.includes(s.id)
                        ? allowedServices.filter((sid) => sid !== s.id)
                        : [...allowedServices, s.id]
                    )
                  }
                />
              </Stack>
            ))}
          </DynamicCardGrid>
        </FilterPageSection>
        <FilterPageSection
          icon={ThumbsUpIcon}
          title={`${filter.allowedCategories.length} allowed Categories`}
          subtitle="Turn the switch on to allow the category to be browsed on the assigned devices."
        >
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {categories.map((c) => (
              <Stack
                key={c.id}
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
                    <Typography maxLines={1} bold>
                      {c.title}
                    </Typography>
                  </Stack>
                </Stack>
                <AstroSwitch
                  on={allowedCategories.includes(c.id)}
                  callback={() =>
                    setAllowedCategories(
                      allowedCategories.includes(c.id)
                        ? allowedCategories.filter((sid) => sid !== c.id)
                        : [...allowedCategories, c.id]
                    )
                  }
                />
              </Stack>
            ))}
          </DynamicCardGrid>
        </FilterPageSection>
      </Stack>
    </PageLayout>
  );
}

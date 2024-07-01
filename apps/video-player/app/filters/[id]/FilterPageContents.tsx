"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";

import PlusIcon from "@/images/icons/PlusIcon.svg";
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
import { FilterPageSection } from "./components/FilterPagerSection";
import FilterPageServicesSection from "./components/ServicesSection";

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
        <FilterPageServicesSection
          filter={filter}
          services={services}
          allowedServices={allowedServices}
          flipService={(id) =>
            setAllowedServices(
              allowedServices.includes(id)
                ? allowedServices.filter((sid) => sid !== id)
                : [...allowedServices, id]
            )
          }
        />
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

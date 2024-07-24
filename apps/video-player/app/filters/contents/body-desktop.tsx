"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { Stack } from "@mui/system";
import UrsorFadeIn from "../../components/UrsorFadeIn";
import _ from "lodash";
import DynamicCardGrid from "../../components/DynamicCardGrid";
import { useRouter } from "next/navigation";
import PageLayout from "../../components/PageLayout";
import FilterCard from "../[id]/components/FilterCard";
import { IFilter } from "./common";
import ApiController from "@/app/api";

export const GRID_SPACING = "20px";

export const DUMMY_GROUP_ID = 1;

export default function AllFiltersPageDesktopBody(props: {
  filters: IFilter[];
  setCreateFilterDialogOpen: () => void;
}) {
  const router = useRouter();
  return (
    <PageLayout
      title="My Filters"
      titleBackButton={true}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="filters"
      button={{
        text: "Add a Filter",
        callback: props.setCreateFilterDialogOpen,
        icon: PlusIcon,
      }}
      maxWidth={834}
    >
      <Stack px="50px">
        <DynamicCardGrid cardWidth="350px" rowGap="20px" columnGap="20px">
          {props.filters.map((f, i) => (
            <Stack
              key={f.id}
              sx={{
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { opacity: 0.6 },
              }}
              onClick={() => router.push(`/filters/${f.id}`)}
            >
              <UrsorFadeIn duration={800} delay={i * 150}>
                <FilterCard
                  {...f}
                  deviceImageUrls={[
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/boo!.webp",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                    "https://ursorassets.s3.eu-west-1.amazonaws.com/lele_profile.jpg",
                  ]}
                />
              </UrsorFadeIn>
            </Stack>
          ))}
        </DynamicCardGrid>
      </Stack>
    </PageLayout>
  );
}
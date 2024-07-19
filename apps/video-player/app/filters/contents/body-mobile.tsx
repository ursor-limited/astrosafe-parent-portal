"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import LockIcon from "@/images/icons/LockIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";
import UrsorFadeIn from "../../components/UrsorFadeIn";
import _ from "lodash";
import DynamicCardGrid from "../../components/DynamicCardGrid";
import { useRouter } from "next/navigation";
import ProfileImageRow from "../[id]/components/ProfileImageRow";
import PageLayout from "../../components/PageLayout";
import FilterCard from "../[id]/components/FilterCard";
import { IFilter } from "./common";
import { DUMMY_FILTERS } from "./body-desktop";
import MobilePageLayout from "@/app/components/MobilePageLayout";

export const GRID_SPACING = "20px";

export const DUMMY_GROUP_ID = 1;

export default function AllFiltersPageMobileBody(props: {
  filters: IFilter[];
  createFilter: () => void;
}) {
  const router = useRouter();

  return (
    <MobilePageLayout
      title="My Filters"
      topRightElement={
        <UrsorButton
          dark
          variant="tertiary"
          size="small"
          endIcon={PlusIcon}
          onClick={props.createFilter}
        >
          Create a Filter
        </UrsorButton>
      }
    >
      <DynamicCardGrid cardWidth="350px" rowGap="20px" columnGap="20px">
        {DUMMY_FILTERS.map((f, i) => (
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
    </MobilePageLayout>
  );
}

"use client";

import React from "react";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { UrsorButton } from "@/ui";
import { Stack } from "@mui/system";
import UrsorFadeIn from "../../components/UrsorFadeIn";
import _ from "lodash";
import DynamicCardGrid from "../../components/DynamicCardGrid";
import { useRouter } from "next/navigation";
import FilterCard from "../[id]/components/FilterCard";
import { IGroupFilter } from "./common";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import { INFOS } from "@/app/profiles/[id]/components/ProfilePageTabLayout";

export const GRID_SPACING = "20px";

export const DUMMY_GROUP_ID = 2;

export default function AllFiltersPageMobileBody(props: {
  filters: IGroupFilter[];
  setCreateFilterDialogOpen: () => void;
}) {
  const router = useRouter();

  return (
    <MobilePageLayout
      title="My Filters"
      info={INFOS.filters}
      selectedPage="filters"
      topRightElement={
        <UrsorButton
          dark
          variant="tertiary"
          size="small"
          endIcon={PlusIcon}
          onClick={props.setCreateFilterDialogOpen}
        >
          Add a Filter
        </UrsorButton>
      }
    >
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
              <FilterCard {...f} isMobile />
            </UrsorFadeIn>
          </Stack>
        ))}
      </DynamicCardGrid>
    </MobilePageLayout>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import CollectionPageBento, {
  ContentPagePreviewCard,
} from "./CollectionPageBento";
import {
  IPediaCollectionPage,
  IPediaPage,
} from "@/app/p/[pageId]/PediaPageContents";
import LayoutCard from "@/app/components/LayoutCard";
import { Stack } from "@mui/system";
import { Header } from "@/app/components/Header";
import { isMobile } from "react-device-detect";

const N_COLUMNS = 12;
export const GRID_SPACING = 24;
const MOBILE_VIEW_IMAGE_HEIGHT = "200px";

export interface IMobileCollectionPageColumn {
  pages: IPediaPage[];
}

export function MobileCollectionPageColumn(props: IMobileCollectionPageColumn) {
  return (
    <Stack px="30px" height="100%" width="100%" spacing="12px">
      {props.pages.map((p, i) => (
        <Stack
          height={MOBILE_VIEW_IMAGE_HEIGHT}
          minHeight={MOBILE_VIEW_IMAGE_HEIGHT}
          key={p.id}
        >
          <ContentPagePreviewCard
            title={p.title}
            imageUrl={p.mainCard.imageUrl}
            pageId={p.id}
            titleAtBottom
            titleOnRight={!!(i % 2)}
            fontSize="h5"
          />
        </Stack>
      ))}
      <Stack minHeight="30px" />
    </Stack>
  );
}

export interface IPediaCollectionPageProps {
  pageDetails: IPediaCollectionPage;
  childPages: IPediaPage[];
}

export default function PediaCollectionPageContents(
  props: IPediaCollectionPageProps
) {
  const { width } = useWindowSize();
  const [columnWidth, setColumnWidth] = useState<number>(0);
  useEffect(() => {
    width && setColumnWidth((width - GRID_SPACING) / N_COLUMNS - GRID_SPACING);
  }, [width]);

  return (
    <Stack width="100vw" height="100vh" alignItems="center">
      <Header />
      {isMobile ? (
        <Stack width="100%" height="100%">
          <MobileCollectionPageColumn pages={props.childPages} />
        </Stack>
      ) : props.pageDetails ? (
        <LayoutCard title={props.pageDetails.title}>
          <CollectionPageBento pages={props.childPages} />
        </LayoutCard>
      ) : (
        <></>
      )}
    </Stack>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import CollectionPageBento, {
  ContentPagePreviewCard,
} from "./CollectionPageBento";
import {
  IPediaCollectionPage,
  IPediaPage,
} from "@/app/p/[urlId]/PediaPageContents";
import LayoutCard from "@/app/components/LayoutCard";
import { Stack } from "@mui/system";
import { Header } from "@/app/components/Header";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

const N_COLUMNS = 12;
export const GRID_SPACING = 24;
const MOBILE_VIEW_IMAGE_HEIGHT = "200px";
export const MOBILE_WINDOW_WIDTH_THRESHOLD = 960;

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
            imageUrl={p.mainImage}
            color={p.color}
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
  articles: IPediaPage[];
}

export default function PediaCollectionPageContents(
  props: IPediaCollectionPageProps
) {
  const { width } = useWindowSize();
  const [columnWidth, setColumnWidth] = useState<number>(0);
  useEffect(() => {
    width && setColumnWidth((width - GRID_SPACING) / N_COLUMNS - GRID_SPACING);
  }, [width]);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  return (
    <Stack width="100vw" height="100vh" alignItems="center">
      <Header />
      {isMobile && props.pageDetails ? (
        <Stack width="100%" height="100%">
          <UrsorFadeIn duration={1000}>
            <MobileCollectionPageColumn pages={props.articles} />
          </UrsorFadeIn>
        </Stack>
      ) : props.pageDetails ? (
        <LayoutCard
          title={props.pageDetails.title}
          category={
            props.articles
              .slice(0, -1)
              .map((a) => a.title)
              .join(", ") +
            ` and ${props.articles[props.articles.length - 1].title}`
          }
          // subtitle={`${props.articles
          //   .map((a) => a.title)
          //   .join(", ")} facts for kids.`}
        >
          <UrsorFadeIn delay={500} duration={1000}>
            <CollectionPageBento pages={props.articles} />
          </UrsorFadeIn>
        </LayoutCard>
      ) : (
        <></>
      )}
    </Stack>
  );
}

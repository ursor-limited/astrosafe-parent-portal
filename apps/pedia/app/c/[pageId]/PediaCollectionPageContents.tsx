"use client";

import React, { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import CollectionPageBento from "./CollectionPageBento";
import {
  IPediaCollectionPage,
  IPediaPage,
} from "@/app/p/[pageId]/PediaPageContents";
import LayoutCard from "@/app/components/LayoutCard";

const N_COLUMNS = 12;
export const GRID_SPACING = 24;

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

  return props.pageDetails ? (
    <LayoutCard title={props.pageDetails.title}>
      <CollectionPageBento pages={props.childPages} />
    </LayoutCard>
  ) : (
    <></>
  );
}

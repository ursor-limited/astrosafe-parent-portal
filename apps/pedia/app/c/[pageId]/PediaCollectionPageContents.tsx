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
import { Box, Stack, keyframes } from "@mui/system";
import { Header } from "@/app/components/Header";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { PALETTE, Typography } from "ui";
import Byte, { ByteAnimation } from "@/app/components/Byte";

const N_COLUMNS = 12;
export const GRID_SPACING = 24;
const MOBILE_VIEW_IMAGE_HEIGHT = "200px";
export const MOBILE_WINDOW_WIDTH_THRESHOLD = 960;

const PULSE_AMPLITUDE = "3px";
const PULSE_PERIOD = "2s";

export const pulse = keyframes`
  from {
    transform: translateY(-${PULSE_AMPLITUDE})
  }
  to {
    transform: translateY(${PULSE_AMPLITUDE})
  }
`;

interface ICollectionPageNotificationProps {
  title: string;
  subtitle: string;
  animation: ByteAnimation;
  titleBackground: string;
}

export function CollectionPageNotification(
  props: ICollectionPageNotificationProps
) {
  return (
    <Stack alignItems="center" spacing="3px" pb="66px">
      <Box
        sx={{
          animation: `${pulse} ${PULSE_PERIOD} ease-in-out`,
          animationDirection: "alternate",
          animationIterationCount: "infinite",
        }}
      >
        <Byte
          animation={props.animation}
          size={45}
          loop={props.animation === "loading"}
        />
      </Box>
      <Stack
        sx={{
          background: props.titleBackground,
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
        }}
      >
        <Typography variant="h4">{props.title}</Typography>
      </Stack>
      <Typography color="rgba(255,255,255,0.45)" bold>
        {props.subtitle}
      </Typography>
    </Stack>
  );
}

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

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header />
      <CollectionPageNotification
        title={loading ? "Creating your new Collection" : "Collection created"}
        subtitle={loading ? "This may take a few minutes." : "Enjoy!"}
        animation={loading ? "loading" : "celebration"}
        titleBackground={
          loading
            ? "linear-gradient(0deg, #6596FF, #7B61FF)"
            : "linear-gradient(2deg, #0AE799, #1D62F6)"
        }
      />
      {isMobile && props.pageDetails ? (
        <Stack width="100%" height="100%">
          <UrsorFadeIn duration={1000}>
            <MobileCollectionPageColumn pages={props.articles} />
          </UrsorFadeIn>
        </Stack>
      ) : props.pageDetails ? (
        <LayoutCard
          title={props.pageDetails.title}
          titleColor={loading ? PALETTE.secondary.grey[4] : undefined}
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
          <Stack
            sx={{
              opacity: loading ? 0.6 : 1,
            }}
          >
            <UrsorFadeIn delay={500} duration={1000}>
              <CollectionPageBento pages={props.articles} loading={loading} />
            </UrsorFadeIn>
          </Stack>
        </LayoutCard>
      ) : (
        <></>
      )}
    </Stack>
  );
}

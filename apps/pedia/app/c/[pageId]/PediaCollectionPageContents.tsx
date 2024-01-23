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
import { PALETTE, Typography, UrsorInputField } from "ui";
import { ByteAnimation } from "@/app/components/Byte";
import UrsorDialog from "@/app/components/UrsorDialog";
import dynamic from "next/dynamic";
import ApiController from "@/app/api";

const Byte = dynamic(
  () => import("@/app/components/Byte"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const N_COLUMNS = 12;
export const GRID_SPACING = 24;
const MOBILE_VIEW_IMAGE_HEIGHT = "200px";
export const MOBILE_WINDOW_WIDTH_THRESHOLD = 960;

const PULSE_AMPLITUDE = "2px";
const PULSE_PERIOD = "2s";

const TITLE_CHARACTER_LIMIT = 40;

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
    <Stack alignItems="center">
      <Stack direction="row" alignItems="center" spacing="12px">
        <Box
          sx={{
            animation: `${pulse} ${PULSE_PERIOD} ease-in-out`,
            animationDirection: "alternate",
            animationIterationCount: "infinite",
          }}
          pb="4px"
        >
          <Byte
            animation={props.animation}
            size={30}
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
          <Typography variant="h5">{props.title}</Typography>
        </Stack>
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
            urlId={p.urlId}
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
  //titleUpdateCallback: (title: string) => void;
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

  const [editTitleDialogOpen, setEditTitleDialogOpen] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 8000);
  //   setTimeout(() => setEditTitleDialogOpen(true), 3000);
  // }, []);

  const [titleInputValue, setTitleInputValue] = useState<string>("");
  useEffect(() => {
    setTitleInputValue(props.pageDetails.title);
  }, [props.pageDetails.title]);

  return (
    <>
      <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
        <Header />
        <Stack spacing="20px" width="100%">
          {/* <CollectionPageNotification
            title={
              loading ? "Creating your new Collection" : "Collection created"
            }
            subtitle={
              loading
                ? "This may take a few minutes."
                : "You can edit this at any time."
            }
            animation={loading ? "loading" : "celebration"}
            titleBackground={
              loading
                ? "linear-gradient(0deg, #6596FF, #7B61FF)"
                : "linear-gradient(4deg, #0AE799, #1D62F6)"
            }
          /> */}
          {isMobile && props.pageDetails ? (
            <Stack width="100%" height="100%">
              <UrsorFadeIn duration={1000}>
                <MobileCollectionPageColumn pages={props.articles} />
              </UrsorFadeIn>
            </Stack>
          ) : props.pageDetails ? (
            <UrsorFadeIn duration={800}>
              <LayoutCard
                title={titleInputValue}
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
                editTitleCallback={() => setEditTitleDialogOpen(true)}
              >
                <Stack
                  sx={{
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  <UrsorFadeIn delay={500} duration={1000}>
                    <CollectionPageBento
                      pages={props.articles}
                      collectionPageId={props.pageDetails.id}
                      loading={loading}
                    />
                  </UrsorFadeIn>
                </Stack>
              </LayoutCard>
            </UrsorFadeIn>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
      <UrsorDialog
        width="738px"
        height="464px"
        supertitle="Choose a title"
        title={"Lets choose a title for your Collection"}
        subtitle={[
          "You can go with the title that we have come up with,",
          "or you can provide your own.",
        ]}
        open={editTitleDialogOpen}
        button={{
          text: "Complete",
          callback: () =>
            ApiController.updateCollectionTitle(
              props.pageDetails.id,
              titleInputValue
            ).then(() => setEditTitleDialogOpen(false)),
        }}
        onCloseCallback={() => setEditTitleDialogOpen(false)}
      >
        <Stack width="100%" flex={1} justifyContent="100%" alignItems="100%">
          <UrsorInputField
            value={titleInputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              event.target.value.length < TITLE_CHARACTER_LIMIT &&
              setTitleInputValue(event.target.value)
            }
            placeholder="Title"
            width="100%"
            leftAlign
            boldValue
          />
        </Stack>
      </UrsorDialog>
    </>
  );
}

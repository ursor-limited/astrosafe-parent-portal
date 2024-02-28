"use client";

import { Stack } from "@mui/system";
import PageLayout, { SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { IVideo } from "./AstroContentColumns";
import { useEffect, useState } from "react";
import ApiController from "../api";
import _ from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import VideoCard from "../components/VideoCard";
import { IWorksheet } from "../landing/[urlId]/WorksheetGenerator";
import useColumnWidth from "./useColumnWidth";

export const GRID_SPACING = "20px";

export type AstroContent = "video" | "worksheet";

export default function LandingPageContents(props: {}) {
  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    ApiController.getUserVideos("mkl.koskela@gmail.com").then((videos) =>
      setVideos(_.reverse(videos.slice()).filter((v: any) => v.thumbnailUrl))
    );
  }, []);

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet;
    }[][]
  >([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const videoDetails = videos.map((l) => ({
      type: "video" as AstroContent,
      details: l,
    }));
    // const worksheet = (
    //   dataCtx.stacks?.filter((s) => s.channelId === selectedChannelId) || []
    // ).map((s) => ({
    //   type: "stack" as AstroContent,
    //   details: s,
    // }));
    const allContentDetails = _.reverse(
      _.sortBy([...videoDetails], (c) => new Date(c.details.createdAt)).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [videos, nColumns]);

  return (
    <PageLayout
      title="Home"
      bodyWidth="100%"
      selectedSidebarItemId="home"
      description="Welcome to your Astrosafe dashboard! Here you can manage you safetube, worksheets and more."
      button={{
        text: "Create",
        icon: PlusIcon,
        callback: () => null,
      }}
      secondaryButton={{
        text: "30 days left",
        icon: PlusIcon,
        callback: () => null,
      }}
    >
      <Stack flex={1} ref={setColumnsContainerRef} overflow="hidden" pb="64px">
        <Stack flex={1} overflow="scroll">
          <Stack
            flex={1}
            pb={SIDEBAR_Y_MARGIN}
            direction="row"
            spacing={GRID_SPACING}
          >
            {cardColumns.map((column, i) => (
              <Stack key={i} flex={1} spacing={GRID_SPACING}>
                {column.map((item, j) => (
                  <Stack key={item.details.id} spacing={GRID_SPACING}>
                    <UrsorFadeIn delay={j * 150 + i * 80} duration={800}>
                      {
                        item.type === "video" ? (
                          <VideoCard {...(item.details as IVideo)} />
                        ) : null // other card
                      }
                    </UrsorFadeIn>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  );
}

"use client";

import { Stack, alpha, keyframes } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PlaylistCreationDialog from "./PlaylistCreationDialog";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import LessonCard from "../components/LessonCard";
import { ILesson } from "../lesson/[subdirectory]/page";
import useColumnWidth from "../dashboard_DESTINED_FOR_THE_FURNACE/useColumnWidth";
import ApiController from "../api";
import { useUserContext } from "../components/UserContext";
import { useRouter } from "next/navigation";
import MoonsafePlaylistCard from "./MoonsafePlaylistCard";
import { IPlaylist } from "../moonSafePlaylist/[subdirectory]/MoonsafePlaylistPageContents";

export const TRIAL_DAYS = 14;

const PAGE_SIZE = 30;

export const DEFAULT_LESSON_TITLE = "Untitled Lesson";

export const GRID_SPACING = "20px";

export const LESSON_GRID_SPACING = "34px";

export default function DashboardPageContents() {
  const userDetails = useUserContext();

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const loadPlaylists = () => {
    userDetails?.user?.id &&
      ApiController.getUserPlaylists(userDetails.user.id).then((lessons) =>
        setPlaylists(_.reverse(lessons.slice(-30)))
      );
  };
  useEffect(() => {
    loadPlaylists();
  }, [userDetails?.user?.id]);

  const [latestPageIndex, setLatestPageIndex] = useState<number>(0);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const onScroll = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      if (scrollTop + clientHeight > scrollHeight - 800) {
        PAGE_SIZE * (latestPageIndex + 1) < playlists.length &&
          setLatestPageIndex(latestPageIndex + 1);
      }
    }
  };

  const { nColumns, setColumnsContainerRef } = useColumnWidth(404, 390, 480);

  const [cardColumns, setCardColumns] = useState<IPlaylist[][]>([]);

  useEffect(() => {
    const pageLimitedCards = playlists.slice(
      0,
      (latestPageIndex + 1) * PAGE_SIZE
    );
    const chunked = _.chunk(pageLimitedCards, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, playlists, latestPageIndex]);

  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <PageLayout
        ref={scrollableRef}
        onScroll={onScroll}
        title="Moonsafe"
        bodyWidth="100%"
        selectedSidebarItemId="moonsafe"
        scrollable
        button={{
          text: "Create a Playlist",
          icon: PlusIcon,
          callback: () => setCreationDialogOpen(true),
        }}
      >
        <Stack pt="32px" flex={1} ref={setColumnsContainerRef}>
          <Stack flex={1}>
            <Stack
              flex={1}
              pb="110px"
              direction="row"
              spacing="24px"
              pl={`${SIDEBAR_X_MARGIN}px`}
              pt="8px"
            >
              {cardColumns.map((column, i) => (
                <Stack key={i} flex={1} spacing="40px">
                  {
                    column.map((playlist, j) => (
                      <Stack key={playlist.id} spacing="30px">
                        <UrsorFadeIn
                          delay={latestPageIndex === 0 ? j * 190 + i * 190 : 0}
                          duration={900}
                        >
                          <MoonsafePlaylistCard
                            {...playlist}
                            clickCallback={() =>
                              router.push(`/moonSafePlaylist/${playlist.id}`)
                            }
                            deletionCallback={loadPlaylists}
                          />
                        </UrsorFadeIn>
                      </Stack>
                    ))
                    //]
                  }
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </PageLayout>
      <PlaylistCreationDialog
        open={creationDialogOpen}
        onClose={() => setCreationDialogOpen(false)}
        refreshLessons={loadPlaylists}
      />
    </>
  );
}

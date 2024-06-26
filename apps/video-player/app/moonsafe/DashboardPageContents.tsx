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
import useColumnWidth from "../dashboard/useColumnWidth";
import ApiController from "../api";
import { useUserContext } from "../components/UserContext";
import { useRouter } from "next/navigation";

export const TRIAL_DAYS = 14;

const PAGE_SIZE = 30;

const FILTER_MULTI_ROW_WINDOW_WIDTH_THRESHOLD = 1023;
const SHORTENED_TOOL_NAME_IN_BUTTONS_WINDOW_WIDTH_THRESHOLD = 924;

const POPOVER_MARGIN = 10;

export const DEFAULT_LESSON_TITLE = "Untitled Lesson";

const NO_EMPTY_STATE_ILLUSTRATIONS_WINDOW_HEIGHT_THRESHOLD = 448;

export const GRID_SPACING = "20px";

export const LESSON_GRID_SPACING = "34px";

export default function DashboardPageContents() {
  const userDetails = useUserContext();

  const [lessons, setLessons] = useState<ILesson[]>([]);
  const loadLessons = () => {
    userDetails?.user?.id &&
      ApiController.getUserLessons(userDetails.user.id).then((videos) =>
        setLessons(_.reverse(videos.slice()).filter((v: any) => v.thumbnailUrl))
      );
  };
  useEffect(() => {
    loadLessons();
  }, [userDetails?.user?.id]);

  const [latestPageIndex, setLatestPageIndex] = useState<number>(0);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const onScroll = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      if (scrollTop + clientHeight > scrollHeight - 800) {
        PAGE_SIZE * (latestPageIndex + 1) < cards.length &&
          setLatestPageIndex(latestPageIndex + 1);
      }
    }
  };

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  const [cardColumns, setCardColumns] = useState<ILesson[][]>([]);
  const [cards, setCards] = useState<ILesson[]>([]);

  useEffect(() => {
    const pageLimitedCards = cards.slice(0, (latestPageIndex + 1) * PAGE_SIZE);
    const chunked = _.chunk(pageLimitedCards, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, cards, latestPageIndex]);

  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <PageLayout
        ref={scrollableRef}
        onScroll={onScroll}
        title="Moonsafe"
        bodyWidth="100%"
        selectedSidebarItemId="home"
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
              spacing={GRID_SPACING}
              pl={`${SIDEBAR_X_MARGIN}px`}
              pt="8px"
            >
              {cardColumns.map((column, i) => (
                <Stack key={i} flex={1} spacing={LESSON_GRID_SPACING}>
                  {
                    column.map((lesson, j) => (
                      <Stack key={lesson.id} spacing={GRID_SPACING}>
                        <UrsorFadeIn
                          delay={latestPageIndex === 0 ? j * 190 + i * 190 : 0}
                          duration={900}
                        >
                          <LessonCard
                            {...lesson}
                            clickCallback={() =>
                              router.push(`/lesson/${lesson.canonicalUrl}`)
                            }
                            deletionCallback={loadLessons}
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
        refreshLessons={loadLessons}
      />
    </>
  );
}

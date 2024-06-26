"use client";

import { Stack, alpha, keyframes } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import TypographyIcon from "@/images/icons/TypographyIcon.svg";
import ImageIcon from "@/images/icons/ImageIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import QuestionIcon from "@/images/icons/QuestionIcon.svg";
import Star from "@/images/Star.svg";
import X from "@/images/icons/X.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import { useContext, useEffect, useRef, useState } from "react";
import ApiController, { IVideo } from "../api";
import _, { over } from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import VideoCard from "../components/VideoCard";
import { IWorksheet } from "../components/WorksheetGenerator";
import useColumnWidth from "../moonsafe__/useColumnWidth";
import WorksheetCard from "../components/WorksheetCard";
import { PALETTE, Typography, UrsorButton } from "ui";
import VideoCreationDialog from "../moonsafe__/VideoCreationDialog";
import WorksheetCreationDialog from "../moonsafe__/WorksheetCreationDialog";
import { BOLD_FONT_WEIGHT, FONT_SIZES } from "ui/typography";
import { Input } from "@mui/material";
import SortButton from "../components/SortButton";
import { createPortal } from "react-dom";
import { useUserContext } from "../components/UserContext";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import DashboardSignupPromptDialog from "../moonsafe__/DashboardSignupPromptDialog";
import StepperOverlay from "../moonsafe__/StepperOverlay";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import QuestionnaireDialog from "../moonsafe__/QuestionnaireDialog";
import TrialExpirationDialog from "../moonsafe__/TrialExpirationDialog";
import ProfileButton from "../components/ProfileButton";
import dynamic from "next/dynamic";
import LessonCreationDialog from "./LessonCreationDialog";
import { ILesson } from "../lesson/[subdirectory]/page";
import LessonCard from "../components/LessonCard";
import LiteModeBar, { useOnBasicMode } from "../moonsafe__/LiteModeBar";
import NoCreationsLeftDialog from "../moonsafe__/NoCreationsLeftDialog";
import PinkPurpleStar from "@/images/PinkPurpleStar.svg";
import ImageDialog, { IImage } from "../moonsafe__/ImageDialog";
import ShareDialog from "../moonsafe__/ShareDialog";
import PlaylistCreationDialog from "./PlaylistCreationDialog";

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
      />
    </>
  );
}

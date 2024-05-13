"use client";

import LessonCard from "@/app/components/LessonCard";
import PageCard from "@/app/components/PageCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { Header } from "@/app/components/header2";
import {
  GRID_SPACING,
  LESSON_GRID_SPACING,
  SearchInput,
} from "@/app/dashboard/DashboardPageContents";
import useColumnWidth from "@/app/dashboard/useColumnWidth";
import { ILesson } from "@/app/lesson/[subdirectory]/page";
import { Stack, alpha } from "@mui/system";
import _, { filter } from "lodash";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import UserPageFooter from "../../components/ExternalPageFooter";
import { useUserContext } from "@/app/components/UserContext";
import ExternalPageFooter from "../../components/ExternalPageFooter";
import ShareDialog from "@/app/dashboard/ShareDialog";
import NotificationContext from "@/app/components/NotificationContext";

const PAGE_SIZE = 24;

export default function UserPageContents(props: {
  lessons: ILesson[];
  title: string;
  userId: string;
}) {
  const router = useRouter();

  const [latestPageIndex, setLatestPageIndex] = useState<number>(0);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const onScroll = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      if (scrollTop + clientHeight > scrollHeight - 800) {
        PAGE_SIZE * (latestPageIndex + 1) < filteredLessons.length &&
          setLatestPageIndex(latestPageIndex + 1);
      }
    }
  };

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  const [columns, setColumns] = useState<ILesson[][]>([]);

  const [filteredLessons, setFilteredLessons] = useState<ILesson[]>([]);
  useEffect(() => {
    setFilteredLessons(
      props.lessons.filter(
        (x) =>
          !searchValue ||
          x.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [props.lessons, searchValue]);

  useEffect(() => {
    const pageLimitedCards = filteredLessons.slice(
      0,
      (latestPageIndex + 1) * PAGE_SIZE
    );
    const chunked = _.chunk(pageLimitedCards, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, filteredLessons, latestPageIndex]);

  const userDetails = useUserContext().user;

  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);

  const notificationCtx = useContext(NotificationContext);

  const [title, setTitle] = useState<string>("");
  useEffect(() => setTitle(props.title), [props.title]);

  return (
    <>
      <Stack
        px="20px"
        overflow="scroll"
        onScroll={onScroll}
        ref={scrollableRef}
        flex={1}
      >
        <Header mobile={isMobile} />
        <Stack height="40px" minHeight="40px" />
        <PageCard
          title={title}
          description="Explore a collection of Lessons for kids, containing Videos and Worksheets, curated for your learning."
          noBottomPadding
          width="100%"
          maxWidth="1260px"
          backRoute={
            userDetails?.id === props.userId ? "/dashboard" : undefined
          }
          backText={
            userDetails?.id === props.userId
              ? "Back to my Dashboard"
              : undefined
          }
          grey
          editingCallback={() => setShareDialogOpen(true)}
          editingEnabled
          noDescriptionEditing
          rightStuff={
            <SearchInput
              value={searchValue ?? ""}
              callback={(value: string) => {
                setSearchValue(value);
              }}
              clearCallback={() => setSearchValue(undefined)}
              shadow
            />
          }
        >
          {/* <Stack px="24px" alignItems="flex-end">
            <SearchInput
              value={searchValue ?? ""}
              callback={(value: string) => {
                setSearchValue(value);
              }}
              clearCallback={() => setSearchValue(undefined)}
              shadow
            />
          </Stack> */}
          <Stack
            pt="24px"
            flex={1}
            ref={setColumnsContainerRef}
            overflow="hidden"
          >
            <Stack
              flex={1}
              pb="110px"
              direction="row"
              spacing={GRID_SPACING}
              px={`24px`}
            >
              {columns.map((column, i) => (
                <Stack key={i} flex={1} spacing={LESSON_GRID_SPACING}>
                  {column.map((lesson, j) => (
                    <Stack key={lesson.id} spacing={GRID_SPACING}>
                      <UrsorFadeIn
                        delay={latestPageIndex === 0 ? j * 190 + i * 190 : 0}
                        duration={900}
                      >
                        <LessonCard
                          {...lesson}
                          clickCallback={() =>
                            router.push(`/lesson/${lesson.id}`)
                          }
                        />
                      </UrsorFadeIn>
                    </Stack>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
          {latestPageIndex ===
          Math.floor(filteredLessons.length / PAGE_SIZE) ? (
            <Stack px="24px" height="100vh" justifyContent="center">
              <ExternalPageFooter />
            </Stack>
          ) : null}
        </PageCard>
      </Stack>
      {shareDialogOpen ? (
        <ShareDialog
          open={true}
          callback={(t) => {
            setShareDialogOpen(false);
            notificationCtx.success("Copied your shareable URL to Clipboard.");
            navigator.clipboard.writeText(window.location.href);
            setTitle(t);
          }}
          closeCallback={() => setShareDialogOpen(false)}
        />
      ) : null}
    </>
  );
}

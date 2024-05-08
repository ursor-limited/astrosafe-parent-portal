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
import { ILesson } from "@/app/lesson/[id]/page";
import { Stack, alpha } from "@mui/system";
import _, { filter } from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import UserPageFooter from "./UserPageFooter";

const PAGE_SIZE = 24;

export default function UserPageContents(props: {
  lessons: ILesson[];
  creatorName: string;
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
          title={props.creatorName}
          description="Explore a collection of Lessons for kids, containing Videos and Worksheets, curated for your learning."
          noBottomPadding
          noBackButton
          width="100%"
          maxWidth="1260px"
          grey
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
            <Stack px="24px" pb="60px">
              <UserPageFooter />
            </Stack>
          ) : null}
        </PageCard>
      </Stack>
    </>
  );
}

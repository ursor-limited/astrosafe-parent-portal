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
import UserPageFooter from "../../components/ExternalPageFooter";
import { useUserContext } from "@/app/components/UserContext";
import MobilePageCard from "@/app/dashboard/MobilePageCard";
import { PALETTE } from "ui";
import MobileExternalPageFooter from "./MobileExternalPageFooter";

const PAGE_SIZE = 8;

export default function MobileUserPageContents(props: {
  lessons: ILesson[];
  title: string;
  userId: string;
}) {
  const router = useRouter();

  //const [latestPageIndex, setLatestPageIndex] = useState<number>(0);
  // const scrollableRef = useRef<HTMLDivElement | null>(null);
  // const onScroll = () => {
  //   if (scrollableRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
  //     if (scrollTop + clientHeight > scrollHeight - 300) {
  //       PAGE_SIZE * (latestPageIndex + 1) < filteredLessons.length &&
  //         setLatestPageIndex(latestPageIndex + 1);
  //     }
  //   }
  // };

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

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

  // const [filteredPageLimitedLessons, setFilteredPageLimitedLessons] = useState<
  //   ILesson[]
  // >([]);

  // useEffect(() => {
  //   setFilteredPageLimitedLessons(
  //     filteredLessons.slice(0, (latestPageIndex + 1) * PAGE_SIZE)
  //   );
  // }, [filteredLessons, latestPageIndex]);

  const userDetails = useUserContext().user;

  return (
    <>
      {/* <Header mobile /> */}
      <MobilePageCard
        title={props.title}
        description="Explore a collection of Lessons for kids, containing Videos and Worksheets, curated for your learning."
        creatorId={props.userId}
        backRoute={userDetails?.id === props.userId ? "/dashboard" : undefined}
        backText={
          userDetails?.id === props.userId ? "Back to my Dashboard" : undefined
        }
        backgroundColor={PALETTE.primary.navy}
        cardBackgroundColor={PALETTE.secondary.grey[1]}
      >
        <Stack alignItems="flex-end" pb="12px">
          <SearchInput
            value={searchValue ?? ""}
            callback={(value: string) => {
              setSearchValue(value);
            }}
            clearCallback={() => setSearchValue(undefined)}
            shadow
          />
        </Stack>
        {filteredLessons.length > 0 ? (
          <Stack flex={1} pb="160px" pt="8px" spacing="36px">
            {filteredLessons.map((lesson, i) => (
              <UrsorFadeIn key={i} delay={i * 190} duration={900}>
                <LessonCard
                  {...lesson}
                  clickCallback={() => router.push(`/lesson/${lesson.id}`)}
                />
              </UrsorFadeIn>
            ))}
          </Stack>
        ) : null}
        <Stack height="100vh" justifyContent="center">
          <MobileExternalPageFooter />
        </Stack>
      </MobilePageCard>
    </>
  );
}

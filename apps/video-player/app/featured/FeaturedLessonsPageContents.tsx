"use client";

import { Stack } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { IAstroLandingPage } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import AstroLandingPage from "../tools/multiplication-chart/[urlId]/AstroLandingPage";
import LandingPageViewport from "../tools/multiplication-chart/[urlId]/LandingPageViewport";
import { UrsorButton } from "ui";
import { VisualLinkCardsSubtler } from "../components/landing/VisualLinkCardsSubtler";
import ValueProposition from "../tools/multiplication-chart/[urlId]/ValueProposition";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { GRID_SPACING } from "../dashboard/DashboardPageContents";
import { ILesson } from "../lesson/[id]/page";
import useColumnWidth from "../dashboard/useColumnWidth";

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

export default function FeaturedLessonsPageContents(props: IAstroLandingPage) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  // const [lessons, setLessons] = useState<ILessons[]>([]);

  // const listRef = useRef(null);

  // const scrollIntoView = () =>
  //   //@ts-ignore
  //   listRef?.current?.scrollIntoView({ behavior: "smooth" });

  // const [explanationDialogOpen, setExplanationDialogOpen] =
  //   useState<boolean>(false);

  // const { nColumns, setColumnsContainerRef } = useColumnWidth();

  // const [columns, setColumns] = useState<ILesson[][]>([]);

  // useEffect(() => {
  //   const pageLimitedCards = lessons.slice(
  //     0,
  //     (latestPageIndex + 1) * PAGE_SIZE
  //   );
  //   const chunked = _.chunk(pageLimitedCards, nColumns);
  //   setColumns(
  //     [...Array(nColumns).keys()].map((i) =>
  //       _.compact(chunked.map((chunk) => chunk[i]))
  //     )
  //   );
  // }, [nColumns, filteredLessons, latestPageIndex]);

  // const userDetails = useUserContext().user;

  return (
    <>
      {/* <AstroLandingPage
        fainterSpaceGlow
        title={[props.heading]}
        subtitle={props.subHeading}
        mobile={isMobile}
        faqs={props.faqs}
        viewports={[
          ...(props.visualLinkCardsSubtler
            ? [
                <LandingPageViewport
                  key="seals"
                  supertitle={props.visualLinkCardsSubtler.supertitle}
                  subtitle={props.visualLinkCardsSubtler.subtitle}
                  title={props.visualLinkCardsSubtler.title}
                  mobile={isMobile}
                >
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
                                delay={
                                  latestPageIndex === 0 ? j * 190 + i * 190 : 0
                                }
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
                </LandingPageViewport>,
              ]
            : []),
        ]}
      >
        <Stack width="100%" alignItems="center" spacing="32px">
          <Stack direction="row" spacing={isMobile ? "8px" : "12px"}>
            <UrsorButton
              size={isMobile ? "medium" : "large"}
              width={isMobile ? "160px" : "226px"}
              dark
              variant="tertiary"
              onClick={() =>
                (window.location.href = "https://form.typeform.com/to/mVezziat")
              }
            >
              Enrol now
            </UrsorButton>
            <UrsorButton
              size={isMobile ? "medium" : "large"}
              width={isMobile ? "160px" : "226px"}
              dark
              onClick={scrollIntoView}
            >
              View list
            </UrsorButton>
          </Stack>
          <Stack position="relative" height={isMobile ? "80px" : "150px"}>
            <Stack
              position="absolute"
              top={0}
              sx={{ transform: "translateX(-50%)" }}
            >
              <Image
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png"
                width={isMobile ? 380 : 873}
                height={isMobile ? 138 : 316}
                alt="Astro Seals illustration"
                priority
              />
            </Stack>
          </Stack>
        </Stack>
      </AstroLandingPage>
      <SealExplanationDialog
        open={explanationDialogOpen}
        closeCallback={() => setExplanationDialogOpen(false)}
        mobile={isMobile}
      /> */}
    </>
  );
}

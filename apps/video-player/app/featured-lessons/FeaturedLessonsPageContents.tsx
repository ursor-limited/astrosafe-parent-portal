"use client";

import { Stack } from "@mui/system";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { IAstroLandingPage } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import AstroLandingPage from "../tools/multiplication-chart/[urlId]/AstroLandingPage";
import LandingPageViewport from "../tools/multiplication-chart/[urlId]/LandingPageViewport";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { ILesson } from "../lesson/[subdirectory]/page";
import LessonCard from "../components/LessonCard";
import ApiController from "../api";
import ExternalPageFooter from "../components/ExternalPageFooter";
import Link from "next/link";
import MobileExternalPageFooter from "../components/MobileExternalPageFooter";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "../editor/EditorPageContents";

const TWO_COLUMNS_THRESHOLD_WINDOW_WIDTH = 1020;
const SINGLE_COLUMN_THRESHOLD_WINDOW_WIDTH = 780;

export default function FeaturedLessonsPageContents(props: IAstroLandingPage) {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const [lessons, setLessons] = useState<ILesson[]>([]);
  useEffect(() => {
    ApiController.getFeaturedLessons().then((l) => setLessons(l));
  }, []);

  const [columns, setColumns] = useState<ILesson[][]>([]);
  const [nColumns, setNColumns] = useState<number>(1);
  useEffect(
    () =>
      setNColumns(
        isMobile
          ? 1
          : width < SINGLE_COLUMN_THRESHOLD_WINDOW_WIDTH
          ? 1
          : width < TWO_COLUMNS_THRESHOLD_WINDOW_WIDTH
          ? 2
          : 3
      ),
    [isMobile, width]
  );

  useEffect(() => {
    const chunked = _.chunk(lessons, nColumns);
    setColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [lessons, nColumns]);

  return (
    <>
      <AstroLandingPage
        fainterSpaceGlow
        title={[props.heading]}
        subtitle={props.subHeading}
        mobile={isMobile}
        faqs={props.faqs}
        viewports={[
          <LandingPageViewport
            key="lessons"
            supertitle="Our Lesson Collection"
            subtitle="A selection of some of our best contents."
            title="Lessons"
            mobile={isMobile}
          >
            <>
              <Stack
                pt="24px"
                flex={1}
                //ref={setColumnsContainerRef}
                overflow="hidden"
                maxWidth="1030px"
                //width={isMobile || nColumns < 3 ? undefined : "1030px"}
              >
                <Stack
                  flex={1}
                  pb="110px"
                  direction="row"
                  spacing="24px"
                  px={isMobile ? 0 : `24px`}
                >
                  {columns.map((column, i) => (
                    <Stack key={i} flex={1} spacing="40px">
                      {column.map((lesson, j) => (
                        <Stack key={lesson.id} spacing="26px">
                          <UrsorFadeIn delay={j * 190 + i * 190} duration={900}>
                            <Link
                              href={`/lesson/${lesson.id}`}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <LessonCard
                                {...lesson}
                                // clickCallback={() =>
                                //   router.push(`/lesson/${lesson.id}`)
                                // }
                                strongShadow
                              />
                            </Link>
                          </UrsorFadeIn>
                        </Stack>
                      ))}
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              {isMobile ? <MobileExternalPageFooter /> : <ExternalPageFooter />}
            </>
          </LandingPageViewport>,
        ]}
      >
        <Stack width="100%" alignItems="center" spacing="32px">
          <Stack position="relative" height={isMobile ? "105px" : "270px"}>
            <Stack
              position="absolute"
              top={0}
              sx={{ transform: "translateX(-50%)" }}
            >
              <Image
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/Landing+Image02.png"
                width={isMobile ? 380 : 1053}
                height={isMobile ? 170 : 466}
                alt="AstroSafe featured lessons"
                priority
              />
            </Stack>
          </Stack>
        </Stack>
      </AstroLandingPage>
    </>
  );
}

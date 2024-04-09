"use client";

import { Stack, alpha } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import { IVideo } from "./AstroContentColumns";
import { useContext, useEffect, useState } from "react";
import ApiController from "../api";
import _, { over } from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import VideoCard from "../components/VideoCard";
import { IWorksheet } from "../components/WorksheetGenerator";
import useColumnWidth from "./useColumnWidth";
import WorksheetCard from "../components/WorksheetCard";
import { PALETTE, Typography, UrsorButton } from "ui";
import VideoCreationDialog from "./VideoCreationDialog";
import WorksheetCreationDialog from "./WorksheetCreationDialog";
import { BOLD_FONT_WEIGHT, FONT_SIZES } from "ui/typography";
import { Input } from "@mui/material";
import SortButton from "../components/SortButton";
import { createPortal } from "react-dom";
import { EmptyStateIllustration } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";
import { useLocalStorage } from "usehooks-ts";
import DashboardSignupPromptDialog from "./DashboardSignupPromptDialog";
import dayjs from "dayjs";
import { TRIAL_DAYS } from "../account/AccountPageContents";
import {
  AstroContent,
  CONTENT_BRANDING,
  FilterRow,
  SearchInput,
  ToolButton,
  getPeriodDaysLeft,
  getTrialDaysLeft,
} from "./DashboardPageContents";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ProfileButton from "../components/ProfileButton";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import Image from "next/image";
import LiteModeBar, { useOutOfCreations } from "./LiteModeBar";
import TrialExpirationDialog from "./TrialExpirationDialog";
import NoCreationsLeftDialog from "./NoCreationsLeftDialog";
import LessonCreationDialog from "./LessonCreationDialog";
import { ILesson } from "../lesson/[id]/page";
import { isMobile } from "react-device-detect";
import LessonCard from "../components/LessonCard";

const UpgradeDialog = dynamic(
  () => import("@/app/components/UpgradeDialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const GRID_SPACING = "20px";

export type AstroContentSort = "abc" | "createdAt";

export const MobileEmptyStateIllustration = (props: {
  children: React.ReactNode;
}) => (
  <Stack
    flex={1}
    justifyContent="center"
    alignItems="center"
    sx={{
      pointerEvents: "none",
      filter: "grayscale(1)",
    }}
    zIndex={999}
  >
    <UrsorFadeIn delay={500} duration={800}>
      <Stack position="relative" spacing="18px">
        <Stack sx={{ opacity: 0.3 }}>
          <Image
            height={207}
            width={217}
            src={WonderingIllustration}
            alt="Empty state illustration"
          />
        </Stack>
        <Stack width="100%" alignItems="center" position="absolute" top="170px">
          <Typography
            bold
            color={PALETTE.secondary.grey[3]}
            sx={{ textAlign: "center" }}
          >
            {props.children}
          </Typography>
        </Stack>
      </Stack>
    </UrsorFadeIn>
  </Stack>
);

export default function MobileDashboardPageContents() {
  const userDetails = useUserContext();
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const loadLessons = () => {
    userDetails?.user?.id &&
      ApiController.getUserLessons(userDetails.user.id)
        .then((l) => setLessons(_.reverse(l.slice())))
        .finally(() => setLessonsLoaded(true));
  };
  useEffect(() => {
    loadLessons();
  }, [userDetails?.user?.id]);

  const [videos, setVideos] = useState<IVideo[]>([]);
  const loadVideos = () => {
    userDetails?.user?.id &&
      ApiController.getUserVideos(userDetails.user.id)
        .then((videos) =>
          setVideos(
            _.reverse(videos.slice()).filter((v: any) => v.thumbnailUrl)
          )
        )
        .finally(() => setVideosLoaded(true));
  };
  useEffect(() => {
    loadVideos();
  }, [userDetails?.user?.id]);

  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  const loadWorksheets = () => {
    userDetails?.user?.id &&
      ApiController.getUserWorksheets(userDetails.user.id)
        .then((ws) => setWorksheets(_.reverse(ws.slice())))
        .finally(() => setWorksheetsLoaded(true));
  };
  useEffect(() => {
    loadWorksheets();
  }, [userDetails?.user?.id]);

  const [lessonCreationDialogOpen, setLessonCreationDialogOpen] =
    useState<boolean>(false);

  const [lessonEditingDialogId, setLessonEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [cards, setCards] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet | ILesson;
    }[]
  >([]);

  const [selectedContentType, setSelectedContentType] =
    useState<AstroContent | null>(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] =
    useState<AstroContentSort>("createdAt");

  useEffect(() => {
    const videoDetails = videos
      .filter(
        (x) =>
          !searchValue ||
          x.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((l) => ({
        type: "video" as AstroContent,
        details: l,
      }));
    const worksheetDetails = worksheets
      .filter((x) => x.worksheetId)
      .filter(
        (x) =>
          !searchValue ||
          x.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((ws) => ({
        type: "worksheet" as AstroContent,
        details: ws,
      }));
    const allContentDetails = _.orderBy(
      [
        ...(selectedContentType && selectedContentType !== "video"
          ? []
          : videoDetails),
        ...(selectedContentType && selectedContentType !== "worksheet"
          ? []
          : worksheetDetails),
      ],
      (c) =>
        selectedSort === "createdAt"
          ? new Date(c.details.createdAt)
          : c.details.title.toLowerCase(),
      selectedSort === "createdAt" ? "desc" : "asc"
    );
    setCards(allContentDetails);
  }, [videos, worksheets, selectedContentType, searchValue, selectedSort]);

  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);

  const [videoCreationDialogOpen, setVideoCreationDialogOpen] =
    useState<boolean>(false);

  const [worksheetCreationDialogOpen, setWorksheetCreationDialogOpen] =
    useState<boolean>(false);

  const notificationCtx = useContext(NotificationContext);
  useEffect(() => {
    if (userDetails.user && !signedIn) {
      notificationCtx.success("Signed in.");
      //setSignedIn(true);
    }
  }, [userDetails.user]);

  const [freeWorksheetIds, setFreeWorksheetIds] = useLocalStorage<string[]>(
    "freeWorksheetIds",
    []
  );
  useEffect(() => {
    if (userDetails.user?.id && freeWorksheetIds.length > 0) {
      ApiController.claimWorksheets(userDetails.user.id, freeWorksheetIds).then(
        () => loadWorksheets()
      );
      setFreeWorksheetIds([]);
    }
  }, [userDetails.user?.id, freeWorksheetIds.length]);

  const [freeVideoIds, setFreeVideoIds] = useLocalStorage<string[]>(
    "freeVideoIds",
    []
  );
  useEffect(() => {
    if (userDetails.user?.id && freeVideoIds.length > 0) {
      ApiController.claimVideos(userDetails.user.id, freeVideoIds).then(() =>
        loadVideos()
      );
      setFreeVideoIds([]);
    }
  }, [userDetails.user?.id, freeVideoIds.length]);

  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);
  useEffect(() => {
    setSignupPromptDialogOpen(userDetails.loaded && !userDetails.user?.id);
  }, [userDetails.user?.id, userDetails.loaded]);

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    userDetails.user?.id &&
      !userDetails.user?.freeTrialStart &&
      ApiController.submitFreeTrialStartDate(userDetails.user?.id).then(
        userDetails.refresh
      );
  }, [userDetails.user?.id, userDetails.user?.freeTrialStart]);

  const router = useRouter();

  const [
    trialExpirationDialogAlreadySeen,
    setTrialExpirationDialogAlreadySeen,
  ] = useLocalStorage<boolean>("trialExpirationDialogAlreadySeen", false);

  const [trialExpirationDialogOpen, setTrialExpirationDialogOpen] =
    useState<boolean>(false);
  useEffect(() => {
    if (
      !trialExpirationDialogAlreadySeen &&
      !userDetails.user?.subscribed &&
      userDetails.user?.freeTrialStart &&
      getTrialDaysLeft(userDetails.user.freeTrialStart) <= 0
    ) {
      setTrialExpirationDialogOpen(
        !userDetails.user?.subscribed &&
          getTrialDaysLeft(userDetails.user.freeTrialStart) <= 0
      );
      setTrialExpirationDialogAlreadySeen(true);
    }
  }, [userDetails.user?.subscribed]);

  const [noCreationsLeftDialogOpen, setNoCreationsLeftDialogOpen] =
    useState<boolean>(false);

  const outOfCreations = useOutOfCreations();

  useEffect(() => {
    if (
      !userDetails.user?.subscribed &&
      userDetails.user?.freeTrialStart &&
      (!userDetails.user.periodCreationsClearedAt ||
        dayjs().diff(userDetails.user.periodCreationsClearedAt, "months") >= 1)
    ) {
      // const dayOfMonthToCheckOn =
      //   (dayjs(userDetails.user?.freeTrialStart).date() + TRIAL_DAYS) % 30;
      // (!userDetails.user.periodCreationsClearedAt ||
      //   dayjs().date() >= dayOfMonthToCheckOn) &&
      ApiController.clearPediodCreations(userDetails.user.id).then(
        userDetails.refresh
      );
    }
  }, [userDetails.user]);

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [anyLoaded, setAnyLoaded] = useState<boolean>(false);
  const [worksheetsLoaded, setWorksheetsLoaded] = useState<boolean>(false);
  const [videosLoaded, setVideosLoaded] = useState<boolean>(false);
  const [lessonsLoaded, setLessonsLoaded] = useState<boolean>(false);
  useEffect(
    () =>
      setAnyLoaded(
        (worksheetsLoaded && videosLoaded && lessonsLoaded) ||
          worksheets.length > 0 ||
          videos.length > 0 ||
          lessons.length > 0
      ),
    [worksheetsLoaded, videosLoaded, lessonsLoaded]
  );

  return (
    <Stack
      spacing="20px"
      bgcolor={PALETTE.secondary.grey[1]}
      flex={1}
      overflow="scroll"
      pt="20px"
    >
      <Stack direction="row" spacing="12px" justifyContent="flex-end" px="20px">
        <Stack direction="row" spacing="12px" alignItems="center">
          {!userDetails.user?.subscribed ||
          userDetails.user.subscriptionDeletionDate ? (
            <>
              {getTrialDaysLeft(userDetails.user?.freeTrialStart) <= 0 ? (
                <Typography variant="medium" color={PALETTE.secondary.grey[4]}>
                  Basic mode
                </Typography>
              ) : (
                <Stack
                  height="100%"
                  alignItems="center"
                  direction="row"
                  spacing="5px"
                >
                  <Typography
                    variant="medium"
                    bold
                    color={PALETTE.secondary.grey[4]}
                  >
                    {userDetails.user?.subscriptionDeletionDate
                      ? getPeriodDaysLeft(
                          userDetails.user?.subscriptionDeletionDate
                        )
                      : getTrialDaysLeft(userDetails.user?.freeTrialStart)}
                  </Typography>
                  <Typography
                    variant="medium"
                    color={PALETTE.secondary.grey[4]}
                  >
                    days left
                  </Typography>
                </Stack>
              )}
            </>
          ) : undefined}
        </Stack>
        {!userDetails.user?.subscribed ? (
          <UrsorButton
            dark
            endIcon={VerifiedIcon}
            onClick={() => setUpgradeDialogOpen(true)}
            variant="tertiary"
          >
            Upgrade
          </UrsorButton>
        ) : null}
        <Stack alignItems="flex-end">
          {userDetails.user ? <ProfileButton light /> : undefined}
        </Stack>
      </Stack>
      <Stack spacing="20px" px="20px">
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h4">Home</Typography>
        </Stack>
        <Typography color={PALETTE.secondary.grey[4]}>
          Welcome to your Astrosafe dashboard! Here you can manage you safetube,
          worksheets and more.
        </Typography>
      </Stack>
      <UrsorFadeIn duration={700}>
        <Stack spacing="12px" px="20px">
          <ToolButton
            mobile
            title="Create lesson"
            description={CONTENT_BRANDING.lesson.description}
            color={CONTENT_BRANDING.lesson.color}
            icon={CONTENT_BRANDING.lesson.icon}
            onClick={() => {
              outOfCreations
                ? setNoCreationsLeftDialogOpen(true)
                : setLessonCreationDialogOpen(true);
            }}
            infoButtonPosition={215}
            info={CONTENT_BRANDING.lesson.info}
          />
          <ToolButton
            mobile
            title="Create safe video link"
            description="Free of ads. Safe to share."
            color={PALETTE.secondary.blue[3]}
            icon={CirclePlayIcon}
            onClick={() => {
              outOfCreations
                ? setNoCreationsLeftDialogOpen(true)
                : setVideoCreationDialogOpen(true);
            }}
            infoButtonPosition={280}
            info={
              "Copy and paste any YouTube or Vimeo URL to generate a safe and shareable video link. Reduce ads, remove distracting content, and increase focus with our SafeTube player."
            }
          />
          <ToolButton
            mobile
            title="Create math worksheet"
            description="Printable & finished in seconds."
            color={PALETTE.secondary.pink[5]}
            icon={ChecklistIcon}
            onClick={() => {
              outOfCreations
                ? setNoCreationsLeftDialogOpen(true)
                : setWorksheetCreationDialogOpen(true);
            }}
            infoButtonPosition={300}
            info={
              "Customise a worksheet template to your students’ needs. We’ll do the rest. Download, print and share your worksheet in seconds."
            }
          />
        </Stack>
      </UrsorFadeIn>
      <Stack minHeight="20px" justifyContent="center" px="20px">
        <Stack height="2px" bgcolor={PALETTE.secondary.grey[2]} />
      </Stack>
      <UrsorFadeIn duration={700} delay={200}>
        <Stack spacing="12px">
          <Stack overflow="scroll" py="3px" width="100%" pr="20px">
            <FilterRow
              selected={selectedContentType}
              callback={(newSelected) => setSelectedContentType(newSelected)}
              mobile
            />
          </Stack>
          <Stack direction="row" spacing="12px" px="20px">
            <SearchInput
              value={searchValue ?? ""}
              callback={(value: string) => {
                setSearchValue(value);
              }}
              clearCallback={() => setSearchValue(undefined)}
              shadow
            />
            <SortButton
              selected={selectedSort}
              callback={(id) => setSelectedSort(id)}
              types={["abc", "createdAt"]}
              displayNames={{
                abc: "Alphabetical",
                createdAt: "Most recent",
              }}
              width="204px"
            />
          </Stack>
        </Stack>
      </UrsorFadeIn>
      {cards.length > 0 ? (
        <Stack flex={1} pb="110px" spacing={GRID_SPACING} pt="8px" px="20px">
          {cards.map((card, i) => (
            <UrsorFadeIn key={i} delay={i * 190} duration={900}>
              {card.type === "video" ? (
                <VideoCard
                  {...(card.details as IVideo)}
                  editingCallback={() =>
                    setVideoEditingDialogId(card.details.id)
                  }
                  deletionCallback={loadVideos}
                />
              ) : card.type === "worksheet" ? (
                <WorksheetCard {...(card.details as IWorksheet)} />
              ) : card.type === "lesson" ? (
                <LessonCard
                  {...(card.details as ILesson)}
                  imageUrls={[]}
                  clickCallback={() =>
                    router.push(`/lesson/${card.details.id}`)
                  }
                  editingCallback={() =>
                    setLessonEditingDialogId(card.details.id)
                  }
                  deletionCallback={loadLessons}
                />
              ) : null}
            </UrsorFadeIn>
          ))}
        </Stack>
      ) : null}
      <VideoCreationDialog
        open={videoCreationDialogOpen}
        closeCallback={() => setVideoCreationDialogOpen(false)}
      />
      {videoEditingDialogId ? (
        <VideoCreationDialog
          open={!!videoEditingDialogId}
          closeCallback={() => setVideoEditingDialogId(undefined)}
          editingCallback={loadVideos}
          video={videos.find((v) => v.id === videoEditingDialogId)}
        />
      ) : null}
      <WorksheetCreationDialog
        open={worksheetCreationDialogOpen}
        closeCallback={() => setWorksheetCreationDialogOpen(false)}
        mobile
      />
      <LessonCreationDialog
        open={lessonCreationDialogOpen}
        closeCallback={() => setLessonCreationDialogOpen(false)}
      />
      {!selectedContentType &&
      worksheets.length === 0 &&
      videos.length === 0 ? (
        <MobileEmptyStateIllustration>
          No content yet.
        </MobileEmptyStateIllustration>
      ) : null}
      {selectedContentType === "video" && videos.length === 0 ? (
        <MobileEmptyStateIllustration>
          No videos yet.
        </MobileEmptyStateIllustration>
      ) : null}
      {selectedContentType === "worksheet" && worksheets.length === 0 ? (
        <MobileEmptyStateIllustration>
          No worksheets yet.
        </MobileEmptyStateIllustration>
      ) : null}

      <UpgradeDialog
        mobile={isMobile}
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      />
      <TrialExpirationDialog
        open={trialExpirationDialogOpen}
        closeCallback={() => setTrialExpirationDialogOpen(false)}
        openQuestionnaireCallback={() => {
          //setQuestionnaireDialogOpen(true);
          setTrialExpirationDialogOpen(false);
        }}
        upgradeCallback={() => {
          setTrialExpirationDialogOpen(false);
          setUpgradeDialogOpen(true);
        }}
      />
      {!userDetails.user?.subscribed &&
      getTrialDaysLeft(userDetails.user?.freeTrialStart) <= 0 ? (
        <UrsorFadeIn duration={1000}>
          <LiteModeBar
            mobile
            upgradeCallback={() => setUpgradeDialogOpen(true)}
          />
        </UrsorFadeIn>
      ) : null}
      <NoCreationsLeftDialog
        open={noCreationsLeftDialogOpen}
        closeCallback={() => setNoCreationsLeftDialogOpen(false)}
        callback={() => setUpgradeDialogOpen(true)}
      />
    </Stack>
  );
}

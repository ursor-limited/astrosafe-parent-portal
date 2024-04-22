"use client";

import { Stack, alpha } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
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
  AstroContentSort,
  CONTENT_BRANDING,
  DEFAULT_LESSON_TITLE,
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
import LiteModeBar, { useOnBasicMode } from "./LiteModeBar";
import TrialExpirationDialog from "./TrialExpirationDialog";
import NoCreationsLeftDialog from "./NoCreationsLeftDialog";
import LessonCreationDialog from "./LessonCreationDialog";
import { ILesson } from "../lesson/[id]/page";
import { isMobile } from "react-device-detect";
import LessonCard from "../components/LessonCard";
import DashboardPageBinaryContentFilterSelection from "./DashboardPageBinaryContentFilterSelection";
import LinkDialog, { ILink } from "./LinkDialog";
import TextCreationDialog, { IText } from "../components/TextDialog";
import ImageDialog, { IImage } from "./ImageDialog";
import { cleanTextValueIntoInnerHTML } from "../lesson/[id]/MobileLessonPageContents";
import TextCard from "../components/TextCard";
import LinkCard from "../components/LinkCard";
import ImageCard from "../components/ImageCard";

const UpgradeDialog = dynamic(
  () => import("@/app/components/UpgradeDialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const GRID_SPACING = "20px";
export const LESSON_GRID_SPACING = "34px";

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

  const [images, setImages] = useState<IImage[]>([]);
  const loadImages = () => {
    userDetails?.user?.id &&
      ApiController.getUserImages(userDetails.user.id)
        .then((images) => setImages(_.reverse(images.slice())))
        .finally(() => setImagesLoaded(true));
  };
  useEffect(() => {
    loadImages();
  }, [userDetails?.user?.id]);

  const [texts, setTexts] = useState<IText[]>([]);
  const loadTexts = () => {
    userDetails?.user?.id &&
      ApiController.getUserTexts(userDetails.user.id)
        .then((texts) =>
          setTexts(
            _.reverse(texts.slice()).map((t: IText) => ({
              ...t,
              value: cleanTextValueIntoInnerHTML(t.value),
            }))
          )
        )
        .finally(() => setTextsLoaded(true));
  };
  useEffect(() => {
    loadTexts();
  }, [userDetails?.user?.id]);

  const [links, setLinks] = useState<ILink[]>([]);
  const loadLinks = () => {
    userDetails?.user?.id &&
      ApiController.getUserLinks(userDetails.user.id)
        .then((links) => setLinks(_.reverse(links.slice())))
        .finally(() => setLinksLoaded(true));
  };
  useEffect(() => {
    loadLinks();
  }, [userDetails?.user?.id]);

  const [lessonCreationDialogOpen, setLessonCreationDialogOpen] =
    useState<boolean>(false);

  const [lessonEditingDialogId, setLessonEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [imageEditingDialogId, setImageEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [linkEditingDialogId, setLinkEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [textEditingDialogId, setTextEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [cards, setCards] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet | ILesson | ILink | IImage | IText;
    }[]
  >([]);

  const [selectedContentType, setSelectedContentType] =
    useState<AstroContent | null>(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] =
    useState<AstroContentSort>("updatedAt");

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
      .filter((x) => x.worksheetComponent)
      .filter(
        (x) =>
          !searchValue ||
          x.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((ws) => ({
        type: "worksheet" as AstroContent,
        details: ws,
      }));
    const imageDetails = images
      .filter(
        (x) =>
          !searchValue ||
          x.title?.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((i) => ({
        type: "image" as AstroContent,
        details: i,
      }));
    const textDetails = texts
      .filter(
        (x) =>
          !searchValue ||
          x.value?.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((t) => ({
        type: "text" as AstroContent,
        details: t,
      }));
    const linkDetails = links
      .filter(
        (x) =>
          !searchValue ||
          [x.title, x.url]
            .join()
            ?.toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map((l) => ({
        type: "link" as AstroContent,
        details: l,
      }));
    const lessonDetails = lessons
      .filter(
        (x) =>
          !searchValue ||
          x.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((l) => ({
        type: "lesson" as AstroContent,
        details: l,
      }));
    const allContentDetails = _.orderBy(
      [
        ...(selectedContentType && selectedContentType !== "video"
          ? []
          : videoDetails),
        ...(selectedContentType && selectedContentType !== "worksheet"
          ? []
          : worksheetDetails),
        ...(selectedContentType && selectedContentType !== "image"
          ? []
          : imageDetails),
        ...(selectedContentType && selectedContentType !== "link"
          ? []
          : linkDetails),
        ...(selectedContentType && selectedContentType !== "text"
          ? []
          : textDetails),
        ...(selectedContentType && selectedContentType !== "lesson"
          ? []
          : lessonDetails),
      ],
      (c) =>
        selectedSort === "updatedAt"
          ? new Date(c.details.updatedAt)
          : c.type === "text" // @ts-ignore
          ? c.details.value?.toLowerCase() // @ts-ignore
          : c.details.title?.toLowerCase(),
      selectedSort === "updatedAt" ? "desc" : "asc"
    );
    setCards(allContentDetails);
  }, [
    lessons,
    images,
    videos,
    texts,
    links,
    worksheets,
    selectedContentType,
    searchValue,
    selectedSort,
  ]);
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

  // useEffect(() => {
  //   userDetails.user?.id &&
  //     !userDetails.user?.freeTrialStart &&
  //     ApiController.submitFreeTrialStartDate(userDetails.user?.id).then(
  //       userDetails.refresh
  //     );
  // }, [userDetails.user?.id, userDetails.user?.freeTrialStart]);

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

  const onBasicMode = useOnBasicMode();

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [worksheetEditingDialogId, setWorksheetEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [anyLoaded, setAnyLoaded] = useState<boolean>(false);
  const [worksheetsLoaded, setWorksheetsLoaded] = useState<boolean>(false);
  const [videosLoaded, setVideosLoaded] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [linksLoaded, setLinksLoaded] = useState<boolean>(false);
  const [textsLoaded, setTextsLoaded] = useState<boolean>(false);
  const [lessonsLoaded, setLessonsLoaded] = useState<boolean>(false);
  useEffect(
    () =>
      setAnyLoaded(
        (worksheetsLoaded &&
          videosLoaded &&
          lessonsLoaded &&
          linksLoaded &&
          textsLoaded &&
          imagesLoaded) ||
          worksheets.length > 0 ||
          videos.length > 0 ||
          images.length > 0 ||
          links.length > 0 ||
          texts.length > 0 ||
          lessons.length > 0
      ),
    [
      worksheetsLoaded,
      videosLoaded,
      imagesLoaded,
      linksLoaded,
      textsLoaded,
      lessonsLoaded,
    ]
  );

  const [filteredCards, setFilteredCards] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet | ILesson | ILink | IImage | IText;
    }[]
  >([]);
  const [selectedBinaryFilter, setSelectedBinaryFilter] = useState<
    "lessons" | "all"
  >("lessons");
  const [selectedMultipleFilter, setSelectedMultipleFilter] = useState<
    "all" | "video" | "worksheet" | "image" | "text" | "link"
  >("all");

  useEffect(() => {
    if (selectedBinaryFilter === "all") {
      if (selectedMultipleFilter === "all") {
        setFilteredCards(cards.filter((c) => c.type !== "lesson"));
      } else {
        setFilteredCards(
          cards.filter((c) => c.type === selectedMultipleFilter)
        );
      }
    } else {
      setFilteredCards(cards.filter((c) => c.type === "lesson"));
    }
  }, [cards, selectedBinaryFilter, selectedMultipleFilter]);

  const [alreadySubmitting, setAlreadySubmitting] = useState<boolean>(false);

  const [
    typeOfContentDialogToOpenUponLandingInNewLesson,
    setTypeOfContentDialogToOpenUponLandingInNewLesson,
  ] = useLocalStorage<"video" | "worksheet" | "link" | "image" | null>(
    "typeOfContentDialogToOpenUponLandingInNewLesson",
    null
  );

  const [openContentDialogInLessonId, setOpenContentDialogInLessonId] =
    useLocalStorage<string | null>("openContentDialogInLessonId", null);

  const createLessonAndRedirect = (openContentDialog?: boolean) =>
    ApiController.createLesson({
      title: DEFAULT_LESSON_TITLE,
      description: "A new collection of Contents",
      creatorId: userDetails.user?.id,
    }).then((lesson) => {
      openContentDialog && setOpenContentDialogInLessonId(lesson.id);
      router.push(`/lesson/${lesson.id}`);
    });

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
          <Typography variant="h4">Create a Lesson</Typography>
        </Stack>
        {/* <Typography color={PALETTE.secondary.grey[4]}>
          Welcome to your Astrosafe dashboard! Here you can manage you safetube,
          worksheets and more.
        </Typography> */}
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
              setAlreadySubmitting(true);
              !alreadySubmitting && createLessonAndRedirect(true);
            }}
            infoButtonPosition={215}
            info={CONTENT_BRANDING.lesson.info}
          />
          <ToolButton
            mobile
            title="Create safe video link"
            description="Free of ads. Safe to share."
            color={CONTENT_BRANDING.video.color}
            icon={CirclePlayIcon}
            onClick={() => {
              if (onBasicMode) {
                setUpgradeDialogOpen(true);
              } else if (!alreadySubmitting) {
                setAlreadySubmitting(true);
                setTypeOfContentDialogToOpenUponLandingInNewLesson("video");
                createLessonAndRedirect(true);
              }
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
            color={CONTENT_BRANDING.worksheet.color}
            icon={ChecklistIcon}
            onClick={() => {
              if (onBasicMode) {
                setUpgradeDialogOpen(true);
              } else if (!alreadySubmitting) {
                setAlreadySubmitting(true);
                setTypeOfContentDialogToOpenUponLandingInNewLesson("worksheet");
                createLessonAndRedirect(true);
              }
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
          <Stack direction="row" spacing="12px" px="20px">
            <DashboardPageBinaryContentFilterSelection
              selected={selectedBinaryFilter}
              callback={(s) => setSelectedBinaryFilter(s)}
            />

            <Stack
              sx={{
                opacity: selectedBinaryFilter === "all" ? 1 : 0,
                transition: "0.2s",
              }}
            >
              <SortButton
                selected={selectedMultipleFilter}
                callback={(id) => setSelectedMultipleFilter(id)}
                types={["all", "video", "worksheet", "image", "text", "link"]}
                displayNames={{
                  all: "All",
                  video: "Video",
                  worksheet: "Worksheet",
                  image: "Image",
                  text: "Text",
                  link: "Link",
                }}
                noText
              />
            </Stack>
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
              types={["abc", "updatedAt"]}
              displayNames={{
                abc: "Alphabetical",
                updatedAt: "Most recent",
              }}
              width="204px"
            />
          </Stack>
        </Stack>
      </UrsorFadeIn>
      {filteredCards.length > 0 ? (
        <Stack
          flex={1}
          pb="110px"
          spacing={
            selectedBinaryFilter === "lessons"
              ? LESSON_GRID_SPACING
              : GRID_SPACING
          }
          pt="8px"
          px="20px"
        >
          {filteredCards.map((card, i) => (
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
                <WorksheetCard
                  {...(card.details as IWorksheet)}
                  editingCallback={() =>
                    setWorksheetEditingDialogId(card.details.id)
                  }
                  deletionCallback={loadWorksheets}
                />
              ) : card.type === "image" ? (
                <ImageCard
                  {...(card.details as IImage)}
                  editingCallback={() =>
                    setImageEditingDialogId(card.details.id)
                  }
                  deletionCallback={loadImages}
                />
              ) : card.type === "text" ? (
                <TextCard
                  {...(card.details as IText)}
                  editCallback={() => setTextEditingDialogId(card.details.id)}
                  deleteCallback={loadTexts}
                />
              ) : card.type === "link" ? (
                <LinkCard
                  {...(card.details as ILink)}
                  editCallback={() => setLinkEditingDialogId(card.details.id)}
                  deleteCallback={loadLinks}
                  height="260px"
                />
              ) : card.type === "lesson" ? (
                <LessonCard
                  {...(card.details as ILesson)}
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
      {worksheetEditingDialogId ? (
        <WorksheetCreationDialog
          open={true}
          closeCallback={() => setWorksheetEditingDialogId(undefined)}
          editingCallback={loadWorksheets}
          worksheet={worksheets.find((w) => w.id === worksheetEditingDialogId)}
          mobile
        />
      ) : null}
      <LessonCreationDialog
        open={lessonCreationDialogOpen}
        closeCallback={() => setLessonCreationDialogOpen(false)}
      />
      {lessonEditingDialogId ? (
        <LessonCreationDialog
          open={!!lessonEditingDialogId}
          closeCallback={() => setLessonEditingDialogId(undefined)}
          updateCallback={loadLessons}
          lesson={lessons.find((l) => l.id === lessonEditingDialogId)}
        />
      ) : null}
      {imageEditingDialogId ? (
        <ImageDialog
          open={true}
          closeCallback={() => setImageEditingDialogId(undefined)}
          updateCallback={loadImages}
          image={images.find((i) => i.id === imageEditingDialogId)}
        />
      ) : null}
      {linkEditingDialogId ? (
        <LinkDialog
          open={true}
          closeCallback={() => setLinkEditingDialogId(undefined)}
          updateCallback={loadLinks}
          link={links.find((l) => l.id === linkEditingDialogId)}
        />
      ) : null}
      {textEditingDialogId ? (
        <TextCreationDialog
          open={true}
          closeCallback={() => setTextEditingDialogId(undefined)}
          updateCallback={loadTexts}
          text={texts.find((t) => t.id === textEditingDialogId)}
          mobile
        />
      ) : null}
      {!selectedContentType &&
      lessons.length === 0 &&
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
      {selectedContentType === "lesson" && lessons.length === 0 ? (
        <MobileEmptyStateIllustration>
          No lessons yet.
        </MobileEmptyStateIllustration>
      ) : null}
      {selectedContentType === "worksheet" && worksheets.length === 0 ? (
        <MobileEmptyStateIllustration>
          No worksheets yet.
        </MobileEmptyStateIllustration>
      ) : null}
      <DashboardSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
        mobile
      />
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

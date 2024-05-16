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
import Star from "@/images/Star.svg";
import X from "@/images/icons/X.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import { useContext, useEffect, useRef, useState } from "react";
import ApiController, { IVideo } from "../api";
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
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import DashboardSignupPromptDialog from "./DashboardSignupPromptDialog";
import StepperOverlay from "./StepperOverlay";
import dayjs from "dayjs";
import { TRIAL_DAYS } from "../account/AccountPageContents";
import { useRouter } from "next/navigation";
import QuestionnaireDialog from "./QuestionnaireDialog";
import TrialExpirationDialog from "./TrialExpirationDialog";
import ProfileButton from "../components/ProfileButton";
import dynamic from "next/dynamic";
import LessonCreationDialog from "./LessonCreationDialog";
import { ILesson } from "../lesson/[subdirectory]/page";
import LinkDialog, { ILink, shouldBeLightText } from "./LinkDialog";
import LessonCard from "../components/LessonCard";
import LiteModeBar, { useOnBasicMode } from "./LiteModeBar";
import NoCreationsLeftDialog from "./NoCreationsLeftDialog";
import PinkPurpleStar from "@/images/PinkPurpleStar.svg";
import DashboardPageCreateButton from "./DashboardPageCreateButton";
import DashboardPageBinaryContentFilterSelection from "./DashboardPageBinaryContentFilterSelection";
import ImageDialog, { IImage } from "./ImageDialog";
import ImageCard from "../components/ImageCard";
import LinkCard from "../components/LinkCard";
import TextCreationDialog, { IText } from "../components/TextDialog";
import TextCard from "../components/TextCard";
import { cleanTextValueIntoInnerHTML } from "../lesson/[subdirectory]/MobileLessonPageContents";
import Image from "next/image";
import ShareDialog from "./ShareDialog";
import { fadeIn } from "./TimeRange";
import TutorialVideoBar from "../components/TutorialVideoBar";

const FILTER_MULTI_ROW_WINDOW_WIDTH_THRESHOLD = 1023;
const SHORTENED_TOOL_NAME_IN_BUTTONS_WINDOW_WIDTH_THRESHOLD = 924;

const POPOVER_MARGIN = 10;

export const DEFAULT_LESSON_TITLE = "Untitled Lesson";

export const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(180deg);
}
`;

const PAGE_SIZE = 30;

const UpgradeDialog = dynamic(
  () => import("@/app/components/UpgradeDialog"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export interface IAstroContentBranding {
  title: string;
  description: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  infoButtonPosition: number;
  info: string;
  infoImageUrl?: string;
}
export const CONTENT_BRANDING: Record<AstroContent, IAstroContentBranding> = {
  video: {
    title: "Video",
    description: "Free of ads. Safe to share.",
    color: "#FC5C5C",
    icon: CirclePlayIcon,
    infoButtonPosition: 300,
    info: "Copy and paste any YouTube or Vimeo URL to generate a safe and shareable video link.",
    infoImageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/videoInfo.png",
  },
  worksheet: {
    title: "Worksheet",
    description: "Printable & finished in seconds.",
    color: PALETTE.secondary.blue[3],
    icon: ChecklistIcon,
    infoButtonPosition: 290,
    info: "Customise a worksheet template to your students’ needs. We’ll do the rest.",
    infoImageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/worksheetInfo.png",
  },
  lesson: {
    title: "Lesson",
    description: "Dynamic and vivacious collection.",
    color: PALETTE.secondary.green[5],
    icon: VersionsIcon,
    infoButtonPosition: 170,
    info: "Create digital lessons in minutes combining videos, quizzes, worksheets, images and websites!",
    infoImageUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/lessonInfo.png",
  },
  link: {
    title: "Link",
    description: "Add a link to some non-naughty site.",
    color: PALETTE.secondary.orange[3],
    icon: LinkIcon,
    infoButtonPosition: 136,
    info: "Don't you dare try adding a naughty site. We do not tolerate even a hint of violence, drugs, sexuality, or bad design.",
  },
  image: {
    title: "Image",
    description: "Add a wholesome image.",
    color: PALETTE.secondary.pink[3],
    icon: ImageIcon,
    infoButtonPosition: 150,
    info: "Don't you dare try adding a naughty image. We do not tolerate even a hint of violence, drugs, sexuality, or bad design.",
  },
  text: {
    title: "Text",
    description: "Add some styled and well-crafted copy.",
    color: "#41C5FD",
    icon: TypographyIcon,
    infoButtonPosition: 136,
    info: "Don't you dare try adding naughty copy. We do not tolerate even a hint of violence, drugs, sexuality, or bad poetry.",
  },
  quiz: {
    title: "Quiz",
    description: "Add some well-crafted quizzes.",
    color: PALETTE.secondary.purple[3],
    icon: ChecklistIcon,
    infoButtonPosition: 136,
    info: "Boo.",
  },
};

export const GRID_SPACING = "20px";

export const LESSON_GRID_SPACING = "34px";

export type AstroContent =
  | "video"
  | "worksheet"
  | "quiz"
  | "lesson"
  | "link"
  | "image"
  | "text";

export type AstroContentSort = "abc" | "updatedAt";

export const getTrialDaysLeft = (freeTrialStart?: string) =>
  TRIAL_DAYS - dayjs().diff(freeTrialStart, "days");

export const getPeriodDaysLeft = (subscriptionDeletionDate: number) =>
  -dayjs().diff(dayjs.unix(subscriptionDeletionDate ?? 0), "days");

export const SearchInput = (props: {
  value: string;
  callback: (value: string) => void;
  clearCallback: () => void;
  shadow?: boolean;
  fullWidth?: boolean;
  height?: string;
  grey?: boolean;
}) => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  return (
    <Stack
      height={props.height || "28px"}
      width={props.fullWidth ? "100%" : "160px"}
      direction="row"
      borderRadius="8px"
      alignItems="center"
      bgcolor={props.grey ? PALETTE.secondary.grey[1] : "rgb(255,255,255)"}
      px="10px"
      spacing="8px"
      boxSizing="border-box"
      sx={{
        svg: {
          path: {
            fill: PALETTE.secondary.grey[4],
          },
        },
        transition: "0.2s",
      }}
      border={`${active || hovering ? 2 : 0}px solid ${
        PALETTE.secondary.purple[active ? 2 : 1]
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      boxShadow={props.shadow ? "0 0 16px rgba(0,0,0,0.03)" : undefined}
    >
      <SearchIcon width="24px" height="24px" />
      <Input
        style={{
          textAlign: "left",
          textOverflow: "ellipsis",
          fontSize: FONT_SIZES["small"],
          color: PALETTE.font.dark,
          fontWeight: 480,
          lineHeight: "100%",
          transition: "0.2s",
          fontFamily: "inherit",
          width: props.fullWidth ? "100%" : undefined,
        }}
        value={props.value}
        disableUnderline
        sx={{
          background: props.grey
            ? PALETTE.secondary.grey[1]
            : "rgb(255,255,255)",
          input: {
            padding: "0 !important",
          },
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.callback(event.target.value);
        }}
        placeholder="Search"
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />

      <Stack
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.6 },
          transition: "0.2s",
          opacity: props.value ? 1 : 0,
        }}
        onClick={props.clearCallback}
      >
        <X width="16px" height="16px" />
      </Stack>
    </Stack>
  );
};

export const FilterButton = (props: {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selected: boolean;
  onClick: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="32px"
      justifyContent="center"
      alignItems="center"
      direction="row"
      spacing="8px"
      borderRadius="6px"
      bgcolor="rgb(255,255,255)"
      boxShadow="0 0 16px rgba(0,0,0,0.03)"
      sx={{
        pointerEvents: props.selected ? "none" : undefined,
        cursor: "pointer",
        outline: `2px solid ${
          props.selected ? PALETTE.secondary.purple[2] : "transparent"
        }`,
        svg: {
          path: {
            transition: "0.2s",
            fill: props.selected
              ? PALETTE.secondary.purple[2]
              : hovering
              ? PALETTE.secondary.purple[1]
              : PALETTE.secondary.grey[5],
          },
        },
      }}
      px="12px"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={props.onClick}
    >
      <props.icon height="20px" width="20px" />
      <Typography
        variant="small"
        bold
        color={
          props.selected
            ? PALETTE.secondary.purple[2]
            : hovering
            ? PALETTE.secondary.purple[1]
            : PALETTE.secondary.grey[5]
        }
        sx={{
          transition: "0.2s",
        }}
      >
        {props.text}
      </Typography>
    </Stack>
  );
};

export const FilterRow = (props: {
  selected: AstroContent | null;
  callback: (newSelected: AstroContent | null) => void;
  mobile?: boolean;
}) => (
  <Stack direction="row" spacing="12px" px={props.mobile ? "20px" : undefined}>
    <FilterButton
      text="All"
      icon={Star}
      selected={!props.selected}
      onClick={() => props.callback(null)}
    />
    <FilterButton
      text="Lessons"
      icon={CONTENT_BRANDING.lesson.icon}
      selected={props.selected === "lesson"}
      onClick={() => props.callback("lesson")}
    />
    <FilterButton
      text="Videos"
      icon={CirclePlayIcon}
      selected={props.selected === "video"}
      onClick={() => props.callback("video")}
    />
    <FilterButton
      text="Worksheets"
      icon={ChecklistIcon}
      selected={props.selected === "worksheet"}
      onClick={() => props.callback("worksheet")}
    />
    <Stack minWidth="28px" />
  </Stack>
);

export const ToolButton = (props: {
  color: string;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  infoButtonPosition: number;
  info: string;
  mobile?: boolean;
  fullWidth?: boolean;
  strongShadow?: boolean;
  noInfo?: boolean;
  infoImageUrl?: string;
  popoverTitle?: string;
  onClick: () => void;
}) => {
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [lightText, setLightText] = useState<boolean>(false);
  useEffect(() => setLightText(shouldBeLightText(props.color)), [props.color]);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [popoverY, setPopoverY] = useState<number>(0);
  const [popoverX, setPopoverX] = useState<number>(0);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);
  useEffect(() => {
    ref?.getBoundingClientRect?.().bottom &&
      setPopoverY(ref.getBoundingClientRect().bottom + POPOVER_MARGIN);
    ref?.getBoundingClientRect?.().left &&
      setPopoverX(ref.getBoundingClientRect().left);
    ref?.getBoundingClientRect?.().width &&
      setPopoverWidth(ref.getBoundingClientRect().width);
  }, [
    ref?.getBoundingClientRect?.().bottom,
    ref?.getBoundingClientRect?.().left,
    ref?.getBoundingClientRect?.().width,
  ]);

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <>
      {createPortal(
        <Stack
          position="absolute"
          top={popoverY}
          left={popoverX}
          // sx={{
          //   cursor: "pointer",
          //   "&:hover": { opacity: 0.6 },
          //   transition: "0.2s",
          // }}
          sx={{
            opacity: hovering ? 1 : 0,
            pointerEvents: "none",
            transition: "0.4s",
            transitionDelay: "0.6s",
          }}
          onClick={() => setOverlayOpen(true)}
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          width={popoverWidth}
          boxShadow="0 0 22px rgba(0,0,0,0.05)"
          spacing="6px"
          p="20px"
          boxSizing="border-box"
          zIndex={999}
        >
          {props.infoImageUrl ? (
            <Stack height="134px" width="100%" borderRadius="4px">
              {/* <Image
                src={props.infoImageUrl}
                style={{ objectFit: "cover" }}
                fill
                alt="info popover image"
              /> */}
              <Stack
                width="100%"
                height="100%"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backgroundImage: `url(${props.infoImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxSizing: "border-box",
                }}
                position="relative"
              />
            </Stack>
          ) : null}
          <Typography variant="medium" bold>
            {props.popoverTitle}
          </Typography>
          <Typography>{props.info}</Typography>
        </Stack>,
        document.body
      )}
      <Stack
        ref={setRef}
        direction="row"
        width={props.fullWidth ? "100%" : props.mobile ? undefined : "294px"}
        minHeight="40px"
        borderRadius="8px"
        boxShadow={
          props.strongShadow
            ? "0 0 16px rgba(0,0,0,0.05)"
            : "0 0 16px rgba(0,0,0,0.02)"
        }
        bgcolor="rgb(255,255,255)"
        position="relative"
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <Stack
          width="100%"
          height="100%"
          position="absolute"
          top={0}
          left={0}
          onClick={props.onClick}
          sx={{
            cursor: "pointer",
            "&:hover": { background: "rgba(255,255,255,0.5)" },
            transition: "0.2s",
          }}
        />

        <Stack direction="row" spacing="14px" flex={1}>
          <Stack
            width="44px"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px 0 0 4px"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              svg: {
                path: {
                  fill: !lightText
                    ? PALETTE.secondary.grey[5]
                    : PALETTE.font.light,
                },
              },
            }}
            bgcolor={props.color}
          >
            <props.icon height="20px" width="20px" />
          </Stack>
          <Stack flex={1} py="11px" justifyContent="center">
            <Stack width="fit-content">
              <Typography
                bold
                color={lightText ? props.color : PALETTE.secondary.grey[5]}
              >
                {props.title}
              </Typography>
            </Stack>
            {/* <Typography
              variant="small"
              sx={{ fontWeight: 380 }}
              color={alpha(
                lightText ? props.color : PALETTE.secondary.grey[5],
                0.7
              )}
            >
              {props.description}
            </Typography> */}
          </Stack>
          <Stack
            height="100%"
            justifyContent="center"
            pr="15px"
            sx={{
              svg: {
                path: {
                  fill: props.color,
                },
              },
            }}
          >
            <PlusIcon height="24px" width="24px" />
          </Stack>
        </Stack>
      </Stack>
      <StepperOverlay
        open={overlayOpen}
        closeCallback={() => setOverlayOpen(false)}
        title={props.title}
        body={props.info}
      />
    </>
  );
};

export default function DashboardPageContents() {
  const userDetails = useUserContext();

  const [lessons, setLessons] = useState<ILesson[]>([]);
  const loadLessons = () => {
    userDetails?.user?.id &&
      ApiController.getUserLessons(userDetails.user.id)
        .then((l) => {
          setLessons(_.reverse(l.slice()));
        })
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
  // const loadTexts = () => {
  //   userDetails?.user?.id &&
  //     ApiController.getUserTexts(userDetails.user.id)
  //       .then((texts) =>
  //         setTexts(
  //           _.reverse(texts.slice()).map((t: IText) => ({
  //             ...t,
  //             value: cleanTextValueIntoInnerHTML(t.value),
  //           }))
  //         )
  //       )
  //       .finally(() => setTextsLoaded(true));
  // };
  // useEffect(() => {
  //   loadTexts();
  // }, [userDetails?.user?.id]);

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

  const [latestPageIndex, setLatestPageIndex] = useState<number>(0);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const onScroll = () => {
    if (scrollableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      if (scrollTop + clientHeight > scrollHeight - 800) {
        PAGE_SIZE * (latestPageIndex + 1) < filteredCards.length &&
          setLatestPageIndex(latestPageIndex + 1);
      }
    }
  };

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet | ILesson | ILink | IImage | IText;
    }[][]
  >([]);
  const [cards, setCards] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet | ILesson | ILink | IImage | IText;
    }[]
  >([]);
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
    "all" | "video" | "worksheet" | "image" | "link"
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

  useEffect(() => {
    const pageLimitedCards = filteredCards.slice(
      0,
      (latestPageIndex + 1) * PAGE_SIZE
    );
    const chunked = _.chunk(pageLimitedCards, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [nColumns, filteredCards, latestPageIndex]);

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

  const [lessonCreationDialogOpen, setLessonCreationDialogOpen] =
    useState<boolean>(false);

  const [lessonEditingDialogId, setLessonEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [freeWorksheetIds, setFreeWorksheetIds] = useLocalStorage<string[]>(
    "freeWorksheetIds",
    []
  );
  useEffect(() => {
    if (userDetails.user?.id && freeWorksheetIds.length > 0) {
      ApiController.claimWorksheets(userDetails.user.id, freeWorksheetIds).then(
        () =>
          setTimeout(() => {
            loadWorksheets();
            loadLessons();
          }, 400)
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
        setTimeout(() => {
          loadWorksheets();
          loadLessons();
        }, 400)
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
  const [questionnaireDialogOpen, setQuestionnaireDialogOpen] =
    useState<boolean>(false);

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

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    string | undefined
  >(undefined);

  const [worksheetEditingDialogId, setWorksheetEditingDialogId] = useState<
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
          //textsLoaded &&
          imagesLoaded) ||
          worksheets.length > 0 ||
          videos.length > 0 ||
          images.length > 0 ||
          links.length > 0 ||
          // texts.length > 0 ||
          lessons.length > 0
      ),
    [
      worksheetsLoaded,
      videosLoaded,
      imagesLoaded,
      linksLoaded,
      //textsLoaded,
      lessonsLoaded,
      videos,
      images,
      links,
      lessons,
      worksheets,
    ]
  );

  useEffect(() => {
    setTimeout(() => setAnyLoaded(true), 6000);
  }, []);

  const [
    typeOfContentDialogToOpenUponLandingInNewLesson,
    setTypeOfContentDialogToOpenUponLandingInNewLesson,
  ] = useLocalStorage<"video" | "worksheet" | "link" | "image" | null>(
    "typeOfContentDialogToOpenUponLandingInNewLesson",
    null
  );

  const { width } = useWindowSize();
  const [filterMultiRow, setFilterMultiRow] = useState<boolean>(false);
  useEffect(
    () => setFilterMultiRow(width < FILTER_MULTI_ROW_WINDOW_WIDTH_THRESHOLD),
    [width]
  );
  const [shortenedToolNameInButton, setShortenedToolNameInButton] =
    useState<boolean>(false);
  useEffect(
    () =>
      setShortenedToolNameInButton(
        width < SHORTENED_TOOL_NAME_IN_BUTTONS_WINDOW_WIDTH_THRESHOLD
      ),
    [width]
  );

  const [openContentDialogInLessonId, setOpenContentDialogInLessonId] =
    useLocalStorage<string | null>("openContentDialogInLessonId", null);

  const createLessonAndRedirect = (openContentDialog?: boolean) =>
    ApiController.createLesson({
      title: DEFAULT_LESSON_TITLE,
      creatorId: userDetails.user?.id,
    }).then((lesson) => {
      openContentDialog && setOpenContentDialogInLessonId(lesson.id);
      router.push(`/lesson/${lesson.id}`);
    });

  const onBasicMode = useOnBasicMode();

  const [alreadySubmitting, setAlreadySubmitting] = useState<boolean>(false);

  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);

  const [showTutorialVideoButton, setShowTutorialVideoButton] =
    useState<boolean>(false);
  const [showTutorialVideo, setShowTutorialVideo] = useState<boolean>(false);
  useEffect(
    () =>
      setShowTutorialVideoButton(
        !userDetails.user?.switchedOffDashboardTutorialVideo
      ),
    [userDetails.user?.switchedOffDashboardTutorialVideo]
  );

  return (
    <>
      {showTutorialVideo && userDetails.user?.id
        ? createPortal(
            <Stack
              top={0}
              left={0}
              width="100%"
              height="100%"
              position="absolute"
              zIndex={9999}
              justifyContent="center"
              alignItems="center"
              sx={{
                opacity: 0,
                animation: `${fadeIn} 0.5s ease-in`,
                animationFillMode: "forwards",
                backdropFilter: "blur(3px)",
              }}
            >
              <Stack
                width="100%"
                height="100%"
                bgcolor="rgba(0,0,0,0.5)"
                position="absolute"
                zIndex={-1}
                onClick={() => setShowTutorialVideo(false)}
              >
                <Stack flex={1} position="relative">
                  <Stack
                    position="absolute"
                    top="20px"
                    right="20px"
                    borderRadius="100%"
                    //bgcolor="rgb(255,255,255)"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      cursor: "pointer",
                      svg: {
                        path: {
                          fill: "rgba(255,255,255,0.85)",
                        },
                      },
                    }}
                  >
                    <X height="32px" width="32px" />
                  </Stack>
                </Stack>
              </Stack>
              <iframe
                src="https://www.loom.com/embed/3d5aa3b00a7f4eec863c36f1acd354aa?sid=7f1c98fc-7c0a-4451-a9ba-12573b7a927d" //@ts-ignore
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                height={710}
                width={1235}
                style={{
                  borderRadius: "16px",
                }}
              />
            </Stack>,
            document.body
          )
        : null}
      <PageLayout
        ref={scrollableRef}
        onScroll={onScroll}
        title="Create a Lesson"
        bodyWidth="100%"
        selectedSidebarItemId="home"
        scrollable
        button={
          !userDetails.user?.subscribed
            ? {
                text: "Upgrade",
                icon: VerifiedIcon,
                callback: () => setUpgradeDialogOpen(true),
              }
            : userDetails.user.subscriptionDeletionDate
            ? {
                text: "Renew",
                icon: VerifiedIcon,
                callback: () =>
                  router.push(
                    process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL ?? ""
                  ),
              }
            : null
        }
        buttonRowExtraElementRight={
          userDetails.user ? <ProfileButton light /> : undefined
        }
        buttonRowExtraElement={
          <Stack direction="row" spacing="12px" alignItems="center">
            {!userDetails.user?.subscribed ||
            userDetails.user.subscriptionDeletionDate ? (
              <>
                {!userDetails.user?.subscriptionDeletionDate &&
                getTrialDaysLeft(userDetails.user?.freeTrialStart) <= 0 ? (
                  <Typography
                    variant="medium"
                    color={PALETTE.secondary.grey[4]}
                  >
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
                        : userDetails.user?.freeTrialStart
                        ? getTrialDaysLeft(userDetails.user?.freeTrialStart)
                        : ""}
                    </Typography>
                    <Typography
                      variant="medium"
                      color={PALETTE.secondary.grey[4]}
                    >
                      {`days left${
                        userDetails.user?.subscriptionDeletionDate
                          ? " in your plan"
                          : ""
                      }`}
                    </Typography>
                  </Stack>
                )}
              </>
            ) : undefined}
          </Stack>
        }
        buttonsDelay={3000}
      >
        {showTutorialVideoButton ? (
          <UrsorFadeIn duration={600}>
            <Stack ml={`${SIDEBAR_X_MARGIN}px`}>
              <TutorialVideoBar
                title="Get started with AstroSafe!"
                subtitle="Learn about AstroSafe in less than 5 minutes."
                callback={() => setShowTutorialVideo(true)}
                xCallback={() => {
                  setShowTutorialVideoButton(false);
                  ApiController.switchOffTutorialVideo(
                    userDetails.user!.id,
                    "dashboard"
                  );
                }}
              />
            </Stack>
          </UrsorFadeIn>
        ) : null}

        <UrsorFadeIn duration={700}>
          <Stack direction="row" spacing="24px" pl={`${SIDEBAR_X_MARGIN}px`}>
            <ToolButton
              title={shortenedToolNameInButton ? "Lesson" : "Create Lesson"}
              description={CONTENT_BRANDING.lesson.description}
              color={CONTENT_BRANDING.lesson.color}
              icon={CONTENT_BRANDING.lesson.icon}
              onClick={() => {
                setAlreadySubmitting(true);
                !alreadySubmitting && createLessonAndRedirect(true);
              }}
              infoButtonPosition={215}
              info={CONTENT_BRANDING.lesson.info}
              infoImageUrl={CONTENT_BRANDING.lesson.infoImageUrl}
              popoverTitle={CONTENT_BRANDING.lesson.title}
            />
            <ToolButton
              title={
                shortenedToolNameInButton
                  ? "Safe video"
                  : "Create Safe Video Link"
              }
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
              info={CONTENT_BRANDING.video.info}
              infoImageUrl={CONTENT_BRANDING.video.infoImageUrl}
              popoverTitle={CONTENT_BRANDING.video.title}
            />
            <ToolButton
              title={
                shortenedToolNameInButton
                  ? "Worksheet"
                  : "Create Math Worksheet"
              }
              description="Printable & finished in seconds."
              color={CONTENT_BRANDING.worksheet.color}
              icon={ChecklistIcon}
              onClick={() => {
                if (onBasicMode) {
                  setUpgradeDialogOpen(true);
                } else if (!alreadySubmitting) {
                  setAlreadySubmitting(true);
                  setTypeOfContentDialogToOpenUponLandingInNewLesson(
                    "worksheet"
                  );
                  createLessonAndRedirect(true);
                }
              }}
              infoButtonPosition={300}
              info={CONTENT_BRANDING.worksheet.info}
              infoImageUrl={CONTENT_BRANDING.worksheet.infoImageUrl}
              popoverTitle={CONTENT_BRANDING.worksheet.title}
            />
          </Stack>
        </UrsorFadeIn>

        <Stack
          minHeight="50px"
          justifyContent="center"
          pl={`${SIDEBAR_X_MARGIN}px`}
        >
          <Stack
            width="100%"
            height="2px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        <UrsorFadeIn duration={700} delay={200}>
          <Stack
            pl={`${SIDEBAR_X_MARGIN}px`}
            direction={filterMultiRow ? "column" : "row"}
            justifyContent="space-between"
            spacing="12px"
          >
            <Stack direction="row" spacing="12px">
              {/* <DashboardPageBinaryContentFilterSelection
                selected={selectedBinaryFilter}
                callback={(s) => setSelectedBinaryFilter(s)}
              /> */}
              {/* <Stack
                sx={{
                  opacity: selectedBinaryFilter === "all" ? 1 : 0,
                  transition: "0.2s",
                }}
              > */}
              {/* <SortButton
                selected={selectedMultipleFilter}
                callback={(id) => setSelectedMultipleFilter(id)}
                types={["all", "video", "worksheet", "image", "link"]}
                displayNames={{
                  all: "All",
                  video: "Video",
                  worksheet: "Worksheet",
                  image: "Image",
                  link: "Link",
                  //text: "Text",
                }}
                text="Type"
                disabled={selectedBinaryFilter !== "all"}
              /> */}
              {/* </Stack> */}
              <Stack
                direction="row"
                alignItems="space-between"
                justifyContent="center"
              >
                <Stack
                  direction="row"
                  spacing="12px"
                  alignItems="center"
                  width="fit-content"
                >
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
                    types={["updatedAt", "abc"]}
                    displayNames={{
                      updatedAt: "Most recent",
                      abc: "Alphabetical",
                    }}
                    width="204px"
                  />
                </Stack>
              </Stack>
            </Stack>
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={ShareIcon}
              iconSize={14}
              onClick={() => {
                userDetails.user?.externalDashboardTitle
                  ? router.push(`/user/${userDetails.user.id}`)
                  : setShareDialogOpen(true);
              }}
            >
              Share with Students
            </UrsorButton>
          </Stack>
        </UrsorFadeIn>
        <Stack
          pt="32px"
          flex={1}
          ref={setColumnsContainerRef}
          overflow="hidden"
        >
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
                <Stack
                  key={i}
                  flex={1}
                  spacing={
                    selectedBinaryFilter === "lessons"
                      ? LESSON_GRID_SPACING
                      : GRID_SPACING
                  }
                >
                  {
                    //[
                    // ...(i === 0
                    //   ? [
                    //       <Stack
                    //         key="new"
                    //         onClick={() => setLessonCreationDialogOpen(true)}
                    //       >
                    //         <DashboardPageCreateButton />
                    //       </Stack>,
                    //     ]
                    //   : []),
                    column.map((item, j) => (
                      <Stack
                        key={`${item.details.id}${selectedSort}`}
                        spacing={GRID_SPACING}
                      >
                        <UrsorFadeIn
                          delay={latestPageIndex === 0 ? j * 190 + i * 190 : 0}
                          duration={900}
                        >
                          {item.type === "video" ? (
                            <VideoCard
                              {...(item.details as IVideo)}
                              editingCallback={() =>
                                setVideoEditingDialogId(item.details.id)
                              }
                              deletionCallback={loadVideos}
                            />
                          ) : item.type === "worksheet" ? (
                            <WorksheetCard
                              {...(item.details as IWorksheet)}
                              editingCallback={() =>
                                setWorksheetEditingDialogId(item.details.id)
                              }
                              deletionCallback={loadWorksheets}
                            />
                          ) : item.type === "image" ? (
                            <ImageCard
                              {...(item.details as IImage)}
                              editingCallback={() =>
                                setImageEditingDialogId(item.details.id)
                              }
                              deletionCallback={loadImages}
                            />
                          ) : // : item.type === "text" ? (
                          //   <TextCard
                          //     {...(item.details as IText)}
                          //     editCallback={() =>
                          //       setTextEditingDialogId(item.details.id)
                          //     }
                          //     deleteCallback={loadTexts}
                          //   />
                          // )
                          item.type === "link" ? (
                            <LinkCard
                              {...(item.details as ILink)}
                              editCallback={() =>
                                setLinkEditingDialogId(item.details.id)
                              }
                              deleteCallback={loadLinks}
                              height="260px"
                            />
                          ) : item.type === "lesson" ? (
                            <LessonCard
                              {...(item.details as ILesson)}
                              clickCallback={() =>
                                router.push(
                                  `/lesson/${
                                    (item.details as ILesson).canonicalUrl
                                  }`
                                )
                              }
                              editingCallback={() =>
                                setLessonEditingDialogId(
                                  (item.details as ILesson).canonicalUrl
                                )
                              }
                              deletionCallback={loadLessons}
                            />
                          ) : null}
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

      {videoEditingDialogId ? (
        <VideoCreationDialog
          open={!!videoEditingDialogId}
          closeCallback={() => setVideoEditingDialogId(undefined)}
          editingCallback={loadVideos}
          video={videos.find((v) => v.id === videoEditingDialogId)}
        />
      ) : null}

      {worksheetEditingDialogId ? (
        <WorksheetCreationDialog
          open={true}
          closeCallback={() => setWorksheetEditingDialogId(undefined)}
          editingCallback={loadWorksheets}
          worksheet={worksheets.find((w) => w.id === worksheetEditingDialogId)}
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
      {/* {textEditingDialogId ? (
        <TextCreationDialog
          open={true}
          closeCallback={() => setTextEditingDialogId(undefined)}
          updateCallback={loadTexts}
          text={texts.find((t) => t.id === textEditingDialogId)}
        />
      ) : null} */}
      {!anyLoaded
        ? createPortal(
            <Stack
              position="absolute"
              top={0}
              width="100vw"
              height="100vh"
              justifyContent="center"
              alignItems="center"
              zIndex={999}
            >
              <Stack
                sx={{
                  animation: `${spin} 1.6s linear infinite`,
                }}
              >
                <PinkPurpleStar height={60} width={60} />
              </Stack>
            </Stack>,
            document.body
          )
        : null}
      {anyLoaded &&
      !selectedContentType &&
      lessons.length === 0 &&
      worksheets.length === 0 &&
      videos.length === 0
        ? createPortal(
            <EmptyStateIllustration>No content yet.</EmptyStateIllustration>,
            document.body
          )
        : null}
      {selectedContentType === "video" && videos.length === 0
        ? createPortal(
            <EmptyStateIllustration>No videos yet.</EmptyStateIllustration>,
            document.body
          )
        : null}
      {selectedContentType === "lesson" && lessons.length === 0
        ? createPortal(
            <EmptyStateIllustration>No lessons yet.</EmptyStateIllustration>,
            document.body
          )
        : null}
      {selectedContentType === "worksheet" && worksheets.length === 0
        ? createPortal(
            <EmptyStateIllustration>No worksheets yet.</EmptyStateIllustration>,
            document.body
          )
        : null}

      <DashboardSignupPromptDialog
        open={signupPromptDialogOpen}
        closeCallback={() => setSignupPromptDialogOpen(false)}
      />
      <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      />
      <QuestionnaireDialog
        open={questionnaireDialogOpen}
        closeCallback={() => setQuestionnaireDialogOpen(false)}
        initialBackbuttonCallback={() => {
          setQuestionnaireDialogOpen(false);
          setTrialExpirationDialogOpen(true);
        }}
        upgradeCallback={() => {
          setUpgradeDialogOpen(true);
          setQuestionnaireDialogOpen(false);
        }}
      />
      <TrialExpirationDialog
        open={trialExpirationDialogOpen}
        closeCallback={() => setTrialExpirationDialogOpen(false)}
        openQuestionnaireCallback={() => {
          setQuestionnaireDialogOpen(true);
          setTrialExpirationDialogOpen(false);
        }}
        upgradeCallback={() => {
          setTrialExpirationDialogOpen(false);
          setUpgradeDialogOpen(true);
        }}
      />
      {onBasicMode ? (
        <UrsorFadeIn duration={1000}>
          <LiteModeBar upgradeCallback={() => setUpgradeDialogOpen(true)} />
        </UrsorFadeIn>
      ) : null}
      <NoCreationsLeftDialog
        open={noCreationsLeftDialogOpen}
        closeCallback={() => setNoCreationsLeftDialogOpen(false)}
        callback={() => setUpgradeDialogOpen(true)}
      />
      {shareDialogOpen ? (
        <ShareDialog
          open={true}
          closeCallback={() => setShareDialogOpen(false)}
        />
      ) : null}
    </>
  );
}

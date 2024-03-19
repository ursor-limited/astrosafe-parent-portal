"use client";

import { Stack, alpha } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import InfoIcon from "@/images/icons/InfoIcon.svg";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import X from "@/images/icons/X.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
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
import StepperOverlay from "./StepperOverlay";
import UpgradeDialog from "../components/UpgradeDialog";
import UpgradePromptDialog from "../components/UpgradeDialog";
import dayjs from "dayjs";
import { TRIAL_DAYS } from "../account/AccountPageContents";
import {
  ASTRO_MAGICAL_GRADIENT,
  STRIPE_CUSTOMER_PORTAL_URL,
} from "../components/header2";
import { useRouter } from "next/navigation";
import QuestionnaireDialog from "./QuestionnaireDialog";
import TrialExpirationDialog from "./TrialExpirationDialog";

export const GRID_SPACING = "20px";

export type AstroContent = "video" | "worksheet";

export type AstroContentSort = "abc" | "createdAt";

export const SearchInput = (props: {
  value: string;
  callback: (value: string) => void;
  clearCallback: () => void;
  shadow?: boolean;
  fullWidth?: boolean;
}) => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  return (
    <Stack
      height="28px"
      width={props.fullWidth ? undefined : "180px"}
      direction="row"
      borderRadius="8px"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
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
      <SearchIcon width="20px" height="20px" />
      <Input
        style={{
          textAlign: "left",
          textOverflow: "ellipsis",
          fontSize: FONT_SIZES["small"],
          color: PALETTE.font.dark,
          fontWeight: BOLD_FONT_WEIGHT,
          lineHeight: "100%",
          transition: "0.2s",
          fontFamily: "inherit",
        }}
        value={props.value}
        disableUnderline
        sx={{
          background: "rgb(255,255,255)",
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
}) => (
  <Stack direction="row" spacing="12px">
    <FilterButton
      text="All"
      icon={VersionsIcon}
      selected={!props.selected}
      onClick={() => props.callback(null)}
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
  </Stack>
);

export const ToolButton = (props: {
  color: string;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  infoButtonPosition: number;
  infoTitle: string;
  infoBody: string;
  mobile?: boolean;
  onClick: () => void;
}) => {
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  return (
    <>
      <Stack
        direction="row"
        width={props.mobile ? undefined : "370px"}
        minHeight="66px"
        borderRadius="8px"
        boxShadow="0 0 16px rgba(0,0,0,0.02)"
        bgcolor="rgb(255,255,255)"
        position="relative"
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
        <Stack
          position="absolute"
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            svg: {
              path: {
                fill: `${PALETTE.secondary.grey[4]} !important`,
              },
            },
          }}
          onClick={() => setOverlayOpen(true)}
          top="16px"
          left={`${props.infoButtonPosition}px`}
        >
          <InfoIcon width="14px" height="14px" />
        </Stack>
        <Stack direction="row" spacing="14px" flex={1}>
          <Stack
            width="70px"
            height="100%"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px 0 0 4px"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }}
            bgcolor={props.color}
          >
            <props.icon height="35px" width="35px" />
          </Stack>
          <Stack flex={1} py="11px" justifyContent="space-between">
            <Typography variant="medium" bold color={props.color}>
              {props.title}
            </Typography>
            <Typography
              variant="small"
              sx={{ fontWeight: 380 }}
              color={alpha(props.color, 0.7)}
            >
              {props.description}
            </Typography>
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
        title={props.infoTitle}
        body={props.infoBody}
      />
    </>
  );
};

export default function DashboardPageContents() {
  const userDetails = useUserContext();

  const [videos, setVideos] = useState<IVideo[]>([]);
  const loadVideos = () => {
    userDetails?.user?.id &&
      ApiController.getUserVideos(userDetails.user.id).then((videos) =>
        setVideos(_.reverse(videos.slice()).filter((v: any) => v.thumbnailUrl))
      );
  };
  useEffect(() => {
    loadVideos();
  }, [userDetails?.user?.id]);

  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  const loadWorksheets = () => {
    userDetails?.user?.id &&
      ApiController.getUserWorksheets(userDetails.user.id).then((ws) =>
        setWorksheets(_.reverse(ws.slice()))
      );
  };
  useEffect(() => {
    loadWorksheets();
  }, [userDetails?.user?.id]);

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet;
    }[][]
  >([]);

  const [selectedContentType, setSelectedContentType] =
    useState<AstroContent | null>(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] =
    useState<AstroContentSort>("createdAt");

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

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
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [
    videos,
    worksheets,
    nColumns,
    selectedContentType,
    searchValue,
    selectedSort,
  ]);

  const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);

  const [videoCreationDialogOpen, setVideoCreationDialogOpen] =
    useState<boolean>(false);

  const [worksheetCreationDialogOpen, setWorksheetCreationDialogOpen] =
    useState<boolean>(false);

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

  const [signupPromptDialogCanOpen, setSignupPromptDialogCanOpen] =
    useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setSignupPromptDialogCanOpen(true), 1000);
  }, []);
  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);
  useEffect(() => {
    setSignupPromptDialogOpen(
      signupPromptDialogCanOpen && !userDetails.loading && !userDetails.user?.id
    );
  }, [userDetails.user?.id, userDetails.loading, signupPromptDialogCanOpen]);

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);
  const [questionnaireDialogOpen, setQuestionnaireDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    userDetails.user?.id &&
      !userDetails.user?.freeTrialStart &&
      ApiController.submitFreeTrialStartDate(userDetails.user?.id).then(
        userDetails.refresh
      );
  }, [userDetails.user?.id]);

  const router = useRouter();

  const getTrialDaysLeft = () =>
    TRIAL_DAYS - dayjs().diff(userDetails.user?.freeTrialStart, "days");

  const [trialExpirationDialogOpen, setTrialExpirationDialogOpen] =
    useState<boolean>(false);
  useEffect(() => {
    !userDetails.user?.subscribed &&
      setTrialExpirationDialogOpen(getTrialDaysLeft() <= 0);
  }, []);

  return (
    <>
      <PageLayout
        title="Home"
        bodyWidth="100%"
        selectedSidebarItemId="home"
        scrollable
        description="Welcome to your Astrosafe dashboard! Here you can manage you safetube, worksheets and more."
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
                callback: () => router.push(STRIPE_CUSTOMER_PORTAL_URL),
              }
            : undefined
        }
        buttonRowExtraElement={
          <Stack direction="row" spacing="12px" alignItems="center">
            {!userDetails.user?.subscribed ||
            userDetails.user.subscriptionDeletionDate ? (
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
                  {getTrialDaysLeft()}
                </Typography>
                <Typography variant="medium" color={PALETTE.secondary.grey[4]}>
                  days left
                </Typography>
              </Stack>
            ) : undefined}
            <UrsorButton
              backgroundColor={ASTRO_MAGICAL_GRADIENT}
              onClick={() => setTrialExpirationDialogOpen(true)}
            >
              Test trial expiration
            </UrsorButton>
          </Stack>
        }
      >
        <UrsorFadeIn duration={700}>
          <Stack direction="row" spacing="24px" pl={`${SIDEBAR_X_MARGIN}px`}>
            <ToolButton
              title="Create safe video link"
              description="Free of ads. Safe to share."
              color={PALETTE.secondary.blue[3]}
              icon={CirclePlayIcon}
              onClick={() => {
                setVideoCreationDialogOpen(true);
              }}
              infoButtonPosition={280}
              infoTitle="Safe video link"
              infoBody={
                "Copy and paste any YouTube or Vimeo URL to generate a safe and shareable video link. Reduce ads, remove distracting content, and increase focus with our SafeTube player."
              }
            />
            <ToolButton
              title="Create math worksheet"
              description="Printable & finished in seconds."
              color={PALETTE.secondary.pink[5]}
              icon={ChecklistIcon}
              onClick={() => setWorksheetCreationDialogOpen(true)}
              infoButtonPosition={300}
              infoTitle="Math worksheet"
              infoBody={
                "Customise a worksheet template to your students’ needs. We’ll do the rest. Download, print and share your worksheet in seconds."
              }
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
            direction="row"
            justifyContent="space-between"
          >
            <FilterRow
              selected={selectedContentType}
              callback={(newSelected) => setSelectedContentType(newSelected)}
            />
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
        <Stack
          pt="24px"
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
                <Stack key={i} flex={1} spacing={GRID_SPACING}>
                  {column.map((item, j) => (
                    <Stack
                      key={`${item.details.id}${selectedSort}`}
                      spacing={GRID_SPACING}
                    >
                      <UrsorFadeIn delay={j * 190 + i * 190} duration={900}>
                        {
                          item.type === "video" ? (
                            <VideoCard {...(item.details as IVideo)} />
                          ) : (
                            <WorksheetCard {...(item.details as IWorksheet)} />
                          ) // other card
                        }
                      </UrsorFadeIn>
                    </Stack>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </PageLayout>
      <VideoCreationDialog
        open={videoCreationDialogOpen}
        closeCallback={() => setVideoCreationDialogOpen(false)}
      />
      <WorksheetCreationDialog
        open={worksheetCreationDialogOpen}
        closeCallback={() => setWorksheetCreationDialogOpen(false)}
      />
      {!selectedContentType && worksheets.length === 0 && videos.length === 0
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
      <UpgradePromptDialog
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
      />
      <TrialExpirationDialog
        open={trialExpirationDialogOpen}
        closeCallback={() => setTrialExpirationDialogOpen(false)}
        openQuestionnaireCallback={() => {
          setQuestionnaireDialogOpen(true);
          setTrialExpirationDialogOpen(false);
        }}
      />
    </>
  );
}

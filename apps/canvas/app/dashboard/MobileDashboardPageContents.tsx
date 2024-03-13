"use client";

import { Stack, alpha } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import GearIcon from "@/images/icons/GearIcon.svg";
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
import { EmptyStateIllustration } from "../tools/times-tables/[urlId]/LandingPageContents";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";
import { useLocalStorage } from "usehooks-ts";
import DashboardSignupPromptDialog from "./DashboardSignupPromptDialog";
import StepperOverlay from "./StepperOverlay";
import UpgradeDialog from "../components/UpgradeDialog";
import UpgradePromptDialog from "../components/SignupPromptDialog";
import dayjs from "dayjs";
import { TRIAL_DAYS } from "../account/AccountPageContents";
import { FilterRow, SearchInput, ToolButton } from "./DashboardPageContents";

export const GRID_SPACING = "20px";

export type AstroContent = "video" | "worksheet";

export type AstroContentSort = "abc" | "createdAt";

export default function MobileDashboardPageContents() {
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

  const [cards, setCards] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet;
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
      setSignedIn(true);
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

  return (
    <Stack
      p="20px"
      spacing="20px"
      bgcolor={PALETTE.secondary.grey[1]}
      flex={1}
      overflow="scroll"
    >
      <Stack alignItems="flex-end">
        <UrsorButton size="small" iconSize={14} shadow dark endIcon={GearIcon}>
          Account
        </UrsorButton>
      </Stack>
      <Stack spacing="20px">
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h4">Home</Typography>
          <Stack alignItems="center" direction="row" spacing="5px">
            <Typography variant="medium" bold color={PALETTE.secondary.grey[4]}>
              {TRIAL_DAYS - dayjs().diff(userDetails.user?.createdAt, "days")}
            </Typography>
            <Typography variant="medium" color={PALETTE.secondary.grey[4]}>
              days left
            </Typography>
          </Stack>
        </Stack>
        <Typography color={PALETTE.secondary.grey[4]}>
          Welcome to your Astrosafe dashboard! Here you can manage you safetube,
          worksheets and more.
        </Typography>
      </Stack>
      <UrsorFadeIn duration={700}>
        <Stack spacing="12px">
          <ToolButton
            mobile
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
            mobile
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
      <Stack minHeight="20px" justifyContent="center">
        <Stack height="2px" bgcolor={PALETTE.secondary.grey[2]} />
      </Stack>
      <UrsorFadeIn duration={700} delay={200}>
        <Stack spacing="12px">
          <FilterRow
            selected={selectedContentType}
            callback={(newSelected) => setSelectedContentType(newSelected)}
          />
          <Stack direction="row" spacing="12px">
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
            />
          </Stack>
        </Stack>
      </UrsorFadeIn>
      <Stack flex={1} pb="110px" spacing={GRID_SPACING} pt="8px">
        {cards.map((card, i) => (
          <UrsorFadeIn key={card.details.id} delay={i * 120} duration={800}>
            {card.type === "video" ? (
              <VideoCard {...(card.details as IVideo)} />
            ) : (
              <WorksheetCard {...(card.details as IWorksheet)} />
            )}
          </UrsorFadeIn>
        ))}
      </Stack>
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
    </Stack>
  );
}

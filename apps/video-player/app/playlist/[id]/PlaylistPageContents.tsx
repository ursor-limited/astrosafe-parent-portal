"use client";

import { Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import { PALETTE, Typography, UrsorButton } from "ui";
import {
  IEquationWorksheetParameters,
  INumberBondWorksheetParameters,
  IWorksheet,
} from "@/app/components/WorksheetGenerator";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ShareIcon from "@/images/icons/ShareIcon2.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import Pencil from "@/images/icons/Pencil.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BigCard from "@/app/components/BigCard";
import DeletionDialog from "@/app/components/DeletionDialog";
import ApiController, { IVideo } from "@/app/api";
import { useRouter } from "next/navigation";
import { CircularButton } from "@/app/video/[videoId]/VideoPageContents";
import WorksheetSignupPromptDialog from "@/app/components/WorksheetSignupPromptDialog";
import { useLocalStorage } from "usehooks-ts";
import { useUserContext } from "@/app/components/UserContext";
import NotificationContext from "@/app/components/NotificationContext";
import { IAstroCanvasElement } from "@/app/editor/Canvas";
import { AstroContent } from "@/app/dashboard/DashboardPageContents";
import PlaylistVideoCard from "./PlaylistVideoCard";
import LinkCard from "@/app/components/LinkCard";
import PlaylistWorksheetPreview from "./PlaylistWorksheetPreview";
import AddContentButton from "./AddContentButton";
import LinkDialog, { ILink } from "@/app/dashboard/LinkDialog";
import VideoCreationDialog from "@/app/dashboard/VideoCreationDialog";
import WorksheetCreationDialog from "@/app/dashboard/WorksheetCreationDialog";

export type AstroPlaylistContent = "video" | "link" | "worksheet";

export interface IPlaylist {
  id: string;
  title: string;
  description?: string;
  contents: {
    type: AstroPlaylistContent;
    contentId: string;
  }[];
  createdAt: string;
  creatorId: string;
}

export default function PlaylistPageContents(props: IPlaylist) {
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const submitDeletion = () =>
    ApiController.deleteWorksheet(props.id).then(() =>
      router.push("/dashboard")
    );

  const userDetails = useUserContext();
  // const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
  //   useState<boolean>(false);
  // useEffect(() => {
  //   setSignupPromptDialogOpen(
  //     !props.creatorId && !userDetails.loading && !userDetails.user?.id
  //   );
  // }, [userDetails.user?.id, userDetails.loading, props.creatorId]);

  // const [signedIn, setSignedIn] = useLocalStorage<boolean>("signedIn", false);
  // useEffect(() => {
  //   if (userDetails.user && !signedIn) {
  //     router.push("/dashboard");
  //     //setSignedIn(true);
  //   }
  // }, [userDetails.user]);

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

  const [links, setLinks] = useState<ILink[]>([
    {
      id: "BOO",
      title: "BOOOO",
      url: "https://nytimes.com",
      imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/astroLogo!.png",
      color: "#22e08b",
    },
  ]);
  // const loadLinks = () => {
  //   userDetails?.user?.id &&
  //     ApiController.getLinks(userDetails.user.id).then((links) =>
  //       setLinks(links)
  //     );
  // };

  const notificationCtx = useContext(NotificationContext);

  const [contents, setContents] = useState<
    {
      type: AstroPlaylistContent;
      contentId: string;
    }[]
  >([]);
  useEffect(() => setContents(props.contents), [props.contents]);

  const [worksheetDialogOpen, setWorksheetDialogOpen] =
    useState<boolean>(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState<boolean>(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState<boolean>(false);
  const contentCallbacks: Record<AstroContent, () => void> = {
    worksheet: () => setWorksheetDialogOpen(true),
    video: () => setVideoDialogOpen(true),
    link: () => setLinkDialogOpen(true),
    lesson: () => setLessonDialogOpen(true),
  };

  return (
    <>
      <Stack p="40px" overflow="scroll">
        <BigCard
          title={props.title}
          createdAt={props.createdAt}
          rightStuff={
            <Stack direction="row" spacing="12px">
              <AddContentButton callback={(type) => contentCallbacks[type]()} />
              {userDetails?.user?.id &&
              userDetails?.user?.id === props.creatorId ? (
                <Stack
                  sx={{
                    pointerEvents:
                      userDetails?.user?.id === props.creatorId
                        ? undefined
                        : "none",
                    opacity:
                      userDetails?.user?.id &&
                      userDetails?.user?.id !== props.creatorId
                        ? 0
                        : 1,
                  }}
                >
                  <CircularButton
                    icon={TrashcanIcon}
                    color={PALETTE.system.red}
                    onClick={() => setDeletionDialogOpen(true)}
                  />
                </Stack>
              ) : null}
              <Stack
                borderRadius="100%"
                border={`2px solid ${PALETTE.primary.navy}`}
                height="39px"
                width="39px"
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  notificationCtx.success("Copied URL to clipboard.");
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
              >
                <ShareIcon width="22px" height="22px" />
              </Stack>
            </Stack>
          }
        >
          <Stack spacing="20px" width="40%" px="24px">
            {contents.map((c) => {
              if (c.type === "video") {
                const video = videos.find((v) => v.id === c.contentId);
                return video ? (
                  <PlaylistVideoCard key={video.id} {...video} />
                ) : null;
              } else if (c.type === "link") {
                const link = links.find((v) => v.id === c.contentId);
                return link ? <LinkCard key={link.id} {...link} /> : null;
              } else if (c.type === "worksheet") {
                const worksheet = worksheets.find((w) => w.id === c.contentId);
                return worksheet ? (
                  <PlaylistWorksheetPreview key={worksheet.id} {...worksheet} />
                ) : null;
              }
            })}
          </Stack>
        </BigCard>
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="playlist"
        title={props.title}
      />
      <VideoCreationDialog
        open={videoDialogOpen}
        closeCallback={() => setVideoDialogOpen(false)}
      />
      <WorksheetCreationDialog
        open={worksheetDialogOpen}
        closeCallback={() => setWorksheetDialogOpen(false)}
      />
      <LinkDialog
        open={linkDialogOpen}
        closeCallback={() => setLinkDialogOpen(false)}
      />
    </>
  );
}

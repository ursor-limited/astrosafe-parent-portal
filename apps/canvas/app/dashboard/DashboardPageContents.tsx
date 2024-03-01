"use client";

import { Stack, alpha } from "@mui/system";
import PageLayout, { SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import { IVideo } from "./AstroContentColumns";
import { useEffect, useState } from "react";
import ApiController from "../api";
import _ from "lodash";
import UrsorFadeIn from "../components/UrsorFadeIn";
import VideoCard from "../components/VideoCard";
import { IWorksheet } from "../landing/[urlId]/WorksheetGenerator";
import useColumnWidth from "./useColumnWidth";
import WorksheetCard from "../components/WorksheetCard";
import { PALETTE, Typography } from "ui";
import VideoCreationDialog from "./VideoCreationDialog";
import WorksheetCreationDialog from "./WorksheetCreationDialog";

export const GRID_SPACING = "20px";

export type AstroContent = "video" | "worksheet";

const ToolButton = (props: {
  color: string;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}) => (
  <Stack
    direction="row"
    width="360px"
    height="66px"
    borderRadius="4px"
    spacing="12px"
    bgcolor="rgb(255,255,255)"
    border={`3px solid ${alpha(props.color, 0.5)}`}
    onClick={props.onClick}
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
      svg: {
        path: {
          fill: props.color,
        },
      },
    }}
  >
    <Stack
      width="66px"
      height="100%"
      //bgcolor={props.color}
      alignItems="center"
      justifyContent="center"
      borderRadius="4px 0 0 4px"
    >
      <props.icon height="35px" width="35px" />
    </Stack>
    <Stack flex={1} py="11px" justifyContent="space-between">
      <Typography variant="medium" bold>
        {props.title}
      </Typography>
      <Typography variant="small">{props.description}</Typography>
    </Stack>
    <Stack height="100%" justifyContent="center" pr="15px">
      <PlusIcon height="24px" width="24px" />
    </Stack>
  </Stack>
);

export default function LandingPageContents(props: {}) {
  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    ApiController.getUserVideos("mkl.koskela@gmail.com").then((videos) =>
      setVideos(_.reverse(videos.slice()).filter((v: any) => v.thumbnailUrl))
    );
  }, []);

  const [worksheets, setWorksheets] = useState<IWorksheet[]>([]);
  useEffect(() => {
    ApiController.getUserWorksheets().then((ws) =>
      setWorksheets(_.reverse(ws.slice()))
    );
  }, []);

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IVideo | IWorksheet;
    }[][]
  >([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const videoDetails = videos.map((l) => ({
      type: "video" as AstroContent,
      details: l,
    }));
    const worksheetDetails = worksheets
      .filter((x) => x.worksheetId)
      .map((ws) => ({
        type: "worksheet" as AstroContent,
        details: ws,
      }));
    const allContentDetails = _.reverse(
      _.sortBy(
        [...videoDetails, ...worksheetDetails],
        (c) => new Date(c.details.createdAt)
      ).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [videos, worksheets, nColumns]);

  const [videoCreationDialogOpen, setVideoCreationDialogOpen] =
    useState<boolean>(false);

  const [worksheetCreationDialogOpen, setWorksheetCreationDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <PageLayout
        title="Home"
        bodyWidth="100%"
        selectedSidebarItemId="home"
        description="Welcome to your Astrosafe dashboard! Here you can manage you safetube, worksheets and more."
        // button={{
        //   text: "Create",
        //   icon: PlusIcon,
        //   callback: () => null,
        // }}
        button={{
          text: "Upgrade",
          icon: VerifiedIcon,
          callback: () => null,
        }}
        buttonRowExtraElement={
          <Stack
            height="100%"
            alignItems="center"
            direction="row"
            spacing="5px"
          >
            <Typography variant="medium" bold color={PALETTE.secondary.grey[4]}>
              30
            </Typography>
            <Typography variant="medium" color={PALETTE.secondary.grey[4]}>
              days left
            </Typography>
          </Stack>
        }
      >
        <Stack direction="row" spacing="24px">
          <ToolButton
            title="Create safe video link"
            description="Free of ads. Safe to share."
            color={PALETTE.secondary.blue[3]}
            icon={CirclePlayIcon}
            onClick={() => setVideoCreationDialogOpen(true)}
          />
          <ToolButton
            title="Create math worksheet"
            description="Printable & finished in seconds."
            color={PALETTE.secondary.pink[3]}
            icon={ChecklistIcon}
            onClick={() => setWorksheetCreationDialogOpen(true)}
          />
        </Stack>
        <Stack width="100%" height="50px" justifyContent="center">
          <Stack
            width="100%"
            height="2px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        <Stack
          flex={1}
          ref={setColumnsContainerRef}
          overflow="hidden"
          pb="64px"
        >
          <Stack flex={1} overflow="scroll">
            <Stack
              flex={1}
              pb={SIDEBAR_Y_MARGIN}
              direction="row"
              spacing={GRID_SPACING}
            >
              {cardColumns.map((column, i) => (
                <Stack key={i} flex={1} spacing={GRID_SPACING}>
                  {column.map((item, j) => (
                    <Stack key={item.details.id} spacing={GRID_SPACING}>
                      <UrsorFadeIn delay={j * 150 + i * 80} duration={800}>
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
    </>
  );
}

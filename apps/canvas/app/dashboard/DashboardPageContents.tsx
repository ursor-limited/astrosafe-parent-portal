"use client";

import { Stack, alpha } from "@mui/system";
import PageLayout, { SIDEBAR_X_MARGIN, SIDEBAR_Y_MARGIN } from "./PageLayout";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import X from "@/images/icons/X.svg";
import SearchIcon from "@/images/icons/SearchIcon.svg";
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
import { BOLD_FONT_WEIGHT, FONT_SIZES } from "ui/typography";
import { Input } from "@mui/material";

export const GRID_SPACING = "20px";

export type AstroContent = "video" | "worksheet";

export const SearchInput = (props: {
  value: string;
  callback: (value: string) => void;
  clearCallback: () => void;
}) => {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  return (
    <Stack
      height="28px"
      width="180px"
      direction="row"
      borderRadius="8px"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
      px="10px"
      spacing="8px"
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

const FilterButton = (props: {
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

const FilterRow = (props: {
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
    minHeight="66px"
    borderRadius="8px"
    spacing="12px"
    bgcolor="rgb(255,255,255)"
    boxShadow="0 0 16px rgba(0,0,0,0.02)"
    //border={`3px solid ${alpha(props.color, 0.5)}`}
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

  const [selectedContentType, setSelectedContentType] =
    useState<AstroContent | null>(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const videoDetails = videos
      .filter(
        (x) =>
          !searchValue ||
          [x.title, x.description]
            .join()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
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
    const allContentDetails = _.reverse(
      _.sortBy(
        [
          ...(selectedContentType && selectedContentType !== "video"
            ? []
            : videoDetails),
          ...(selectedContentType && selectedContentType !== "worksheet"
            ? []
            : worksheetDetails),
        ],
        (c) => new Date(c.details.createdAt)
      ).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [videos, worksheets, nColumns, selectedContentType, searchValue]);

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
        <Stack direction="row" spacing="24px" pl={`${SIDEBAR_X_MARGIN}px`}>
          <ToolButton
            title="Create safe video link"
            description="Free of ads. Safe to share."
            color={PALETTE.secondary.blue[3]}
            icon={CirclePlayIcon}
            onClick={() => {
              setVideoCreationDialogOpen(true);
            }}
          />
          <ToolButton
            title="Create math worksheet"
            description="Printable & finished in seconds."
            color={PALETTE.secondary.pink[5]}
            icon={ChecklistIcon}
            onClick={() => setWorksheetCreationDialogOpen(true)}
          />
        </Stack>

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
            spacing="30px"
            alignItems="center"
            width="fit-content"
          >
            <SearchInput
              value={searchValue ?? ""}
              callback={(value: string) => {
                setSearchValue(value);
              }}
              clearCallback={() => setSearchValue(undefined)}
            />
          </Stack>
        </Stack>
        <Stack
          pt="24px"
          flex={1}
          ref={setColumnsContainerRef}
          overflow="hidden"
          pb="64px"
        >
          <Stack flex={1} overflow="scroll">
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

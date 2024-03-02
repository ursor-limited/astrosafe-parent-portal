import { Stack } from "@mui/system";
import GraphIllustration from "../images/GraphIllustration.svg";
import { useEffect, useState } from "react";
import _ from "lodash";
import { IWorksheet } from "../landing/[urlId]/WorksheetGenerator";
import { PALETTE, Typography } from "ui";
import useColumnWidth from "./useColumnWidth";
import UrsorFadeIn from "../components/UrsorFadeIn";
import VideoCard from "../components/VideoCard";

export const GRID_SPACING = "12px";
const PADDING = "0px";

export type ContentCard = "video" | "worksheet";

export interface IVideo {
  id: string;
  creatorId: string;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  startTime?: number;
  endTime?: number;
  createdAt: string;
}

export interface IAstroContentColumnsProps {
  title: string;
  description?: string;
  videos: IVideo[];
  worksheets: IWorksheet[];
  minColumnWidth: number;
  maxColumnWidth: number;
  idealColumnWidth: number;
  shareSelectedStackIdWithExtension?: boolean;
  emptyStateText?: string;
}

interface IBrowserContent {
  type: ContentCard;
  details: IVideo | IWorksheet;
}

export const EmptyStateIllustration = (props: {
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
  >
    <Stack position="relative">
      <Stack sx={{ opacity: 0.3 }}>
        <img
          height="267px"
          width="267px"
          src={GraphIllustration}
          alt="Empty state illustration"
        />
      </Stack>
      <Stack width="100%" alignItems="center" position="absolute" top="226px">
        <Typography
          variant="large"
          bold
          color={PALETTE.secondary.grey[3]}
          sx={{
            textAlign: "center",
          }}
        >
          {props.children}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);

const AstroContentColumns = (props: IAstroContentColumnsProps) => {
  const [cardColumns, setCardColumns] = useState<IBrowserContent[][]>([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const videoDetails = props.videos.map((v) => ({
      type: "video" as ContentCard,
      details: v,
    }));
    const worksheetDetails = props.worksheets.map((w) => ({
      type: "worksheet" as ContentCard,
      details: w,
    }));
    const allContentDetails = [
      ..._.reverse(
        _.sortBy(
          [...videoDetails, ...worksheetDetails],
          (c) => new Date(c.details.createdAt)
        ).slice()
      ),
    ];
    const chunked = _.chunk(allContentDetails, nColumns);
    var columns: IBrowserContent[][] = [...Array(nColumns).keys()].map((i) =>
      _.compact(chunked.map((chunk) => chunk[i]))
    );
    setCardColumns(columns);
  }, [props.videos, props.worksheets, nColumns]);

  return (
    <Stack pt={PADDING} pb="64px" px={PADDING} flex={1}>
      <Stack flex={1} spacing="15px">
        <Typography variant="h5">{props.title}</Typography>
        {props.description ? (
          <Stack pb="27px">
            <Typography>{props.description}</Typography>
          </Stack>
        ) : null}
        <Stack ref={setColumnsContainerRef} overflow="hidden" flex={1}>
          {(props.videos?.length ?? 0) + (props.worksheets?.length ?? 0) > 0 ? (
            <Stack flex={1} direction="row" spacing={GRID_SPACING} pb="50px">
              {[
                ...cardColumns.map((column, i) => (
                  <Stack
                    key={i}
                    flex={1}
                    spacing={GRID_SPACING}
                    overflow="hidden"
                  >
                    {column.map((item, j) => (
                      <Stack key={item.details.id}>
                        <UrsorFadeIn delay={j * 150 + i * 80} duration={800}>
                          {item.type === "video" ? (
                            <VideoCard {...(item.details as IVideo)} />
                          ) : null}
                        </UrsorFadeIn>
                      </Stack>
                    ))}
                  </Stack>
                )),
                ...[
                  ...Array(Math.max(0, nColumns - cardColumns.length)).keys(),
                ].map(() => <Stack flex={1} />),
              ]}
            </Stack>
          ) : props.emptyStateText ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <UrsorFadeIn delay={1000} duration={1500}>
                <EmptyStateIllustration>
                  {props.emptyStateText}
                </EmptyStateIllustration>
              </UrsorFadeIn>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AstroContentColumns;

import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import { IImage } from "@/app/dashboard/ImageDialog";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useEffect, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CircularButton } from "@/app/video/[videoId]/VideoPageContents";
import EquationWorksheet from "@/app/worksheet/[id]/EquationWorksheet";
import NumberBondWorksheet from "@/app/worksheet/[id]/NumberBondWorksheet";
import {
  IEquationWorksheetSettings,
  INumberBondWorksheetSettings,
  IWorksheet,
} from "@/app/components/WorksheetGenerator";
import { useWindowSize } from "usehooks-ts";
import { getNPages } from "@/app/worksheet/[id]/WorksheetPageContents";
import { PALETTE } from "ui";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import { useRouter } from "next/navigation";

const A4_HEIGHT = 297;
const A4_WIDTH = 210;

const PADDING = 4;
const DEFAULT_WIDTH = 566;

const WIDTH_RATIO = 0.8;

const TimelineWorksheetCard = (
  props: IWorksheet & {
    lessonId: string;
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    dragging?: boolean;
    columnWidth?: number;
    expanded?: boolean;
    expansionCallback?: () => void;
    noButtons?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteWorksheet(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Worksheet."));

  const submitDuplication = () =>
    ApiController.duplicateWorksheet(props.id, props.lessonId)
      .then(props.duplicationCallback)
      .then(() => notificationCtx.success("Duplicated Worksheet."));

  const { width } = useWindowSize();

  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [cardWidth, setCardWidth] = useState<number>(DEFAULT_WIDTH);
  useEffect(() => {
    ref && setCardWidth(ref.getBoundingClientRect?.()?.width);
  }, [width, ref?.getBoundingClientRect?.()?.width]);

  const [worksheetPageWidth, setWorksheetPageWidth] = useState<number>(1);
  const [worksheetPageHeight, setWorksheetPageHeight] = useState<number>(1);
  useEffect(() => {
    setWorksheetPageWidth(cardWidth - 2 * PADDING);
    setWorksheetPageHeight(((cardWidth - 2 * PADDING) * A4_HEIGHT) / A4_WIDTH);
  }, [width, cardWidth]);

  const [pageIndex, setPageIndex] = useState<number>(0);
  useEffect(() => setPageIndex(0), [props.updatedAt]);
  const [nPages, setNPages] = useState<number>(0);
  useEffect(() => setNPages(getNPages(props)), [props]);

  const router = useRouter();

  return (
    <>
      <TimelineCard
        id={props.id}
        title={props.title}
        description={props.description}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        //editingCallback={props.editingCallback}
        duplicationCallback={submitDuplication}
        color={alpha(CONTENT_BRANDING.worksheet.color, 0.12)}
        width={props.columnWidth ? WIDTH_RATIO * props.columnWidth : undefined}
        creatorId={props.creatorId}
        expanded={props.expanded}
        noButtons={props.noButtons}
      >
        <Stack
          ref={setRef}
          position="relative"
          height={`${worksheetPageHeight}px`}
          borderRadius="8px"
          overflow="hidden"
        >
          <Stack
            sx={{
              transform: `scale(${(0.27 * worksheetPageWidth) / A4_WIDTH})`,
              transformOrigin: "top left",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              cursor: "pointer",
            }}
            position="absolute"
            top={0}
            left={0}
            onClick={() =>
              router.push(
                `/worksheet/${props.id}${
                  props.lessonId ? `?lesson=${props.lessonId}` : ""
                }`
              )
            }
          >
            {props.worksheetComponent === "equation" ? (
              <EquationWorksheet
                title={props.title}
                description={props.description}
                orientation={props.settings.orientation}
                topic={(props.settings as IEquationWorksheetSettings).topic}
                pairs={props.values}
                pageIndex={pageIndex}
              />
            ) : (
              <NumberBondWorksheet
                title={props.title}
                description={props.description}
                orientation={props.settings.orientation}
                sum={(props.settings as INumberBondWorksheetSettings).sum}
                empty={(props.settings as INumberBondWorksheetSettings).empty}
                leftNumbers={props.values}
                pageIndex={pageIndex}
              />
            )}
          </Stack>
          {nPages > 1 ? (
            <Stack
              direction="row"
              spacing="10px"
              position="absolute"
              top={`${worksheetPageHeight - 64}px`}
              right="20px"
              zIndex={2}
            >
              <Stack
                sx={{
                  opacity: pageIndex === 0 ? 0.4 : 1,
                  pointerEvents: pageIndex === 0 ? "none" : undefined,
                }}
              >
                <CircularButton
                  icon={ChevronLeft}
                  color={PALETTE.secondary.grey[3]}
                  onClick={() => setPageIndex(pageIndex - 1)}
                />
              </Stack>
              <Stack
                sx={{
                  opacity: pageIndex >= nPages - 1 ? 0.4 : 1,
                  pointerEvents: pageIndex >= nPages - 1 ? "none" : undefined,
                }}
              >
                <CircularButton
                  icon={ChevronRight}
                  color={PALETTE.secondary.grey[3]}
                  onClick={() => setPageIndex(pageIndex + 1)}
                />
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </TimelineCard>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Worksheet"
          title={props.title}
        />
      ) : null}
    </>
  );
};

export default TimelineWorksheetCard;

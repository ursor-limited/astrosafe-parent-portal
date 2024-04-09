import {
  IEquationWorksheetSettings,
  INumberBondWorksheetSettings,
  IWorksheet,
} from "@/app/components/WorksheetGenerator";
import { CircularButton } from "@/app/video/[videoId]/VideoPageContents";
import EquationWorksheet from "@/app/worksheet/[id]/EquationWorksheet";
import NumberBondWorksheet from "@/app/worksheet/[id]/NumberBondWorksheet";
import { getNPages } from "@/app/worksheet/[id]/WorksheetPageContents";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { PALETTE, Typography } from "ui";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "./LessonVideoCard";
import UrsorActionButton from "@/app/components/UrsorActionButton";
{
  /* <PageSelector
        pageIndex={pageIndex}
        back={() => setPageIndex(pageIndex - 1)}
        forward={() => setPageIndex(pageIndex + 1)}
        nPages={getNPages(props)}
      /> */
}

const LessonWorksheetPreview = (props: {
  worksheet: IWorksheet;
  lessonId?: string;
  editingCallback: () => void;
  deletionCallback: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  useEffect(() => setPageIndex(0), [props.worksheet.updatedAt]);
  const [nPages, setNPages] = useState<number>(0);
  useEffect(() => setNPages(getNPages(props.worksheet)), [props.worksheet]);
  const router = useRouter();
  return (
    <Stack
      position="relative"
      width="566px"
      boxSizing="border-box"
      borderRadius="12px"
      p="4px"
      bgcolor={PALETTE.secondary.pink[3]}
      boxShadow="0 0 60px rgba(0,0,0,0.07)"
    >
      <Stack position="absolute" top="16px" right="16px" zIndex={2}>
        <UrsorActionButton
          size="32px"
          iconSize="16px"
          shadow
          actions={[
            {
              text: "Edit",
              kallback: props.editingCallback,
              icon: PencilIcon,
            },
            {
              text: "Delete",
              kallback: () => null, //setDeletionDialogOpen(true),
              icon: TrashcanIcon,
              color: PALETTE.system.red,
            },
          ]}
        />
      </Stack>
      <Stack position="relative" height="790px">
        <Stack
          sx={{ transform: "scale(0.703)", transformOrigin: "top left" }}
          position="absolute"
          top={0}
          left={0}
        >
          {props.worksheet.worksheetComponent === "equation" ? (
            <EquationWorksheet
              title={props.worksheet.title}
              description={props.worksheet.description}
              orientation={props.worksheet.settings.orientation}
              topic={
                (props.worksheet.settings as IEquationWorksheetSettings).topic
              }
              pairs={props.worksheet.values}
              pageIndex={pageIndex}
            />
          ) : (
            <NumberBondWorksheet
              title={props.worksheet.title}
              description={props.worksheet.description}
              orientation={props.worksheet.settings.orientation}
              sum={
                (props.worksheet.settings as INumberBondWorksheetSettings).sum
              }
              empty={
                (props.worksheet.settings as INumberBondWorksheetSettings).empty
              }
              leftNumbers={props.worksheet.values}
              pageIndex={pageIndex}
            />
          )}
        </Stack>
        {nPages > 1 ? (
          <Stack
            direction="row"
            spacing="10px"
            position="absolute"
            top="726px"
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
                color={PALETTE.secondary.pink[3]}
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
                color={PALETTE.secondary.pink[3]}
                onClick={() => setPageIndex(pageIndex + 1)}
              />
            </Stack>
          </Stack>
        ) : null}
      </Stack>
      <Stack py="6px">
        <Stack flex={1} justifyContent="space-between">
          <Typography
            variant="medium"
            bold
            maxLines={2}
            color="rgb(255,255,255)"
          >
            {props.worksheet.title}
          </Typography>
          {props.worksheet.description ? (
            <Stack pb="9px" pt="2px">
              <Typography
                color="rgb(255,255,255)"
                variant="medium"
                maxLines={2}
              >
                {props.worksheet.description}
              </Typography>
            </Stack>
          ) : null}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ svg: { path: { fill: "rgb(255,255,255)" } } }}
          >
            <Typography variant="small" color="rgb(255,255,255)">
              {getFormattedDate(props.worksheet.createdAt)}
            </Typography>
            <ChecklistIcon height="20px" width="20px" />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        width="100%"
        height="100%"
        top={0}
        left={0}
        position="absolute"
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
        bgcolor={hovering ? "rgba(255,255,255,0.4)" : undefined}
        sx={{
          cursor: "pointer",
          transition: "0.2s",
        }}
        onClick={() =>
          router.push(
            `/worksheet/${props.worksheet.id}${
              props.lessonId ? `?lesson=${props.lessonId}` : ""
            }`
          )
        }
      />
    </Stack>
  );
};

export default LessonWorksheetPreview;

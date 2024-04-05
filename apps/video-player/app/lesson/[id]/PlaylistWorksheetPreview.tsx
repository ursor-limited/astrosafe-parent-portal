import {
  IEquationWorksheetParameters,
  INumberBondWorksheetParameters,
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
import { useRouter } from "next/navigation";
{
  /* <PageSelector
        pageIndex={pageIndex}
        back={() => setPageIndex(pageIndex - 1)}
        forward={() => setPageIndex(pageIndex + 1)}
        nPages={getNPages(props)}
      /> */
}

const PlaylistWorksheetPreview = (
  props: IWorksheet & { lessonId?: string }
) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [nPages, setNPages] = useState<number>(0);
  useEffect(() => setNPages(getNPages(props)), [props]);
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
      <Stack position="relative" height="790px">
        <Stack
          sx={{ transform: "scale(0.703)", transformOrigin: "top left" }}
          position="absolute"
          top={0}
          left={0}
        >
          {props.worksheetId === "equation" ? (
            <EquationWorksheet
              title={props.title}
              description={props.description}
              orientation={props.parameters.orientation}
              topic={(props.parameters as IEquationWorksheetParameters).topic}
              pairs={(props.parameters as IEquationWorksheetParameters).pairs}
              pageIndex={pageIndex}
            />
          ) : (
            <NumberBondWorksheet
              title={props.title}
              description={props.description}
              orientation={props.parameters.orientation}
              sum={(props.parameters as INumberBondWorksheetParameters).sum}
              empty={(props.parameters as INumberBondWorksheetParameters).empty}
              leftNumbers={
                (props.parameters as INumberBondWorksheetParameters).leftNumbers
              }
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
        <Typography
          bold
          variant="medium"
          color={PALETTE.font.light}
          maxLines={2}
        >
          {props.title}
        </Typography>
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
            `/worksheet/${props.id}${
              props.lessonId ? `?lesson=${props.lessonId}` : ""
            }`
          )
        }
      />
    </Stack>
  );
};

export default PlaylistWorksheetPreview;

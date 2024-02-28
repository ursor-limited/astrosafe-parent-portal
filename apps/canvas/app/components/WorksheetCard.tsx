import { Stack } from "@mui/system";
import { IWorksheet } from "../landing/[urlId]/WorksheetGenerator";
import EquationWorksheet from "../worksheet/[id]/EquationWorksheet";
import { PALETTE, Typography } from "ui";
import { getFormattedDate } from "./VideoCard";

const WorksheetCard = (props: IWorksheet) => {
  return (
    <Stack
      height="310px"
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      boxSizing="border-box"
      border={`4px solid rgb(255,255,255)`}
      overflow="hidden"
    >
      <Stack
        height="201px"
        width="100%"
        bgcolor={PALETTE.secondary.grey[3]}
        pt="20px"
        justifyContent="center"
        alignItems="center"
      >
        <Stack width={0} height={0} position="relative" overflow="visible">
          <Stack
            sx={{
              transform: "scale(0.28) translate(-50%, -31%) ",
              transformOrigin: "top left",
            }}
            position="absolute"
            top={0}
            left={0}
            margin="auto"
            overflow="hidden"
          >
            <EquationWorksheet
              title={props.title}
              {...props.parameters}
              pageIndex={0}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack zIndex={2} flex={1} bgcolor="rgb(255,255,255)" p="6px">
        <Stack flex={1} justifyContent="space-between">
          <Typography
            color={PALETTE.secondary.grey[5]}
            variant="medium"
            bold
            maxLines={2}
          >
            {props.title}
          </Typography>
          <Typography color={PALETTE.secondary.grey[5]} variant="small">
            {getFormattedDate(props.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WorksheetCard;

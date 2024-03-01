import { Stack } from "@mui/system";
import { IWorksheet } from "../landing/[urlId]/WorksheetGenerator";
import EquationWorksheet from "../worksheet/[id]/EquationWorksheet";
import { PALETTE, Typography } from "ui";
import { getFormattedDate } from "./VideoCard";
import NumberBondWorksheet from "../worksheet/[id]/NumberBondWorksheet";
import { useRouter } from "next/navigation";

const WorksheetCard = (props: IWorksheet) => {
  const router = useRouter();
  return (
    <Stack
      height="310px"
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      boxSizing="border-box"
      border={`4px solid rgb(255,255,255)`}
      overflow="hidden"
      spacing="8px"
      boxShadow="0 0 11px rgba(0,0,0,0.09)"
      sx={{
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/worksheet/${props.id}`)}
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
            {props.worksheetId === "equation" ? (
              <EquationWorksheet
                title={props.title}
                {...props.parameters}
                pageIndex={0}
              />
            ) : props.worksheetId === "numberBond" ? (
              <NumberBondWorksheet
                title={props.title}
                {...props.parameters}
                pageIndex={0}
              />
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      <Stack zIndex={2} flex={1} bgcolor="rgb(255,255,255)">
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

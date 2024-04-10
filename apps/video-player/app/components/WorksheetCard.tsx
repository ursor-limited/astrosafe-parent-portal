import { Stack } from "@mui/system";
import { IWorksheet } from "./WorksheetGenerator";
import EquationWorksheet from "../worksheet/[id]/EquationWorksheet";
import { PALETTE, Typography } from "ui";
import { getFormattedDate } from "./VideoCard";
import NumberBondWorksheet from "../worksheet/[id]/NumberBondWorksheet";
import { useRouter } from "next/navigation";
import ChecklistIcon from "@/images/icons/ChecklistIcon.svg";
import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import UrsorActionButton from "./UrsorActionButton";
import NotificationContext from "./NotificationContext";
import ApiController from "../api";

export const ORANGE_BORDER_DURATION = 8;

const WorksheetCard = (
  props: IWorksheet & {
    editingCallback: () => void;
    deletionCallback: () => void;
  }
) => {
  const router = useRouter();
  const [orangeBorderOn, setOrangeBorderOn] = useState<boolean>(false);
  useEffect(() => {
    if (
      -dayjs(props.createdAt).diff(dayjs(), "seconds") < ORANGE_BORDER_DURATION
    ) {
      setOrangeBorderOn(true);
      setTimeout(() => setOrangeBorderOn(false), ORANGE_BORDER_DURATION * 1000);
    }
  }, []);

  const notificationCtx = useContext(NotificationContext);

  const submitDeletion = () =>
    ApiController.deleteWorksheet(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Video Link."));

  return (
    <Stack
      height="317px"
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      boxSizing="border-box"
      border={`4px solid rgb(255,255,255)`}
      overflow="hidden"
      boxShadow="0 0 12px rgba(0,0,0,0.06)"
      sx={{
        "&:hover": { opacity: 0.6 },
        transition: "0.2s",
        cursor: "pointer",
        outline: orangeBorderOn
          ? `3px solid ${PALETTE.system.orange}`
          : undefined,
      }}
      pb="7px"
      position="relative"
    >
      <Stack position="absolute" top="11px" right="11px" zIndex={2}>
        <UrsorActionButton
          size="32px"
          iconSize="16px"
          actions={[
            {
              text: "Edit",
              kallback: props.editingCallback,
              icon: PencilIcon,
            },
            {
              text: "Delete",
              kallback: submitDeletion,
              icon: TrashcanIcon,
              color: PALETTE.system.red,
            },
          ]}
        />
      </Stack>
      <Stack
        spacing="8px"
        onClick={() => router.push(`/worksheet/${props.id}`)}
      >
        <Stack
          height="201px"
          width="100%"
          bgcolor={PALETTE.secondary.grey[3]}
          pt="20px"
          justifyContent="center"
          alignItems="center"
          position="relative"
          overflow="hidden"
        >
          {/* <Stack
            position="absolute"
            borderRadius="100%"
            width="32px"
            height="32px"
            justifyContent="center"
            alignItems="center"
            bgcolor={PALETTE.secondary.grey[1]}
            top="12px"
            right="12px"
            zIndex={2}
          >
            <ArrowUpRight width="20px" height="20px" />
          </Stack> */}
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
              {props.worksheetComponent === "equation" ? (
                <EquationWorksheet
                  title={props.title}
                  description={props.description}
                  {...props.settings}
                  pairs={props.values}
                  pageIndex={0}
                />
              ) : props.worksheetComponent === "numberBond" ? (
                <NumberBondWorksheet
                  title={props.title}
                  description={props.description}
                  {...props.settings}
                  leftNumbers={props.values}
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
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ svg: { path: { fill: PALETTE.secondary.pink[4] } } }}
            >
              <Typography variant="small">
                {getFormattedDate(props.createdAt)}
              </Typography>
              <ChecklistIcon height="20px" width="20px" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WorksheetCard;

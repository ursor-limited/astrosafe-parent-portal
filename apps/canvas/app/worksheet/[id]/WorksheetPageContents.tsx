"use client";

import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import EquationWorksheet from "./EquationWorksheet";
import { PALETTE, Typography, UrsorButton } from "ui";
import {
  IEquationWorksheetParameters,
  INumberBondWorksheetParameters,
  IWorksheet,
  IWorksheetParameters,
  WorksheetTopic,
} from "@/app/landing/[urlId]/WorksheetGenerator";
import NumberBondWorksheet from "./NumberBondWorksheet";
import moment from "moment";

const TAB_SWITCH_BUTTON_HEIGHT = 43;
const SMALL_SWITCH_BUTTON_HEIGHT = 34;

export function TabSwitch(props: {
  selected: "worksheet" | "markscheme";
  callback: (category: "worksheet" | "markscheme") => void;
  small?: boolean;
}) {
  return (
    <Stack
      direction="row"
      //height={props.small ? "40px" : "51px"}
      width={props.small ? "92%" : undefined}
      p={props.small ? "3px" : "4px"}
      borderRadius="24px"
      bgcolor="rgba(0,0,0,0.16)"
    >
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "worksheet" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("worksheet")}
        sx={{
          opacity: props.selected === "worksheet" ? 0.85 : 0.45,
          pointerEvents: props.selected === "worksheet" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        direction="row"
        spacing="8px"
      >
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          Worksheet
        </Typography>
      </Stack>
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "markscheme" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("markscheme")}
        sx={{
          opacity: props.selected === "markscheme" ? 0.8 : 0.45,
          pointerEvents: props.selected === "markscheme" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        direction="row"
        spacing="8px"
      >
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          Mark scheme
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function WorksheetPageContents(props: IWorksheet) {
  const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

  const openPrintDialog = useReactToPrint({
    content: () => printableRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintDialogOpen(false),
  });

  const [printableRef, setPrintableRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printDialogOpen && printableRef) {
      openPrintDialog();
    }
  }, [printDialogOpen, printableRef]);

  const [printAnswerSheetDialogOpen, setPrintAnswerSheetDialogOpen] =
    useState<boolean>(false);

  const openPrintAnswerSheetDialog = useReactToPrint({
    content: () => printableAnswerSheetRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintAnswerSheetDialogOpen(false),
  });

  const [printableAnswerSheetRef, setPrintableAnswerSheetRef] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printAnswerSheetDialogOpen && printableAnswerSheetRef) {
      openPrintAnswerSheetDialog();
    }
  }, [printAnswerSheetDialogOpen, printableAnswerSheetRef]);

  const [mode, setMode] = useState<"worksheet" | "markscheme">("worksheet");

  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      spacing="100px"
    >
      <Stack
        position="relative"
        width="100%"
        borderRadius="16px"
        bgcolor={PALETTE.secondary.grey[1]}
      >
        <Stack spacing="4px">
          <Typography>
            {moment(props.createdAt).format("Do MMMM YYYY")}
          </Typography>
          <Typography variant="h2">{props.title}</Typography>
          <Typography>
            In this session we will be practising our division skills! Watch the
            videos on long division and decimal places to understand how
            division works. Then get stuck in with the activities on Fun Brain
            and Google Experiments!
          </Typography>
        </Stack>
        <TabSwitch selected={mode} callback={(m) => setMode(m)} />
        {props.worksheetId === "equation" ? (
          <EquationWorksheet
            ref={setPrintableRef}
            title={props.title}
            topic={(props.parameters as IEquationWorksheetParameters).topic}
            orientation={props.parameters.orientation}
            factor={(props.parameters as IEquationWorksheetParameters).factor}
            multipliers={
              (props.parameters as IEquationWorksheetParameters).multipliers
            }
            printButtonCallback={() => setPrintDialogOpen(true)}
            answers={mode === "markscheme"}
          />
        ) : props.worksheetId === "numberBond" ? (
          <NumberBondWorksheet
            ref={setPrintableRef}
            title={props.title}
            orientation={props.parameters.orientation}
            result={(props.parameters as INumberBondWorksheetParameters).result}
            pairs={(props.parameters as INumberBondWorksheetParameters).pairs}
            both={(props.parameters as INumberBondWorksheetParameters).both}
            printButtonCallback={() => setPrintDialogOpen(true)}
            answers={mode === "markscheme"}
          />
        ) : null}
      </Stack>
    </Stack>
  );
}

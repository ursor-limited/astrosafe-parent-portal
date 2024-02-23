"use client";

import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import Worksheet, { IWorksheet } from "./Worksheet";
import { UrsorButton } from "ui";

export default function WorksheetPageContents(props: { details: IWorksheet }) {
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

  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      spacing="100px"
    >
      <Stack overflow="scroll" width="100%" alignItems="center">
        <Stack minHeight="100px" />
        <Stack spacing="10px" alignItems="flex-end">
          <Stack direction="row" spacing="10px">
            <UrsorButton
              dark
              variant="tertiary"
              onClick={() => setPrintDialogOpen(true)}
            >
              Print worksheet
            </UrsorButton>
            <UrsorButton
              dark
              variant="secondary"
              onClick={() => setPrintAnswerSheetDialogOpen(true)}
            >
              Print mark scheme
            </UrsorButton>
          </Stack>
          <Worksheet
            ref={setPrintableRef}
            title={props.details.title}
            orientation={props.details.orientation}
            number={props.details.number}
            multipliers={props.details.multipliers}
          />
        </Stack>
        <Stack sx={{ visibility: "hidden", pointerEvents: "none" }}>
          <Worksheet
            ref={setPrintableAnswerSheetRef}
            title={props.details.title}
            orientation={props.details.orientation}
            number={props.details.number}
            multipliers={props.details.multipliers}
            printDialogOpen={printAnswerSheetDialogOpen}
            printDialogCloseCallback={() =>
              setPrintAnswerSheetDialogOpen(false)
            }
            answers
          />
        </Stack>
        <Stack minHeight="100px" />
      </Stack>
    </Stack>
  );
}

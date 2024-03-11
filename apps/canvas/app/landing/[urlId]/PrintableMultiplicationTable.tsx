"use client";
import { Stack } from "@mui/system";
import MultiplicationTable from "./MultiplicationTable";
import { WorksheetId, WorksheetTopic } from "./WorksheetGenerator";
import { UrsorButton } from "ui";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";

export default function PrintableMultiplicationTable(props: {
  questionTopic: WorksheetTopic;
  questionType: WorksheetId;
  title: string;
  worksheetParameters: {
    factor: number;
    nProblems: number;
  };
}) {
  const save = () => {
    const input = document.getElementById("printableMultiplicationTable");
    input &&
      html2canvas(input, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF(); //@ts-ignore
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        pdf.save("download.pdf");
      });
  };
  return (
    <Stack spacing="8px">
      <Stack position="relative" width="300px" height="400px">
        <Stack position="absolute" sx={{ opacity: 0, pointerEvents: "none" }}>
          <MultiplicationTable
            printable
            factor={props.worksheetParameters.factor}
            upTo={props.worksheetParameters.nProblems}
          />
        </Stack>
        <Stack
          position="absolute"
          sx={{
            transform: "scale(0.35)",
            transformOrigin: "top right",
          }}
          top={0}
          right={0}
          boxShadow="0 0 40px rgba(0,0,0,0.06)"
        >
          <MultiplicationTable
            factor={props.worksheetParameters.factor}
            upTo={props.worksheetParameters.nProblems}
          />
        </Stack>
      </Stack>
      <Stack pl="20px">
        <UrsorButton
          dark
          variant="tertiary"
          onClick={save}
          endIcon={DownloadIcon}
          width="282px"
        >
          Download
        </UrsorButton>
      </Stack>
    </Stack>
  );
}

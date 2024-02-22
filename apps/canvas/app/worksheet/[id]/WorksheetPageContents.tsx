"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useEffect, useState } from "react";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import Worksheet, { EquationOrientation, IWorksheet } from "./Worksheet";

export default function WorksheetPageContents(props: { details: IWorksheet }) {
  // const [title, setTitle] = useState<string>("");
  // const [number, setNumber] = useState<number>(1);
  // const [nDigits, setNDigits] = useState<number>(1);
  // const [nProblems, setNProblems] = useState<number>(1);
  // const [questionType, setQuestionType] =
  //   useState<EquationOrientation>("horizontal");
  // useEffect(() => {
  //   setTitle("NUMBERS!");
  //   setNumber(7);
  //   setNDigits(2);
  //   setNProblems(36);
  // }, []);

  console.log(props.details);

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
        <Worksheet
          title={props.details.title}
          orientation={props.details.orientation}
          //nDigits={props.details.}
          number={props.details.number}
          multipliers={props.details.multipliers}
          //nProblems={nProblems}
          printButton
        />
        <Stack minHeight="100px" />
      </Stack>
    </Stack>
  );
}

"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import { useEffect, useState } from "react";
import { Question } from "../landing/LandingPageContents";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import Worksheet from "./Worksheet";

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 3;

export default function WorksheetPageContents(props: {}) {
  const [title, setTitle] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [nProblems, setNProblems] = useState<number>(1);
  const [questionType, setQuestionType] = useState<Question>("horizontal");
  useEffect(() => {
    setTitle("NUMBERS!");
    setNumber(7);
    setNDigits(2);
    setNProblems(36);
  }, []);
  const [multipliers, setMultipliers] = useState<number[]>();
  useEffect(
    () =>
      setMultipliers(
        _.sampleSize(
          [...Array(parseInt("1".padEnd(nDigits + 1, "0"))).keys()],
          nProblems
        )
      ),
    [nDigits, nProblems]
  );

  return multipliers ? (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      spacing="100px"
    >
      <Stack overflow="scroll">
        <Stack minHeight="100px" />
        <Worksheet
          title={title}
          questionType={questionType}
          nDigits={nDigits}
          number={number}
          columns={_.chunk(
            multipliers,
            Math.ceil(
              multipliers.length /
                (questionType === "horizontal"
                  ? HORIZONTAL_N_COLUMNS
                  : VERTICAL_N_COLUMNS)
            )
          )}
        />
        <Stack minHeight="100px" />
      </Stack>
    </Stack>
  ) : (
    <></>
  );
}

"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useEffect, useState } from "react";
import { Question } from "../landing/LandingPageContents";
import _ from "lodash";
import Printable from "../components/Printable";
import { useReactToPrint } from "react-to-print";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 3;

const HorizontalMultiplicationQuestion = (props: {
  number: number;
  multiplier: number;
  nDigits: number;
}) => (
  <Stack
    key={props.multiplier}
    direction="row"
    width={`${230 + 20 * props.nDigits}px`}
    justifyContent="space-between"
  >
    <Stack direction="row" spacing="14px">
      <Typography variant="h3">{props.multiplier}</Typography>
      <Stack pb="0px">
        <Typography variant="h5" sx={{ fontWeight: 350, lineHeight: "170%" }}>
          x
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 250 }}>
        {props.number}
      </Typography>
    </Stack>
    <Typography variant="h3" sx={{ fontWeight: 100 }}>
      =
    </Typography>
    <Stack
      borderBottom="1.5px solid rgba(0,0,0,0.3)"
      width="70px"
      height="102%"
    />
  </Stack>
);

const VerticalMultiplicationQuestion = (props: {
  number: number;
  multiplier: number;
  nDigits: number;
}) => (
  <Stack
    key={props.multiplier}
    alignItems="flex-end"
    spacing="4px"
    pb="10px"
    height="160px"
    sx={{ breakInside: "avoid" }}
  >
    <Stack alignItems="flex-end">
      <Typography variant="h3">{props.multiplier}</Typography>
      <Stack direction="row" justifyContent="space-between" spacing="36px">
        <Typography variant="h5" sx={{ fontWeight: 350, lineHeight: "170%" }}>
          x
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 250 }}>
          {props.number}
        </Typography>
      </Stack>
    </Stack>
    <Stack borderBottom="1.5px solid rgba(0,0,0,0.3)" width="100%" />
  </Stack>
);

export default function WorksheetPageContents(props: {}) {
  const [title, setTitle] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [nProblems, setNProblems] = useState<number>(1);
  const [questionType, setQuestionType] = useState<Question>("vertical");
  useEffect(() => {
    setTitle("NUMBERS!");
    setNumber(7);
    setNDigits(2);
    setNProblems(20);
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

  const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

  const openPrintCardGridDialog = useReactToPrint({
    content: () => printableRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintDialogOpen(false),
  });

  const [printableRef, setPrintableRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printDialogOpen && printableRef) {
      openPrintCardGridDialog();
    }
  }, [printDialogOpen, printableRef]);

  return multipliers ? (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <UrsorButton onClick={() => setPrintDialogOpen(true)}>Print</UrsorButton>
      <Stack overflow="scroll">
        <Stack minHeight="100px" />
        <Stack
          width="210mm"
          maxWidth="90%"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          px="32px"
          py="50px"
          spacing="50px"
          ref={setPrintableRef}
          className={rubik.className}
        >
          <Typography variant="h2">{title}</Typography>
          <Stack
            spacing="30px"
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <Stack width="100%" direction="row">
              {_.chunk(
                multipliers,
                Math.ceil(
                  multipliers.length /
                    (questionType === "horizontal"
                      ? HORIZONTAL_N_COLUMNS
                      : VERTICAL_N_COLUMNS)
                )
              ).map((col, i) => (
                <Stack key={i} flex={1} alignItems="center" spacing="40px">
                  {col?.map((m) =>
                    questionType === "horizontal" ? (
                      <HorizontalMultiplicationQuestion
                        key={m}
                        number={number}
                        multiplier={m}
                        nDigits={nDigits}
                      />
                    ) : (
                      <VerticalMultiplicationQuestion
                        key={m}
                        number={number}
                        multiplier={m}
                        nDigits={nDigits}
                      />
                    )
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack minHeight="100px" />
      </Stack>
    </Stack>
  ) : (
    <></>
  );
}

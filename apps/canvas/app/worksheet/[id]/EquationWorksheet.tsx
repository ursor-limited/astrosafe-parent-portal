"use client";

import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { forwardRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";
import {
  EquationOrientation,
  WorksheetTopic,
} from "@/app/landing/[urlId]/WorksheetGenerator";
import AstroWorksheetPage from "./AstroWorksheetPage";
import WorksheetQuestion from "./WorksheetQuestion";

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 4;

const HORIZONTAL_ROWS = 8;
const VERTICAL_ROWS = 5;
const DIVISION_ROWS = 3;

export interface IWorksheetQuestion {
  number: number;
  multiplier: number;
}

const HorizontalQuestion = (props: {
  pair: [number, number];
  answer: boolean;
  inputValue?: number;
  topic?: WorksheetTopic;
  n: number;
  changeCallback?: (newValue: number) => void;
}) => (
  <WorksheetQuestion n={props.n} endAligned>
    <Stack
      direction="row"
      width={props.inputValue && props.changeCallback ? "296px" : "270px"}
      height="110px"
      justifyContent="space-between"
      alignItems={
        props.inputValue && props.changeCallback ? "center" : "flex-end"
      }
      sx={{ breakInside: "avoid" }}
    >
      <Stack direction="row" spacing="14px">
        <Typography variant="h3">{props.pair[0]}</Typography>
        <Stack pb="0px">
          <Typography variant="h5" sx={{ fontWeight: 390, lineHeight: "170%" }}>
            {props.topic === "multiplication"
              ? "x"
              : props.topic === "addition"
              ? "+"
              : "-"}
          </Typography>
        </Stack>
        <Typography variant="h3" sx={{ fontWeight: 250 }}>
          {props.pair[1]}
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 100 }}>
        =
      </Typography>
      {props.answer ? (
        <Typography
          variant="h3"
          color={PALETTE.secondary.purple[2]}
          sx={{ fontWeight: 350 }}
        >
          {props.topic === "multiplication"
            ? props.pair[0] * props.pair[1]
            : props.topic === "addition"
            ? props.pair[0] + props.pair[1]
            : props.pair[0] - props.pair[1]}
        </Typography>
      ) : props.inputValue && props.changeCallback ? (
        <UrsorInputField
          value={props.inputValue.toString()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
            const leadingZeroRemovedString = onlyNumbersString?.slice(
              onlyNumbersString[0] === "0" ? 1 : 0
            );
            props.changeCallback?.(parseInt(leadingZeroRemovedString ?? "0"));
          }}
          width="110px"
          fontSize="40px"
          height="60px"
          boldValue
          paddingLeft="0"
        />
      ) : (
        <Stack
          borderBottom="1.5px solid rgba(0,0,0,0.3)"
          width="70px"
          height="102%"
        />
      )}
    </Stack>
  </WorksheetQuestion>
);

const VerticalQuestion = (props: {
  pair: [number, number];
  answer: boolean;
  n: number;
  topic?: WorksheetTopic;
}) => (
  <WorksheetQuestion n={props.n}>
    <Stack
      justifyContent="center"
      spacing="4px"
      height="172px"
      sx={{ breakInside: "avoid" }}
    >
      <Stack alignItems="flex-end">
        <Typography variant="h3">{props.pair[0]}</Typography>
        <Stack direction="row" justifyContent="space-between" spacing="36px">
          <Typography variant="h5" sx={{ fontWeight: 350, lineHeight: "180%" }}>
            {props.topic === "multiplication"
              ? "x"
              : props.topic === "addition"
              ? "+"
              : "-"}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 250 }}>
            {props.pair[1]}
          </Typography>
        </Stack>
      </Stack>
      <Stack borderBottom="1.5px solid rgba(0,0,0,0.3)" width="100%" />
      {props.answer ? (
        <Stack width="100%" alignItems="flex-end">
          <Typography
            variant="h3"
            color={PALETTE.secondary.purple[2]}
            sx={{ fontWeight: 350 }}
          >
            {props.topic === "multiplication"
              ? props.pair[0] * props.pair[1]
              : props.topic === "addition"
              ? props.pair[0] + props.pair[1]
              : props.pair[0] - props.pair[1]}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  </WorksheetQuestion>
);

const DivisionVerticalQuestion = (props: {
  answer: number;
  showAnswer: boolean;
  dividend: number;
}) => (
  <Stack
    height="280px"
    pt="20px"
    alignItems="center"
    sx={{ breakInside: "avoid" }}
  >
    <Stack spacing="5px">
      <Stack
        borderLeft={`2px solid transparent`}
        borderTop={`2px solid transparent`}
        pt="3px"
        px="12px"
        height="40px"
        alignItems="flex-end"
        sx={{
          opacity: props.showAnswer ? 1 : 0,
        }}
      >
        <Typography color={PALETTE.secondary.purple[2]} variant="h3">
          {props.answer}
        </Typography>
      </Stack>

      <Stack direction="row" spacing="12px">
        <Stack
          borderLeft={`2px solid transparent`}
          borderTop={`2px solid transparent`}
          pt="3px"
        >
          <Typography variant="h3" sx={{ fontWeight: 250 }}>
            {props.dividend}
          </Typography>
        </Stack>
        <Stack
          borderLeft={`2px solid ${PALETTE.primary.navy}`}
          borderTop={`2px solid ${PALETTE.primary.navy}`}
          px="12px"
          pt="3px"
        >
          <Typography variant="h3" sx={{ fontWeight: 250 }}>
            {props.dividend * props.answer}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

const DivisionHorizontalQuestion = (props: {
  answer: number;
  showAnswer: boolean;
  dividend: number;
}) => (
  <Stack
    direction="row"
    width="270px"
    height="110px"
    justifyContent="space-between"
    alignItems={"flex-end"}
    sx={{ breakInside: "avoid" }}
  >
    <Stack direction="row" spacing="14px">
      <Typography variant="h3">{props.answer * props.dividend}</Typography>
      <Stack pb="0px">
        <Typography variant="h3" sx={{ fontWeight: 390 }}>
          ÷
        </Typography>
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 250 }}>
        {props.dividend}
      </Typography>
    </Stack>
    <Typography variant="h3" sx={{ fontWeight: 100 }}>
      =
    </Typography>
    {props.showAnswer ? (
      <Typography
        variant="h3"
        color={PALETTE.secondary.purple[2]}
        sx={{ fontWeight: 350 }}
      >
        {props.answer}
      </Typography>
    ) : (
      <Stack
        borderBottom="1.5px solid rgba(0,0,0,0.3)"
        width="70px"
        height="102%"
      />
    )}
  </Stack>
);

const EquationWorksheet = forwardRef<HTMLDivElement, any>(
  (
    props: {
      title?: string;
      pairs: [number, number][];
      topic: WorksheetTopic;
      orientation: EquationOrientation;
      printButtonCallback?: () => void;
      onlyFirstPage?: boolean;
      printDialogOpen?: boolean;
      showAnswers?: boolean;
      pageIndex: number;
      printableId?: string;
      printDialogCloseCallback?: () => void;
    },
    ref
  ) => {
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

    const [rows, setRows] = useState<[number, number][][]>([]);
    useEffect(() => {
      if (props.pairs) {
        const rowz = _.chunk(
          props.pairs,
          Math.ceil(
            props.orientation === "horizontal"
              ? HORIZONTAL_N_COLUMNS
              : VERTICAL_N_COLUMNS
          )
        );
        setRows(
          _.isNumber(props.pageIndex)
            ? props.topic === "division" && props.orientation === "vertical"
              ? props.pageIndex === 0
                ? rowz.slice(0, DIVISION_ROWS)
                : rowz.slice(
                    DIVISION_ROWS + (props.pageIndex! - 1) * DIVISION_ROWS,
                    DIVISION_ROWS + props.pageIndex! * DIVISION_ROWS
                  )
              : props.orientation === "horizontal"
              ? props.pageIndex === 0
                ? rowz.slice(0, HORIZONTAL_ROWS)
                : rowz.slice(
                    HORIZONTAL_ROWS + (props.pageIndex! - 1) * HORIZONTAL_ROWS,
                    HORIZONTAL_ROWS + props.pageIndex! * HORIZONTAL_ROWS
                  )
              : props.pageIndex === 0
              ? rowz.slice(0, VERTICAL_ROWS)
              : rowz.slice(
                  VERTICAL_ROWS + (props.pageIndex! - 1) * VERTICAL_ROWS,
                  VERTICAL_ROWS + props.pageIndex! * VERTICAL_ROWS
                )
            : rowz
        );
      }
    }, [props.pairs, props.orientation, props.pageIndex, props.topic]);
    return (
      <AstroWorksheetPage
        title={props.title}
        showAnswers={props.showAnswers}
        printableId={props.printableId}
        pageN={(props.pageIndex ?? 0) + 1}
      >
        <Stack width="100%">
          {rows.map((row, i) => (
            <Stack
              key={i}
              flex={1}
              direction="row"
              justifyContent={"space-evenly"}
            >
              {[
                ...row?.map((pair, k) => (
                  <Stack key={k} flex={1} alignItems="center">
                    {props.topic === "division" ? (
                      props.orientation === "vertical" ? (
                        <DivisionVerticalQuestion
                          dividend={4}
                          answer={pair[0]}
                          showAnswer={!!props.showAnswers}
                        />
                      ) : (
                        <DivisionHorizontalQuestion
                          dividend={4}
                          answer={pair[0]}
                          showAnswer={!!props.showAnswers}
                        />
                      )
                    ) : props.orientation === "horizontal" ? (
                      <HorizontalQuestion
                        pair={pair}
                        answer={!!props.showAnswers}
                        topic={props.topic}
                        n={props.pageIndex * 16 + i * 2 + k + 1}
                      />
                    ) : (
                      <VerticalQuestion
                        pair={pair}
                        answer={!!props.showAnswers}
                        topic={props.topic}
                        n={props.pageIndex * 20 + i * 4 + k + 1}
                      />
                    )}
                  </Stack>
                )),
                ...[
                  ...Array(
                    Math.max(
                      0,
                      (props.orientation === "horizontal"
                        ? HORIZONTAL_N_COLUMNS
                        : VERTICAL_N_COLUMNS) - row.length
                    )
                  ).keys(),
                ].map((j) => <Stack flex={1} key={`filler${j}`} />),
              ]}
            </Stack>
          ))}
        </Stack>
      </AstroWorksheetPage>
    );
  }
);

EquationWorksheet.displayName = "Worksheet";

export default EquationWorksheet;

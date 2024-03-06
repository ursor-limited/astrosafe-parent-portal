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

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 4;

const HORIZONTAL_FIRST_PAGE_ROWS = 8;
const HORIZONTAL_OTHER_PAGES_ROWS = 10;
const VERTICAL_FIRST_PAGE_ROWS = 5;
const VERTICAL_OTHER_PAGES_ROWS = 6;
const DIVISION_FIRST_PAGE_ROWS = 3;
const DIVISION_OTHER_PAGES_ROWS = 3;

export const A4_WIDTH = "210mm";
export const A4_HEIGHT = "297mm";

export interface IWorksheetQuestion {
  number: number;
  multiplier: number;
}

const HorizontalQuestion = (props: {
  number: number;
  multiplier: number;
  answer: boolean;
  inputValue?: number;
  topic?: WorksheetTopic;
  changeCallback?: (newValue: number) => void;
}) => (
  <Stack
    key={props.multiplier}
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
      <Typography variant="h3">{props.multiplier}</Typography>
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
        {props.number}
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
          ? props.multiplier * props.number
          : props.topic === "addition"
          ? props.multiplier + props.number
          : props.multiplier - props.number}
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
);

const VerticalQuestion = (props: {
  number: number;
  multiplier: number;
  answer: boolean;
  topic?: WorksheetTopic;
}) => (
  <Stack
    key={props.multiplier}
    justifyContent="center"
    spacing="4px"
    height="172px"
    sx={{ breakInside: "avoid" }}
  >
    <Stack alignItems="flex-end">
      <Typography variant="h3">{props.multiplier}</Typography>
      <Stack direction="row" justifyContent="space-between" spacing="36px">
        <Typography variant="h5" sx={{ fontWeight: 350, lineHeight: "180%" }}>
          {props.topic === "multiplication"
            ? "x"
            : props.topic === "addition"
            ? "+"
            : "-"}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 250 }}>
          {props.number}
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
            ? props.multiplier * props.number
            : props.topic === "addition"
            ? props.multiplier + props.number
            : props.multiplier - props.number}
        </Typography>
      </Stack>
    ) : null}
  </Stack>
);

const DivisionVerticalQuestion = (props: {
  answer: number;
  showAnswer: boolean;
  dividend: number;
}) => (
  <Stack
    height="300px"
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

const rubik = Rubik({ subsets: ["latin"] });

const EquationWorksheet = forwardRef<HTMLDivElement, any>(
  (
    props: {
      title?: string;
      factor: number;
      multipliers: number[];
      topic: WorksheetTopic;
      orientation: EquationOrientation;
      printButtonCallback?: () => void;
      onlyFirstPage?: boolean;
      printDialogOpen?: boolean;
      answers?: boolean;
      pageIndex?: number;
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

    const [rows, setRows] = useState<number[][]>([]);
    useEffect(() => {
      if (props.multipliers) {
        const rowz = _.chunk(
          props.multipliers,
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
                ? rowz.slice(0, DIVISION_FIRST_PAGE_ROWS)
                : rowz.slice(
                    DIVISION_FIRST_PAGE_ROWS +
                      (props.pageIndex! - 1) * DIVISION_OTHER_PAGES_ROWS,
                    DIVISION_FIRST_PAGE_ROWS +
                      props.pageIndex! * DIVISION_OTHER_PAGES_ROWS
                  )
              : props.orientation === "horizontal"
              ? props.pageIndex === 0
                ? rowz.slice(0, HORIZONTAL_FIRST_PAGE_ROWS)
                : rowz.slice(
                    HORIZONTAL_FIRST_PAGE_ROWS +
                      (props.pageIndex! - 1) * HORIZONTAL_OTHER_PAGES_ROWS,
                    HORIZONTAL_FIRST_PAGE_ROWS +
                      props.pageIndex! * HORIZONTAL_OTHER_PAGES_ROWS
                  )
              : props.pageIndex === 0
              ? rowz.slice(0, VERTICAL_FIRST_PAGE_ROWS)
              : rowz.slice(
                  VERTICAL_FIRST_PAGE_ROWS +
                    (props.pageIndex! - 1) * VERTICAL_OTHER_PAGES_ROWS,
                  VERTICAL_FIRST_PAGE_ROWS +
                    props.pageIndex! * VERTICAL_OTHER_PAGES_ROWS
                )
            : rowz
        );
      }
    }, [
      props.multipliers,
      props.orientation,
      props.pageIndex,
      rows.length,
      props.topic,
    ]);

    return (
      <div
        style={{
          position: "relative",
          width: A4_WIDTH,
          height: A4_HEIGHT,
        }}
        id={props.printableId}
      >
        {props.printButtonCallback ? (
          <Stack
            position="absolute"
            right="30px"
            top="47px"
            height="50px"
            width="50px"
            bgcolor={PALETTE.secondary.purple[2]}
            justifyContent="center"
            alignItems="center"
            borderRadius="100%"
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }}
            onClick={props.printButtonCallback}
          >
            <PrinterIcon height="25px" width="25px" />
          </Stack>
        ) : null}
        <Stack
          ref={ref || setPrintableRef}
          width={A4_WIDTH}
          minWidth={A4_WIDTH}
          minHeight={A4_HEIGHT}
          maxWidth="90%"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          px="32px"
          boxSizing="border-box"
          className={rubik.className}
        >
          {!props.pageIndex ? (
            <Stack
              mt="50px"
              spacing="4px"
              width="100%"
              height="24mm"
              borderBottom={`2px solid ${PALETTE.secondary.grey[2]}`}
              justifyContent="space-between"
            >
              {props.title ? (
                <Typography variant="h2">{props.title}</Typography>
              ) : (
                <Stack />
              )}
              <Typography bold color={PALETTE.secondary.purple[2]}>
                {props.answers ? "Answers" : "Try to solve these questions!"}
              </Typography>
            </Stack>
          ) : null}
          <Stack width="100%">
            {rows.map((row, i) => (
              <Stack
                key={i}
                flex={1}
                direction="row"
                justifyContent={"space-evenly"}
              >
                {[
                  ...row?.map((x, k) => (
                    <Stack key={k} flex={1} alignItems="center">
                      {props.topic === "division" ? (
                        props.orientation === "vertical" ? (
                          <DivisionVerticalQuestion
                            key={x}
                            dividend={props.factor}
                            answer={x}
                            showAnswer={!!props.answers}
                          />
                        ) : (
                          <DivisionHorizontalQuestion
                            key={x}
                            dividend={props.factor}
                            answer={x}
                            showAnswer={!!props.answers}
                          />
                        )
                      ) : props.orientation === "horizontal" ? (
                        <HorizontalQuestion
                          key={x}
                          number={props.factor}
                          multiplier={x}
                          answer={!!props.answers}
                          topic={props.topic}
                          // inputValue={4}
                          // changeCallback={() => null}
                        />
                      ) : (
                        <VerticalQuestion
                          key={x}
                          number={props.factor}
                          multiplier={x}
                          answer={!!props.answers}
                          topic={props.topic}
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
        </Stack>
      </div>
    );
  }
);

EquationWorksheet.displayName = "Worksheet";

export default EquationWorksheet;

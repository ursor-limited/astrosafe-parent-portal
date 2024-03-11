"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { forwardRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import _ from "lodash";
import { EquationOrientation } from "@/app/landing/[urlId]/WorksheetGenerator";
import AstroWorksheetPage from "./AstroWorksheetPage";
import WorksheetQuestion from "./WorksheetQuestion";

export const NUMBER_BOND_HORIZONTAL_N_COLUMNS = 2;
export const NUMBER_BOND_VERTICAL_N_COLUMNS = 3;

export const NUMBER_BOND_HORIZONTAL_ROWS_N = 8;
export const NUMBER_BOND_VERTICAL_ROWS_N = 3;

export const A4_WIDTH = "210mm";
export const A4_HEIGHT = "297mm";

export const WritingField = (props: { width?: string }) => (
  <Stack
    borderBottom="1.5px solid rgba(0,0,0,0.3)"
    width={props.width || "70px"}
  />
);

export const ValueCircle = (props: { children: React.ReactNode }) => (
  <Stack
    borderRadius="100%"
    border={`2px solid ${PALETTE.secondary.grey[2]}`}
    height="66px"
    width="66px"
    justifyContent="center"
    alignItems="center"
  >
    {props.children}
  </Stack>
);

const HorizontalEquationQuestion = (props: {
  result: number;
  left: number;
  right: number;
  both: boolean;
  n: number;
  showAnswer: boolean;
}) => (
  <WorksheetQuestion n={props.n} top="79px" left="-24px">
    <Stack
      direction="row"
      width={props.both ? "292px" : "260px"}
      height="110px"
      justifyContent="space-between"
      alignItems={"flex-end"}
      sx={{ breakInside: "avoid" }}
    >
      <Stack direction="row" spacing="14px">
        {!props.both || props.showAnswer ? (
          <Typography
            variant="h3"
            color={props.both ? PALETTE.secondary.purple[2] : undefined}
            sx={{
              fontWeight: !(props.showAnswer && props.both) ? 350 : undefined,
            }}
          >
            {props.left}
          </Typography>
        ) : (
          <WritingField />
        )}
        <Stack pb="0px">
          <Typography variant="h3" sx={{ fontWeight: 250 }}>
            +
          </Typography>
        </Stack>
        {props.showAnswer ? (
          <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
            {props.right}
          </Typography>
        ) : (
          <WritingField />
        )}
      </Stack>
      <Typography variant="h3" sx={{ fontWeight: 100 }}>
        =
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 350 }}>
        {props.result}
      </Typography>
    </Stack>
  </WorksheetQuestion>
);

const VerticalEquationQuestion = (props: {
  result: number;
  left: number;
  right: number;
  both: boolean;
  n: number;
  showAnswer: boolean;
}) => (
  <WorksheetQuestion n={props.n} top="-60px" left="52px">
    <Stack
      width="260px"
      height="280px"
      alignItems={"center"}
      justifyContent="center"
      sx={{ breakInside: "avoid" }}
      spacing="20px"
      position="relative"
    >
      <Stack
        position="absolute"
        width="38px"
        sx={{ transform: "translate(24px, 10px) rotate(57deg)" }}
        height="2px"
        bgcolor={PALETTE.secondary.grey[2]}
      />
      <Stack
        position="absolute"
        width="38px"
        sx={{ transform: "translate(-28px, 0px) rotate(-57deg)" }}
        height="2px"
        bgcolor={PALETTE.secondary.grey[2]}
      />
      <ValueCircle>
        <Typography variant="h4" sx={{ fontWeight: 350 }}>
          {props.result}
        </Typography>
      </ValueCircle>
      <Stack direction="row" spacing="40px" zIndex={999}>
        <ValueCircle>
          <Typography
            variant="h4"
            color={props.both ? PALETTE.secondary.purple[2] : undefined}
            sx={{
              fontWeight: !(props.showAnswer && props.both) ? 350 : undefined,
            }}
          >
            {!props.both || props.showAnswer ? props.left : null}
          </Typography>
        </ValueCircle>
        <ValueCircle>
          <Typography
            variant="h4"
            color={PALETTE.secondary.purple[2]}
            sx={{
              fontWeight: !(props.showAnswer && props.both) ? 350 : undefined,
            }}
          >
            {props.showAnswer ? props.right : null}
          </Typography>
        </ValueCircle>
      </Stack>
    </Stack>
  </WorksheetQuestion>
);

const NumberBondWorksheet = forwardRef<HTMLDivElement, any>(
  (
    props: {
      title?: string;
      result: number;
      both: boolean;
      pairs: number[][];
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

    const [pageRowsN, setPageRowsN] = useState<number>(1);
    useEffect(() => {
      setPageRowsN(
        props.orientation === "horizontal"
          ? NUMBER_BOND_HORIZONTAL_ROWS_N
          : NUMBER_BOND_VERTICAL_ROWS_N
      );
    }, [props.orientation]);

    const [rows, setRows] = useState<number[][][]>([]);
    useEffect(() => {
      if (props.pairs) {
        const rowz = _.chunk(
          props.pairs,
          props.orientation === "horizontal"
            ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
            : NUMBER_BOND_VERTICAL_N_COLUMNS
        );
        setRows(
          _.isNumber(props.pageIndex)
            ? props.pageIndex === 0
              ? rowz.slice(0, pageRowsN)
              : rowz.slice(
                  pageRowsN + (props.pageIndex! - 1) * pageRowsN,
                  pageRowsN + props.pageIndex! * pageRowsN
                )
            : rowz
        );
      }
    }, [
      props.pairs,
      props.pageIndex,
      rows.length,
      props.orientation,
      pageRowsN,
    ]);

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
                ...row?.map((x, k) => (
                  <Stack key={k} flex={1} alignItems="center">
                    {props.orientation === "horizontal" ? (
                      <HorizontalEquationQuestion
                        result={props.result}
                        left={x?.[0]}
                        right={x?.[1]}
                        both={props.both}
                        n={props.pageIndex * 16 + i * 2 + k + 1}
                        showAnswer={!!props.showAnswers}
                      />
                    ) : (
                      <VerticalEquationQuestion
                        result={props.result}
                        left={x?.[0]}
                        right={x?.[1]}
                        both={props.both}
                        n={props.pageIndex * 9 + i * 3 + k + 1}
                        showAnswer={!!props.showAnswers}
                      />
                    )}
                  </Stack>
                )),
                ...[
                  ...Array(
                    Math.max(
                      0,
                      (props.orientation === "horizontal"
                        ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
                        : NUMBER_BOND_VERTICAL_N_COLUMNS) - row.length
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

NumberBondWorksheet.displayName = "Worksheet";

export default NumberBondWorksheet;

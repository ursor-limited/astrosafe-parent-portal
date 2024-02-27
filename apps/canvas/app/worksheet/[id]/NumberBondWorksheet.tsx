import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { forwardRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";
import { QuestionTopic } from "./EquationWorksheet";
import { DEFAULT_TITLE } from "@/app/landing/[urlId]/WorksheetGenerator";

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 4;

export const FIRST_PAGE_ROWS_N = 6;
export const OTHER_PAGES_ROWS_N = 8;

export const A4_WIDTH = "210mm";
export const A4_HEIGHT = "297mm";

export const WritingField = (props: { width?: string }) => (
  <Stack
    borderBottom="1.5px solid rgba(0,0,0,0.3)"
    width={props.width || "70px"}
  />
);

export interface IWorksheetQuestion {
  number: number;
  multiplier: number;
}

export interface NumberBondParameters {
  result: number;
}

export type EquationOrientation = "horizontal" | "vertical";

export interface INumberBondWorksheet {
  title: string;
  // orientation: EquationOrientation;
  result: number;
  pairs: number[][];
}

const HorizontalEquationQuestion = (props: {
  result: number;
  left: number;
  right: number;
  both: boolean;
  showAnswer: boolean;
  // inputValue?: number;
  // changeCallback?: (newValue: number) => void;
}) => (
  <Stack
    direction="row"
    width={"260px"}
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
);

const rubik = Rubik({ subsets: ["latin"] });

const NumberBondWorksheet = forwardRef<HTMLDivElement, any>(
  (
    props: {
      title: string;
      result: number;
      both: boolean;
      pairs: number[][];
      orientation: EquationOrientation;
      printButtonCallback?: () => void;
      onlyFirstPage?: boolean;
      printDialogOpen?: boolean;
      answers?: boolean;
      pageIndex?: number;
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

    const [rows, setRows] = useState<number[][][]>([]);
    useEffect(() => {
      if (props.pairs) {
        const rowz = _.chunk(props.pairs, 2);
        setRows(
          _.isNumber(props.pageIndex)
            ? props.pageIndex === 0
              ? rowz.slice(0, FIRST_PAGE_ROWS_N)
              : rowz.slice(
                  FIRST_PAGE_ROWS_N +
                    (props.pageIndex! - 1) * OTHER_PAGES_ROWS_N,
                  FIRST_PAGE_ROWS_N + props.pageIndex! * OTHER_PAGES_ROWS_N
                )
            : rowz
        );
      }
    }, [
      props.pairs,
      // props.orientation,
      props.pageIndex,
      rows.length,
    ]);

    return (
      <Stack position="relative">
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
          className={rubik.className}
        >
          {!props.pageIndex ? (
            <Stack
              mt="50px"
              spacing="4px"
              width="100%"
              height="24mm"
              borderBottom={`2px solid ${PALETTE.secondary.grey[2]}`}
            >
              <Typography variant="h2">
                {props.title || DEFAULT_TITLE}
              </Typography>
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
                      {
                        props.orientation === "horizontal" ? (
                          <HorizontalEquationQuestion
                            result={props.result}
                            left={x?.[0]}
                            right={x?.[1]}
                            both={props.both}
                          />
                        ) : null
                        // <VerticalMultiplicationQuestion
                        //   key={x}
                        //   number={props.factor}
                        //   multiplier={x}
                        //   answer={!!props.answers}
                        //   topic={props.topic}
                        // />
                      }
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
                  ].map((j) => <Stack flex={1} key={j} />),
                ]}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

NumberBondWorksheet.displayName = "Worksheet";

export default NumberBondWorksheet;

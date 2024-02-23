import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { forwardRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 4;

const HORIZONTAL_FIRST_PAGE_ROWS = 8;
const HORIZONTAL_OTHER_PAGES_ROWS = 10;
const VERTICAL_FIRST_PAGE_ROWS = 5;
const VERTICAL_OTHER_PAGES_ROWS = 6;

export const A4_WIDTH = "210mm";
export const A4_HEIGHT = "297mm";

export interface IWorksheetQuestion {
  number: number;
  multiplier: number;
}

export type EquationOrientation = "horizontal" | "vertical";

export interface IWorksheet {
  title: string;
  orientation: EquationOrientation;
  number: number;
  multipliers: number[];
}

const HorizontalMultiplicationQuestion = (props: {
  number: number;
  multiplier: number;
  answer: boolean;
  inputValue?: number;
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
    {props.answer ? (
      <Typography
        variant="h3"
        color={PALETTE.secondary.purple[2]}
        sx={{ fontWeight: 350 }}
      >
        {props.multiplier * props.number}
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

const VerticalMultiplicationQuestion = (props: {
  number: number;
  multiplier: number;
  answer: boolean;
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
        <Typography variant="h5" sx={{ fontWeight: 350, lineHeight: "170%" }}>
          x
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
          {props.multiplier * props.number}
        </Typography>
      </Stack>
    ) : null}
  </Stack>
);

const rubik = Rubik({ subsets: ["latin"] });

const Worksheet = forwardRef<HTMLDivElement, any>(
  (
    props: {
      title: string;
      number: number;
      multipliers: number[];
      //nDigits: number;
      orientation: EquationOrientation;
      printButton?: boolean;
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
            ? props.orientation === "horizontal"
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
    }, [props.multipliers, props.orientation, props.pageIndex, rows.length]);

    return (
      <Stack position="relative">
        {props.printButton ? (
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
            onClick={() => setPrintDialogOpen(true)}
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
                {props.title || "Multiplication sheet"}
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
                      {props.orientation === "horizontal" ? (
                        <HorizontalMultiplicationQuestion
                          key={x}
                          number={props.number}
                          multiplier={x}
                          answer={!!props.answers}
                          // inputValue={4}
                          // changeCallback={() => null}
                        />
                      ) : (
                        <VerticalMultiplicationQuestion
                          key={x}
                          number={props.number}
                          multiplier={x}
                          answer={!!props.answers}
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

Worksheet.displayName = "Worksheet";

export default Worksheet;

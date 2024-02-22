import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography, UrsorButton } from "ui";
import { forwardRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";

const HORIZONTAL_N_COLUMNS = 2;
const VERTICAL_N_COLUMNS = 3;

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
}) => (
  <Stack
    key={props.multiplier}
    direction="row"
    // width={`${230 + 20 * props.nDigits}px`}
    width="270px"
    height="110px"
    justifyContent="space-between"
    alignItems="flex-end"
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
        color={PALETTE.secondary.grey[4]}
        sx={{ fontWeight: 350 }}
      >
        {props.number}
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

const VerticalMultiplicationQuestion = (props: {
  number: number;
  multiplier: number;
  answer: boolean;
}) => (
  <Stack
    key={props.multiplier}
    justifyContent="center"
    //justifyContent="flex-end"
    spacing="4px"
    height="177px"
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
          color={PALETTE.secondary.grey[4]}
          sx={{ fontWeight: 350 }}
        >
          {props.number}
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

    const [columns, setColumns] = useState<number[][]>([]);
    useEffect(
      () =>
        props.multipliers &&
        setColumns(
          _.chunk(
            props.multipliers,
            Math.ceil(
              props.multipliers.length /
                (props.orientation === "horizontal"
                  ? HORIZONTAL_N_COLUMNS
                  : VERTICAL_N_COLUMNS)
            )
          )
        ),
      [props.multipliers, props.orientation]
    );

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
          width="210mm"
          minWidth="210mm"
          // height={props.onlyFirstPage ? "297mm" : undefined}
          minHeight="297mm"
          //overflow={props.onlyFirstPage ? "hidden" : undefined}
          maxWidth="90%"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          px="32px"
          py="50px"
          className={rubik.className}
        >
          <Stack
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
          <Stack spacing="30px" justifyContent="center" alignItems="center">
            <Stack width="100%" direction="row">
              {columns.map((col, i) => (
                <Stack key={i} flex={1} alignItems="center">
                  {col?.map((x) =>
                    props.orientation === "horizontal" ? (
                      <HorizontalMultiplicationQuestion
                        key={x}
                        number={props.number}
                        multiplier={x}
                        answer={!!props.answers}
                      />
                    ) : (
                      <VerticalMultiplicationQuestion
                        key={x}
                        number={props.number}
                        multiplier={x}
                        answer={!!props.answers}
                      />
                    )
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

Worksheet.displayName = "Worksheet";

export default Worksheet;

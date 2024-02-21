import { Stack } from "@mui/system";
import { Rubik } from "next/font/google";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Question } from "../landing/LandingPageContents";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrinterIcon from "@/images/icons/PrinterWhite_NOT_SVG.svg";
import _ from "lodash";

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
    justifyContent="flex-end"
    spacing="4px"
    height="190px"
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

const rubik = Rubik({ subsets: ["latin"] });

const Worksheet = (props: {
  title: string;
  number: number;
  nProblems: number;
  nDigits: number;
  questionType: Question;
  printButton?: boolean;
  onlyFirstPage?: boolean;
}) => {
  const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

  const [multipliers, setMultipliers] = useState<number[]>();
  useEffect(
    () =>
      setMultipliers(
        _.sampleSize(
          [...Array(parseInt("1".padEnd(props.nDigits + 1, "0"))).keys()],
          props.nProblems
        )
      ),
    [props.nDigits, props.nProblems]
  );

  const [columns, setColumns] = useState<number[][]>([]);
  useEffect(
    () =>
      multipliers &&
      setColumns(
        _.chunk(
          multipliers,
          Math.ceil(
            multipliers.length /
              (props.questionType === "horizontal"
                ? HORIZONTAL_N_COLUMNS
                : VERTICAL_N_COLUMNS)
          )
        )
      ),
    [multipliers, props.questionType]
  );

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

  return (
    <Stack position="relative">
      {props.printButton ? (
        <Stack
          position="absolute"
          right="55px"
          top="45px"
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
        ref={setPrintableRef}
        width="210mm"
        minWidth="210mm"
        height={props.onlyFirstPage ? "297mm" : undefined}
        minHeight={props.onlyFirstPage ? "297mm" : undefined}
        overflow={props.onlyFirstPage ? "hidden" : undefined}
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
          <Typography
            variant="h2"
            color={
              props.title ? PALETTE.primary.navy : PALETTE.secondary.grey[2]
            }
          >
            {props.title || "Worksheet title"}
          </Typography>
          <Typography bold color={PALETTE.secondary.purple[2]}>
            Try to solve these questions!
          </Typography>
        </Stack>
        <Stack
          spacing="30px"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Stack width="100%" direction="row">
            {columns.map((col, i) => (
              <Stack key={i} flex={1} alignItems="center">
                {col?.map((m) =>
                  props.questionType === "horizontal" ? (
                    <HorizontalMultiplicationQuestion
                      key={m}
                      number={props.number}
                      multiplier={m}
                      nDigits={props.nDigits}
                    />
                  ) : (
                    <VerticalMultiplicationQuestion
                      key={m}
                      number={props.number}
                      multiplier={m}
                      nDigits={props.nDigits}
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
};

export default Worksheet;

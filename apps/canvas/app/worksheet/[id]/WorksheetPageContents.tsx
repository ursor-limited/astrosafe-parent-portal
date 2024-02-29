"use client";

import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useReactToPrint } from "react-to-print";
import EquationWorksheet, { A4_WIDTH } from "./EquationWorksheet";
import { PALETTE, Typography, UrsorButton } from "ui";
import {
  IEquationWorksheetParameters,
  INumberBondWorksheetParameters,
  IWorksheet,
  IWorksheetParameters,
  WorksheetTopic,
} from "@/app/landing/[urlId]/WorksheetGenerator";
import NumberBondWorksheet from "./NumberBondWorksheet";
import moment from "moment";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import Slider from "react-slick";
import LandingPageViewport from "@/app/landing/[urlId]/LandingPageViewport";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SLIDE_WIDTH = 210 * 0.33; // mm
const SLIDE_SPACING = 38;
const SLIDE_SIZE_SCALE = 0.315;

const CarouselButton = (props: { onClick: () => void }) => (
  <Stack
    bgcolor="rgb(255,255,255)"
    borderRadius="100%"
    width="60px"
    height="60px"
    boxShadow="0 0 20px rgba(0,0,0,0.06)"
    onClick={props.onClick}
    sx={{
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
      cursor: "pointer",
    }}
    justifyContent="center"
    alignItems="center"
  >
    <ChevronLeft height="38px" width="38px" />
  </Stack>
);

const Carousel = (props: {
  items: JSX.Element[];
  yPadding: number;
  mobile?: boolean;
}) => {
  const [index, setIndex] = useState<number>(0);
  const [hoverRowIndex, setHoverRowIndex] = useState<number | null>(null);
  return (
    <Stack
      width="100%"
      justifyContent="center"
      alignItems="center"
      spacing="20px"
    >
      {/* <Stack direction="row" width="100%" justifyContent="space-between">
        <CarouselButton
          onClick={() => setIndex(Math.min(index + 1, props.items.length - 1))}
        />
        <Stack
          sx={{
            transform: "rotate(180deg)",
          }}
        >
          <CarouselButton onClick={() => setIndex(Math.max(index - 1, 0))} />
        </Stack>
      </Stack> */}
      <Stack>
        <Stack
          height="20px"
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ transform: "translateY(7px)" }}
          zIndex={9999}
        >
          {props.items.map((x, i) => (
            <Stack
              key={i}
              width="30px"
              height="30px"
              alignItems="center"
              justifyContent="center"
              onMouseEnter={() => {
                setHoverRowIndex(i);
              }}
              onMouseLeave={() => {
                setHoverRowIndex(null);
              }}
              onClick={() => setIndex(i)}
              sx={{
                cursor: index !== i ? "pointer" : undefined,
              }}
            >
              <Stack
                borderRadius="100%"
                height="9px"
                width="9px"
                bgcolor={
                  hoverRowIndex === i && index !== i
                    ? PALETTE.secondary.purple[1]
                    : `rgba(0,0,0,${index === i ? 0.45 : 0.13})`
                }
                sx={{
                  transition: "0.3s",

                  // "&:hover": { background: PALETTE.secondary.purple[1] },
                }}
              />
            </Stack>
          ))}
        </Stack>
        <Stack
          direction="row"
          sx={{
            transition: "0.7s",
            transform: `translateX(${
              (Math.floor(props.items.length / 2) - index) *
              (SLIDE_SPACING + SLIDE_WIDTH)
            }mm)`,
          }}
          py="120px"
        >
          {props.items.map((item, i) => (
            <Stack
              key={i}
              width={`${SLIDE_SPACING + SLIDE_WIDTH}mm`}
              minWidth={`${SLIDE_SPACING + SLIDE_WIDTH}mm`}
              alignItems="center"
              sx={{
                transition: "0.7s",
                transform: index === i ? "scale(1.5)" : undefined,
                transformOrigin: "center",
                pointerEvents: index === i ? "none" : undefined,
              }}
              onClick={() => setIndex(i)}
              // onMouseEnter={() => {
              //   setHoverRowIndex(i);
              // }}
              // onMouseLeave={() => {
              //   setHoverRowIndex(null);
              // }}
              // border={`4px solid ${
              //   hoverRowIndex === i ? PALETTE.secondary.purple[1] : "transparent"
              // }`}
            >
              {item}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const TAB_SWITCH_BUTTON_HEIGHT = 43;
const SMALL_SWITCH_BUTTON_HEIGHT = 34;

export function TabSwitch(props: {
  selected: "worksheet" | "markscheme";
  callback: (category: "worksheet" | "markscheme") => void;
  small?: boolean;
}) {
  return (
    <Stack
      direction="row"
      //height={props.small ? "40px" : "51px"}
      width={props.small ? "92%" : undefined}
      p={props.small ? "3px" : "4px"}
      borderRadius="24px"
      bgcolor="rgba(0,0,0,0.16)"
    >
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "worksheet" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("worksheet")}
        sx={{
          opacity: props.selected === "worksheet" ? 0.85 : 0.45,
          pointerEvents: props.selected === "worksheet" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        direction="row"
        spacing="8px"
      >
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          Worksheet
        </Typography>
      </Stack>
      <Stack
        height={`${
          props.small ? SMALL_SWITCH_BUTTON_HEIGHT : TAB_SWITCH_BUTTON_HEIGHT
        }px`}
        width={props.small ? undefined : "180px"}
        flex={props.small ? 1 : undefined}
        borderRadius="24px"
        justifyContent="center"
        alignItems="center"
        bgcolor={
          props.selected === "markscheme" ? "rgba(255,255,255,0.11)" : undefined
        }
        onClick={() => props.callback("markscheme")}
        sx={{
          opacity: props.selected === "markscheme" ? 0.8 : 0.45,
          pointerEvents: props.selected === "markscheme" ? "none" : undefined,
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          cursor: "pointer",
        }}
        direction="row"
        spacing="8px"
      >
        <Typography
          bold
          variant={props.small ? "normal" : "large"}
          color="rgba(255,255,255,0.8)"
        >
          Mark scheme
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function WorksheetPageContents(props: IWorksheet) {
  const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

  const openPrintDialog = useReactToPrint({
    content: () => printableRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintDialogOpen(false),
  });

  const [printableRef, setPrintableRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printDialogOpen && printableRef) {
      openPrintDialog();
    }
  }, [printDialogOpen, printableRef]);

  const [printAnswerSheetDialogOpen, setPrintAnswerSheetDialogOpen] =
    useState<boolean>(false);

  const openPrintAnswerSheetDialog = useReactToPrint({
    content: () => printableAnswerSheetRef,
    documentTitle: "ASTRO Numbers",
    onAfterPrint: () => setPrintAnswerSheetDialogOpen(false),
  });

  const [printableAnswerSheetRef, setPrintableAnswerSheetRef] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    if (printAnswerSheetDialogOpen && printableAnswerSheetRef) {
      openPrintAnswerSheetDialog();
    }
  }, [printAnswerSheetDialogOpen, printableAnswerSheetRef]);

  const [mode, setMode] = useState<"worksheet" | "markscheme">("worksheet");

  const [hoveringRowIndex, setHoveringRowIndex] = useState<number | null>(null);

  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      spacing="100px"
      pt="40px"
    >
      <Stack
        position="relative"
        width="83%"
        height="100%"
        borderRadius="16px"
        bgcolor={PALETTE.secondary.grey[1]}
        pt="100px"
      >
        <Stack spacing="4px" px="24px">
          <Typography>
            {moment(props.createdAt).format("Do MMMM YYYY")}
          </Typography>
          <Typography variant="h2">{props.title}</Typography>
          <Typography>
            In this session we will be practising our division skills! Watch the
            videos on long division and decimal places to understand how
            division works. Then get stuck in with the activities on Fun Brain
            and Google Experiments!
          </Typography>
        </Stack>

        <Stack width="100%" alignItems="center" overflow="hidden" pt="30px">
          <Carousel
            yPadding={30}
            items={[...Array(3).keys()].map((x, i) => (
              <Stack
                key={i}
                position="relative"
                alignItems="center"
                height={`${297 * SLIDE_SIZE_SCALE}mm`}
                width={`${210 * SLIDE_SIZE_SCALE}mm`}
                sx={{
                  cursor: "pointer",
                  transition: "0.3s",
                  transformOrigin: "top center",
                  outline: `4px solid ${
                    hoveringRowIndex === i
                      ? PALETTE.secondary.purple[1]
                      : "transparent"
                  }`,
                }}
                onMouseEnter={() => {
                  setHoveringRowIndex(i);
                }}
                onMouseLeave={() => {
                  setHoveringRowIndex(null);
                }}
              >
                <Stack
                  position="absolute"
                  top={0}
                  left={0}
                  //height="200px"

                  //boxShadow="0 0 60px rgba(0,0,0,0.07)"
                >
                  <Stack
                    sx={{
                      transform: "scale(0.315)",
                      transformOrigin: "top left",
                    }}
                    boxShadow="0 0 60px rgba(0,0,0,0.07)"
                  >
                    <EquationWorksheet
                      ref={setPrintableRef}
                      title={props.title}
                      topic={
                        (props.parameters as IEquationWorksheetParameters).topic
                      }
                      orientation={props.parameters.orientation}
                      factor={
                        (props.parameters as IEquationWorksheetParameters)
                          .factor
                      }
                      multipliers={
                        (props.parameters as IEquationWorksheetParameters)
                          .multipliers
                      }
                      answers={mode === "markscheme"}
                    />
                  </Stack>
                </Stack>
              </Stack>
            ))}
          />
        </Stack>

        {/* <TabSwitch selected={mode} callback={(m) => setMode(m)} /> */}
        {/* {props.worksheetId === "equation" ? (
          <EquationWorksheet
            ref={setPrintableRef}
            title={props.title}
            topic={(props.parameters as IEquationWorksheetParameters).topic}
            orientation={props.parameters.orientation}
            factor={(props.parameters as IEquationWorksheetParameters).factor}
            multipliers={
              (props.parameters as IEquationWorksheetParameters).multipliers
            }
            printButtonCallback={() => setPrintDialogOpen(true)}
            answers={mode === "markscheme"}
          />
        ) : props.worksheetId === "numberBond" ? (
          <NumberBondWorksheet
            ref={setPrintableRef}
            title={props.title}
            orientation={props.parameters.orientation}
            result={(props.parameters as INumberBondWorksheetParameters).result}
            pairs={(props.parameters as INumberBondWorksheetParameters).pairs}
            both={(props.parameters as INumberBondWorksheetParameters).both}
            printButtonCallback={() => setPrintDialogOpen(true)}
            answers={mode === "markscheme"}
          />
        ) : null} */}
      </Stack>
    </Stack>
  );
}

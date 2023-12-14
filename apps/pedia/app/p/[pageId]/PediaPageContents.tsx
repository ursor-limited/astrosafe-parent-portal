"use client";

import React, { useEffect, useState } from "react";
import { Stack, alpha } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Dialog } from "@mui/material";
import { getImageSize } from "react-image-size";
import Star from "@/images/Star.svg";
import { Typography } from "ui/typography";
import { PALETTE } from "ui/palette";
import LayoutCard, { AGES } from "@/app/components/LayoutCard";
import SuggestionsSection from "./SuggestionsSection";
import QuestionsCard from "@/app/components/QuestionsCard";

const N_COLUMNS = 12;
const GRID_SPACING = 24;
const BORDER_RADIUS = "12px";
const ROW_HEIGHT = 311;
const FACT_CARD_HEIGHT = "97px";
const FACT_ROW_HEIGHT = "391px";
const MAIN_CARD_HEIGHT = "576px";
const TEXT_CARD_Y_PADDING = 20;
const BEZIER = "cubic-bezier(.32,.82,.24,.98)";
const TEXT_CARD_TRANSITION_DURATION = 800;

export const BACKDROP_STYLE = {
  backdropFilter: "blur(3px)",
  backgroundColor: "rgba(0, 0, 0, 0.3) !important",
};

interface IPediaMainCard {
  //icon: React.FC<React.SVGProps<SVGSVGElement>>;
  imageUrl: string;
  facts: IPediaFact[];
}

interface IPediaTextBlock {
  id: string;
  title: string;
  content: string[];
}

interface IPediaImage {
  id: string;
  url: string;
  caption?: string;
}

interface IPediaFact {
  title: string;
  content: string;
}

interface IPediaAnswer {
  id: string;
  value: string;
}

export interface IPediaQuestion {
  id: string;
  question: string;
  answers: IPediaAnswer[];
  correctAnswer: string;
}

export interface IPediaPage {
  id: string;
  title: string;
  parentId: string;
  mainCard: IPediaMainCard;
  textBlocks: { age: number; blocks: IPediaTextBlock[] }[];
  images: IPediaImage[];
  funFact: string;
  questions: IPediaQuestion[];
}

export interface IPediaCollectionPage {
  id: string;
  title: string;
  parentId: string;
}

const ImageCard = (props: { url: string; caption?: string; width: number }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Stack
      position="relative"
      height="100%"
      width={`${props.width}px`}
      borderRadius={BORDER_RADIUS}
      overflow="hidden"
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* <img width="auto" height="100%" src={props.url} alt={props.caption} /> */}
      <Stack
        flex={1}
        sx={{
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      />
      {props.caption ? (
        <Stack
          width="100%"
          height="40px"
          position="absolute"
          alignItems="center"
          justifyContent="center"
          top={0}
          left={0}
          px="20px"
          boxSizing="border-box"
          bgcolor="rgba(0,0,0,0.45)"
          sx={{
            opacity: expanded ? 1 : 0,
            transition: "0.6s",
            transitionTimingFunction: BEZIER,
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant="small" color={PALETTE.font.light}>
            {props.caption}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
};

const TextBlockCard = (props: {
  title: string;
  content: string[];
  noCollapse?: boolean;
  onClick: () => void;
  fitContent?: boolean;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [changing, setChanging] = useState<boolean>(false);
  const [textElement, setTextElement] = useState<HTMLDivElement | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number>(0);
  useEffect(() => {
    !expandedHeight &&
      setExpandedHeight((textElement?.scrollHeight ?? 0) + TEXT_CARD_Y_PADDING);
  }, [textElement?.scrollHeight, expanded]);
  const [alreadyFullHeight, setAlreadyFullHeight] = useState<
    boolean | undefined
  >(undefined);
  useEffect(() => {
    alreadyFullHeight === undefined &&
      setAlreadyFullHeight(
        !!textElement?.clientHeight &&
          textElement.scrollHeight - 2 < textElement.clientHeight
      );
  }, [expandedHeight, textElement?.clientHeight]);

  useEffect(() => {
    setChanging(true);
    setTimeout(() => setChanging(false), TEXT_CARD_TRANSITION_DURATION);
  }, [expanded]);

  const [showGradient, setShowGradient] = useState<boolean>(true);
  useEffect(
    () =>
      setShowGradient(
        (textElement?.offsetHeight ?? 0) < (textElement?.scrollHeight ?? 0)
      ),
    [textElement?.offsetHeight, textElement?.scrollHeight]
  );

  return (
    <Stack
      flex={1}
      position="relative"
      sx={{
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        cursor: "pointer",
      }}
      boxSizing="border-box"
      onClick={props.onClick}
      overflow={props.fitContent ? undefined : "hidden"}
      boxShadow="0 0 20px rgba(0,0,0,0.05)"
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius={BORDER_RADIUS}
    >
      {!props.fitContent ? (
        <Stack
          position="absolute"
          width="100%"
          height="56%"
          bottom={0}
          sx={{
            opacity: expanded || !showGradient ? 0 : 1,
            pointerEvents: expanded ? "none" : undefined,
            transition: "0.6s",
            background: `linear-gradient(0deg, ${
              PALETTE.secondary.grey[1]
            }, ${alpha(PALETTE.secondary.grey[1], 0.65)}, ${alpha(
              PALETTE.secondary.grey[1],
              0
            )})`,
          }}
        />
      ) : null}
      <Stack
        height={expanded ? expandedHeight : "100%"}
        width={props.fitContent ? "fit-content" : "100%"}
        top={0}
        left={0}
        p={`${GRID_SPACING}px`}
        pt={"19px"}
        pb={
          props.noCollapse || expanded ? `${TEXT_CARD_Y_PADDING}px` : undefined
        }
        boxSizing="border-box"
        overflow={props.fitContent ? undefined : "hidden"}
        spacing="7px"
        sx={{
          transition: `${TEXT_CARD_TRANSITION_DURATION}ms`,
          transitionTimingFunction: BEZIER,
        }}
        ref={setTextElement}
      >
        <Typography variant="large" bold color={PALETTE.secondary.grey[5]}>
          {props.title}
        </Typography>
        <Stack spacing="8px">
          {props.content.map((c, i) => (
            <Typography
              key={i}
              color={PALETTE.secondary.grey[5]}
              sx={{
                lineHeight: "26px",
              }}
            >
              {c}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const FactCard = (props: { fact: string }) => (
  <Stack
    bgcolor={PALETTE.secondary.purple[2]}
    borderRadius="12px"
    height="fit-content"
    //maxHeight={FACT_CARD_HEIGHT}
    p={`${GRID_SPACING}px`}
    boxSizing="border-box"
    justifyContent="center"
    alignItems="flex-end"
  >
    <Stack
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing="16px"
    >
      <Star height="18px" width="18px" />
      <Typography variant="large" bold color={PALETTE.font.light} noWrap>
        Did you know?
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="flex-end">
      <Typography color={PALETTE.font.light}>{props.fact}</Typography>
    </Stack>
  </Stack>
);

function TextSectionPopover(
  props: IPediaTextBlock & { open: boolean; closeCallback: () => void }
) {
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          zIndex: 99999999,
          padding: `${GRID_SPACING}px`,
          borderRadius: BORDER_RADIUS,
          width: "740px",
          transform: "scale(1.2)",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
        zIndex: 99999,
      }}
    >
      <Stack
        borderRadius={BORDER_RADIUS}
        sx={{
          transition: `${TEXT_CARD_TRANSITION_DURATION}ms`,
          transitionTimingFunction: BEZIER,
        }}
        spacing="12px"
      >
        <Typography variant="large" bold color={PALETTE.secondary.grey[5]}>
          {props.title}
        </Typography>
        <Stack spacing="8px">
          {props.content.map((c, index) => (
            <Typography
              key={index}
              color={PALETTE.secondary.grey[5]}
              sx={{
                lineHeight: "26px",
              }}
            >
              {c}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}

const Bento = (props: {
  mainCardDetails: IPediaMainCard;
  textCardDetails: IPediaTextBlock[];
  imageCardDetails: IPediaImage[];
  fact: string;
  columnWidth: number;
}) => {
  const [selectedTextCardId, setSelectedTextCardId] = useState<
    string | undefined
  >(undefined);

  const getWidthOfColumns = (n: number) =>
    n * (props.columnWidth + GRID_SPACING) - GRID_SPACING;

  const firstRow = (
    <Stack
      key="first"
      flex={1}
      direction="row"
      spacing={`${GRID_SPACING}px`}
      height={MAIN_CARD_HEIGHT}
      minHeight={MAIN_CARD_HEIGHT}
      maxHeight={MAIN_CARD_HEIGHT}
      overflow="hidden"
    >
      <PediaMainCard {...props.mainCardDetails} width={getWidthOfColumns(4)} />
      <Stack overflow="hidden" flex={1} spacing={`${GRID_SPACING}px`}>
        <Stack maxHeight="50%" overflow="hidden">
          <TextBlockCard
            title={props.textCardDetails[0]?.title ?? ""}
            content={props.textCardDetails[0]?.content ?? []}
            onClick={() => setSelectedTextCardId(props.textCardDetails[1]?.id)}
          />
        </Stack>
        <Stack
          overflow="hidden"
          flex={1}
          direction="row"
          spacing={`${GRID_SPACING}px`}
        >
          <TextBlockCard
            title={props.textCardDetails[1]?.title ?? ""}
            content={props.textCardDetails[1]?.content ?? []}
            onClick={() => setSelectedTextCardId(props.textCardDetails[1]?.id)}
          />
          <ImageCard
            url={props.imageCardDetails[0].url}
            caption={props.imageCardDetails[0].caption}
            width={getWidthOfColumns(3)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
  const [factRowIndex, setFactRowIndex] = useState<number | undefined>(
    undefined
  );
  useEffect(
    () =>
      setFactRowIndex(
        1 + Math.floor(Math.random() * (props.textCardDetails.length - 3))
      ),
    []
  );

  const [originalImageSizes, setOriginalImageSizes] = useState<any[]>([]);
  useEffect(() => {
    Promise.all(
      props.imageCardDetails.map((image) => getImageSize(image.url))
    ).then((dims) => setOriginalImageSizes(dims));
  }, []);

  const [imageColumnsN, setImageColumnsN] = useState<number[]>([]);
  useEffect(
    () =>
      originalImageSizes &&
      setImageColumnsN(
        originalImageSizes.map((dims) =>
          Math.min(
            7,
            Math.max(
              2,
              Math.round(
                dims.width / dims.height / (props.columnWidth / ROW_HEIGHT)
              )
            )
          )
        )
      ),
    [originalImageSizes, props.columnWidth]
  );

  const rows = props.textCardDetails
    .slice(2, props.textCardDetails.length)
    .map((td, i) => [
      i === factRowIndex ? (
        <Stack key={td.id} flex={1} spacing={`${GRID_SPACING}px`}>
          <FactCard fact={props.fact} />
          <TextBlockCard
            title={td.title ?? ""}
            content={td.content ?? []}
            onClick={() => setSelectedTextCardId(props.textCardDetails[1]?.id)}
          />
        </Stack>
      ) : (
        <Stack key={td.id} flex={1}>
          <TextBlockCard
            title={td.title ?? ""}
            content={td.content ?? []}
            onClick={() => setSelectedTextCardId(props.textCardDetails[1]?.id)}
          />
        </Stack>
      ),
      <ImageCard
        key="image"
        url={props.imageCardDetails[i + 1].url}
        caption={props.imageCardDetails[i + 1].caption}
        width={getWidthOfColumns(imageColumnsN[i])}
      />,
    ])
    .map((pair, i) => (i % 2 ? pair : _.reverse(pair.slice())))
    .map((pair, i) => (
      <Stack
        key={i}
        height={i === factRowIndex ? FACT_ROW_HEIGHT : `${ROW_HEIGHT}px`}
        minHeight={i === factRowIndex ? FACT_ROW_HEIGHT : `${ROW_HEIGHT}px`}
        width="100%"
        direction="row"
        spacing={`${GRID_SPACING}px`}
      >
        {pair}
      </Stack>
    ));
  return (
    <>
      <Stack spacing={`${GRID_SPACING}px`}>{[firstRow, ...rows]}</Stack>
      {selectedTextCardId ? (
        <TextSectionPopover
          open={true}
          closeCallback={() => setSelectedTextCardId(undefined)}
          {...props.textCardDetails.find((tb) => tb.id === selectedTextCardId)!}
        />
      ) : null}
    </>
  );
};

interface IFact {
  title: string;
  content: string;
}

interface IPediaMainCard {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  imageUrl: string;
  facts: IFact[];
}

const PediaMainCard = (props: IPediaMainCard & { width: number }) => (
  <Stack
    borderRadius="12px"
    bgcolor={PALETTE.secondary.grey[1]}
    width={`${props.width}px`}
    height={MAIN_CARD_HEIGHT}
    minHeight={MAIN_CARD_HEIGHT}
    boxSizing="border-box"
    boxShadow="0 0 25px rgba(0,0,0,0.05)"
    overflow="hidden"
  >
    <Stack
      width={`${props.width}px`}
      height="380px"
      sx={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
      position="relative"
    />
    <Stack spacing="12px" px="20px" py="17px" boxSizing="border-box">
      {props.facts.map((fact, i) => (
        <Stack
          key={i}
          direction="row"
          borderRadius="10px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography bold color={PALETTE.secondary.grey[4]} noWrap>
            {fact.title}
          </Typography>
          <Typography color={PALETTE.secondary.grey[4]} noWrap>
            {fact.content}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export interface IPediaPageContentsProps {
  pageDetails: IPediaPage;
  parentPages: IPediaCollectionPage[];
  suggestedPages: IPediaPage[];
}

export default function PediaPageContents(props: IPediaPageContentsProps) {
  const [selectedAge, setSelectedAge] = useState<number>(AGES[AGES.length - 1]);

  /* needed for the platform row's proper scrollability */
  const { width } = useWindowSize();
  const [bentoRef, setBentoRef] = useState<HTMLElement | null>(null);
  const [columnWidth, setColumnWidth] = useState<number>(0);
  useEffect(() => {
    const w = bentoRef?.getBoundingClientRect().width;
    w && setColumnWidth((w - GRID_SPACING) / N_COLUMNS - GRID_SPACING);
  }, [width]);

  console.log(columnWidth);

  return (
    <Stack width="100vw" height="100vh" alignItems="center">
      {props.pageDetails ? (
        <LayoutCard
          title={props.pageDetails.title}
          setSelectedAge={setSelectedAge}
          selectedAge={selectedAge}
          parents={props.parentPages}
        >
          <Stack ref={setBentoRef} spacing="94px" alignItems="center">
            <Bento
              mainCardDetails={props.pageDetails.mainCard}
              imageCardDetails={props.pageDetails.images}
              textCardDetails={
                props.pageDetails.textBlocks.find((b) => b.age === selectedAge)
                  ?.blocks ?? []
              }
              fact={props.pageDetails.funFact}
              columnWidth={columnWidth}
            />
            {props.pageDetails.questions &&
            props.pageDetails.questions.length > 0 ? (
              <QuestionsCard questions={props.pageDetails.questions} />
            ) : null}
            {props.suggestedPages.length > 0 ? (
              <SuggestionsSection suggestedPages={props.suggestedPages} />
            ) : null}
          </Stack>
        </LayoutCard>
      ) : null}
    </Stack>
  );
}

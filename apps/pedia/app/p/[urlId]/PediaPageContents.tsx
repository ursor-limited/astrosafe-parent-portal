"use client";

import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import _ from "lodash";
import { useWindowSize } from "usehooks-ts";
import { Dialog } from "@mui/material";
import { getImageSize } from "react-image-size";
import Star from "@/images/Star.svg";
import SpeechBubbleArrowHead from "@/images/byteSpeechBubbleArrowhead.png";
import { Typography } from "ui/typography";
import { PALETTE, SecondaryColor } from "ui/palette";
import LayoutCard, { AGES } from "@/app/components/LayoutCard";
import SuggestionsSection from "./SuggestionsSection";
import QuestionsCard from "@/app/components/QuestionsCard";
import PediaMainCard, {
  IPediaMainCard,
  MAIN_CARD_HEIGHT,
} from "./PediaMainCard";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/footer";
import X from "@/images/icons/X.svg";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { MOBILE_WINDOW_WIDTH_THRESHOLD } from "@/app/c/[pageId]/PediaCollectionPageContents"; //@ts-ignore
import Image from "next/image";
import dynamic from "next/dynamic";
import AgeSelection from "@/app/components/AgeSelection";
import Regenerable from "@/app/components/Regenerable";

const Byte = dynamic(
  () => import("@/app/components/Byte"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const STAR_COLORS: SecondaryColor[] = [
  "purple",
  "pink",
  "orange",
  "green",
  "blue",
];

const N_COLUMNS = 12;
const GRID_SPACING = 24;
const BORDER_RADIUS = "12px";
const ROW_HEIGHT = 311;
const FACT_CARD_HEIGHT = "97px";
const FACT_ROW_HEIGHT = "391px";
const TEXT_CARD_Y_PADDING = 20;
const BEZIER = "cubic-bezier(.32,.82,.24,.98)";
const TEXT_CARD_TRANSITION_DURATION = 870;
const MAX_MOBILE_IMAGE_HEIGHT = 515;

export const BACKDROP_STYLE = {
  backdropFilter: "blur(3px)",
  backgroundColor: "rgba(0, 0, 0, 0.3) !important",
};

interface IPediaTextBlock {
  _id: string;
  title: string;
  content: string[];
}

interface IPediaImage {
  id: string;
  url: string;
  caption?: string;
  provider: "pexels" | "unsplash";
}

export interface IPediaStat {
  title: string;
  content: string;
}

interface IPediaOption {
  id: string;
  value: string;
}

export interface IPediaQuestion {
  id: string;
  question: string;
  options: IPediaOption[];
  answer: string;
}

export type PediaAge = "student" | "scholar";

export interface IPediaPage {
  id: string;
  urlId: string;
  title: string;
  mainImage: string;
  stats: IPediaStat[];
  textBlocks: { _id: string; level: PediaAge; blocks: IPediaTextBlock[] }[];
  images: IPediaImage[];
  facts: string[];
  color: string;
  questions: IPediaQuestion[];
  collectionPageId?: string;
  collectionPageTitle?: string;
}

export interface IPediaCollectionPage {
  id: string;
  title: string;
  articles: string[]; // ids
  authorId: string;
}

const ImageCard = (props: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Stack
      height={props.height ? `${props.height}px` : "100%"}
      position="relative"
      width={props.width ? `${props.width}px` : "100%"}
      borderRadius={BORDER_RADIUS}
      overflow="hidden"
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Stack
        flex={1}
        sx={{
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxSizing: "border-box",
        }}
      />
      {props.caption ? (
        <Stack
          width="100%"
          position="absolute"
          alignItems="center"
          justifyContent="center"
          bottom={0}
          left={0}
          px="20px"
          py="10px"
          boxSizing="border-box"
          bgcolor="rgba(0,0,0,0.45)"
          sx={{
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant="tiny" color={PALETTE.font.light}>
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
  editing?: boolean;
  //fitContent?: boolean;
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

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <Regenerable on={!!props.editing} callback={() => null}>
      <Stack
        flex={1}
        position="relative"
        sx={{
          opacity: hovering ? 0.7 : 1,
          transition: "0.2s",
        }}
        boxSizing="border-box"
        boxShadow="0 0 20px rgba(0,0,0,0.05)"
        bgcolor="rgb(255,255,255)"
        borderRadius={BORDER_RADIUS}
      >
        <Stack
          height={expanded ? expandedHeight : "100%"}
          width="100%"
          top={0}
          left={0}
          p={`${GRID_SPACING}px`}
          pt={"19px"}
          pb={
            props.noCollapse || expanded
              ? `${TEXT_CARD_Y_PADDING}px`
              : undefined
          }
          boxSizing="border-box"
          spacing="7px"
          sx={{
            transition: `${TEXT_CARD_TRANSITION_DURATION}ms`,
            transitionTimingFunction: BEZIER,
          }}
          ref={setTextElement}
        >
          <Typography
            variant="large"
            bold
            color={PALETTE.secondary.grey[5]}
            htmlTag="h3"
          >
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
    </Regenerable>
  );
};

const FactsCard = (props: { facts: string[] }) => {
  const [colors, setColors] = useState<string[]>([]);
  useEffect(
    () =>
      setColors(
        _.sampleSize(STAR_COLORS, props.facts.length).map(
          (colorName) => PALETTE.secondary[colorName][_.random(2, 3)]
        )
      ),
    [props.facts]
  );
  return (
    <Stack
      bgcolor="rgb(255,255,255)"
      borderRadius="12px"
      height="fit-content"
      p={`${GRID_SPACING}px`}
      boxSizing="border-box"
      justifyContent="center"
      spacing="16px"
      minWidth="100%"
      maxWidth={0}
    >
      <Stack direction="row" spacing="15px" alignItems="center">
        <Stack
          sx={{
            transform: "translateY(-2px)",
          }}
        >
          <Byte size={32} />
        </Stack>
        <Typography
          variant="large"
          bold
          noWrap
          color={PALETTE.secondary.grey[5]}
        >
          Did you know?
        </Typography>
      </Stack>
      <Stack spacing="8px" pl="32px">
        {props.facts.map((fact, i) => (
          <Stack
            key={i}
            direction="row"
            sx={{
              background: `linear-gradient(90deg, ${PALETTE.secondary.grey[2]}, ${PALETTE.secondary.grey[1]})`,
            }}
            borderRadius="12px"
            px="16px"
            py="10px"
            width="fit-content"
            position="relative"
          >
            {i === 0 ? (
              <Stack position="absolute" top="-5px" left="-1px">
                <Stack
                  flex={1}
                  minHeight="10px"
                  minWidth="10px"
                  sx={{
                    backgroundImage: `url(${SpeechBubbleArrowHead.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxSizing: "border-box",
                  }}
                />
              </Stack>
            ) : null}
            <Typography color={PALETTE.font.dark}>{fact}</Typography>
            <Stack
              pl="14px"
              alignItems="center"
              justifyContent="center"
              sx={{
                svg: {
                  path: {
                    fill: colors[i],
                  },
                },
              }}
            >
              <Star height="14px" width="14px" />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

function TextSectionPopover(
  props: IPediaTextBlock & { open: boolean; closeCallback: () => void }
) {
  const [hovering, setHovering] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="large" bold color={PALETTE.secondary.grey[5]}>
            {props.title}
          </Typography>
          <Stack
            onMouseDown={() => {
              setPressed(true);
            }}
            onMouseEnter={() => {
              setHovering(true);
            }}
            onMouseLeave={() => {
              setHovering(false);
              setPressed(false);
            }}
            onMouseUp={() => {
              setPressed(false);
            }}
            sx={{
              opacity: pressed || hovering ? 0.7 : 1,
              transition: "0.2s",
              cursor: "pointer",
            }}
            onClick={props.closeCallback}
          >
            <X width="26px" height="26px" />
          </Stack>
        </Stack>
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

const MobileColumn = (props: {
  title: string;
  mainCardDetails: IPediaMainCard;
  textCardDetails: IPediaTextBlock[];
  imageCardDetails: IPediaImage[];
  facts: IPediaPage["facts"];
  questions: IPediaQuestion[];
}) => {
  const [selectedTextCardId, setSelectedTextCardId] = useState<
    string | undefined
  >(undefined);
  const { width } = useWindowSize();
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const [originalImageSizes, setOriginalImageSizes] = useState<
    { width: number; height: number }[]
  >([]);
  useEffect(() => {
    Promise.all(
      props.imageCardDetails.map((image) => getImageSize(image.url))
    ).then((dims) => setOriginalImageSizes(dims));
  }, []);

  const [selectedAge, setSelectedAge] = useState<PediaAge>("scholar");

  return (
    <Stack px="30px" width="100%" height="100%" spacing="24px" ref={setRef}>
      <Stack width="100%" alignItems="flex-end">
        <AgeSelection
          setSelectedAge={setSelectedAge}
          selectedAge={selectedAge}
          color={props.mainCardDetails.color}
        />
      </Stack>
      <Stack spacing="12px" width="100%" height="100%">
        <PediaMainCard mobile title={props.title} {...props.mainCardDetails} />
        <TextBlockCard
          key="overview"
          title={props.textCardDetails[0]?.title ?? ""}
          content={props.textCardDetails[0]?.content ?? []}
          onClick={() => setSelectedTextCardId(props.textCardDetails[0]?._id)}
        />
        {props.textCardDetails
          .slice(1)
          .map((td, i) => [
            <Stack key={`image${i}`}>
              <ImageCard
                url={props.imageCardDetails[i].url}
                caption={props.imageCardDetails[i].caption}
                height={Math.min(
                  MAX_MOBILE_IMAGE_HEIGHT,
                  (ref?.getBoundingClientRect().width ?? 0) *
                    ((originalImageSizes[i]?.height ?? 1) /
                      (originalImageSizes[i]?.width ?? 1))
                )}
              />
            </Stack>,
            <FactsCard
              key={`fact${i}`}
              facts={
                i === props.textCardDetails.length - 1
                  ? props.facts.slice(-3)
                  : [props.facts[i]]
              }
            />,
            <Stack key={`text${i}`}>
              <TextBlockCard
                title={props.textCardDetails[i + 1]?.title ?? ""}
                content={props.textCardDetails[i + 1]?.content ?? []}
                onClick={() =>
                  setSelectedTextCardId(props.textCardDetails[i + 1]?._id)
                }
              />
            </Stack>,
          ])
          .flat()}
        {props.questions && props.questions.length > 0 ? (
          <Stack pt="48px">
            <QuestionsCard questions={props.questions} mobile />
          </Stack>
        ) : null}
        <Stack minHeight="30px" />
        {/* {props.suggestedPages.length > 0 ? (
          <SuggestionsSection
            suggestedPages={props.suggestedPages}
            parentPages={props.parentPages}
            mobile
          />
        ) : null} */}
        {/* <Stack minHeight="30px" />
        <Stack width="100%">
          <Footer fontScale={width / 700} />
        </Stack> */}
      </Stack>
      {selectedTextCardId ? (
        <TextSectionPopover
          open={true}
          closeCallback={() => setSelectedTextCardId(undefined)}
          {...props.textCardDetails.find(
            (tb) => tb._id === selectedTextCardId
          )!}
        />
      ) : null}
    </Stack>
  );
};

const BentoRow = (props: {
  textCardDetails: IPediaTextBlock;
  imageCardDetails: IPediaImage;
  facts: string[];
  imageWidth: number;
  reversed: boolean;
  originalImageDimensions: { width: number; height: number };
  editing?: boolean;
}) => {
  const { width } = useWindowSize();
  const [ref, setRef] = useState<HTMLElement | null>(null);
  //const [rowHeight, setRowHeight]
  const [hideImage, setHideImage] = useState<boolean>(false);
  const [factUnderImage, setFactUnderImage] = useState<boolean>(false);

  const textLengthWindowSizeRatio =
    props.textCardDetails.content.join(" ").split(" ").length / width;

  useEffect(() => {
    const originalAspectRatio =
      props.originalImageDimensions.width /
      props.originalImageDimensions.height;
    const textLengthWindowSizeRatio =
      props.textCardDetails.content.join(" ").length / width;
    setHideImage(textLengthWindowSizeRatio * originalAspectRatio > 1.9);
    setFactUnderImage(textLengthWindowSizeRatio * originalAspectRatio > 1.1);
  }, [
    textLengthWindowSizeRatio,
    props.textCardDetails.content,
    width,
    props.originalImageDimensions.height,
    props.originalImageDimensions.width,
  ]);

  // useEffect(() => {
  //   const originalAspectRatio =
  //     props.originalImageDimensions.width /
  //     props.originalImageDimensions.height;
  //   const newAspectRatio =
  //     (ref?.getBoundingClientRect().width || 1) /
  //     (ref?.getBoundingClientRect().height || 1);
  //   setHideImage(originalAspectRatio - newAspectRatio > 0.5);
  // }, [
  //   ref,
  //   width,
  //   props.originalImageDimensions.height,
  //   props.originalImageDimensions.width,
  // ]);
  const blocks = [
    <Stack key="text" flex={1} ref={setRef} spacing={`${GRID_SPACING}px`}>
      <TextBlockCard
        key="text"
        title={props.textCardDetails.title ?? ""}
        content={props.textCardDetails.content ?? []}
        onClick={() => null} //{() => setSelectedTextCardId(props.textCardDetails[i + 1]?.id)}
        editing={props.editing}
      />
      {!factUnderImage || hideImage ? (
        <FactsCard facts={props.facts} key="fact" />
      ) : (
        <></>
      )}
    </Stack>,
    ...(hideImage
      ? []
      : [
          <Stack key="image" spacing={`${GRID_SPACING}px`}>
            <ImageCard
              url={props.imageCardDetails.url}
              caption={props.imageCardDetails.caption}
              width={props.imageWidth}
            />
            {factUnderImage ? (
              <FactsCard facts={props.facts} key="fact" />
            ) : (
              <></>
            )}
          </Stack>,
        ]),
  ];
  return (
    <Stack
      //height={i === factRowIndex ? FACT_ROW_HEIGHT : `${ROW_HEIGHT}px`}
      //minHeight={i === factRowIndex ? FACT_ROW_HEIGHT : `${ROW_HEIGHT}px`}
      width="100%"
      direction="row"
      spacing={`${GRID_SPACING}px`}
    >
      {props.reversed ? _.reverse(blocks) : blocks}
    </Stack>
  );
};

const Bento = (props: {
  mainCardDetails: IPediaMainCard;
  textCardDetails: IPediaTextBlock[];
  imageCardDetails: IPediaImage[];
  facts: IPediaPage["facts"];
  editing: boolean;
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
      minHeight={MAIN_CARD_HEIGHT}
      //maxHeight={MAIN_CARD_HEIGHT}
    >
      <PediaMainCard
        {..._.omit(props.mainCardDetails, "title")}
        width={getWidthOfColumns(props.columnWidth > 72 ? 5 : 6)}
        editing={props.editing}
      />
      <TextBlockCard
        title={props.textCardDetails[0]?.title ?? ""}
        //content={props.textCardDetails[0]?.content ?? []}
        content={props.textCardDetails[0]?.content ?? []}
        onClick={() => setSelectedTextCardId(props.textCardDetails[0]?._id)}
        editing={props.editing}
      />
      {/* <Stack overflow="hidden" flex={1} spacing={`${GRID_SPACING}px`}>
        <Stack maxHeight="50%" overflow="hidden">
          <TextBlockCard
            title={props.textCardDetails[0]?.title ?? ""}
            content={props.textCardDetails[0]?.content ?? []}
            onClick={() => setSelectedTextCardId(props.textCardDetails[0]?.id)}
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
      </Stack> */}
    </Stack>
  );

  const [originalImageSizes, setOriginalImageSizes] = useState<
    { width: number; height: number }[]
  >([]);
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
              3,
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
    .slice(1, props.textCardDetails.length)
    .map((td, i) =>
      originalImageSizes[i] ? (
        <BentoRow
          key={td._id}
          textCardDetails={props.textCardDetails[i + 1]}
          imageCardDetails={props.imageCardDetails[i]}
          facts={
            i === props.textCardDetails.length - 2
              ? props.facts.slice(-3)
              : [props.facts[i]]
          }
          originalImageDimensions={originalImageSizes[i]}
          imageWidth={getWidthOfColumns(imageColumnsN[i])}
          reversed={!!(i % 2)}
          editing={props.editing}
        />
      ) : (
        <></>
      )
    );

  // const rows = props.textCardDetails
  //   .slice(1, props.textCardDetails.length)
  //   .map((td, i) => {
  //     const originalAspectRatio = originalImageSizes[i].width / originalImageSizes[i].height
  //     const
  //     return [
  //       i === factRowIndex ? (
  //         <Stack key={td.id} flex={1} spacing={`${GRID_SPACING}px`}>
  //           <FactCard fact={props.fact} />
  //           <TextBlockCard
  //             title={td.title ?? ""}
  //             content={td.content ?? []}
  //             onClick={() =>
  //               setSelectedTextCardId(props.textCardDetails[i + 1]?.id)
  //             }
  //           />
  //         </Stack>
  //       ) : (
  //         <Stack key={td.id} flex={1}>
  //           <TextBlockCard
  //             title={td.title ?? ""}
  //             content={td.content ?? []}
  //             onClick={() =>
  //               setSelectedTextCardId(props.textCardDetails[i + 1]?.id)
  //             }
  //           />
  //         </Stack>
  //       ),
  //       <ImageCard
  //         key="image"
  //         url={props.imageCardDetails[i].url}
  //         caption={props.imageCardDetails[i].caption}
  //         width={getWidthOfColumns(imageColumnsN[i])}
  //       />,
  //     ];
  //   })
  //   .map((pair, i) => (i % 2 ? pair : _.reverse(pair.slice())))
  //   .map((pair, i) => (
  //     <Stack
  //       key={i}
  //       //height={i === factRowIndex ? FACT_ROW_HEIGHT : `${ROW_HEIGHT}px`}
  //       //minHeight={i === factRowIndex ? FACT_ROW_HEIGHT : `${ROW_HEIGHT}px`}
  //       width="100%"
  //       direction="row"
  //       spacing={`${GRID_SPACING}px`}
  //     >
  //       {pair}
  //     </Stack>
  //   ));
  return (
    <>
      <Stack spacing={`${GRID_SPACING}px`}>{[firstRow, ...rows]}</Stack>
      {selectedTextCardId ? (
        <TextSectionPopover
          open={true}
          closeCallback={() => setSelectedTextCardId(undefined)}
          {...props.textCardDetails.find(
            (tb) => tb._id === selectedTextCardId
          )!}
        />
      ) : null}
    </>
  );
};

export default function PediaPageContents(props: {
  articleDetails: IPediaPage;
  collectionDetails: IPediaCollectionPage;
}) {
  const [selectedAge, setSelectedAge] = useState<PediaAge>("student");

  console.log(props.articleDetails);

  /* needed for the platform row's proper scrollability */
  const { width, height } = useWindowSize();
  const [bentoRef, setBentoRef] = useState<HTMLElement | null>(null);
  const [columnWidth, setColumnWidth] = useState<number>(0);
  useEffect(() => {
    const w = bentoRef?.getBoundingClientRect().width;
    w && setColumnWidth((w - GRID_SPACING) / N_COLUMNS - GRID_SPACING);
  }, [width, bentoRef]);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);

  const [editing, setEditing] = useState<boolean>(false);

  return (
    <Stack width="100vw" height="100vh" alignItems="center" overflow="scroll">
      <Header mobile={isMobile} />
      <Stack>
        {/* <ReactCarousel
            carouselConfig={{
              transform: {
                rotateY: {
                  [BEFORE]: () => "rotateY(25deg)",
                  [CENTER]: () => "rotateY(0deg)",
                  [AFTER]: () => "rotateY(-25deg)",
                },
              },
            }}
            // itemBackgroundStyle={{
            //   backgroundColor: "#ece4db",
            //   borderRadius: "3px",
            //   boxShadow: "8px 12px 14px -6px black",
            // }}
            // containerBackgroundStyle={{
            //   filter: "blur(7px)",
            //   backgroundColor: "rgba(62, 212, 214, 0.3)",
            // }}
            //carouselHeight="600px"
          >
            {(boo
              ? _.reverse(props.pageDetails.images)
              : props.pageDetails.images
            ).map((image, index) => (
              <Stack key={image.id} height="200px" width="200px">
                <ImageCard
                  key={image.id}
                  url={image.url}
                  caption={image.caption}
                  width={300}
                />
              </Stack>
            ))}
          </ReactCarousel> */}
        {isMobile ? (
          <UrsorFadeIn duration={1000}>
            <Stack width="100%" height="100%">
              <MobileColumn
                title={props.articleDetails.title}
                mainCardDetails={{
                  title: props.articleDetails.title,
                  color: props.articleDetails.color,
                  imageUrl: props.articleDetails.mainImage,
                  stats: props.articleDetails.stats,
                }}
                imageCardDetails={props.articleDetails.images} //@ts-ignore
                textCardDetails={
                  props.articleDetails.textBlocks.find(
                    (b) => b.level === selectedAge
                  )?.blocks ?? []
                }
                facts={props.articleDetails.facts}
                questions={props.articleDetails.questions}
              />
            </Stack>
          </UrsorFadeIn>
        ) : (
          <UrsorFadeIn delay={500} duration={1000}>
            <Stack>
              <LayoutCard
                title={props.articleDetails.title}
                setSelectedAge={setSelectedAge}
                selectedAge={selectedAge}
                editButton
                editingOn={editing}
                editingCallback={() => setEditing(!editing)}
                collectionPageId={props.collectionDetails?.id}
                collectionPageTitle={props.collectionDetails?.title}
              >
                <Stack ref={setBentoRef} spacing="94px" alignItems="center">
                  <Bento
                    mainCardDetails={{
                      title: props.articleDetails.title,
                      color: props.articleDetails.color,
                      imageUrl: props.articleDetails.mainImage,
                      stats: props.articleDetails.stats,
                    }}
                    imageCardDetails={props.articleDetails.images}
                    textCardDetails={
                      props.articleDetails.textBlocks.find(
                        (b) => b.level === selectedAge
                      )?.blocks ?? []
                    }
                    facts={props.articleDetails.facts}
                    columnWidth={columnWidth}
                    editing={editing}
                  />
                  {props.articleDetails.questions &&
                  props.articleDetails.questions.length > 0 ? (
                    <QuestionsCard questions={props.articleDetails.questions} />
                  ) : null}
                  {/* {props.suggestedPages.length > 0 ? (
                    <SuggestionsSection
                      suggestedPages={props.suggestedPages}
                      parentPages={props.parentPages}
                    />
                  ) : null} */}
                  <div />
                </Stack>
              </LayoutCard>

              {/* <Stack minHeight="20px" />
              <Stack width="100%">
                <Footer />
              </Stack> */}
            </Stack>
          </UrsorFadeIn>
        )}
        <Stack width="100%" px={isMobile ? "30px" : 0}>
          <Footer fontScale={Math.min(1, width / 700)} />
        </Stack>
      </Stack>
    </Stack>
  );
}

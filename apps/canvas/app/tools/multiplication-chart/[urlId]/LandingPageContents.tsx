"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import PencilIcon from "@/images/icons/Pencil.svg";
import _ from "lodash";
import LandingPageViewport from "./LandingPageViewport";
import ExplainerCard from "./ExplainerCard";
import OtherPageCard from "./OtherPageCard";
import { IntroSteps } from "./IntroSteps";
import {
  WorksheetTopic,
  ISpecificWorksheetGeneratorSettings,
  WorksheetId,
} from "../../../components/WorksheetGenerator";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
//import PrintableMultiplicationTable from "./PrintableMultiplicationTable";
import dynamic from "next/dynamic";
import CheckIcon from "@/images/icons/CheckIcon.svg";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { VisualLinkCards } from "./VisualLinkCards";
import ValueProposition, { IValuePropositionItem } from "./ValueProposition";
import { Keywords } from "./Keywords";
import MultiplicationTableColumns, {
  IMultiplicationTableColumns,
} from "@/app/components/MultiplicationTableColumns";
import { useRouter } from "next/navigation";

export interface IAstroLandingPage {
  urlId: string;
  pageTitle: string;
  metaDescription: string;
  heading: string;
  subHeading: string;
  worksheetGenerator?: {
    topic: WorksheetTopic;
    worksheetId: WorksheetId;
    title: string;
    nProblems: number;
    specificSettings?: ISpecificWorksheetGeneratorSettings & {
      topic: WorksheetTopic;
    };
  };
  howItWorks?: {
    supertitle: string;
    title: string;
    step1: { body: string; title: string };
    step2: { body: string; title: string };
    step3: { body: string; title: string };
  };
  worksheetPreview?: {
    supertitle: string;
    title: string;
    body: string;
    worksheetPreviewParameters: {
      questionTopic: WorksheetTopic;
      questionType: WorksheetId;
      title: string;
      worksheetParameters: {
        factor: number;
        nProblems: number;
      };
    };
  };
  linkTable?: {
    supertitle: string;
    title: string;
    body: string;
    tableHeading: string;
    links: {
      text: string;
      url: string;
    }[];
  };
  visualLinkCards?: {
    supertitle: string;
    title: string;
    cards: {
      title: string;
      text: string;
      url: string;
      imageUrl: string;
    }[];
  };
  multiplicationTables?: ({
    title: string;
    supertitle: string;
    subtitle: string;
  } & IMultiplicationTableColumns)[];
  valueProposition?: IValuePropositionItem[];
  printableChart?: {
    title: string;
    supertitle: string;
    subtitle: string;
  };
  createWorksheets?: {
    title: string;
    supertitle: string;
    subtitle: string;
    leftImageUrl: string;
  };
  keywords?: {
    title: string;
    supertitle: string;
    links: { title: string; url: string }[];
  };
  explainerCards?: {
    supertitle: string;
    title: string;
    body: string;
    cards: {
      title: string;
      text: string;
      imageUrl: string;
    }[];
  };
  otherPages?: {
    supertitle: string;
    title: string;
    links: {
      urlId: string;
      imageString?: string;
      title: string;
      text: string;
    }[];
  };
  productCard?: {
    title: string;
    body: string;
    buttonText: string;
    buttonUrl: string;
  };
  faqs?: {
    cards: {
      question: string;
      answer: string;
    }[];
  };
}

export const MOBILE_WINDOW_WIDTH_THRESHOLD = 680;

const PrintableMultiplicationTable = dynamic(
  () => import("./PrintableMultiplicationTable"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const WorksheetGenerator = dynamic(
  () => import("../../../components/WorksheetGenerator"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const EmptyStateIllustration = (props: {
  children: React.ReactNode;
}) => (
  <Stack
    position="absolute"
    top={0}
    width="100vw"
    height="100vh"
    justifyContent="center"
    alignItems="center"
    sx={{
      pointerEvents: "none",
      filter: "grayscale(1)",
    }}
    zIndex={999}
  >
    <UrsorFadeIn delay={500} duration={800}>
      <Stack position="relative" spacing="18px">
        <Stack sx={{ opacity: 0.3 }}>
          <Image
            height={207}
            width={217}
            src={WonderingIllustration}
            alt="Empty state illustration"
          />
        </Stack>
        <Stack width="100%" alignItems="center" position="absolute" top="170px">
          <Typography
            bold
            color={PALETTE.secondary.grey[3]}
            sx={{ textAlign: "center" }}
          >
            {props.children}
          </Typography>
        </Stack>
      </Stack>
    </UrsorFadeIn>
  </Stack>
);

export const Captioned = (props: {
  text?: string;
  disabled?: boolean;
  checkbox?: {
    text: string;
    on: boolean;
    callback: () => void;
  };
  children: React.ReactNode;
}) => (
  <Stack
    flex={1}
    spacing="6px"
    sx={{
      opacity: props.disabled ? 0.45 : 1,
      pointerEvents: props.disabled ? "none" : undefined,
    }}
  >
    <Stack direction="row" justifyContent="space-between">
      {props.text ? (
        <Typography variant="small" color={PALETTE.secondary.grey[4]}>
          {props.text}
        </Typography>
      ) : null}
      {props.checkbox ? (
        <Stack direction="row" spacing="6px" alignItems="center">
          <Typography variant="small" color={PALETTE.secondary.grey[4]}>
            {props.checkbox.text}
          </Typography>
          <Stack
            width="13px"
            height="13px"
            border={`2px solid ${PALETTE.secondary.grey[5]}`}
            borderRadius="6px"
            justifyContent="center"
            alignItems="center"
            onClick={props.checkbox.callback}
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[5],
                },
              },
            }}
          >
            {props.checkbox.on ? (
              <CheckIcon height="11px" width="11px" />
            ) : null}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
    {props.children}
  </Stack>
);

export default function LandingPageContents(props: IAstroLandingPage) {
  // const fuck = getSelectorsByUserAgent(headers().get("user-agent") ?? "");
  // const isMobile = !!fuck.isMobile;
  // const isMobile = false;
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => setIsMobile(width < MOBILE_WINDOW_WIDTH_THRESHOLD), [width]);
  const router = useRouter();
  return (
    <AstroLandingPage
      title={[props.heading]}
      subtitle={props.subHeading}
      mobile={isMobile}
      faqs={props.faqs}
      viewports={[
        ...(props.howItWorks
          ? [
              <LandingPageViewport
                key="howItWorks"
                supertitle={props.howItWorks.supertitle}
                title={props.howItWorks.title}
                mobile={isMobile}
              >
                <IntroSteps
                  step1={props.howItWorks.step1}
                  step2={props.howItWorks.step2}
                  step3={props.howItWorks.step3}
                  mobile={isMobile}
                  backgroundOpacity={0.13}
                />
              </LandingPageViewport>,
            ]
          : []),
        ...(props.worksheetPreview
          ? [
              <LandingPageViewport
                key="worksheetPreview"
                supertitle={props.worksheetPreview.supertitle}
                title={props.worksheetPreview.title}
                mobile={isMobile}
              >
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={isMobile ? "30px" : "45px"}
                  alignItems={isMobile ? "center" : undefined}
                  overflow="hidden"
                  pt="8px"
                >
                  {props.worksheetPreview.worksheetPreviewParameters
                    ?.worksheetParameters ? (
                    <PrintableMultiplicationTable
                      {...props.worksheetPreview.worksheetPreviewParameters}
                      mobile={isMobile}
                    />
                  ) : null}
                  <Stack spacing="10px" maxWidth="503px">
                    {props.worksheetPreview.body
                      .split("\n")
                      .map((paragraph, i) => (
                        <Typography key={i} color={PALETTE.secondary.grey[4]}>
                          {paragraph}
                        </Typography>
                      ))}
                  </Stack>
                </Stack>
              </LandingPageViewport>,
            ]
          : []),
        ...(props.linkTable
          ? [
              <LandingPageViewport
                key="linkTable"
                supertitle={props.linkTable.supertitle}
                title={props.linkTable.title}
                subtitle={props.linkTable.body}
                mobile={isMobile}
              >
                <Stack
                  width="990px"
                  borderRadius="12px"
                  overflow="hidden"
                  border={`1px solid ${PALETTE.secondary.grey[2]}`}
                >
                  <Stack
                    bgcolor={PALETTE.secondary.purple[2]}
                    justifyContent="center"
                    alignItems="center"
                    height="56px"
                  >
                    <Typography htmlTag="h5" bold color="rgb(255,255,255)">
                      {props.linkTable.tableHeading}
                    </Typography>
                  </Stack>
                  <Stack spacing={isMobile ? "16px" : "22px"}>
                    {_.chunk(props.linkTable.links, 2).map((pair, i) => (
                      <Stack
                        key={i}
                        direction="row"
                        height="57px"
                        alignItems="center"
                      >
                        <Stack
                          flex={1}
                          height="100%"
                          justifyContent="center"
                          px="10px"
                          border={`1px solid ${PALETTE.secondary.grey[2]}`}
                        >
                          <a
                            target="_blank"
                            href={pair[0].url}
                            style={{
                              textDecoration: "none",
                              color: PALETTE.secondary.purple[2],
                            }}
                            rel="noreferrer"
                          >
                            <Stack flex={1}>
                              <Typography bold>{pair[0].text}</Typography>
                            </Stack>
                          </a>
                        </Stack>
                        {pair[1] ? (
                          <Stack
                            flex={1}
                            height="100%"
                            justifyContent="center"
                            px="10px"
                            border={`1px solid ${PALETTE.secondary.grey[2]}`}
                            borderLeft="none"
                          >
                            <a
                              target="_blank"
                              href={pair[1].url}
                              style={{
                                textDecoration: "none",
                                color: PALETTE.secondary.purple[2],
                              }}
                              rel="noreferrer"
                            >
                              <Stack flex={1}>
                                <Typography bold>{pair[1].text}</Typography>
                              </Stack>
                            </a>
                          </Stack>
                        ) : null}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </LandingPageViewport>,
            ]
          : []),
        ...(props.visualLinkCards
          ? [
              <LandingPageViewport
                key="visualLinkCards"
                supertitle={props.visualLinkCards.supertitle}
                title={props.visualLinkCards.title}
                mobile={isMobile}
              >
                <VisualLinkCards {...props.visualLinkCards} />
              </LandingPageViewport>,
            ]
          : []),
        ...(props.valueProposition
          ? [
              <Stack key="valueProposition" py="60px" alignItems="center">
                <ValueProposition items={props.valueProposition} />
              </Stack>,
            ]
          : []),
        ...(props.multiplicationTables
          ? props.multiplicationTables.map((table, i) => (
              <LandingPageViewport
                key={`multiplicationtable${i}`}
                supertitle={table.supertitle}
                subtitle={table.subtitle}
                title={table.title}
                mobile={isMobile}
              >
                <MultiplicationTableColumns {...table} />
              </LandingPageViewport>
            ))
          : []),
        ...(props.printableChart
          ? [
              <LandingPageViewport
                key="printableChart"
                supertitle={props.printableChart.supertitle}
                subtitle={props.printableChart.subtitle}
                title={props.printableChart.title}
                mobile={isMobile}
              >
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                  }}
                >
                  <UrsorButton
                    size="large"
                    dark
                    variant="tertiary"
                    endIcon={PencilIcon}
                    iconSize={22}
                    backgroundColor="linear-gradient(172deg, #F279C5, #1D62F6)"
                    onClick={() => router.push("/dashboard")}
                  >
                    Create a printable multiplication chart
                  </UrsorButton>
                </Stack>
              </LandingPageViewport>,
            ]
          : []),
        ...(props.createWorksheets
          ? [
              <LandingPageViewport
                key="createWorksheets"
                supertitle={props.createWorksheets.supertitle}
                subtitle={props.createWorksheets.subtitle}
                title={props.createWorksheets.title}
                leftImageUrl={props.createWorksheets.leftImageUrl}
                mobile={isMobile}
              >
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                    transition: "0.2s",
                  }}
                >
                  <UrsorButton
                    size="large"
                    dark
                    variant="tertiary"
                    endIcon={PencilIcon}
                    iconSize={22}
                    backgroundColor="linear-gradient(172deg, #F279C5, #1D62F6)"
                    onClick={() => router.push("/dashboard")}
                  >
                    Create your own worksheets
                  </UrsorButton>
                </Stack>
              </LandingPageViewport>,
            ]
          : []),
        ...(props.keywords
          ? [
              <LandingPageViewport
                key="keywords"
                supertitle={props.keywords.supertitle}
                title={props.keywords.title}
                mobile={isMobile}
              >
                <Keywords links={props.keywords.links} />
              </LandingPageViewport>,
            ]
          : []),
        ...(props.explainerCards
          ? [
              <LandingPageViewport
                key="explainerCards"
                supertitle={props.explainerCards.supertitle}
                subtitle={props.explainerCards.body}
                title={props.explainerCards.title}
                mobile={isMobile}
              >
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={isMobile ? "16px" : "22px"}
                >
                  <ExplainerCard
                    imageUrl={props.explainerCards?.cards?.[0]?.imageUrl}
                    title={props.explainerCards?.cards?.[0]?.title}
                    text={props.explainerCards?.cards?.[0]?.text}
                  />
                  {props.explainerCards?.cards?.[1] ? (
                    <ExplainerCard
                      imageUrl={props.explainerCards.cards[1]?.imageUrl}
                      title={props.explainerCards.cards[1]?.title}
                      text={props.explainerCards.cards[1]?.text}
                    />
                  ) : null}
                  {props.explainerCards?.cards?.[2] ? (
                    <ExplainerCard
                      imageUrl={props.explainerCards.cards[2]?.imageUrl}
                      title={props.explainerCards.cards[2]?.title}
                      text={props.explainerCards.cards[2]?.text}
                    />
                  ) : null}
                </Stack>
              </LandingPageViewport>,
            ]
          : []),
        ...(props.otherPages
          ? [
              <LandingPageViewport
                key="otherPages"
                supertitle={props.otherPages.supertitle}
                title={props.otherPages.title}
                mobile={isMobile}
              >
                <Stack spacing={isMobile ? "14px" : "22px"}>
                  {_.chunk(props.otherPages.links, 2).map((pair, i) => (
                    <Stack
                      key={i}
                      direction={isMobile ? "column" : "row"}
                      spacing={isMobile ? "14px" : "22px"}
                    >
                      <OtherPageCard
                        title={pair[0].title}
                        text={pair[0].text}
                        imageString={pair[0].imageString}
                        urlId={pair[0].urlId}
                        mobile={isMobile}
                      />
                      {pair?.[1] ? (
                        <OtherPageCard
                          title={pair[1].title}
                          text={pair[1].text}
                          imageString={pair[1].imageString}
                          urlId={pair[1].urlId}
                          mobile={isMobile}
                        />
                      ) : null}
                    </Stack>
                  ))}
                </Stack>
              </LandingPageViewport>,
            ]
          : []),
      ]}
    >
      <Stack minHeight="540px" px="20px">
        <WorksheetGenerator
          {...props.worksheetGenerator}
          fadeIn
          mobile={isMobile}
          glow
          buttonText="Download"
        />
      </Stack>
    </AstroLandingPage>
  );
}

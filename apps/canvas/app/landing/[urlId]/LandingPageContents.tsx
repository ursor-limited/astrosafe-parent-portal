"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ApiController from "../../api";
import _ from "lodash";
import { useRouter } from "next/navigation";
import MultiplicationTable from "./MultiplicationTable";
import LandingPageViewport from "./LandingPageViewport";
import ExplainerCard from "./ExplainerCard";
import OtherPageCard from "./OtherPageCard";
import { IntroSteps } from "./IntroSteps";
import WorksheetGenerator, {
  WorksheetTopic,
  ISpecificWorksheetGeneratorSettings,
  IWorksheetParameters,
  WorksheetId,
} from "./WorksheetGenerator";

export const Captioned = (props: {
  text: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <Stack
    spacing="8px"
    flex={1}
    sx={{
      opacity: props.disabled ? 0.45 : 1,
      pointerEvents: props.disabled ? "none" : undefined,
    }}
  >
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>
      {props.text}
    </Typography>
    {props.children}
  </Stack>
);

export default function LandingPageContents(props: {
  urlId: string;
  pageTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  worksheetGenerator: {
    topic: WorksheetTopic;
    worksheetId: WorksheetId;
    title: string;
    nProblems: number;
    specificSettings: ISpecificWorksheetGeneratorSettings;
  };
  howItWorks: {
    supertitle: string;
    title: string;
    step1: { body: string; title: string };
    step2: { body: string; title: string };
    step3: { body: string; title: string };
  };
  worksheetPreview: {
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
  linkTable: {
    supertitle: string;
    title: string;
    body: string;
    tableHeading: string;
    links: {
      text: string;
      url: string;
    }[];
  };
  explainerCards: {
    supertitle: string;
    title: string;
    body: string;
    cards: {
      title: string;
      text: string;
      imageUrl: string;
    }[];
  };
  otherPages: {
    supertitle: string;
    title: string;
    links: {
      url: string;
      title: string;
      text: string;
      imageUrl: string;
    }[];
  };
  productCard: {
    title: string;
    body: string;
    buttonText: string;
    buttonUrl: string;
  };
}) {
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

  const [mobile, setMobile] = useState<boolean>(false);

  return (
    <AstroLandingPage
      title={[props.heading]}
      subtitle={props.subheading}
      mobile={false}
      viewports={[
        <LandingPageViewport
          key="howItWorks"
          supertitle={props.howItWorks.supertitle}
          title={props.howItWorks.title}
        >
          <IntroSteps
            step1={props.howItWorks.step1}
            step2={props.howItWorks.step2}
            step3={props.howItWorks.step3}
            mobile={mobile}
          />
        </LandingPageViewport>,
        <LandingPageViewport
          key="worksheetPreview"
          supertitle={props.worksheetPreview.supertitle}
          title={props.worksheetPreview.title}
        >
          <Stack direction="row" spacing="45px">
            <MultiplicationTable />
            <Stack spacing="10px" pt="74px" maxWidth="503px">
              {props.worksheetPreview.body.split("\n").map((paragraph) => (
                <Typography key={paragraph} color={PALETTE.secondary.grey[4]}>
                  {paragraph}
                </Typography>
              ))}
              <UrsorButton size="large">Download chart</UrsorButton>
            </Stack>
          </Stack>
        </LandingPageViewport>,
        <LandingPageViewport
          key="linkTable"
          supertitle={props.linkTable.supertitle}
          title={props.linkTable.title}
          subtitle={props.linkTable.body}
          mobile={mobile}
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
              <Typography bold color="rgb(255,255,255)">
                {props.linkTable.tableHeading}
              </Typography>
            </Stack>
            <Stack spacing={mobile ? "16px" : "22px"}>
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
        <LandingPageViewport
          key="explainerCards"
          supertitle={props.explainerCards.supertitle}
          subtitle={props.explainerCards.body}
          title="Why use AstroPedia?"
          mobile={mobile}
        >
          <Stack
            direction={mobile ? "column" : "row"}
            spacing={mobile ? "16px" : "22px"}
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
        <LandingPageViewport
          key="otherPages"
          supertitle={props.otherPages.supertitle}
          title={props.otherPages.title}
          mobile={mobile}
        >
          <Stack spacing={mobile ? "16px" : "22px"}>
            {_.chunk(props.otherPages.links, 2).map((pair, i) => (
              <Stack key={i} direction="row" spacing={mobile ? "16px" : "22px"}>
                <OtherPageCard
                  title={pair[0].title}
                  text={pair[0].text}
                  imageUrl={pair[0].imageUrl}
                  url={pair[0].url}
                />
                {pair?.[1] ? (
                  <OtherPageCard
                    title={pair[1].title}
                    text={pair[1].text}
                    imageUrl={pair[1].imageUrl}
                    url={pair[1].url}
                  />
                ) : null}
              </Stack>
            ))}
          </Stack>
        </LandingPageViewport>,
      ]}
    >
      <WorksheetGenerator {...props.worksheetGenerator} />
    </AstroLandingPage>
  );
}

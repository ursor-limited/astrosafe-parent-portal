import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import WonderingIllustration from "@/images/WonderingIllustration.png";
import _ from "lodash";
import LandingPageViewport from "./LandingPageViewport";
import ExplainerCard from "./ExplainerCard";
import OtherPageCard from "./OtherPageCard";
import { IntroSteps } from "./IntroSteps";
import {
  WorksheetTopic,
  ISpecificWorksheetGeneratorSettings,
  WorksheetId,
} from "./WorksheetGenerator";
import Image from "next/image";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
//import PrintableMultiplicationTable from "./PrintableMultiplicationTable";
import dynamic from "next/dynamic";

const PrintableMultiplicationTable = dynamic(
  () => import("./PrintableMultiplicationTable"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const WorksheetGenerator = dynamic(
  () => import("./WorksheetGenerator"),
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
  text: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <Stack
    flex={1}
    spacing="8px"
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
  subHeading: string;
  worksheetGenerator: {
    topic: WorksheetTopic;
    worksheetId: WorksheetId;
    title: string;
    nProblems: number;
    specificSettings: ISpecificWorksheetGeneratorSettings & {
      topic: WorksheetTopic;
    };
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
}) {
  // const [printDialogOpen, setPrintDialogOpen] = useState<boolean>(false);

  // const openPrintCardGridDialog = useReactToPrint({
  //   content: () => printableRef,
  //   documentTitle: "ASTRO Numbers",
  //   onAfterPrint: () => setPrintDialogOpen(false),
  // });

  // const [printableRef, setPrintableRef] = useState<HTMLElement | null>(null);
  // useEffect(() => {
  //   if (printDialogOpen && printableRef) {
  //     openPrintCardGridDialog();
  //   }
  // }, [printDialogOpen, printableRef]);

  //const [mobile, setMobile] = useState<boolean>(false);
  const mobile = false;

  return (
    <AstroLandingPage
      title={[props.heading]}
      subtitle={props.subHeading}
      mobile={false}
      faqs={props.faqs}
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
        ...(props.worksheetPreview
          ? [
              <LandingPageViewport
                key="worksheetPreview"
                supertitle={props.worksheetPreview.supertitle}
                title={props.worksheetPreview.title}
              >
                <Stack direction="row" spacing="45px">
                  {props.worksheetPreview.worksheetPreviewParameters
                    ?.worksheetParameters ? (
                    <PrintableMultiplicationTable
                      {...props.worksheetPreview.worksheetPreviewParameters}
                    />
                  ) : null}
                  <Stack spacing="10px" maxWidth="503px">
                    {props.worksheetPreview.body
                      .split("\n")
                      .map((paragraph) => (
                        <Typography
                          key={paragraph}
                          color={PALETTE.secondary.grey[4]}
                        >
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
                    <Typography htmlTag="h5" bold color="rgb(255,255,255)">
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
            ]
          : []),
        <LandingPageViewport
          key="explainerCards"
          supertitle={props.explainerCards.supertitle}
          subtitle={props.explainerCards.body}
          title={props.explainerCards.title}
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
                  imageString={pair[0].imageString}
                  urlId={pair[0].urlId}
                />
                {pair?.[1] ? (
                  <OtherPageCard
                    title={pair[1].title}
                    text={pair[1].text}
                    imageString={pair[1].imageString}
                    urlId={pair[1].urlId}
                  />
                ) : null}
              </Stack>
            ))}
          </Stack>
        </LandingPageViewport>,
      ]}
    >
      {/* <Stack minHeight="540px"> */}
      <WorksheetGenerator {...props.worksheetGenerator} />
      {/* </Stack> */}
    </AstroLandingPage>
  );
}

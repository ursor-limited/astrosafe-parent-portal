"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import { useEffect, useState } from "react";
import Worksheet, {
  EquationOrientation,
  EquationTopic,
  QuestionType,
} from "../../worksheet/[id]/Worksheet";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useReactToPrint } from "react-to-print";
import ApiController from "../../api";
import _ from "lodash";
import { useRouter } from "next/navigation";
import MultiplicationTable from "./MultiplicationTable";
import LandingPageViewport from "./LandingPageViewport";
import PageSelector from "./PageSelector";
import UrsorSelect from "../../components/UrsorSelect";
import ExplainerCard from "./ExplainerCard";

const TITLE_CHARACTER_LIMIT = 30;
const DEFAULT_TITLE = "Multiplication Sheet";
const MAX_N_PROBLEMS = 100;

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

const CategorySelectionButton = (props: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      flex={1}
      height="36px"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
      border={`2px solid ${
        props.selected
          ? PALETTE.secondary.purple[2]
          : hovering
          ? PALETTE.secondary.purple[1]
          : "transparent"
      }`}
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        pointerEvents: props.selected ? "none" : undefined,
      }}
      onClick={props.onClick}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <Typography
        bold
        variant="small"
        color={
          props.selected
            ? PALETTE.secondary.purple[2]
            : hovering
            ? PALETTE.secondary.purple[1]
            : undefined
        }
        sx={{
          transition: "0.2s",
        }}
      >
        {props.children}
      </Typography>
    </Stack>
  );
};

export default function LandingPageContents(props: {
  urlId: string;
  pageTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  worksheetGenerator: {
    title: string;
    questionTopic: EquationTopic;
    questionType: QuestionType;
    worksheetParameters: {
      factor: number;
      nDigits: number;
      nProblems: number;
      orientation: EquationOrientation;
    };
  };
  howItWorks: {
    supertitle: string;
    title: string;
    step1: string;
    step2: string;
    step3: string;
  };
  worksheetPreview: {
    supertitle: string;
    title: string;
    body: string;
    worksheetPreviewParameters: {
      questionTopic: EquationTopic;
      questionType: QuestionType;
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
    linkList: {
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
  const [title, setTitle] = useState<string>("Multiplication sheet");
  const [factor, setFactor] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [nProblems, setNProblems] = useState<number>(10);
  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");

  useEffect(
    () => setTitle(props.worksheetGenerator.title),
    [props.worksheetGenerator.title]
  );
  useEffect(
    () => setFactor(props.worksheetGenerator.worksheetParameters.factor),
    [props.worksheetGenerator.worksheetParameters.factor]
  );
  useEffect(
    () => setNDigits(props.worksheetGenerator.worksheetParameters.nDigits),
    [props.worksheetGenerator.worksheetParameters.nDigits]
  );
  useEffect(
    () => setNProblems(props.worksheetGenerator.worksheetParameters.nProblems),
    [props.worksheetGenerator.worksheetParameters.nProblems]
  );
  useEffect(
    () =>
      setOrientation(props.worksheetGenerator.worksheetParameters.orientation),
    [props.worksheetGenerator.worksheetParameters.orientation]
  );

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

  const [multipliers, setMultipliers] = useState<number[]>([]);
  useEffect(() => {
    const fullsetSize = Math.pow(10, nDigits);
    const fullSets = _(Math.floor(nProblems / fullsetSize))
      .range()
      .flatMap(() => _.shuffle(_.range(fullsetSize + 1)))
      .value();
    const partialSet = _.sampleSize(
      _.range(fullsetSize + 1),
      nProblems % fullsetSize
    );
    setMultipliers([...fullSets, ...partialSet]);
  }, [nDigits, nProblems]);

  const router = useRouter();

  const submitCreation = () =>
    ApiController.createWorksheet(
      title || DEFAULT_TITLE,
      orientation,
      topic,
      factor,
      multipliers
    ).then((ws) => router.push(`/worksheet/${ws.id}`));

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

  const [topic, setTopic] = useState<EquationTopic>("multiplication");

  const [nPages, setNPages] = useState<number>(0);
  useEffect(
    () =>
      setNPages(
        1 +
          Math.ceil(
            (nProblems -
              (topic === "division"
                ? 12
                : orientation === "horizontal"
                ? 16
                : 20)) /
              (topic === "division"
                ? 12
                : orientation === "horizontal"
                ? 20
                : 24)
          )
      ),
    [nProblems, orientation, topic]
  );

  const [mobile, setMobile] = useState<boolean>(false);

  return (
    <AstroLandingPage
      title={[props.heading]}
      subtitle={props.subheading}
      mobile={false}
      viewports={[
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
      ]}
    >
      <Stack
        borderRadius="20px"
        bgcolor={PALETTE.secondary.grey[1]}
        p="42px"
        direction="row"
        spacing="40px"
      >
        <Stack width="480px" spacing="16px">
          <Captioned text="Worksheet title">
            <UrsorInputField
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value.length < TITLE_CHARACTER_LIMIT &&
                setTitle(event.target.value)
              }
              placeholder="Worksheet title"
              width="100%"
              leftAlign
              boldValue
              backgroundColor="rgb(255,255,255)"
            />
          </Captioned>
          {/* <Stack direction="row" spacing="20px" sx={{ opacity: 0.35 }}> */}
          <Stack direction="row" spacing="20px">
            <Captioned text="Question topic">
              <UrsorSelect
                white
                items={[
                  {
                    id: "multiplication",
                    value: "Multiplication",
                  },
                  {
                    id: "division",
                    value: "Division",
                  },
                  {
                    id: "addition",
                    value: "Addition",
                  },
                  {
                    id: "subtraction",
                    value: "Subtraction",
                  },
                ]}
                selected={[topic]}
                callback={(t: string) => setTopic(t as EquationTopic)}
                width="100%"
              />
            </Captioned>
            <Captioned text="Question type">
              <UrsorSelect
                white
                items={[
                  {
                    id: "equations",
                    value: "Equations",
                  },
                ]}
                selected={["equations"]}
                callback={(id: string) => {
                  null;
                }}
                width="100%"
              />
            </Captioned>
          </Stack>
          <Stack height="63px" justifyContent="center">
            <Stack
              height="2px"
              width="100%"
              bgcolor={PALETTE.secondary.grey[2]}
            />
          </Stack>
          <Stack direction="row" spacing="20px">
            <Captioned text="Orientation">
              <Stack direction="row" spacing="10px">
                <CategorySelectionButton
                  selected={orientation === "horizontal"}
                  onClick={() => setOrientation("horizontal")}
                >
                  Horizontal
                </CategorySelectionButton>
                <CategorySelectionButton
                  selected={orientation === "vertical"}
                  onClick={() => setOrientation("vertical")}
                >
                  Vertical
                </CategorySelectionButton>
              </Stack>
            </Captioned>
            <Captioned text={topic === "division" ? "Divisor" : "Multiplier"}>
              <UrsorInputField
                value={factor.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const onlyNumbersString =
                    event.target.value.match(/\d+/)?.[0];
                  const leadingZeroRemovedString = onlyNumbersString?.slice(
                    onlyNumbersString[0] === "0" ? 1 : 0
                  );
                  setFactor(parseInt(leadingZeroRemovedString ?? "0"));
                }}
                placeholder="Multiplier"
                //width="100%"
                leftAlign
                boldValue
                backgroundColor="rgb(255,255,255)"
              />
            </Captioned>
          </Stack>
          <Stack direction="row" spacing="20px">
            <Captioned text="Number of digits">
              <Stack direction="row" spacing="10px">
                <CategorySelectionButton
                  selected={nDigits === 1}
                  onClick={() => setNDigits(1)}
                >
                  1
                </CategorySelectionButton>
                <CategorySelectionButton
                  selected={nDigits === 2}
                  onClick={() => setNDigits(2)}
                >
                  2
                </CategorySelectionButton>
                <CategorySelectionButton
                  selected={nDigits === 3}
                  onClick={() => setNDigits(3)}
                >
                  3
                </CategorySelectionButton>
              </Stack>
            </Captioned>
            <Captioned text="Amount of problems">
              <UrsorInputField
                value={nProblems.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const onlyNumbersString =
                    event.target.value.match(/\d+/)?.[0];
                  const leadingZeroRemovedString = onlyNumbersString?.slice(
                    onlyNumbersString[0] === "0" ? 1 : 0
                  );
                  setNProblems(
                    Math.min(
                      leadingZeroRemovedString
                        ? parseInt(leadingZeroRemovedString)
                        : 0,
                      MAX_N_PROBLEMS
                    )
                  );
                }}
                placeholder="Number of digits"
                width="100%"
                leftAlign
                boldValue
                backgroundColor="rgb(255,255,255)"
              />
            </Captioned>
          </Stack>
        </Stack>
        <Stack
          minWidth="242px"
          position="relative"
          flex={1}
          justifyContent="space-between"
        >
          <Stack
            sx={{ transform: "scale(0.28)", transformOrigin: "top left" }}
            position="absolute"
            top={0}
            left={0}
            overflow="hidden"
          >
            <Worksheet
              ref={setPrintableRef}
              title={title}
              orientation={orientation}
              topic={topic}
              nDigits={nDigits}
              number={factor}
              multipliers={multipliers}
              printDialogOpen={printDialogOpen}
              printDialogCloseCallback={() => setPrintDialogOpen(false)}
              pageIndex={selectedPageIndex}
            />
          </Stack>
          <Stack />
          <Stack spacing="19px">
            {(topic === "division" && nProblems > 12) ||
            (orientation === "horizontal" && nProblems > 16) ||
            (orientation === "vertical" && nProblems > 20) ? (
              <PageSelector
                pageIndex={selectedPageIndex}
                back={() => setSelectedPageIndex(selectedPageIndex - 1)}
                forward={() => setSelectedPageIndex(selectedPageIndex + 1)}
                nPages={nPages}
              />
            ) : null}
            <UrsorButton
              onClick={submitCreation}
              dark
              variant="tertiary"
              endIcon={PencilIcon}
              width="100%"
            >
              Create
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
    </AstroLandingPage>
  );
}

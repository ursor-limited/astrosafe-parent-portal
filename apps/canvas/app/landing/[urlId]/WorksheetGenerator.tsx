import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Captioned } from "./LandingPageContents";
import UrsorSelect from "@/app/components/UrsorSelect";
import React, { useEffect, useState } from "react";
import EquationWorksheet, {
  EquationOrientation,
  EquationParameters,
  QuestionTopic,
  QuestionType,
  QuestionTypeParameters,
} from "@/app/worksheet/[id]/EquationWorksheet";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import _ from "lodash";
import PageSelector from "./PageSelector";
import PencilIcon from "@/images/icons/Pencil.svg";
import { WorksheetGeneratorEquationModule } from "./WorksheetGeneratorEquationModule";
import { WorksheetGeneratorNumberBondModule } from "./WorksheetGeneratorNumberBondModule";
import { NumberBondParameters } from "@/app/worksheet/[id]/NumberBondWorksheet";

const TITLE_CHARACTER_LIMIT = 30;
export const DEFAULT_TITLE = "Multiplication Sheet";

export const CategorySelectionButton = (props: {
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

export default function WorksheetGenerator(props: {
  questionParameterValues: QuestionTypeParameters;
}) {
  const [topic, setTopic] = useState<QuestionTopic>("addition");
  const [questionType, setQuestionType] = useState<QuestionType>("equation");
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [nProblems, setNProblems] = useState<number>(10);

  const router = useRouter();

  const [questionParameterValues, setQuestionParameterValues] = useState<
    QuestionTypeParameters | undefined
  >(undefined);
  useEffect(
    () => setQuestionParameterValues(props.questionParameterValues),
    [props.questionParameterValues]
  );

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

  const [nPages, setNPages] = useState<number>(0);

  const [previewWorksheet, setPreviewWorksheet] = useState<
    React.ReactNode | undefined
  >(undefined);

  const [creationCallback, setCreationCallback] = useState<() => void>(
    () => null
  );

  return (
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
              callback={(t: string) => setTopic(t as QuestionTopic)}
              width="100%"
            />
          </Captioned>
          <Captioned text="Question type">
            <UrsorSelect
              white
              items={[
                {
                  id: "equation",
                  value: "Equations",
                },
                {
                  id: "numberBond",
                  value: "Number bond",
                },
              ]}
              selected={[questionType]}
              callback={(qt: string) => {
                setQuestionType(qt as QuestionType);
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
        {questionParameterValues &&
        topic === "addition" &&
        questionType === "equation" ? (
          <WorksheetGeneratorEquationModule
            {...(questionParameterValues as EquationParameters)}
            callback={(newPreviewWorksheet) =>
              setPreviewWorksheet(newPreviewWorksheet)
            }
            setCreationCallback={(cc) => setCreationCallback(() => cc)}
            nProblems={nProblems}
            setNProblems={setNProblems}
            setNPages={setNPages}
            title={title}
            topic={topic}
            pageIndex={selectedPageIndex}
          />
        ) : questionType === "numberBond" ? (
          <WorksheetGeneratorNumberBondModule
            {...(questionParameterValues as NumberBondParameters)}
            callback={(newPreviewWorksheet) =>
              setPreviewWorksheet(newPreviewWorksheet)
            }
            setCreationCallback={(cc) => setCreationCallback(() => cc)}
            nProblems={nProblems}
            setNProblems={setNProblems}
            setNPages={setNPages}
            title={title}
            topic={topic}
            pageIndex={selectedPageIndex}
          />
        ) : null}
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
          {previewWorksheet}
        </Stack>
        <Stack />
        <Stack spacing="19px">
          {/* {(topic === "division" && nProblems > 12) ||
          (orientation === "horizontal" && nProblems > 16) ||
          (orientation === "vertical" && nProblems > 20) ? ( */}
          {nPages > 1 ? (
            <PageSelector
              pageIndex={selectedPageIndex}
              back={() => setSelectedPageIndex(selectedPageIndex - 1)}
              forward={() => setSelectedPageIndex(selectedPageIndex + 1)}
              nPages={nPages}
            />
          ) : null}
          <UrsorButton
            onClick={() => creationCallback()}
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
  );
}

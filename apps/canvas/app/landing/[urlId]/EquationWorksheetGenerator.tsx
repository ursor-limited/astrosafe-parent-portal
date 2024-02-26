import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Captioned } from "./LandingPageContents";
import UrsorSelect from "@/app/components/UrsorSelect";
import { useEffect, useState } from "react";
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

const TITLE_CHARACTER_LIMIT = 30;
const DEFAULT_TITLE = "Multiplication Sheet";
const MAX_N_PROBLEMS = 100;

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

export function EquationWorksheetGeneratorSettings(
  props: EquationParameters & {
    callback: (newValues: EquationParameters) => void;
    nProblems: number;
    setNProblems: (n: number) => void;
    topic: QuestionTopic;
  }
) {
  return (
    <Stack flex={1}>
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
        <Captioned text={props.topic === "division" ? "Divisor" : "Multiplier"}>
          <UrsorInputField
            value={factor.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
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
            value={props.nProblems.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
              const leadingZeroRemovedString = onlyNumbersString?.slice(
                onlyNumbersString[0] === "0" ? 1 : 0
              );
              props.setNProblems(
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
  );
}

export default function EquationWorksheetGenerator() {
  const [topic, setTopic] = useState<QuestionTopic>("multiplication");
  const [questionType, setQuestionType] = useState<QuestionType>("equation");
  const [title, setTitle] = useState<string>("Multiplication sheet");
  const [nProblems, setNProblems] = useState<number>(10);

  const router = useRouter();

  //   const [equationPa, setQuestionParameterValues] = useState<
  //     QuestionTypeParameters | undefined
  //   >(undefined);

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

  const [factor, setFactor] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");

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
                  id: "equations",
                  value: "Equations",
                },
              ]}
              selected={["equations"]}
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
        <Stack flex={1}>
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
          <EquationWorksheet
            // ref={setPrintableRef}
            title={title}
            // orientation={orientation}
            topic={topic}
            {...questionParameterValues}
            // nDigits={nDigits}
            // number={factor}
            // multipliers={multipliers}
            // printDialogOpen={printDialogOpen}
            // printDialogCloseCallback={() => setPrintDialogOpen(false)}
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
  );
}

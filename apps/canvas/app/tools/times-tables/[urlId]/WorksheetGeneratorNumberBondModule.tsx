import ApiController from "@/app/api";
import EquationWorksheet from "@/app/worksheet/[id]/EquationWorksheet";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Captioned } from "./LandingPageContents";
import {
  CategorySelectionButton,
  EquationOrientation,
  WorksheetTopic,
  INumberBondWorksheetGeneratorSettings,
} from "../../../components/WorksheetGenerator";
import { PALETTE, UrsorInputField } from "ui";
import _, { fill } from "lodash";
import NumberBondWorksheet, {
  NUMBER_BOND_HORIZONTAL_N_COLUMNS,
  NUMBER_BOND_HORIZONTAL_ROWS_N,
  NUMBER_BOND_VERTICAL_N_COLUMNS,
  NUMBER_BOND_VERTICAL_ROWS_N,
} from "@/app/worksheet/[id]/NumberBondWorksheet";
import ShareIcon from "@/images/icons/ShareIcon.svg";
import { useUserContext } from "@/app/components/UserContext";
import { getZeroHandledNumber } from "./WorksheetGeneratorEquationModule";

const MAX_N_PROBLEMS = 100;

const LinearNumberBondConfigurationIcon = (props: {
  filled: number[];
  selected: boolean;
}) => (
  <Stack direction="row" spacing="4.5px">
    <Stack
      border={`1.6px solid ${
        props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[4]
      }`}
      height="4px"
      width="4px"
      borderRadius="100%"
      bgcolor={
        props.selected && props.filled.includes(0)
          ? PALETTE.secondary.purple[2]
          : props.filled.includes(0)
          ? PALETTE.secondary.grey[4]
          : undefined
      }
    />
    <Stack
      border={`1.6px solid ${
        props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[4]
      }`}
      height="4px"
      width="4px"
      borderRadius="100%"
      bgcolor={
        props.selected && props.filled.includes(1)
          ? PALETTE.secondary.purple[2]
          : props.filled.includes(1)
          ? PALETTE.secondary.grey[4]
          : undefined
      }
    />
    <Stack
      border={`1.6px solid ${
        props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[4]
      }`}
      height="4px"
      width="4px"
      borderRadius="100%"
      bgcolor={
        props.selected && props.filled.includes(2)
          ? PALETTE.secondary.purple[2]
          : props.filled.includes(2)
          ? PALETTE.secondary.grey[4]
          : undefined
      }
    />
  </Stack>
);

const TriangularNumberBondConfigurationIcon = (props: {
  filled: number[];
  selected: boolean;
}) => (
  <Stack spacing="4.5px" alignItems="center">
    <Stack
      border={`1.6px solid ${
        props.selected ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[4]
      }`}
      height="4px"
      width="4px"
      borderRadius="100%"
      bgcolor={
        props.selected && props.filled.includes(2)
          ? PALETTE.secondary.purple[2]
          : props.filled.includes(2)
          ? PALETTE.secondary.grey[4]
          : undefined
      }
    />
    <Stack direction="row" spacing="8px">
      <Stack
        border={`1.6px solid ${
          props.selected
            ? PALETTE.secondary.purple[2]
            : PALETTE.secondary.grey[4]
        }`}
        height="4px"
        width="4px"
        borderRadius="100%"
        bgcolor={
          props.selected && props.filled.includes(0)
            ? PALETTE.secondary.purple[2]
            : props.filled.includes(0)
            ? PALETTE.secondary.grey[4]
            : undefined
        }
      />
      <Stack
        border={`1.6px solid ${
          props.selected
            ? PALETTE.secondary.purple[2]
            : PALETTE.secondary.grey[4]
        }`}
        height="4px"
        width="4px"
        borderRadius="100%"
        bgcolor={
          props.selected && props.filled.includes(1)
            ? PALETTE.secondary.purple[2]
            : props.filled.includes(1)
            ? PALETTE.secondary.grey[4]
            : undefined
        }
      />
    </Stack>
  </Stack>
);

export function WorksheetGeneratorNumberBondModule(
  props: INumberBondWorksheetGeneratorSettings & {
    callback: (newPreviewWorksheet: React.ReactNode) => void;
    nProblems: number | undefined;
    setNProblems: (n: number) => void;
    setNPages: (n: number) => void;
    setCreationCallback: (cc: () => Promise<string>) => void;
    title: string;
    description?: string;
    topic: WorksheetTopic;
    pageIndex: number;
    regenerationCount: number;
    whiteFields?: boolean;
  }
) {
  const [sum, setSum] = useState<number | undefined>(3);
  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");
  const [empty, setEmpty] = useState<"sum" | "one" | "both">("sum");

  useEffect(() => {
    props.sum && setSum(props.sum);
  }, [props.sum]);
  useEffect(() => {
    props.empty && setEmpty(props.empty);
  }, [props.empty]);
  useEffect(() => {
    props.orientation && setOrientation(props.orientation);
  }, [props.orientation]);

  const [leftNumbers, setLeftNumbers] = useState<number[]>([]);
  useEffect(() => {
    const fullsetSize = (sum ?? 0) - 1;
    const fullSet = _.range(1, sum);
    if (fullSet.length === 0) {
      setLeftNumbers([]);
    } else {
      const fullSets = _(Math.floor((props.nProblems ?? 0) / fullsetSize))
        .range()
        .flatMap(() => _.shuffle(fullSet.slice()))
        .value();
      const partialSet = _.sampleSize(
        _.range(1, (sum ?? 0) - 1),
        (props.nProblems ?? 0) % fullsetSize
      );
      setLeftNumbers([...fullSets, ...partialSet]);
    }
  }, [props.nProblems, sum, empty, props.regenerationCount]);

  useEffect(
    () =>
      props.setNPages(
        1 +
          Math.ceil(
            ((props.nProblems ?? 0) -
              (orientation === "horizontal"
                ? NUMBER_BOND_HORIZONTAL_ROWS_N
                : NUMBER_BOND_VERTICAL_ROWS_N) *
                (orientation === "horizontal"
                  ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
                  : NUMBER_BOND_VERTICAL_N_COLUMNS)) /
              ((orientation === "horizontal"
                ? NUMBER_BOND_HORIZONTAL_ROWS_N
                : NUMBER_BOND_VERTICAL_ROWS_N) *
                (orientation === "horizontal"
                  ? NUMBER_BOND_HORIZONTAL_N_COLUMNS
                  : NUMBER_BOND_VERTICAL_N_COLUMNS))
          )
      ),
    [props.nProblems, orientation]
  );

  const [previewWorksheet, setPreviewWorksheet] = useState<
    React.ReactNode | undefined
  >(undefined);

  const router = useRouter();

  const userDetails = useUserContext();

  useEffect(() => {
    setPreviewWorksheet(
      <NumberBondWorksheet
        title={props.title}
        description={props.description}
        orientation={orientation}
        sum={sum}
        empty={empty}
        leftNumbers={leftNumbers}
        pageIndex={props.pageIndex}
      />
    );
    props.setCreationCallback(() =>
      ApiController.createNumberBondWorksheet(
        props.title,

        orientation,
        sum ?? 0,
        empty,
        leftNumbers,
        props.description,
        userDetails.user?.id
      )
        // .then((ws) => {
        //   router.push(`/worksheet/${ws.id}`);
        //   return ws;
        // })
        .then((ws) => ws.id)
    );
  }, [
    props.title,
    props.description,
    sum,
    props.pageIndex,
    orientation,
    empty,
    leftNumbers,
    userDetails.user?.id,
  ]);
  useEffect(() => {
    previewWorksheet && props.callback(previewWorksheet);
  }, [previewWorksheet]);

  return (
    <Stack flex={1} spacing="16px">
      <Stack direction="row" spacing="20px">
        <Captioned text="Orientation">
          <Stack direction="row" spacing="10px">
            <CategorySelectionButton
              selected={orientation === "horizontal" && empty === "sum"}
              onClick={() => {
                setOrientation("horizontal");
                setEmpty("sum");
              }}
            >
              <LinearNumberBondConfigurationIcon
                filled={[0, 1]}
                selected={orientation === "horizontal" && empty === "sum"}
              />
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "horizontal" && empty === "one"}
              onClick={() => {
                setOrientation("horizontal");
                setEmpty("one");
              }}
            >
              <LinearNumberBondConfigurationIcon
                filled={[0, 2]}
                selected={orientation === "horizontal" && empty === "one"}
              />
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "horizontal" && empty === "both"}
              onClick={() => {
                setOrientation("horizontal");
                setEmpty("both");
              }}
            >
              <LinearNumberBondConfigurationIcon
                filled={[2]}
                selected={orientation === "horizontal" && empty === "both"}
              />
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "vertical" && empty === "sum"}
              onClick={() => {
                setOrientation("vertical");
                setEmpty("sum");
              }}
            >
              <TriangularNumberBondConfigurationIcon
                filled={[0, 1]}
                selected={orientation === "vertical" && empty === "sum"}
              />
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "vertical" && empty === "one"}
              onClick={() => {
                setOrientation("vertical");
                setEmpty("one");
              }}
            >
              <TriangularNumberBondConfigurationIcon
                filled={[0, 2]}
                selected={orientation === "vertical" && empty === "one"}
              />
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "vertical" && empty === "both"}
              onClick={() => {
                setOrientation("vertical");
                setEmpty("both");
              }}
            >
              <TriangularNumberBondConfigurationIcon
                filled={[2]}
                selected={orientation === "vertical" && empty === "both"}
              />
            </CategorySelectionButton>
          </Stack>
        </Captioned>
      </Stack>
      <Stack direction="row" spacing="20px">
        <Captioned text="Bonded number">
          <UrsorInputField
            value={sum?.toString() ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSum(getZeroHandledNumber(event.target.value));
            }}
            placeholder="Enter number"
            width="100%"
            leftAlign
            boldValue
            height="44px"
            backgroundColor={props.whiteFields ? "rgb(255,255,255)" : undefined}
          />
        </Captioned>
        <Captioned text="Number of questions">
          <UrsorInputField
            value={props.nProblems?.toString() ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const x = getZeroHandledNumber(event.target.value);
              props.setNProblems(Math.min(x ?? 0, MAX_N_PROBLEMS));
            }}
            placeholder="Enter number"
            width="100%"
            leftAlign
            boldValue
            height="44px"
            backgroundColor={props.whiteFields ? "rgb(255,255,255)" : undefined}
          />
        </Captioned>
      </Stack>
    </Stack>
  );
}

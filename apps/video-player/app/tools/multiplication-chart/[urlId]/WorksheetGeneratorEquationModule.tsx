import ApiController from "@/app/api";
import EquationWorksheet from "@/app/worksheet/[id]/EquationWorksheet";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Captioned } from "./LandingPageContents";
import {
  CategorySelectionButton,
  EquationOrientation,
  IEquationWorksheetSettings,
  IWorksheet,
  WorksheetTopic,
} from "../../../components/WorksheetGenerator";
import { UrsorInputField } from "ui";
import _ from "lodash";
import { useUserContext } from "@/app/components/UserContext";

const MAX_N_PROBLEMS = 100;

export const getZeroHandledNumber = (n: string) => {
  if (!n) {
    return undefined;
  } else {
    const onlyNumbersString = n.match(/\d+/)?.[0];
    const leadingZeroRemovedString =
      onlyNumbersString === "0"
        ? "0"
        : onlyNumbersString?.slice(onlyNumbersString[0] === "0" ? 1 : 0);
    return !leadingZeroRemovedString
      ? undefined
      : parseInt(leadingZeroRemovedString);
  }
};

export function WorksheetGeneratorEquationModule(
  props: IEquationWorksheetSettings & {
    id?: string;
    nDigits: number;
    callback: (newPreviewWorksheet: React.ReactNode) => void;
    nProblems: number | undefined;
    setNProblems: (n: number | undefined) => void;
    setNPages: (n: number) => void;
    setCreationCallback: (cc: () => Promise<string>) => void;
    setUpdateCallback: (cc: () => Promise<string>) => void;
    title: string;
    description: string;
    topic: WorksheetTopic;
    pageIndex: number;
    regenerationCount: number;
    whiteFields?: boolean;
    pairs?: IWorksheet["values"];
  }
) {
  const [changedValueAffectingSettings, setChangedValueAffectingSettings] =
    useState<boolean>(false);

  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");
  const [factor, setFactor] = useState<number | undefined>(1);
  const [nDigits, setNDigits] = useState<number>(1);

  const [max, setMax] = useState<number | undefined>(1);

  const [randomize, setRandomize] = useState<boolean>(false);

  useEffect(
    () => props.orientation && setOrientation(props.orientation),
    [props.orientation]
  );
  useEffect(() => {
    props.nDigits && setNDigits(props.nDigits);
  }, [props.nDigits]);
  useEffect(() => {
    props.factor && setFactor(props.factor);
  }, [props.factor]);
  useEffect(() => {
    props.max && setMax(props.max);
  }, [props.max]);
  useEffect(() => {
    props.random && setRandomize(props.random);
  }, [props.random]);

  const [pairs, setPairs] = useState<[number, number][]>([]);
  // useEffect(() => {
  //   props.pairs && setPairs(props.pairs);
  // }, [props.pairs]);
  useEffect(() => {
    if (props.pairs && !changedValueAffectingSettings) {
      setPairs(props.pairs);
      return;
    }
    if (props.topic === "addition") {
      const maxx = max || 1;
      const fullAnswerSets = _(Math.floor((props.nProblems ?? 0) / maxx))
        .range()
        .flatMap(() => _.shuffle(_.range(maxx)))
        .value();
      const partialAnswerSet = _.sampleSize(
        _.range(maxx),
        (props.nProblems ?? 0) % maxx
      );
      setPairs(
        [...fullAnswerSets, ...partialAnswerSet].map((x) => {
          const value = randomize ? x : factor || 1;
          return [value, _.sample(_.range(maxx - value + 1)) || 1];
        })
      );
    } else if (props.topic === "subtraction") {
      const maxx = (max ?? 0) + 1;
      const fullSets = _(Math.floor((props.nProblems ?? 0) / maxx))
        .range()
        .flatMap(() => _.shuffle(_.range(maxx)))
        .value();
      const partialSet = _.sampleSize(
        _.range(maxx),
        (props.nProblems ?? 0) % maxx
      );
      setPairs(
        [...fullSets, ...partialSet].map((x) => [
          x,
          (randomize ? _.random(maxx) : factor) ?? 0,
        ])
      );
    } else {
      const fullsetSize = Math.pow(10, nDigits) + 1;
      const fullSets = _(Math.floor((props.nProblems ?? 0) / fullsetSize))
        .range()
        .flatMap(() => _.shuffle(_.range(fullsetSize)))
        .value();
      const partialSet = _.sampleSize(
        _.range(fullsetSize),
        (props.nProblems ?? 0) % fullsetSize
      );
      setPairs(
        [...fullSets, ...partialSet].map((x) => [
          x,
          (randomize ? _.random(fullsetSize) : factor) || 1,
        ])
      );
    }
  }, [
    nDigits,
    factor,
    props.nProblems,
    props.regenerationCount,
    props.topic,
    randomize,
    max,
  ]);

  useEffect(
    () =>
      props.setNPages(
        1 +
          Math.ceil(
            ((props.nProblems ?? 0) -
              (props.topic === "division"
                ? 12
                : orientation === "horizontal"
                ? 16
                : 20)) /
              (props.topic === "division"
                ? 12
                : orientation === "horizontal"
                ? 20
                : 24)
          )
      ),
    [props.nProblems, orientation, props.topic]
  );

  const [previewWorksheet, setPreviewWorksheet] = useState<
    React.ReactNode | undefined
  >(undefined);

  const router = useRouter();

  const userDetails = useUserContext();

  // useEffect(() => {
  //   setPreviewWorksheet(
  //     <EquationWorksheet
  //       title={props.title}
  //       description={props.description}
  //       orientation={orientation}
  //       topic={props.topic}
  //       nDigits={nDigits}
  //       pairs={pairs}
  //       pageIndex={props.pageIndex}
  //     />
  //   );
  //   props.setCreationCallback(() =>
  //     ApiController.createEquationWorksheet(
  //       props.title,
  //       orientation,
  //       props.topic,
  //       max || 1,
  //       randomize,
  //       pairs,
  //       factor,
  //       props.description,
  //       userDetails?.user?.id
  //     ).then((ws) => ws.id)
  //   );
  //   props.id &&
  //     props.setUpdateCallback(() =>
  //       ApiController.updateEquationWorksheet(
  //         props.id!,
  //         props.title,
  //         orientation,
  //         props.topic,
  //         max || 1,
  //         randomize,
  //         pairs,
  //         factor,
  //         props.description
  //       )
  //     );
  // }, [
  //   props.title,
  //   props.description,
  //   props.topic,
  //   nDigits,
  //   factor,
  //   pairs,
  //   max,
  //   randomize,
  //   props.pageIndex,
  //   orientation,
  //   userDetails.user?.id,
  // ]);
  useEffect(() => {
    previewWorksheet && props.callback(previewWorksheet);
  }, [previewWorksheet]);

  return (
    <Stack flex={1} spacing="18px">
      <Stack direction="row" spacing="20px">
        <Captioned
          //text={props.topic === "division" ? "Divisor" : "Multiplier"}
          checkbox={{
            text:
              props.topic === "addition"
                ? "Add a specific number?"
                : props.topic === "subtraction"
                ? "Subtract a specific number?"
                : `Set first ${
                    props.topic === "division" ? "divisor" : "multiplier"
                  }?`,
            on: !randomize,
            callback: () => setRandomize(!randomize),
          }}
        >
          <Stack
            sx={{
              opacity: randomize ? 0.45 : 1,
              pointerEvents: randomize ? "none" : undefined,
            }}
          >
            <UrsorInputField
              value={factor?.toString() ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFactor(getZeroHandledNumber(event.target.value));
                setChangedValueAffectingSettings(true);
              }}
              placeholder="Enter number"
              leftAlign
              boldValue
              backgroundColor={
                props.whiteFields ? "rgb(255,255,255)" : undefined
              }
              height="44px"
            />
          </Stack>
        </Captioned>
        {props.topic === "addition" || props.topic === "subtraction" ? (
          <Captioned
            text={
              props.topic === "addition"
                ? "Add up to a maximum of..."
                : "Subtract from a maximum of"
            }
          >
            <UrsorInputField
              value={max?.toString() ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMax(getZeroHandledNumber(event.target.value));
                setChangedValueAffectingSettings(true);
              }}
              placeholder="Enter number"
              leftAlign
              boldValue
              backgroundColor={
                props.whiteFields ? "rgb(255,255,255)" : undefined
              }
              height="44px"
            />
          </Captioned>
        ) : (
          <Captioned text="Number of digits">
            <Stack direction="row" spacing="10px">
              <CategorySelectionButton
                selected={nDigits === 1}
                onClick={() => {
                  setNDigits(1);
                  setChangedValueAffectingSettings(true);
                }}
              >
                1
              </CategorySelectionButton>
              <CategorySelectionButton
                selected={nDigits === 2}
                onClick={() => {
                  setNDigits(2);
                  setChangedValueAffectingSettings(true);
                }}
              >
                2
              </CategorySelectionButton>
              <CategorySelectionButton
                selected={nDigits === 3}
                onClick={() => {
                  setNDigits(3);
                  setChangedValueAffectingSettings(true);
                }}
              >
                3
              </CategorySelectionButton>
            </Stack>
          </Captioned>
        )}
      </Stack>
      <Stack direction="row" spacing="20px">
        <Captioned text="Number of questions">
          <UrsorInputField
            value={props.nProblems?.toString() ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const x = getZeroHandledNumber(event.target.value);
              props.setNProblems(
                _.isNumber(x) ? Math.min(x ?? 0, MAX_N_PROBLEMS) : undefined
              );
              setChangedValueAffectingSettings(true);
            }}
            placeholder="Enter number"
            width="100%"
            height="44px"
            leftAlign
            boldValue
            backgroundColor={props.whiteFields ? "rgb(255,255,255)" : undefined}
          />
        </Captioned>
        <Captioned text="Question format">
          <Stack direction="row" spacing="10px">
            <CategorySelectionButton
              selected={orientation === "horizontal"}
              onClick={() => {
                setOrientation("horizontal");
              }}
            >
              Short
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "vertical"}
              onClick={() => setOrientation("vertical")}
            >
              Long
            </CategorySelectionButton>
          </Stack>
        </Captioned>
      </Stack>
    </Stack>
  );
}

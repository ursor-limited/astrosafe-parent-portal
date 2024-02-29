import ApiController from "@/app/api";
import EquationWorksheet from "@/app/worksheet/[id]/EquationWorksheet";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Captioned } from "./LandingPageContents";
import {
  CategorySelectionButton,
  DEFAULT_TITLE,
  EquationOrientation,
  WorksheetTopic,
  IEquationWorksheetGeneratorSettings,
} from "./WorksheetGenerator";
import { UrsorInputField } from "ui";
import _ from "lodash";

const MAX_N_PROBLEMS = 100;

export function WorksheetGeneratorEquationModule(
  props: IEquationWorksheetGeneratorSettings & {
    nDigits: number;
    callback: (newPreviewWorksheet: React.ReactNode) => void;
    nProblems: number;
    setNProblems: (n: number) => void;
    setNPages: (n: number) => void;
    setCreationCallback: (cc: () => void) => void;
    title: string;
    topic: WorksheetTopic;
    pageIndex: number;
    regenerationCount: number;
    whiteFields?: boolean;
  }
) {
  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");
  const [factor, setFactor] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);

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

  const [multipliers, setMultipliers] = useState<number[]>([]);
  useEffect(() => {
    const fullsetSize = Math.pow(10, nDigits);
    const fullSets = _(Math.floor(props.nProblems / fullsetSize))
      .range()
      .flatMap(() => _.shuffle(_.range(fullsetSize + 1)))
      .value();
    const partialSet = _.sampleSize(
      _.range(fullsetSize + 1),
      props.nProblems % fullsetSize
    );
    setMultipliers([...fullSets, ...partialSet]);
  }, [nDigits, props.nProblems, props.regenerationCount]);

  useEffect(
    () =>
      props.setNPages(
        1 +
          Math.ceil(
            (props.nProblems -
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

  useEffect(() => {
    setPreviewWorksheet(
      <EquationWorksheet
        title={props.title}
        orientation={orientation}
        topic={props.topic}
        nDigits={nDigits}
        factor={factor}
        multipliers={multipliers}
        pageIndex={props.pageIndex}
      />
    );
    props.setCreationCallback(() =>
      ApiController.createEquationWorksheet(
        props.title || DEFAULT_TITLE,
        orientation,
        props.topic,
        factor,
        multipliers
      ).then((ws) => router.push(`/worksheet/${ws.id}`))
    );
  }, [
    props.title,
    props.topic,
    nDigits,
    factor,
    multipliers,
    props.pageIndex,
    orientation,
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
            value={factor === 0 ? "" : factor.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value || event.target.value === "0") {
                setFactor(0);
              } else {
                const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
                const leadingZeroRemovedString = onlyNumbersString?.slice(
                  onlyNumbersString[0] === "0" ? 1 : 0
                );
                setFactor(parseInt(leadingZeroRemovedString ?? "0"));
              }
            }}
            placeholder="Multiplier"
            leftAlign
            boldValue
            backgroundColor={props.whiteFields ? "rgb(255,255,255)" : undefined}
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
            value={props.nProblems === 0 ? "" : props.nProblems.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value) {
                props.setNProblems(0);
              } else {
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
              }
            }}
            placeholder="Number of digits"
            width="100%"
            leftAlign
            boldValue
            backgroundColor={props.whiteFields ? "rgb(255,255,255)" : undefined}
          />
        </Captioned>
      </Stack>
    </Stack>
  );
}

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
} from "./WorksheetGenerator";
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

const MAX_N_PROBLEMS = 100;

export function WorksheetGeneratorNumberBondModule(
  props: INumberBondWorksheetGeneratorSettings & {
    callback: (newPreviewWorksheet: React.ReactNode) => void;
    nProblems: number;
    setNProblems: (n: number) => void;
    setNPages: (n: number) => void;
    setCreationCallback: (cc: () => Promise<string>) => void;
    title: string;
    topic: WorksheetTopic;
    pageIndex: number;
    regenerationCount: number;
    whiteFields?: boolean;
  }
) {
  const [result, setResult] = useState<number>(3);
  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");
  const [both, setBoth] = useState<boolean>(false);

  useEffect(() => {
    props.result && setResult(props.result);
  }, [props.result]);
  useEffect(() => {
    props.both && setBoth(props.both);
  }, [props.both]);
  useEffect(() => {
    props.orientation && setOrientation(props.orientation);
  }, [props.orientation]);

  const [pairs, setPairs] = useState<number[][]>([]);
  useEffect(() => {
    const fullsetSize = result - 1;
    const fullSet = _.range(1, result).map((x) => [x, result - x]);
    if (fullSet.length === 0) {
      setPairs([]);
    } else {
      const fullSets = _(Math.floor(props.nProblems / fullsetSize))
        .range()
        .flatMap(() => _.shuffle(fullSet.slice()))
        .value();
      const partialSet = _.sampleSize(
        _.range(1, result - 1).map((x) => [x, result - x]),
        props.nProblems % fullsetSize
      );
      setPairs([...fullSets, ...partialSet]);
    }
  }, [props.nProblems, result, props.regenerationCount]);

  useEffect(
    () =>
      props.setNPages(
        1 +
          Math.ceil(
            (props.nProblems -
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
        orientation={orientation}
        result={result}
        pairs={pairs}
        both={both}
        pageIndex={props.pageIndex}
      />
    );
    props.setCreationCallback(() =>
      ApiController.createNumberBondWorksheet(
        props.title,
        orientation,
        result,
        pairs,
        userDetails.user?.id
      )
        .then((ws) => {
          router.push(`/worksheet/${ws.id}`);
          return ws;
        })
        .then((ws) => ws.id)
    );
  }, [
    props.title,
    result,
    props.pageIndex,
    orientation,
    pairs,
    both,
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
              selected={orientation === "horizontal"}
              onClick={() => setOrientation("horizontal")}
            >
              {/* <Stack
                sx={{
                  transform: "translateY(4px)",
                  svg: {
                    path: {
                      fill:
                        orientation === "horizontal"
                          ? PALETTE.secondary.purple[2]
                          : undefined,
                    },
                  },
                }}
              >
                <ThreeDotsIcon height="16px" />
              </Stack> */}
              <Stack direction="row" spacing="3px">
                <Stack
                  border="1.6px solid"
                  height="3.4px"
                  width="3.4px"
                  borderRadius="100%"
                />
                <Stack
                  border="1.6px solid"
                  height="3.4px"
                  width="3.4px"
                  borderRadius="100%"
                />
                <Stack
                  border="1.6px solid"
                  height="3.4px"
                  width="3.4px"
                  borderRadius="100%"
                />
              </Stack>
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={orientation === "vertical"}
              onClick={() => setOrientation("vertical")}
            >
              <Stack
                sx={{
                  //transform: "translateY(4px)",
                  svg: {
                    transform: "rotate(90deg)",
                    path: {
                      fill:
                        orientation === "vertical"
                          ? PALETTE.secondary.purple[2]
                          : undefined,
                    },
                  },
                }}
              >
                <ShareIcon height="16px" width="16px" />
              </Stack>
            </CategorySelectionButton>
          </Stack>
        </Captioned>
        <Captioned text="Sum">
          <UrsorInputField
            value={result === 0 ? "" : result.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.value || event.target.value === "0") {
                setResult(0);
              } else {
                const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
                const leadingZeroRemovedString = onlyNumbersString?.slice(
                  onlyNumbersString[0] === "0" ? 1 : 0
                );
                setResult(parseInt(leadingZeroRemovedString ?? "0"));
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
        <Captioned text="Fill in">
          <Stack direction="row" spacing="10px">
            <CategorySelectionButton
              selected={!both}
              onClick={() => setBoth(false)}
            >
              {/* <Stack direction="row" spacing="5px">
                <Typography bold sx={{ opacity: 0.4 }}>
                  6
                </Typography>
                <Typography bold sx={{ opacity: 0.4 }}>
                  +
                </Typography>
                <Typography bold>_</Typography>
                <Typography bold sx={{ opacity: 0.4 }}>
                  =
                </Typography>
                <Typography bold sx={{ opacity: 0.4 }}>
                  9
                </Typography>
              </Stack> */}
              One
            </CategorySelectionButton>
            <CategorySelectionButton
              selected={both}
              onClick={() => setBoth(true)}
            >
              {/* <Stack direction="row" spacing="5px">
                <Typography bold>_</Typography>
                <Typography bold sx={{ opacity: 0.4 }}>
                  +
                </Typography>
                <Typography bold>_</Typography>
                <Typography bold sx={{ opacity: 0.4 }}>
                  =
                </Typography>
                <Typography bold sx={{ opacity: 0.4 }}>
                  9
                </Typography>
              </Stack> */}
              Both
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

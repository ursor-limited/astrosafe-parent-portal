import ApiController from "@/app/api";
import EquationWorksheet, {
  EquationOrientation,
  EquationParameters,
  QuestionTopic,
} from "@/app/worksheet/[id]/EquationWorksheet";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Captioned } from "./LandingPageContents";
import { CategorySelectionButton } from "./WorksheetGenerator";
import { PALETTE, Typography, UrsorInputField } from "ui";
import _ from "lodash";
import NumberBondWorksheet, {
  FIRST_PAGE_ROWS_N,
  NumberBondParameters,
  OTHER_PAGES_ROWS_N,
} from "@/app/worksheet/[id]/NumberBondWorksheet";
import ThreeDotsIcon from "@/images/icons/KebabHorizontal.svg";
import ShareIcon from "@/images/icons/ShareIcon.svg";

const DEFAULT_TITLE = "Problem sheet";
const MAX_N_PROBLEMS = 100;

export function WorksheetGeneratorNumberBondModule(
  props: NumberBondParameters & {
    callback: (newPreviewWorksheet: React.ReactNode) => void;
    nProblems: number;
    setNProblems: (n: number) => void;
    setNPages: (n: number) => void;
    setCreationCallback: (cc: () => void) => void;
    title: string;
    topic: QuestionTopic;
    pageIndex: number;
  }
) {
  const [result, setResult] = useState<number>(3);

  useEffect(() => {
    props.result && setResult(props.result);
  }, [props.result]);

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
  }, [props.nProblems, result]);

  useEffect(
    () =>
      props.setNPages(
        1 +
          Math.ceil((props.nProblems - FIRST_PAGE_ROWS_N) / OTHER_PAGES_ROWS_N)
      ),
    [props.nProblems]
  );

  const [previewWorksheet, setPreviewWorksheet] = useState<
    React.ReactNode | undefined
  >(undefined);

  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");
  const [fillIn, setFillIn] = useState<1 | 2>(1);

  const router = useRouter();

  useEffect(() => {
    setPreviewWorksheet(
      <NumberBondWorksheet
        title={props.title}
        orientation={orientation}
        result={result}
        pairs={pairs}
        pageIndex={props.pageIndex}
      />
    );
    props.setCreationCallback(() =>
      ApiController.createNumberBondWorksheet(
        props.title || DEFAULT_TITLE,
        orientation,
        result,
        pairs
      ).then((ws) => router.push(`/worksheet/${ws.id}`))
    );
  }, [props.title, result, props.pageIndex, orientation, pairs]);
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
            value={result.toString()}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
              const leadingZeroRemovedString = onlyNumbersString?.slice(
                onlyNumbersString[0] === "0" ? 1 : 0
              );
              setResult(parseInt(leadingZeroRemovedString ?? "0"));
            }}
            placeholder="Multiplier"
            leftAlign
            boldValue
            backgroundColor="rgb(255,255,255)"
          />
        </Captioned>
      </Stack>
      <Stack direction="row" spacing="20px">
        <Captioned text="Fill in">
          <Stack direction="row" spacing="10px">
            <CategorySelectionButton
              selected={fillIn === 1}
              onClick={() => setFillIn(1)}
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
              selected={fillIn === 2}
              onClick={() => setFillIn(2)}
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

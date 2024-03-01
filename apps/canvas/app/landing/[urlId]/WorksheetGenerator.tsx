import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Captioned } from "./LandingPageContents";
import UrsorSelect from "@/app/components/UrsorSelect";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import PageSelector from "./PageSelector";
import PencilIcon from "@/images/icons/Pencil.svg";
import SyncIcon from "@/images/icons/Sync.svg";
import { WorksheetGeneratorEquationModule } from "./WorksheetGeneratorEquationModule";
import { WorksheetGeneratorNumberBondModule } from "./WorksheetGeneratorNumberBondModule";

export type EquationOrientation = "horizontal" | "vertical";

export type IWorksheet = {
  id: string;
  worksheetId: WorksheetId;
  title: string;
  parameters: IWorksheetParameters;
  createdAt: string;
};

export type IWorksheetParameters =
  | IEquationWorksheetParameters
  | INumberBondWorksheetParameters;

export type ISpecificWorksheetGeneratorSettings =
  | IEquationWorksheetGeneratorSettings
  | INumberBondWorksheetGeneratorSettings;

export type WorksheetId = "equation" | "numberBond";

export const WORKSHEET_TOPIC_WORKSHEET_IDS: Record<
  WorksheetTopic,
  WorksheetId[]
> = {
  addition: ["equation", "numberBond"],
  subtraction: ["equation"],
  multiplication: ["equation"],
  division: ["equation"],
};

export const WORKSHEET_ID_DISPLAY_NAMES: Record<WorksheetId, string> = {
  equation: "Equation",
  numberBond: "Number bond",
};

export type WorksheetTopic =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export interface IEquationWorksheetParameters {
  topic: WorksheetTopic;
  orientation: EquationOrientation;
  factor: number;
  multipliers: number[];
}

export type IEquationWorksheetGeneratorSettings = Omit<
  IEquationWorksheetParameters,
  "multipliers"
> & { nDigits: number };

export interface INumberBondWorksheetParameters {
  orientation: EquationOrientation;
  result: number;
  both: boolean;
  pairs: number[][];
}

export type INumberBondWorksheetGeneratorSettings = Omit<
  INumberBondWorksheetParameters,
  "pairs"
>;

const RefreshButton = (props: { onClick: () => void }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="37.5px"
      width="37.5px"
      minHeight="37.5px"
      minWidth="37.5px"
      borderRadius="100%"
      border={`2px solid ${
        hovering ? PALETTE.secondary.purple[3] : PALETTE.secondary.purple[2]
      }`}
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: "pointer",
        transition: "0.2s",
        svg: {
          path: {
            fill: hovering
              ? PALETTE.secondary.purple[3]
              : PALETTE.secondary.purple[2],
          },
        },
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      onClick={props.onClick}
    >
      <SyncIcon height="20px" width="20px" />
    </Stack>
  );
};

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
  worksheetId?: IWorksheet["worksheetId"];
  title?: IWorksheet["title"];
  nProblems?: number;
  topic?: WorksheetTopic;
  specificSettings?: ISpecificWorksheetGeneratorSettings;
  noBackground?: boolean;
  whiteFields?: boolean;
}) {
  const [topic, setTopic] = useState<WorksheetTopic>("addition");
  const [worksheetId, setWorksheetId] = useState<WorksheetId>("equation");
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [nProblems, setNProblems] = useState<number>(10);

  useEffect(() => props.topic && setTopic(props.topic), [props.topic]);
  useEffect(
    () => props.worksheetId && setWorksheetId(props.worksheetId),
    [props.worksheetId]
  );
  useEffect(() => {
    props.title && setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    props.nProblems && setNProblems(props.nProblems);
  }, [props.nProblems]);

  useEffect(() => {
    !WORKSHEET_TOPIC_WORKSHEET_IDS[topic].includes(worksheetId) &&
      setWorksheetId(WORKSHEET_TOPIC_WORKSHEET_IDS[topic]?.[0]);
  }, [topic]);

  const [specificSettings, setSpecificSettings] = useState<
    ISpecificWorksheetGeneratorSettings | undefined
  >(undefined);
  useEffect(
    () => setSpecificSettings(props.specificSettings),
    [props.specificSettings]
  );

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [nPages, setNPages] = useState<number>(0);
  useEffect(() => {
    nPages > 0 && selectedPageIndex > nPages - 1 && setSelectedPageIndex(0);
  }, [selectedPageIndex, nPages]);

  const [previewWorksheet, setPreviewWorksheet] = useState<
    React.ReactNode | undefined
  >(undefined);

  const [creationCallback, setCreationCallback] = useState<() => void>(
    () => null
  );

  const [regenerationCount, setRegenerationCount] = useState<number>(0);

  return (
    <Stack
      borderRadius="20px"
      bgcolor={props.noBackground ? undefined : PALETTE.secondary.grey[1]}
      p={props.noBackground ? undefined : "42px"}
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
            backgroundColor={props.whiteFields ? "rgb(255,255,255)" : undefined}
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
                  value: "x Multiplication",
                },
                {
                  id: "division",
                  value: "/ Division",
                },
                {
                  id: "addition",
                  value: "+ Addition",
                },
                {
                  id: "subtraction",
                  value: "- Subtraction",
                },
              ]}
              selected={[topic]}
              callback={(t: string) => setTopic(t as WorksheetTopic)}
              width="100%"
            />
          </Captioned>
          <Captioned text="Question type">
            <UrsorSelect
              white={props.whiteFields}
              items={WORKSHEET_TOPIC_WORKSHEET_IDS[topic].map((t) => ({
                id: t,
                value: WORKSHEET_ID_DISPLAY_NAMES[t],
              }))}
              selected={[worksheetId]}
              callback={(wid: string) => {
                setWorksheetId(wid as WorksheetId);
              }}
              width="100%"
              zIndex={999999999}
            />
          </Captioned>
        </Stack>
        <Stack height="85px" justifyContent="center">
          <Stack
            height="2px"
            width="100%"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        {worksheetId === "equation" ? (
          <WorksheetGeneratorEquationModule
            {...(specificSettings as IEquationWorksheetGeneratorSettings)}
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
            regenerationCount={regenerationCount}
            whiteFields={props.whiteFields}
          />
        ) : worksheetId === "numberBond" ? (
          <WorksheetGeneratorNumberBondModule
            {...(specificSettings as INumberBondWorksheetGeneratorSettings)}
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
            regenerationCount={regenerationCount}
            whiteFields={props.whiteFields}
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
          sx={{ transform: "scale(0.3)", transformOrigin: "top left" }}
          position="absolute"
          top={0}
          left={0}
          boxShadow="0 0 60px rgba(0,0,0,0.07)"
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
          <Stack direction="row" spacing="12px">
            <RefreshButton
              onClick={() => setRegenerationCount(regenerationCount + 1)}
            />
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
    </Stack>
  );
}

"use client";

import { Stack, alpha } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { Captioned } from "../tools/times-tables/[urlId]/LandingPageContents";
import UrsorSelect from "@/app/components/UrsorSelect";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import PageSelector from "../tools/times-tables/[urlId]/PageSelector";
import PencilIcon from "@/images/icons/Pencil.svg";
import SyncIcon from "@/images/icons/Sync.svg";
import { WorksheetGeneratorEquationModule } from "../tools/times-tables/[urlId]/WorksheetGeneratorEquationModule";
import { WorksheetGeneratorNumberBondModule } from "../tools/times-tables/[urlId]/WorksheetGeneratorNumberBondModule";
import { useLocalStorage } from "usehooks-ts";
import { useUserContext } from "@/app/components/UserContext";
import { useRouter } from "next/navigation";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

export type EquationOrientation = "horizontal" | "vertical";

export type IWorksheet = {
  id: string;
  worksheetId: WorksheetId;
  title: string;
  description: string;
  parameters: IWorksheetParameters;
  createdAt: string;
  creatorId: string;
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
  pairs: [number, number][];
}

export type IEquationWorksheetGeneratorSettings = Omit<
  IEquationWorksheetParameters,
  "pairs"
> & { nDigits: number; factor: number };

export interface INumberBondWorksheetParameters {
  orientation: EquationOrientation;
  sum: number;
  leftNumbers: number[];
  empty: "sum" | "one" | "both";
}

export type INumberBondWorksheetGeneratorSettings = Omit<
  INumberBondWorksheetParameters,
  "leftNumbers"
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
const DESCRIPTION_CHARACTER_LIMIT = 180;

export const CategorySelectionButton = (props: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      flex={1}
      height="44px"
      boxSizing="border-box"
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgb(255,255,255)"
      border={`2px solid ${
        props.selected
          ? PALETTE.secondary.purple[2]
          : hovering
          ? PALETTE.secondary.purple[1]
          : PALETTE.secondary.grey[2]
      }`}
      //boxShadow={"0 0 24px rgba(0,0,0,0.06)"}
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
            : PALETTE.secondary.grey[5]
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
  noPadding?: boolean;
  landOnWorksheetPage?: boolean;
  mobile?: boolean;
  fadeIn?: boolean;
  glow?: boolean;
}) {
  const [topic, setTopic] = useState<WorksheetTopic>("addition");
  const [worksheetId, setWorksheetId] = useState<WorksheetId>("equation");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nProblems, setNProblems] = useState<number | undefined>(10);

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

  const [creationCallback, setCreationCallback] = useState<
    null | (() => Promise<string>)
  >(null);

  const [regenerationCount, setRegenerationCount] = useState<number>(0);

  const [signupPromptDialogOpen, setSignupPromptDialogOpen] =
    useState<boolean>(false);

  const [freeWorksheetCreationCount, setFreeWorksheetCreationCount] =
    useLocalStorage<number>("freeWorksheetCreationCount", 0);

  const [freeWorksheetIds, setFreeWorksheetIds] = useLocalStorage<string[]>(
    "freeWorksheetIds",
    []
  );

  const userDetails = useUserContext();

  const router = useRouter();

  const submitCreation = () => {
    creationCallback?.().then((id) => {
      if (!userDetails.user) {
        setFreeWorksheetCreationCount(freeWorksheetCreationCount + 1);
        setFreeWorksheetIds([...freeWorksheetIds, id]);
      }
      router.push(
        // !props.landOnWorksheetPage && userDetails.user
        //   ? "/dashboard"
        //   : `/tools/worksheet/${id}`
        "/dashboard"
      );
    });
  };

  return (
    <UrsorFadeIn duration={props.fadeIn ? 1000 : 0}>
      <Stack
        borderRadius="20px"
        bgcolor="rgb(255,255,255)"
        p={props.noPadding ? undefined : props.mobile ? "26px" : "42px"}
        direction="row"
        spacing="40px"
        boxShadow={
          props.glow
            ? `0 70px 86px ${alpha("rgb(186, 91, 222)", 0.3)}`
            : undefined
        }
      >
        <Stack width={props.mobile ? undefined : "480px"} spacing="18px">
          <Captioned text="Worksheet title">
            <UrsorInputField
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value.length < TITLE_CHARACTER_LIMIT &&
                setTitle(event.target.value)
              }
              placeholder="Enter number"
              width="100%"
              leftAlign
              boldValue
              height="44px"
            />
          </Captioned>
          <Captioned text="Description">
            <UrsorInputField
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value.length < DESCRIPTION_CHARACTER_LIMIT &&
                setDescription(event.target.value)
              }
              placeholder="Enter number"
              width="100%"
              leftAlign
              boldValue
              height="44px"
            />
          </Captioned>
          <Stack height="28px" justifyContent="center">
            <Stack
              height="2px"
              width="100%"
              bgcolor={PALETTE.secondary.grey[2]}
            />
          </Stack>
          <Stack direction="row" spacing="20px">
            <Captioned text="Worksheet topic">
              <UrsorSelect
                items={[
                  {
                    id: "multiplication",
                    value: "Multiplication (x)",
                  },
                  {
                    id: "division",
                    value: "Division (÷)",
                  },
                  {
                    id: "addition",
                    value: "Addition (+)",
                  },
                  {
                    id: "subtraction",
                    value: "Subtraction (-)",
                  },
                ]}
                selected={[topic]}
                callback={(t: string) => setTopic(t as WorksheetTopic)}
                width="100%"
                zIndex={999999999}
                leftAlignPopover
              />
            </Captioned>
            <Captioned text="Question type">
              <UrsorSelect
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
                leftAlignPopover
              />
            </Captioned>
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
              description={description}
              topic={topic}
              pageIndex={selectedPageIndex}
              regenerationCount={regenerationCount}
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
              description={description}
              topic={topic}
              pageIndex={selectedPageIndex}
              regenerationCount={regenerationCount}
            />
          ) : null}
          {props.mobile ? (
            <UrsorButton
              onClick={submitCreation}
              dark
              variant="tertiary"
              endIcon={PencilIcon}
              width="100%"
            >
              Create
            </UrsorButton>
          ) : null}
        </Stack>
        {!props.mobile ? (
          <Stack
            minWidth="268px"
            position="relative"
            flex={1}
            justifyContent="space-between"
          >
            <Stack
              sx={{ transform: "scale(0.333)", transformOrigin: "top left" }}
              position="absolute"
              top={0}
              left={0}
              boxShadow="0 0 60px rgba(0,0,0,0.07)"
            >
              {previewWorksheet}
            </Stack>
            <Stack />
            <Stack spacing="19px">
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
        ) : null}
      </Stack>
    </UrsorFadeIn>
  );
}

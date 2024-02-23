"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import { useEffect, useState } from "react";
import Worksheet, { EquationOrientation } from "../worksheet/[id]/Worksheet";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useReactToPrint } from "react-to-print";
import ApiController from "../api";
import _ from "lodash";
import { useRouter } from "next/navigation";
import MultiplicationTable from "./MultiplicationTable";
import LandingPageViewport from "./LandingPageViewport";
import PageSelector from "./PageSelector";
import UrsorSelect from "../components/UrsorSelect";

const TITLE_CHARACTER_LIMIT = 30;
const DEFAULT_TITLE = "Multiplication Sheet";
const MAX_N_PROBLEMS = 100;

export const Captioned = (props: {
  text: string;
  children: React.ReactNode;
}) => (
  <Stack spacing="8px" flex={1}>
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

export default function LandingPageContents() {
  const [title, setTitle] = useState<string>("Multiplication sheet");
  const [number, setNumber] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [nProblems, setNProblems] = useState<number>(10);
  const [orientation, setOrientation] =
    useState<EquationOrientation>("horizontal");

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
      number,
      multipliers
    ).then((ws) => router.push(`/worksheet/${ws.id}`));

  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);

  const [nPages, setNPages] = useState<number>(0);
  useEffect(
    () =>
      setNPages(
        1 +
          Math.ceil(
            (nProblems - (orientation === "horizontal" ? 16 : 20)) /
              (orientation === "horizontal" ? 20 : 24)
          )
      ),
    [nProblems, orientation]
  );

  return (
    <AstroLandingPage
      title={["8x8 Tables", "Worksheets for Kids"]}
      subtitle="Boo!"
      mobile={false}
      viewports={[
        <LandingPageViewport
          key="multiplication"
          supertitle="Time-table chart"
          subtitle="Add some engaging copy here, man."
          title="Times-table chart"
        >
          <MultiplicationTable />
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
          <Stack direction="row" spacing="20px" sx={{ opacity: 0.35 }}>
            <Captioned text="Question topic">
              <UrsorSelect
                white
                items={[
                  {
                    id: "multiplication",
                    value: "Multiplication",
                  },
                ]}
                selected={["multiplication"]}
                callback={(id: string) => {
                  null;
                }}
                width="100%"
                disabled
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
                disabled
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
            <Captioned text="Multiplier">
              <UrsorInputField
                value={number.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const onlyNumbersString =
                    event.target.value.match(/\d+/)?.[0];
                  const leadingZeroRemovedString = onlyNumbersString?.slice(
                    onlyNumbersString[0] === "0" ? 1 : 0
                  );
                  setNumber(parseInt(leadingZeroRemovedString ?? "0"));
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
              nDigits={nDigits}
              number={number}
              multipliers={multipliers}
              printDialogOpen={printDialogOpen}
              printDialogCloseCallback={() => setPrintDialogOpen(false)}
              pageIndex={selectedPageIndex}
            />
          </Stack>
          <Stack />
          <Stack spacing="19px">
            {(orientation === "horizontal" && nProblems > 16) ||
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

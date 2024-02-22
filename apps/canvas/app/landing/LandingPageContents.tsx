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

const TITLE_CHARACTER_LIMIT = 30;
const DEFAULT_TITLE = "Multiplication Sheet";
const MAX_N_PROBLEMS = 100;

const Captioned = (props: { text: string; children: React.ReactNode }) => (
  <Stack spacing="8px">
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
      height="44px"
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
  const [title, setTitle] = useState<string>("");
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
  useEffect(
    () =>
      setMultipliers(
        _.sampleSize(
          [...Array(parseInt("1".padEnd(nDigits + 1, "0"))).keys()],
          nProblems
        )
      ),
    [nDigits, nProblems]
  );

  const router = useRouter();

  const submitCreation = () =>
    ApiController.createWorksheet(
      title || DEFAULT_TITLE,
      orientation,
      number,
      multipliers
    ).then((ws) => router.push(`/worksheet/${ws.id}`));

  return (
    <AstroLandingPage
      title={["8x8 Tables", "Worksheets for Kids"]}
      subtitle="Boo!"
      mobile={false}
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
              placeholder={DEFAULT_TITLE}
              width="100%"
              leftAlign
              boldValue
              backgroundColor="rgb(255,255,255)"
            />
          </Captioned>
          <Captioned text="Multiplier">
            <UrsorInputField
              value={number.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
                const leadingZeroRemovedString = onlyNumbersString?.slice(
                  onlyNumbersString[0] === "0" ? 1 : 0
                );
                setNumber(parseInt(leadingZeroRemovedString ?? "0"));
              }}
              placeholder="Multiplier"
              width="100%"
              leftAlign
              boldValue
              backgroundColor="rgb(255,255,255)"
            />
          </Captioned>
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
          <Captioned text="Number of digits">
            {/* <UrsorInputField
              value={nDigits.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
                const leadingZeroRemovedString = onlyNumbersString?.slice(
                  onlyNumbersString[0] === "0" ? 1 : 0
                );
                setNDigits(
                  leadingZeroRemovedString
                    ? parseInt(leadingZeroRemovedString)
                    : 0
                );
              }}
              placeholder="Number of digits"
              width="100%"
              leftAlign
              boldValue
              backgroundColor="rgb(255,255,255)"
            /> */}
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
                const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
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
        <Stack
          minWidth="300px"
          position="relative"
          flex={1}
          justifyContent="space-between"
        >
          <Stack
            sx={{ transform: "scale(0.28)", transformOrigin: "top left" }}
            position="absolute"
            top={0}
            left={0}
            height="297mm"
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
            />
            <Stack
              position="absolute"
              bgcolor="rgb(255,255,255)"
              bottom={0}
              left={0}
              height={orientation === "horizontal" ? "50px" : "100px"}
              width="100%"
            />
          </Stack>
          <Stack />
          <Stack spacing="27px">
            {(orientation === "horizontal" && nProblems > 16) ||
            (orientation === "vertical" && nProblems > 15) ? (
              <Typography
                variant="small"
                color={PALETTE.secondary.grey[3]}
              >{`Page 1 of ${
                1 +
                Math.ceil(
                  (nProblems - (orientation === "horizontal" ? 16 : 15)) /
                    (orientation === "horizontal" ? 20 : 18)
                )
              }`}</Typography>
            ) : null}

            <UrsorButton
              // onClick={() => setPrintDialogOpen(true)}
              onClick={submitCreation}
              dark
              variant="tertiary"
              endIcon={PencilIcon}
              size="large"
            >
              Create
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
    </AstroLandingPage>
  );
}

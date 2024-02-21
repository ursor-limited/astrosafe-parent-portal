"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import { useEffect, useState } from "react";
import Worksheet from "../worksheet/Worksheet";
import DownloadIcon from "@/images/icons/DownloadIcon.svg";
import { useReactToPrint } from "react-to-print";

export type Question = "horizontal" | "vertical";

const TITLE_CHARACTER_LIMIT = 30;

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
  const [nProblems, setNProblems] = useState<number>(1);
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<Question>("horizontal");

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
        justifyContent="space-between"
        spacing="40px"
      >
        <Stack width="400px" spacing="16px" flex={1}>
          <Captioned text="Worksheet title">
            <UrsorInputField
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value.length < TITLE_CHARACTER_LIMIT &&
                setTitle(event.target.value)
              }
              placeholder="Multiplication Sheet"
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
          <Captioned text="Question type">
            <Stack direction="row" spacing="10px">
              <CategorySelectionButton
                selected={selectedQuestionType === "horizontal"}
                onClick={() => setSelectedQuestionType("horizontal")}
              >
                Horizontal
              </CategorySelectionButton>
              <CategorySelectionButton
                selected={selectedQuestionType === "vertical"}
                onClick={() => setSelectedQuestionType("vertical")}
              >
                Vertical
              </CategorySelectionButton>
            </Stack>
          </Captioned>
          <Captioned text="Number of digits">
            <UrsorInputField
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
            />
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
            />
          </Captioned>
        </Stack>
        <Stack
          width="300px"
          position="relative"
          flex={1}
          justifyContent="space-between"
        >
          <Stack
            sx={{ transform: "scale(0.28)", transformOrigin: "top left" }}
            position="absolute"
            top={0}
            left={0}
            //height="297mm"
            //overflow="hidden"
          >
            <Worksheet
              ref={setPrintableRef}
              title={title}
              questionType={selectedQuestionType}
              nDigits={nDigits}
              number={number}
              nProblems={nProblems}
              printDialogOpen={printDialogOpen}
              printDialogCloseCallback={() => setPrintDialogOpen(false)}
            />
          </Stack>
          <Stack />
          <UrsorButton
            onClick={() => setPrintDialogOpen(true)}
            dark
            variant="tertiary"
            endIcon={DownloadIcon}
          >
            Download
          </UrsorButton>
        </Stack>
      </Stack>
    </AstroLandingPage>
  );
}

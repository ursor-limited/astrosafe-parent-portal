"use client";

import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import AstroLandingPage from "./AstroLandingPage";
import { useState } from "react";

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

export default function PediaWorksheetLandingPageContents(props: {}) {
  const [title, setTitle] = useState<string>("");
  const [multiplier, setMultiplier] = useState<number>(1);
  const [nDigits, setNDigits] = useState<number>(1);
  const [nProblems, setNProblems] = useState<number>(1);
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<Question>("horizontal");
  return (
    <AstroLandingPage
      title={["8x8 Tables", "Worksheets for Kids"]}
      subtitle="Boo!"
      mobile={false}
    >
      <Stack
        borderRadius="20px"
        width="858px"
        bgcolor={PALETTE.secondary.grey[1]}
        p="42px"
        direction="row"
        justifyContent="space-between"
        spacing="40px"
      >
        <Stack spacing="16px" flex={1}>
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
              value={multiplier.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const onlyNumbersString = event.target.value.match(/\d+/)?.[0];
                const leadingZeroRemovedString = onlyNumbersString?.slice(
                  onlyNumbersString[0] === "0" ? 1 : 0
                );
                setMultiplier(parseInt(leadingZeroRemovedString ?? "1"));
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
                Q&A
              </CategorySelectionButton>
              <CategorySelectionButton
                selected={selectedQuestionType === "vertical"}
                onClick={() => setSelectedQuestionType("vertical")}
              >
                Table
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
                setNDigits(parseInt(leadingZeroRemovedString ?? "1"));
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
                setNProblems(parseInt(leadingZeroRemovedString ?? "1"));
              }}
              placeholder="Number of digits"
              width="100%"
              leftAlign
              boldValue
              backgroundColor="rgb(255,255,255)"
            />
          </Captioned>
        </Stack>
        <Stack width="259px"></Stack>
      </Stack>
    </AstroLandingPage>
  );
}

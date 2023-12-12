"use client";

import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import { useState } from "react";
import UrsorFadeIn from "./UrsorFadeIn";
import ScoreIllustration from "@/images/score.svg";
import SyncIcon from "@/images/icons/SyncIcon.svg";
import X from "@/images/icons/X.svg";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import dynamic from "next/dynamic";
import { IPediaQuestion } from "../p/[pageId]/PediaPageContents";

const ByteStepper = dynamic(
  () => import("./ByteStepper"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function QuestionsCard(props: { questions: IPediaQuestion[] }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [hoveredAnswer, setHoveredAnswer] = useState<string | undefined>(
    undefined
  );
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  return (
    <Stack width="100%" alignItems="center">
      <Stack
        width="502px"
        height="363px"
        alignItems="center"
        justifyContent="space-between"
        py="27px"
        boxSizing="border-box"
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        spacing="24px"
      >
        <Stack spacing="20px" alignItems="center">
          <ByteStepper
            nSteps={props.questions.length + 1}
            step={questionIndex}
          />
          <Stack
            width="400px"
            sx={{
              background: "linear-gradient(-45deg, #F279C5, #1D62F6)",
              "-webkit-text-fill-color": "transparent",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {questionIndex === props.questions.length
                ? "Nice!"
                : props.questions[questionIndex].question}
            </Typography>
          </Stack>
        </Stack>
        {questionIndex === props.questions.length ? (
          <UrsorFadeIn duration={1000} delay={500}>
            <Stack flex={1} justifyContent="center" position="relative">
              <Stack
                position="absolute"
                justifyContent="center"
                alignItems="center"
                height="140px"
                width="100%"
              >
                <Typography bold color={PALETTE.secondary.grey[4]}>
                  Score
                </Typography>
                <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
                  {`${props.questions.length}/${props.questions.length}`}
                </Typography>
              </Stack>
              <ScoreIllustration height="140px" />
            </Stack>
          </UrsorFadeIn>
        ) : (
          <Grid
            container
            gap="8px"
            width="76%"
            justifyContent="center"
            sx={{
              pointerEvents: selectedAnswer ? "none" : undefined,
            }}
          >
            {props.questions[questionIndex].answers.map((a) => (
              <Grid key={a.id} item>
                <Stack
                  key={a.id}
                  height="37px"
                  px="12px"
                  boxSizing="border-box"
                  justifyContent="center"
                  bgcolor={PALETTE.secondary.grey[1]}
                  spacing="8px"
                  direction="row"
                  alignItems="center"
                  borderRadius="8px"
                  sx={{
                    transition: "0.2s",
                    cursor: "pointer",
                    outline:
                      selectedAnswer === a.id
                        ? `2px solid ${
                            props.questions[questionIndex].correctAnswer ===
                            a.id
                              ? PALETTE.secondary.green[3]
                              : PALETTE.secondary.orange[3]
                          }`
                        : undefined,
                  }}
                  onClick={() => setSelectedAnswer(a.id)}
                  onMouseEnter={() =>
                    selectedAnswer !== a.id && setHoveredAnswer(a.id)
                  }
                  onMouseLeave={() => setHoveredAnswer(undefined)}
                >
                  <Stack
                    boxSizing="border-box"
                    minHeight="16px"
                    minWidth="16px"
                    height="16px"
                    width="16px"
                    borderRadius="100%"
                    border={`2px solid ${PALETTE.secondary.purple[2]}`}
                    sx={{
                      transition: "0.2s",
                      opacity:
                        (hoveredAnswer && hoveredAnswer === a.id) ||
                        !selectedAnswer ||
                        (!hoveredAnswer &&
                          selectedAnswer &&
                          selectedAnswer === a.id)
                          ? 1
                          : 0.5,
                    }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Stack
                      sx={{
                        transition: "0.2s",
                        opacity:
                          hoveredAnswer === a.id ||
                          (selectedAnswer === a.id &&
                            hoveredAnswer &&
                            hoveredAnswer !== a.id)
                            ? 0.4
                            : !hoveredAnswer &&
                              selectedAnswer &&
                              selectedAnswer === a.id
                            ? 1
                            : 0,
                      }}
                      bgcolor={PALETTE.secondary.purple[2]}
                      borderRadius="100%"
                      height="7px"
                      width="7px"
                    />
                  </Stack>
                  <Typography
                    sx={{
                      transition: "0.2s",
                      opacity:
                        (hoveredAnswer && hoveredAnswer === a.id) ||
                        !selectedAnswer ||
                        (!hoveredAnswer &&
                          selectedAnswer &&
                          selectedAnswer === a.id)
                          ? 1
                          : 0.5,
                    }}
                  >
                    {a.value}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}
        <Stack
          sx={{
            opacity:
              !selectedAnswer && questionIndex !== props.questions.length
                ? 0.35
                : 1,
            pointerEvents:
              !selectedAnswer && questionIndex !== props.questions.length
                ? "none"
                : undefined,
            svg: {
              path: {
                fill:
                  questionIndex === props.questions.length
                    ? PALETTE.font.dark
                    : PALETTE.font.light,
              },
            },
          }}
        >
          <UrsorButton
            size="small"
            variant={
              questionIndex === props.questions.length ? "secondary" : "primary"
            }
            endIcon={
              questionIndex === props.questions.length
                ? SyncIcon
                : !selectedAnswer ||
                  selectedAnswer ===
                    props.questions[questionIndex].correctAnswer
                ? ChevronRightIcon
                : X
            }
            onClick={() => {
              if (questionIndex === props.questions.length) {
                setQuestionIndex(0);
              } else if (
                selectedAnswer === props.questions[questionIndex].correctAnswer
              ) {
                setQuestionIndex(questionIndex + 1);
              }
              setSelectedAnswer(undefined);
            }}
          >
            {questionIndex === props.questions.length
              ? "Start over"
              : !selectedAnswer ||
                selectedAnswer === props.questions[questionIndex].correctAnswer
              ? questionIndex === props.questions.length - 1
                ? "Complete"
                : "Next Question"
              : "Try again"}
          </UrsorButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

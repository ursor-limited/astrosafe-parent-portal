"use client";

import { Stack } from "@mui/system";
import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UrsorFadeIn from "./UrsorFadeIn";
import ScoreIllustration from "@/images/score.svg";
import SyncIcon from "@/images/icons/SyncIcon.svg";
import X from "@/images/icons/X.svg";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import dynamic from "next/dynamic";
import { IPediaQuestion } from "../p/[urlId]/PediaPageContents";
import { useWindowSize } from "usehooks-ts";
import ApiController from "../api";
import NotificationContext from "./NotificationContext";
import Regenerable from "./Regenerable";

export const DEFAULT_WIDTH = 602;

const ByteStepper = dynamic(
  () => import("./ByteStepper"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export default function QuestionsCard(props: {
  questions: IPediaQuestion[];
  mobile?: boolean;
  editing?: boolean;
  articleId: string;
  regenerationCallback?: () => void;
  incrementRegenerationCount?: () => void;
}) {
  const notificationCtx = useContext(NotificationContext);

  const [questions, setQuestions] = useState<IPediaQuestion[]>([]);
  useEffect(() => {
    setQuestions(props.questions);
  }, [props.questions]);

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [hoveredAnswer, setHoveredAnswer] = useState<string | undefined>(
    undefined
  );
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  console.log(props.questions[0].answer, selectedAnswer);

  const { width } = useWindowSize();

  const [regenerating, setRegenerating] = useState<boolean>(false);
  // const [byteCelebration, setByteCelebration] = useState<boolean>(true);
  const regenerate = () => {
    setRegenerating(true);
    props.incrementRegenerationCount?.();
    ApiController.regenerateQuestions(props.articleId)
      .then((newQuestions) => setQuestions(newQuestions))
      .then(() => {
        setQuestionIndex(0);
        setRegenerating(false);
        notificationCtx.success(`Regenerated Questions.`);
      });
  };
  return (
    <Regenerable
      on={!!props.editing}
      callback={regenerate}
      regenerating={regenerating}
    >
      <Stack width="100%" alignItems="center">
        <Stack
          minWidth={props.mobile ? "100%" : `${DEFAULT_WIDTH}px`}
          maxWidth={props.mobile ? undefined : `${DEFAULT_WIDTH}px`}
          minHeight="363px"
          alignItems="center"
          justifyContent="space-between"
          py="27px"
          px={props.mobile ? undefined : "40px"}
          boxSizing="border-box"
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          spacing="24px"
        >
          <Stack spacing="20px" alignItems="center">
            <ByteStepper
              nSteps={questions.length + 1}
              step={questionIndex}
              scale={Math.min(1, width / (DEFAULT_WIDTH * 1.1))}
            />
            <Stack
              width={props.mobile ? "80%" : "400px"}
              alignItems="center"
              sx={{
                background: "linear-gradient(-45deg, #F279C5, #1D62F6)",
                "-webkit-text-fill-color": "transparent",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
              }}
            >
              <Typography
                variant={props.mobile ? "h5" : "h4"}
                htmlTag="h3"
                sx={{ textAlign: "center" }}
              >
                {questionIndex === questions.length
                  ? "Nice!"
                  : questions[questionIndex].question}
              </Typography>
            </Stack>
          </Stack>
          {questionIndex === questions.length ? (
            <UrsorFadeIn duration={1000} delay={500}>
              <Stack flex={1} justifyContent="center" position="relative">
                <Stack
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                  height="140px"
                  width="100%"
                  pb="10px"
                >
                  <Typography bold color={PALETTE.secondary.grey[4]}>
                    Score
                  </Typography>
                  <Typography variant="h3" color={PALETTE.secondary.purple[2]}>
                    {`${questions.length}/${questions.length}`}
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
              {questions[questionIndex].options.map((o) => {
                console.log("---", selectedAnswer, o);
                return (
                  <Grid key={o.id} item>
                    <Stack
                      key={o.id}
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
                          selectedAnswer && selectedAnswer === o.id
                            ? `2px solid ${
                                questions[questionIndex].answer === o.id
                                  ? PALETTE.secondary.green[3]
                                  : PALETTE.secondary.orange[3]
                              }`
                            : undefined,
                      }}
                      onClick={() => setSelectedAnswer(o.id)}
                      onMouseEnter={() =>
                        selectedAnswer !== o.id && setHoveredAnswer(o.id)
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
                            (hoveredAnswer && hoveredAnswer === o.id) ||
                            !selectedAnswer ||
                            (!hoveredAnswer &&
                              selectedAnswer &&
                              selectedAnswer === o.id)
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
                              hoveredAnswer === o.id ||
                              (selectedAnswer === o.id &&
                                hoveredAnswer &&
                                hoveredAnswer !== o.id)
                                ? 0.4
                                : !hoveredAnswer &&
                                  selectedAnswer &&
                                  selectedAnswer === o.id
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
                        color={PALETTE.font.dark}
                        sx={{
                          transition: "0.2s",
                          opacity:
                            (hoveredAnswer && hoveredAnswer === o.id) ||
                            !selectedAnswer ||
                            (!hoveredAnswer &&
                              selectedAnswer &&
                              selectedAnswer === o.id)
                              ? 1
                              : 0.5,
                        }}
                      >
                        {o.value}
                      </Typography>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          )}
          <Stack
            sx={{
              opacity:
                !selectedAnswer && questionIndex !== questions.length
                  ? 0.35
                  : 1,
              pointerEvents:
                !selectedAnswer && questionIndex !== questions.length
                  ? "none"
                  : undefined,
              svg: {
                path: {
                  fill:
                    questionIndex === questions.length
                      ? PALETTE.font.dark
                      : PALETTE.font.light,
                },
              },
            }}
          >
            <UrsorButton
              size="small"
              variant={
                questionIndex === questions.length ? "secondary" : "primary"
              }
              endIcon={
                questionIndex === questions.length
                  ? SyncIcon
                  : !selectedAnswer ||
                    selectedAnswer === questions[questionIndex].answer
                  ? ChevronRightIcon
                  : X
              }
              onClick={() => {
                if (questionIndex === questions.length) {
                  setQuestionIndex(0);
                } else if (selectedAnswer === questions[questionIndex].answer) {
                  setQuestionIndex(questionIndex + 1);
                }
                setSelectedAnswer(undefined);
              }}
            >
              {questionIndex === questions.length
                ? "Start over"
                : !selectedAnswer ||
                  selectedAnswer === questions[questionIndex].answer
                ? questionIndex === questions.length - 1
                  ? "Complete"
                  : "Next Question"
                : "Try again"}
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
    </Regenerable>
  );
}

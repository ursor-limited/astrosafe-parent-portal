import { Stack, alpha } from "@mui/system";
import Image from "next/image";
import TimelineCard from "./TimelineCard";
import { IImage } from "@/app/dashboard/ImageDialog";
import DeletionDialog from "@/app/components/DeletionDialog";
import { useContext, useEffect, useState } from "react";
import ApiController from "@/app/api";
import NotificationContext from "@/app/components/NotificationContext";
import { CONTENT_BRANDING } from "@/app/dashboard/DashboardPageContents";
import CopyAndMoveDialog from "../CopyAndMoveDialog";
import { IQuiz, IQuizQuestion } from "@/app/components/QuizDialog";
import { PALETTE, Typography, UrsorButton } from "ui";

const WIDTH_RATIO = 0.86;

const TimelineQuizCard = (
  props: IQuiz & {
    lessonId: string;
    setHeight?: (height: number) => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    duplicationCallback?: () => void;
    onDragStart?: () => void;
    columnWidth?: number;
    dragging?: boolean;
    expanded?: boolean;
    mobile?: boolean;
    expansionCallback?: () => void;
    noButtons?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteQuiz(props.id)
      .then(props.deletionCallback)
      .then(() => notificationCtx.negativeSuccess("Deleted Quiz."));

  const submitDuplication = () =>
    ApiController.duplicateQuiz(props.id, props.lessonId)
      .then(props.duplicationCallback)
      .then(() => notificationCtx.success("Duplicated Quiz."));

  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<
    IQuizQuestion | undefined
  >();
  useEffect(
    () => setSelectedQuestion(props.questions[selectedQuestionIndex]),
    [selectedQuestionIndex]
  );

  const [answers, setAnswers] = useState<
    { questionId: string; optionId: string }[]
  >([]);

  const [score, setScore] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string | undefined>();

  const [hoveringRowIndex, setHoveringRowIndex] = useState<
    number | undefined
  >();

  return (
    <>
      <TimelineCard
        id={props.id}
        title={props.title}
        description={props.description}
        setHeight={props.setHeight}
        updatedAt={props.updatedAt}
        color={alpha(CONTENT_BRANDING.quiz.color, 0.12)}
        onDragStart={props.onDragStart}
        dragging={props.dragging}
        deletionCallback={() => setDeletionDialogOpen(true)}
        editingCallback={props.editingCallback}
        copyAndMoveCallback={() => setCopyDialogOpen(true)}
        duplicationCallback={submitDuplication}
        width={props.columnWidth ? WIDTH_RATIO * props.columnWidth : undefined}
        creatorId={props.creatorId}
        expanded={props.expanded}
        expansionCallback={props.expansionCallback}
        useExpandedHeight
        noButtons={props.noButtons}
      >
        <Stack
          p="24px"
          pb="6px"
          position="relative"
          bgcolor="rgb(255,255,255)"
          spacing="20px"
        >
          <Stack spacing="12px">
            <Typography bold>{selectedQuestion?.value}</Typography>
            <Stack boxSizing="border-box">
              {selectedQuestion?.options?.map((o, i) => (
                <Stack
                  key={o.id}
                  height="36px"
                  direction="row"
                  spacing="12px"
                  alignItems="center"
                  onClick={() => {
                    setCurrentAnswer(o.id);
                    setScore(
                      o.id === selectedQuestion.correctOption
                        ? score + 1
                        : score
                    );
                  }}
                  onMouseEnter={() => {
                    setHoveringRowIndex(i);
                  }}
                  onMouseLeave={() => {
                    setHoveringRowIndex(undefined);
                  }}
                  bgcolor={
                    hoveringRowIndex === i
                      ? PALETTE.secondary.grey[1]
                      : undefined
                  }
                  sx={{
                    transition: "0.2s",
                    cursor: "pointer",
                  }}
                  px="8px"
                >
                  <Stack
                    height="14px"
                    width="14px"
                    border={`2px solid ${
                      o.id === currentAnswer
                        ? o.id === selectedQuestion.correctOption
                          ? PALETTE.system.green
                          : PALETTE.system.red
                        : PALETTE.secondary.grey[hoveringRowIndex === i ? 5 : 4]
                    }`}
                    borderRadius="100%"
                    sx={{
                      transition: "0.2s",
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.6,
                      },
                    }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      width="10px"
                      height="10px"
                      borderRadius="100%"
                      bgcolor={
                        o.id === currentAnswer
                          ? o.id === selectedQuestion.correctOption
                            ? PALETTE.system.green
                            : PALETTE.system.red
                          : "transparent"
                      }
                    />
                  </Stack>
                  <Typography
                    bold
                    color={
                      o.id === currentAnswer
                        ? o.id === selectedQuestion.correctOption
                          ? PALETTE.system.green
                          : PALETTE.system.red
                        : PALETTE.secondary.grey[hoveringRowIndex === i ? 5 : 4]
                    }
                  >
                    {o.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            height="52px"
            justifyContent="space-between"
            alignItems="center"
            //px="12px"
            boxSizing="border-box"
          >
            <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
              {`Question ${selectedQuestionIndex + 1} of ${
                props.questions.length
              }`}
            </Typography>
            <UrsorButton
              size="small"
              onClick={() =>
                setSelectedQuestionIndex(selectedQuestionIndex + 1)
              }
              disabled={!currentAnswer}
              dark
              variant="tertiary"
            >
              Next
            </UrsorButton>
          </Stack>
        </Stack>
      </TimelineCard>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={submitDeletion}
          category="Quiz"
          title={props.title}
        />
      ) : null}
      {copyDialogOpen && props.id ? (
        <CopyAndMoveDialog
          id={props.id}
          title={props.title}
          open={copyDialogOpen}
          closeCallback={() => setCopyDialogOpen(false)}
        />
      ) : null}
    </>
  );
};

export default TimelineQuizCard;

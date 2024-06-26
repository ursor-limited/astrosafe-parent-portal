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
import ScoreIllustration from "@/images/ScoreIllustration.png";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import SyncIcon from "@/images/icons/Sync.svg";
import DynamicContainer from "@/app/components/DynamicContainer";
import MultipleChoiceIcon from "@/app/components/MultipleChoiceIcon";

const WIDTH_RATIO = 0.86;

const TimelineQuizCardResultsView = (props: { score: number; max: number }) => (
  <Stack
    flex={1}
    direction="row"
    alignItems="center"
    justifyContent="center"
    spacing="38px"
  >
    <Stack spacing="3px">
      <Typography variant="h5">Quiz completed!</Typography>
      <Typography bold color={PALETTE.secondary.grey[3]}>
        Your results are...
      </Typography>
    </Stack>
    <Stack height="140px" width="160px" position="relative">
      <Stack
        position="absolute"
        top={0}
        left={0}
        right={0}
        marginLeft="auto"
        marginRight="auto"
        justifyContent="center"
        alignItems="center"
        height="140px"
        pb="10px"
        sx={{
          transform: "translateX(-4px)",
        }}
      >
        <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
          {`${props.score}/${props.max}`}
        </Typography>
        <Typography
          sx={{ transform: "translate(2px, -1px)" }}
          bold
          color={PALETTE.secondary.grey[3]}
        >
          Correct
        </Typography>
      </Stack>
      <Image
        height={140}
        width={160}
        src={ScoreIllustration}
        alt="Score illustration"
      />
    </Stack>
  </Stack>
);

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

  const [score, setScore] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string[]>([]);
  // useEffect(
  //   () =>
  //     setScore(
  //       currentAnswer.length === selectedQuestion?.correctOptions?.length &&
  //         selectedQuestion?.correctOptions.every((co) =>
  //           currentAnswer.includes(co)
  //         )
  //         ? score + 1
  //         : score
  //     ),
  //   [currentAnswer]
  // );
  useEffect(() => {
    setScore(0);
    setCurrentAnswer([]);
    setSelectedQuestionIndex(0);
    setSelectedQuestion(props.questions[0]);
  }, [props.questions]);

  const [hoveringRowIndex, setHoveringRowIndex] = useState<
    number | undefined
  >();

  const [showResultView, setShowResultView] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState<boolean>(false);

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
        noButtons={props.noButtons}
      >
        <Stack
          p="24px"
          pb="6px"
          position="relative"
          bgcolor="rgb(255,255,255)"
          height="240px"
          justifyContent="space-between"
        >
          {showResultView ? (
            <TimelineQuizCardResultsView
              score={score}
              max={props.questions.length}
            />
          ) : (
            <Stack spacing="12px">
              <Typography bold>{selectedQuestion?.value}</Typography>
              <Stack boxSizing="border-box">
                {selectedQuestion?.options?.map((o, i) => (
                  <Stack
                    key={o.id}
                    height="36px"
                    direction="row"
                    spacing="12px"
                    borderRadius="8px"
                    alignItems="center"
                    onClick={() => {
                      setCurrentAnswer(
                        selectedQuestion.type === "multipleChoice"
                          ? [o.id]
                          : currentAnswer.includes(o.id)
                          ? currentAnswer.filter((a) => a !== o.id)
                          : [...currentAnswer, o.id]
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
                      pointerEvents: submitted ? "none" : undefined,
                    }}
                    px="8px"
                  >
                    <MultipleChoiceIcon
                      state={
                        !submitted
                          ? null
                          : selectedQuestion.correctOptions?.includes(o.id)
                          ? "correct"
                          : currentAnswer.includes(o.id) &&
                            !selectedQuestion.correctOptions?.includes(o.id)
                          ? "wrong"
                          : null
                      }
                      type={selectedQuestion.type}
                      selected={currentAnswer.includes(o.id)}
                      darker={hoveringRowIndex === i}
                    />

                    <Typography
                      bold
                      color={
                        !submitted
                          ? PALETTE.secondary.grey[
                              hoveringRowIndex === i ? 5 : 4
                            ]
                          : currentAnswer.includes(o.id)
                          ? selectedQuestion.correctOptions.includes(o.id)
                            ? PALETTE.system.green
                            : PALETTE.system.red
                          : currentAnswer &&
                            selectedQuestion.correctOptions.includes(o.id)
                          ? PALETTE.system.green
                          : PALETTE.secondary.grey[
                              hoveringRowIndex === i ? 5 : 4
                            ]
                      }
                      noWrap
                    >
                      {o.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
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
              onClick={() => {
                if (showResultView) {
                  setScore(0);
                  setShowResultView(false);
                  setSubmitted(false);
                  setCurrentAnswer([]);
                  setSelectedQuestionIndex(0);
                } else if (!submitted) {
                  setSubmitted(true);
                  setScore(
                    currentAnswer.length ===
                      selectedQuestion?.correctOptions?.length &&
                      selectedQuestion?.correctOptions.every((co) =>
                        currentAnswer.includes(co)
                      )
                      ? score + 1
                      : score
                  );
                } else if (selectedQuestionIndex < props.questions.length - 1) {
                  setSubmitted(false);
                  setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  setCurrentAnswer([]);
                } else {
                  setShowResultView(true);
                }
              }}
              disabled={!showResultView && !currentAnswer}
              dark
              variant="tertiary"
              endIcon={showResultView ? SyncIcon : ChevronRightIcon}
              iconSize={18}
            >
              {showResultView ? "Retry" : submitted ? "Next" : "Submit"}
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

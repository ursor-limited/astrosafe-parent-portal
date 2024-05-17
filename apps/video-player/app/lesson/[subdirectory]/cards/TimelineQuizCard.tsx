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

const WIDTH_RATIO = 0.86;

const TimelineQuizCardResultsView = (props: { score: number; max: number }) => (
  <Stack
    height="220px"
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
  const [currentAnswer, setCurrentAnswer] = useState<string | undefined>();
  useEffect(() => {
    setScore(0);
    setCurrentAnswer(undefined);
    setSelectedQuestionIndex(0);
    setSelectedQuestion(props.questions[0]);
  }, [props.questions]);

  const [hoveringRowIndex, setHoveringRowIndex] = useState<
    number | undefined
  >();

  const [showResultView, setShowResultView] = useState<boolean>(false);

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
        <DynamicContainer duration={600} fullWidth>
          <Stack
            p="24px"
            pb="6px"
            position="relative"
            bgcolor="rgb(255,255,255)"
            spacing="20px"
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
                        pointerEvents: currentAnswer ? "none" : undefined,
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
                            : currentAnswer &&
                              o.id === selectedQuestion.correctOption
                            ? PALETTE.system.green
                            : PALETTE.secondary.grey[
                                hoveringRowIndex === i ? 5 : 4
                              ]
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
                          width="9px"
                          height="9px"
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
                            : currentAnswer &&
                              o.id === selectedQuestion.correctOption
                            ? PALETTE.system.green
                            : PALETTE.secondary.grey[
                                hoveringRowIndex === i ? 5 : 4
                              ]
                        }
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
              <Typography
                variant="small"
                bold
                color={PALETTE.secondary.grey[3]}
              >
                {`Question ${selectedQuestionIndex + 1} of ${
                  props.questions.length
                }`}
              </Typography>
              <UrsorButton
                size="small"
                onClick={() => {
                  if (selectedQuestionIndex < props.questions.length - 1) {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  } else if (!showResultView) {
                    setShowResultView(true);
                  } else {
                    setShowResultView(false);
                    setSelectedQuestionIndex(0);
                  }
                  setSelectedQuestion(undefined);
                  setCurrentAnswer(undefined);
                }}
                disabled={!showResultView && !currentAnswer}
                dark
                variant="tertiary"
                endIcon={showResultView ? SyncIcon : ChevronRightIcon}
                iconSize={18}
              >
                {showResultView
                  ? "Retry"
                  : selectedQuestionIndex < props.questions.length - 1
                  ? "Next"
                  : "Submit"}
              </UrsorButton>
            </Stack>
          </Stack>
        </DynamicContainer>
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
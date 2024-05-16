import { Stack } from "@mui/system";
import PencilIcon from "@/images/icons/Pencil.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import UrsorDialog, {
  BACKDROP_STYLE,
  BORDER_RADIUS,
  DEFAULT_FADEIN_DURATION,
} from "./UrsorDialog";
import { useEffect, useState } from "react";
import {
  PALETTE,
  Typography,
  UrsorButton,
  UrsorInputField,
  UrsorTextField,
} from "ui";
import { IVideo } from "../api";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import MobileVideoCreationDialog from "../dashboard/MobileVideoCreationDialog";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import UrsorSelectList from "./UrsorSelectList";
import UrsorSelect from "./UrsorSelect";
import { Dialog } from "@mui/material";
import DynamicContainer from "./DynamicContainer";

export const quizQuestionTypes = ["multipleChoice"] as const;
export type QuizQuestionType = (typeof quizQuestionTypes)[number];

export const QUESTION_TYPE_DISPLAY_NAMES: Record<QuizQuestionType, string> = {
  multipleChoice: "Multiple choice",
};

const QuizDialogQuestionCard = (
  props: IQuizQuestion & {
    i: number;
    setValue: (value: string) => void;
    setType: (type: string) => void;
    setOption: (id: string, value: string) => void;
    addOption: () => void;
  }
) => (
  <DynamicContainer duration={500} fullWidth>
    <Stack
      bgcolor={PALETTE.secondary.grey[1]}
      borderRadius="12px"
      p="12px"
      pb="8px"
      boxSizing="border-box"
      spacing="8px"
      width="100%"
    >
      <Typography
        variant="small"
        color={PALETTE.secondary.grey[4]}
      >{`Question ${props.i + 1}`}</Typography>
      <UrsorInputField
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setValue(event.target.value)
        }
        placeholder="Question"
        width="100%"
        backgroundColor="rgb(255,255,255)"
        leftAlign
        boldValue
        height="44px"
      />
      <UrsorSelect
        items={quizQuestionTypes.map((qqt) => ({
          id: qqt,
          value: QUESTION_TYPE_DISPLAY_NAMES[qqt],
        }))}
        selected={[props.type]}
        callback={props.setType}
        fieldWidth="100%"
        white
        zIndex={999999999}
        leftAlignPopover
      />
      <Stack spacing="8px">
        {props.options?.map((o) => (
          <Stack direction="row">
            <UrsorInputField
              value={props.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.setOption(o.id, event.target.value)
              }
              placeholder="Question"
              width="100%"
              backgroundColor="rgb(255,255,255)"
              leftAlign
              boldValue
              height="44px"
            />
          </Stack>
        ))}
      </Stack>
      <Stack
        direction="row"
        spacing="8px"
        height="44px"
        alignItems="center"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.7 },
          transition: "0.2s",
          svg: {
            path: {
              fill: PALETTE.secondary.grey[3],
            },
          },
        }}
        onClick={props.addOption}
      >
        <Typography bold color={PALETTE.secondary.grey[3]}>
          Add another
        </Typography>
        <PlusIcon size="16px" height="16px" />
      </Stack>
    </Stack>
  </DynamicContainer>
);

export interface IQuizQuestion {
  id: string;
  type: QuizQuestionType;
  value: string;
  options?: IQuizQuestionOption[];
}

export interface IQuizQuestionOption {
  id: string;
  value: string;
}

export interface IQuiz {
  title: string;
  questions: IQuizQuestion[];
}

const getNewQuestion: () => IQuizQuestion = () => ({
  id: _.uniqueId(),
  value: "",
  type: "multipleChoice",
  options: [getNewOption(), getNewOption()],
});

const getNewOption: () => IQuizQuestionOption = () => ({
  id: _.uniqueId(),
  value: "",
});

const QuizDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (videoId: string, title: string) => void;
  editingCallback?: () => void;
  video?: IVideo;
}) => {
  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [questions, setQuestions] = useState<IQuizQuestion[]>([]);
  useEffect(() => {
    questions.length === 0 && setQuestions([getNewQuestion()]);
  }, [questions]);

  console.log(questions, "99kk");

  return (
    <>
      {isMobile ? (
        <MobileVideoCreationDialog {...props} />
      ) : (
        // <UrsorDialog
        //   open={props.open}
        //   width="930px"
        //   maxWidth="930px"
        //   noPadding
        //   height="552px"
        //   paddingY={isMobile ? "0px" : "40px"}
        //   paddingX={isMobile ? undefined : "40px"}
        //   noCloseButton
        // >
        <Dialog
          transitionDuration={DEFAULT_FADEIN_DURATION}
          open={props.open}
          onClose={props.closeCallback}
          PaperProps={{
            style: {
              //zIndex: zIndices.POPUP,
              width: "930px",
              maxWidth: "930px",
              height: "552px",
              borderRadius: BORDER_RADIUS,
              margin: "20px",
            },
          }}
          sx={{
            // py: "10px",
            ".MuiBackdrop-root": BACKDROP_STYLE,
          }}
        >
          <Stack flex={1} spacing="24px" p="40px" overflow="hidden">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="h4">Create Quiz</Typography>
              <UrsorButton dark variant="tertiary" endIcon={PencilIcon}>
                Create
              </UrsorButton>
            </Stack>
            <Stack direction="row" spacing="24px" overflow="hidden">
              <Stack width="312px" spacing="20px">
                <Captioned text="Title" noFlex>
                  <UrsorInputField
                    value={title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(event.target.value)
                    }
                    placeholder="Title"
                    width="100%"
                    leftAlign
                    boldValue
                  />
                </Captioned>
                <Captioned text="Description">
                  <UrsorTextField
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Optional"
                    width="100%"
                    height="172px"
                    boldValue
                    flex
                  />
                </Captioned>
                {/* <Stack
                width="100%"
                bgcolor={PALETTE.secondary.grey[1]}
                borderRadius="12px"
                p="12px"
              >
                <Typography bold variant="small">
                  Questions
                </Typography>
                <Stack spacing="6px">
                  {questions.map((q) => (
                    <Stack
                      key={q.id}
                      height="72px"
                      borderRadius="8px"
                      p="8px"
                      boxSizing="border-box"
                      justifyContent="space-between"
                      onClick={() => setSelectedQuestion(q)}
                      bgcolor="rgb(255,255,255)"
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="small"
                          bold
                          color={PALETTE.secondary.grey[5]}
                        >
                          {q.type}
                        </Typography>
                        <GrabberIcon width="16px" height="16px" />
                      </Stack>
                      <Typography
                        variant="small"
                        bold
                        color={PALETTE.secondary.grey[q.value ? 5 : 3]}
                      >
                        {q.value || "Question"}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack> */}
              </Stack>
              <Stack flex={1} spacing="8px" overflow="hidden">
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="small" color={PALETTE.secondary.grey[4]}>
                    Questions
                  </Typography>
                  <UrsorButton
                    size="small"
                    dark
                    variant="tertiary"
                    endIcon={PlusIcon}
                    onClick={() =>
                      setQuestions([...questions, getNewQuestion()])
                    }
                  >
                    Add
                  </UrsorButton>
                </Stack>
                <Stack overflow="scroll" flex={1}>
                  <Stack spacing="12px">
                    {questions.map((q, i) => (
                      <QuizDialogQuestionCard
                        {...q}
                        i={i}
                        setValue={(value: string) =>
                          questions.map((question) =>
                            q.id === question.id ? { ...q, value } : question
                          )
                        }
                        setType={(questionType: string) =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? { ...q, questionType }
                                : question
                            )
                          )
                        }
                        setOption={(id, value) =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? {
                                    ...q,
                                    options: q.options!.map((o) =>
                                      o.id === id ? { ...o, value } : o
                                    ),
                                  }
                                : question
                            )
                          )
                        }
                        addOption={() =>
                          setQuestions(
                            questions.map((question) =>
                              q.id === question.id
                                ? {
                                    ...q,
                                    options: [
                                      ...(q.options || []),
                                      getNewOption(),
                                    ],
                                  }
                                : question
                            )
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Dialog>
      )}
    </>
  );
};

export default QuizDialog;

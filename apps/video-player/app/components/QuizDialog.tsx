import { Stack } from "@mui/system";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "./UrsorDialog";
import { useState } from "react";
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
  }
) => (
  <Stack
    bgcolor={PALETTE.secondary.grey[1]}
    borderRadius="12px"
    p="12px"
    boxSizing="border-box"
    spacing="8px"
    width="100%"
  >
    <Typography variant="small" color={PALETTE.secondary.grey[4]}>{`Question ${
      props.i + 1
    }`}</Typography>
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
  </Stack>
);

export interface IQuizQuestion {
  id: string;
  type: QuizQuestionType;
  value: string;
}

export interface IQuiz {
  title: string;
  questions: IQuizQuestion[];
}

const QuizDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  creationCallback?: (videoId: string, title: string) => void;
  editingCallback?: () => void;
  video?: IVideo;
}) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [questions, setQuestions] = useState<IQuizQuestion[]>([
    {
      id: "boo!o",
      value: "",
      type: "multipleChoice",
    },
  ]);

  const [questionType, setQuestionType] = useState<
    QuizQuestionType | undefined
  >(undefined);

  const [selectedQuestion, setSelectedQuestion] = useState<
    IQuizQuestion | undefined
  >();

  return (
    <>
      {isMobile ? (
        <MobileVideoCreationDialog {...props} />
      ) : (
        <UrsorDialog
          open={props.open}
          width="930px"
          maxWidth="930px"
          noPadding
          height="552px"
          paddingY={isMobile ? "0px" : "40px"}
          paddingX={isMobile ? undefined : "40px"}
          noCloseButton
          noOverflowHidden
        >
          <Stack width="100%" height="100%" spacing="24px">
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
            <Stack direction="row" spacing="24px">
              <Stack width="312px" spacing="20px">
                <Captioned text="Title">
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
                <Captioned text="Description" height="100%">
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
              <Stack spacing="12px" flex={1}>
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
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </UrsorDialog>
      )}
    </>
  );
};

export default QuizDialog;

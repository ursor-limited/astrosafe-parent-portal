import { Stack } from "@mui/system";
import GrabberIcon from "@/images/icons/GrabberIcon.svg";
import { useRouter } from "next/navigation";
import UrsorDialog from "./UrsorDialog";
import { useState } from "react";
import { PALETTE, Typography, UrsorInputField, UrsorTextField } from "ui";
import { IVideo } from "../api";
import _ from "lodash";
import { isMobile } from "react-device-detect";
import MobileVideoCreationDialog from "../dashboard/MobileVideoCreationDialog";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import UrsorSelectList from "./UrsorSelectList";

export const quizQuestionTypes = ["multipleChoice"] as const;
export type QuizQuestionType = (typeof quizQuestionTypes)[number];

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
          onCloseCallback={props.closeCallback}
          width="930px"
          maxWidth="930px"
          noPadding
          height="552px"
          paddingY={isMobile ? "0px" : "40px"}
          paddingX={isMobile ? undefined : "40px"}
          noCloseButton={isMobile}
          noOverflowHidden
        >
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
              <Stack
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
              </Stack>
            </Stack>
            {selectedQuestion ? (
              <Stack
                bgcolor={PALETTE.secondary.grey[1]}
                borderRadius="12px"
                p="12px"
                boxSizing="border-box"
                spacing="8px"
              >
                <Typography color={PALETTE.secondary.grey[4]}>{`Question ${
                  selectedQuestion
                    ? questions.map((q) => q.id).indexOf(selectedQuestion.id)
                    : 1
                }`}</Typography>

                <UrsorSelectList
                  items={quizQuestionTypes.map((qqt) => ({
                    id: qqt,
                    value: "Multiplication (x)",
                  }))}
                  selected={[selectedQuestion.type]}
                  callback={(qqt: string) =>
                    setQuestions(
                      questions.map((q) =>
                        q.id === selectedQuestion.id
                          ? { ...q, questionType: qqt }
                          : q
                      )
                    )
                  }
                />
                <UrsorInputField
                  value={selectedQuestion.value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    questions.map((q) =>
                      q.id === selectedQuestion.id
                        ? { ...q, value: event.target.value }
                        : q
                    )
                  }
                  placeholder="Question"
                  width="100%"
                  height="44px"
                  boldValue
                />
              </Stack>
            ) : null}
          </Stack>
        </UrsorDialog>
      )}
    </>
  );
};

export default QuizDialog;

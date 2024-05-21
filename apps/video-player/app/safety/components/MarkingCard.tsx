import * as React from "react";
import { alpha, Box, Stack } from "@mui/system";
import { PALETTE } from "../../../palette";
import UrsorInputField, {
  BORDER_RADIUS,
} from "../../../components/inputs/UrsorInputField";
import { ReactComponent as CheckIcon } from "../../../images/icons/CheckIcon.svg";
import { ReactComponent as CommentIcon } from "../../../images/icons/CommentIcon.svg";
import { ReactComponent as X } from "../../../images/icons/x.svg";
import Typography from "../../../components/Typography";
import DynamicContainer from "../../../components/DynamicContainer";
import { IQuestion } from "../../../components/WorksheetDialog/WorksheetDialog";
import { MultipleChoiceCircle } from "../../../components/WorksheetDialog/QuestionCard/MultipleChoiceItem";
import MarkingButton, {
  INACTIVE_OPACITY,
} from "../../../components/WorksheetDialog/QuestionCard/MarkingButton";

const CARD_PADDING = "20px";
const COMMENT_ICON_SIZE = "21px";
const ICON_SIZE = "18px";

export type Mark = "correct" | "wrong" | "half";
export const MARK_VALUES: Record<Mark, number> = {
  correct: 1,
  half: 0.5,
  wrong: 0,
};

export interface IMarkingCardProps {
  question: IQuestion;
  answer: string;
  score?: number;
  comment?: string;
  studentName: string;
  preview?: boolean;
  markCallback: (score: number) => void;
  commentCallback: (comment: string | undefined) => void;
}

export default function MarkingCard(props: IMarkingCardProps) {
  const [comment, setComment] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setComment(props.comment);
  }, []);

  return (
    <DynamicContainer>
      <Stack
        width="100%"
        spacing="13px"
        p={CARD_PADDING}
        sx={{
          background: PALETTE.secondary.grey[1],
        }}
        borderRadius={BORDER_RADIUS}
      >
        <Stack width="100%" spacing="6px">
          <Stack direction="row" spacing="10px">
            <Typography bold faded>
              Q:
            </Typography>
            <Typography bold>{props.question.title}</Typography>
          </Stack>
          {props.question.description ? (
            <Typography>{props.question.description}</Typography>
          ) : null}
          <Stack direction="row" spacing="10px">
            <Typography bold faded>
              A:
            </Typography>
            {props.question.type === "textShort" ||
            props.question.type === "textLong" ? (
              <Typography>{props.answer}</Typography>
            ) : (
              <Stack spacing="4px">
                {props.question.options.map((option) => (
                  <Stack
                    key={option.id}
                    direction="row"
                    spacing="10px"
                    alignItems="center"
                    sx={{
                      opacity: props.answer?.split("\n").includes(option.id)
                        ? 1
                        : 0.4,
                    }}
                  >
                    <MultipleChoiceCircle
                      square={props.question.type === "checkbox"}
                      filled={props.answer?.split("\n").includes(option.id)}
                    />
                    <Typography
                      sx={{
                        pt: "1px",
                      }}
                    >
                      {option.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
        {comment || !props.preview ? (
          <Stack
            width="100%"
            justifyContent="center"
            alignItems="center"
            spacing="17px"
            position="relative"
          >
            <Stack direction="row" spacing="13px">
              <MarkingButton
                color={PALETTE.system.red}
                selected={props.score === MARK_VALUES["wrong"]}
                callback={() => props.markCallback(MARK_VALUES["wrong"])}
              >
                <X height={ICON_SIZE} width={ICON_SIZE} />
              </MarkingButton>
              <MarkingButton
                color={PALETTE.secondary.orange[3]}
                selected={props.score === MARK_VALUES["half"]}
                callback={() => props.markCallback(MARK_VALUES["half"])}
              >
                <Box
                  height="1.5px"
                  width="18px"
                  sx={{
                    transform: "rotate(-45deg)",
                    background:
                      props.score === MARK_VALUES["half"]
                        ? "white"
                        : alpha(PALETTE.secondary.orange[3], INACTIVE_OPACITY),
                  }}
                />
              </MarkingButton>
              <MarkingButton
                color={PALETTE.secondary.green[3]}
                selected={props.score === MARK_VALUES["correct"]}
                callback={() => props.markCallback(MARK_VALUES["correct"])}
              >
                <CheckIcon height={ICON_SIZE} width={ICON_SIZE} />
              </MarkingButton>
            </Stack>

            <UrsorInputField
              value={comment}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.commentCallback(event.target.value)
              }
              placeholder={"Comment (optional)"}
              width={"100%"}
              backgroundColor="white"
            />
          </Stack>
        ) : null}
      </Stack>
    </DynamicContainer>
  );
}

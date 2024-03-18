import { PALETTE, Typography, UrsorTextField } from "ui";
import StepDialog, { IDialogStepDetails } from "../components/StepDialog";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Captioned } from "../tools/multiplication-chart/[urlId]/LandingPageContents";
import { useRouter } from "next/navigation";
import { getPaymentUrl } from "../components/SignupPromptDialog";
import { useUserContext } from "../components/UserContext";
import { useLocalStorage } from "usehooks-ts";

const INPUT_WIDTH = "360px";

const QuestionnaireAnswer = (props: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <Stack
    direction="row"
    onClick={props.onClick}
    spacing="12px"
    alignItems="center"
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.6 },
      transition: "0.2s",
    }}
  >
    <Stack
      height="16px"
      width="16px"
      border={`2px solid ${PALETTE.font.dark}`}
      borderRadius="100%"
      alignItems="center"
      justifyContent="center"
    >
      {props.selected ? (
        <Stack
          borderRadius="100%"
          height="8px"
          width="8px"
          bgcolor={PALETTE.font.dark}
        />
      ) : null}
    </Stack>
    <Typography>{props.text}</Typography>
  </Stack>
);

const ANSWERS = [
  "Very disappointed",
  "Somewhat disappointed",
  "Not disappointed",
  "N/A - No longer need or want this",
];

const QuestionnaireDialog = (props: {
  open: boolean;
  closeCallback: () => void;
}) => {
  const [upgradedNotificationPending, setUpgradedNotificationPending] =
    useLocalStorage<boolean>("upgradedNotificationPending", false);
  const router = useRouter();
  const userDetails = useUserContext().user;
  const [q1SelectedAnswer, setQ1SelectedAnswer] = useState<number | undefined>(
    undefined
  );
  const [q2Answer, setQ2Answer] = useState<string>("");
  const [q3Answer, setQ3Answer] = useState<string>("");
  const [q4Answer, setQ4Answer] = useState<string>("");

  const [step, setStep] = useState<number>(0);
  const steps: IDialogStepDetails[] = [
    {
      title: "How disappointed would you be if this product didn’t exist?",
      //subtitle: ["What is your School called?"],
      content: (
        <Stack spacing="12px" flex={1}>
          {ANSWERS.map((a, i) => (
            <QuestionnaireAnswer
              key={a}
              text={a}
              selected={q1SelectedAnswer === i}
              onClick={() => setQ1SelectedAnswer(i)}
            />
          ))}
        </Stack>
      ),
    },
    {
      title: "What do you like the most?",
      //subtitle: ["What is your School called?"],
      content: (
        <Captioned text="What do you like the most?">
          <Stack width="360px">
            <UrsorTextField
              value={q2Answer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQ2Answer(event.target.value)
              }
              placeholder="What do you like the most?"
              width="100%"
              height="100px"
              boldValue
            />
          </Stack>
        </Captioned>
      ),
    },
    {
      title: "What did you dislike?",
      //subtitle: ["What is your School called?"],
      content: (
        <Captioned text="What did you dislike?">
          <Stack width={INPUT_WIDTH}>
            <UrsorTextField
              value={q3Answer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQ3Answer(event.target.value)
              }
              placeholder="What did you dislike?"
              width="100%"
              height="100px"
              boldValue
            />
          </Stack>
        </Captioned>
      ),
    },
    {
      title: "If you could add one thing, what would you add?",
      //subtitle: ["What is your School called?"],
      content: (
        <Captioned text="If you could add one thing, what would you add?">
          <Stack width={INPUT_WIDTH}>
            <UrsorTextField
              value={q4Answer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQ4Answer(event.target.value)
              }
              placeholder="What would you add?"
              width="100%"
              height="100px"
              boldValue
            />
          </Stack>
        </Captioned>
      ),
    },
    {
      title: "Discount code",
      subtitle: [
        "Thank you so much for your feedback - as a thank you here is a discount code you can use at checkout to get your first month free.",
      ],
      content: (
        <Stack flex={1} alignItems="center" justifyContent="center">
          <Typography variant="h1">ASTROBUU123</Typography>
        </Stack>
      ),
      button: {
        text: "Upgrade now",
        callback: () => {
          userDetails?.auth0Id
            ? router.push(getPaymentUrl(userDetails?.auth0Id))
            : undefined;
          setUpgradedNotificationPending(true);
        },
      },
    },
  ];
  return (
    <StepDialog
      open={props.open}
      steps={steps}
      step={step}
      callback={(newStep: number) => setStep(newStep)}
      closeCallback={props.closeCallback}
      initialBackCallback={props.closeCallback}
    />
  );
};

export default QuestionnaireDialog;

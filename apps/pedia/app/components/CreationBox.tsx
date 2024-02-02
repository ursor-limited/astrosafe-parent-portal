import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PaintBrushIcon from "@/images/icons/PaintBrushIcon.svg";
import X from "@/images/icons/X.svg";
import UrsorFadeIn from "./UrsorFadeIn";
import { useAuth0 } from "@auth0/auth0-react";
import DynamicContainer from "./DynamicContainer";
import { Grid } from "@mui/material";
import ApiController from "../api";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

const MAX_TOPICS = 4;
const CHARACTER_LIMIT = 30;

const TopicTag = (props: {
  value: string;
  deletionCallback: () => void;
  loadTitlesInLocalStorage?: boolean;
}) => (
  <Stack
    bgcolor={PALETTE.secondary.grey[2]}
    height="32px"
    px="12px"
    borderRadius="8px"
    spacing="10px"
    alignItems="center"
    direction="row"
  >
    <Typography color={PALETTE.font.dark} bold>
      {props.value}
    </Typography>
    <Stack
      sx={{
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        cursor: "pointer",
      }}
      onClick={props.deletionCallback}
    >
      <X width="18px" height="18px" />
    </Stack>
  </Stack>
);

export const CreationBox = (props: {
  mobile?: boolean;
  titlesCallback?: (titles: string[]) => void;
  willSignInCallback?: () => void;
}) => {
  const [value, setValue] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const addTopic = () => {
    setTopics([...topics, value]);
    //props.titlesCallback?.([...topics, value]);
    !user && setTitlesWaitingForGenerationUponSignIn([...topics, value]);
    setValue("");
  };

  const { user, loginWithPopup, loginWithRedirect } = useAuth0();

  const router = useRouter();

  const [
    titlesWaitingForGenerationUponSignIn,
    setTitlesWaitingForGenerationUponSignIn,
  ] = useLocalStorage<string[] | undefined>(
    "titlesWaitingForGenerationUponSignIn",
    []
  );

  return (
    <Stack
      bgcolor="rgba(0,0,0,0.16)"
      px="24px"
      py="20px"
      maxWidth={props.mobile ? "100%" : "733px"}
      width={props.mobile ? "100%" : "733px"}
      borderRadius="16px"
      alignItems="center"
      spacing={props.mobile ? (topics.length > 0 ? "8px" : 0) : "24px"}
    >
      <Stack spacing="8px" width={props.mobile ? "100%" : undefined}>
        <Stack spacing="4px" width={props.mobile ? "100%" : undefined}>
          <Stack direction="row" spacing="9px">
            <Typography variant="small" bold color="rgba(255,255,255,0.6)">
              Topics added:
            </Typography>
            <Stack direction="row" spacing="3px">
              <Typography variant="small" bold color="rgba(255,255,255,0.8)">
                {topics.length}
              </Typography>
              <Typography variant="small" bold color="rgba(255,255,255,0.6)">
                /
              </Typography>
              <Typography variant="small" bold color="rgba(255,255,255,0.6)">
                {MAX_TOPICS}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing="12px"
            sx={{
              opacity: topics.length === MAX_TOPICS ? 0.55 : 1,
              pointerEvents: topics.length === MAX_TOPICS ? "none" : undefined,
            }}
            width={props.mobile ? "100%" : undefined}
          >
            <Stack
              direction="row"
              spacing="8px"
              alignItems="center"
              width={props.mobile ? "100%" : "519px"}
            >
              <UrsorInputField
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  event.target.value.length < CHARACTER_LIMIT &&
                  setValue(event.target.value)
                }
                placeholder="Add a topic..."
                width="100%"
                backgroundBlur="blur(3px)"
                leftAlign
                boldValue
                onEnterKey={addTopic}
              />
            </Stack>
            <Stack
              bgcolor={PALETTE.secondary.purple[2]}
              height="39px"
              width="39px"
              minHeight="39px"
              minWidth="39px"
              justifyContent="center"
              alignItems="center"
              borderRadius="100%"
              sx={{
                opacity: value || topics.length === MAX_TOPICS ? 1 : 0.4,
                pointerEvents: value ? undefined : "none",
                "&:hover": { opacity: 0.7 },
                transition: "0.2s",
                cursor: "pointer",
                svg: {
                  path: {
                    fill: "rgb(255,255,255)",
                  },
                },
              }}
              onClick={addTopic}
            >
              <PlusIcon height="22px" width="22px" />
            </Stack>
          </Stack>
        </Stack>
        <DynamicContainer fullWidth duration={600}>
          <Grid container gap="8px" width="100%">
            {topics.map((t) => (
              <Grid item key={t}>
                <UrsorFadeIn duration={600}>
                  <TopicTag
                    value={t}
                    deletionCallback={() => {
                      const updatedTopics = topics.filter(
                        (topic) => topic !== t
                      );
                      setTopics(updatedTopics);
                      setTitlesWaitingForGenerationUponSignIn(updatedTopics);
                    }}
                  />
                </UrsorFadeIn>
              </Grid>
            ))}
          </Grid>
        </DynamicContainer>
      </Stack>
      <Stack
        sx={{
          opacity: topics.length > 0 ? 1 : 0.5,
          pointerEvents: topics.length === 0 ? "none" : undefined,
        }}
      >
        <UrsorButton
          dark
          variant="tertiary"
          onClick={() => {
            if (user?.email) {
              ApiController.createCollection(topics, user?.email ?? "")
                .then((collection) => {
                  ApiController.createCollectionArticles(collection.id);
                  return collection.id;
                })
                .then((collectionId) => router.push(`/c/${collectionId}`));
            } else {
              props.willSignInCallback?.();
              props.mobile ? loginWithRedirect() : loginWithPopup();
            }
          }}
          backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
          hoverOpacity={0.7}
          endIcon={PaintBrushIcon}
          iconColor={PALETTE.font.light}
          iconSize={16}
        >
          Create
        </UrsorButton>
      </Stack>
    </Stack>
  );
};

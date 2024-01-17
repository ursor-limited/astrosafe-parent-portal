import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PaintBrushIcon from "@/images/icons/PaintBrushIcon.svg";
import X from "@/images/icons/X.svg";
import UrsorFadeIn from "./UrsorFadeIn";

const MAX_TOPICS = 4;
const CHARACTER_LIMIT = 30;

const TopicTag = (props: { value: string; deletionCallback: () => void }) => (
  <Stack
    bgcolor={PALETTE.secondary.grey[2]}
    height="32px"
    px="12px"
    borderRadius="8px"
    spacing="10px"
    alignItems="center"
    direction="row"
  >
    <Typography bold>{props.value}</Typography>
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

export const CreationBox = () => {
  const [value, setValue] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const addTopic = () => {
    setTopics([...topics, value]);
    setValue("");
  };
  return (
    <Stack
      bgcolor="rgba(0,0,0,0.2)"
      px="24px"
      py="20px"
      maxWidth="733px"
      width="733px"
      borderRadius="16px"
      alignItems="center"
      spacing="24px"
    >
      <Stack spacing="8px">
        <Stack spacing="4px">
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
            spacing="8px"
            sx={{
              opacity: topics.length === MAX_TOPICS ? 0.55 : 1,
              pointerEvents: topics.length === MAX_TOPICS ? "none" : undefined,
            }}
          >
            <Stack
              direction="row"
              spacing="8px"
              alignItems="center"
              width="519px"
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
        <Stack direction="row" flexWrap="wrap" spacing="8px">
          {topics.length > 0 ? (
            topics.map((t) => (
              <UrsorFadeIn key={t} duration={600}>
                <TopicTag
                  value={t}
                  deletionCallback={() =>
                    setTopics(topics.filter((topic) => topic !== t))
                  }
                />
              </UrsorFadeIn>
            ))
          ) : (
            <Stack direction="row" spacing="8px" sx={{ opacity: 0.25 }}>
              <TopicTag value="e.g." deletionCallback={() => null} />
              <TopicTag value="cat" deletionCallback={() => null} />
              <TopicTag value="mouse" deletionCallback={() => null} />
            </Stack>
          )}
        </Stack>
      </Stack>
      <UrsorButton
        dark
        variant="tertiary"
        onClick={() => null}
        backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
        hoverOpacity={0.7}
        endIcon={PaintBrushIcon}
        iconColor={PALETTE.font.light}
        iconSize={16}
      >
        Create
      </UrsorButton>
    </Stack>
  );
};

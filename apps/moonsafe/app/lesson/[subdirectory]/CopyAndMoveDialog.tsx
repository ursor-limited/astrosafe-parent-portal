import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/system";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "@/app/components/UrsorDialog";
import { SearchInput } from "@/app/moonsafe/DashboardPageContents";
import { PALETTE, Typography, UrsorButton } from "ui";
import { ILesson } from "./page";
import VersionsIcon from "@/images/icons/VersionsIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { useUserContext } from "@/app/components/UserContext";
import ApiController from "@/app/api";
import { useRouter } from "next/navigation";
import NotificationContext from "@/app/components/NotificationContext";

export default function CopyAndMoveDialog(props: {
  id: string;
  title?: string;
  open: boolean;
  closeCallback: () => void;
}) {
  const userDetails = useUserContext().user;

  const [lessons, setLessons] = useState<ILesson[]>([]);
  useEffect(() => {
    userDetails?.id &&
      ApiController.getUserLessons(userDetails.id).then((l) => setLessons(l));
  }, [userDetails?.id]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ILesson[]>([]);
  useEffect(
    () =>
      setSearchResults(
        searchValue
          ? lessons.filter((l) =>
              l.title.toLowerCase().includes(searchValue.toLowerCase())
            )
          : lessons
      ),
    [lessons, searchValue]
  );
  const [hoveringLessonId, setHoveringLessonId] = useState<
    string | undefined
  >();

  const router = useRouter();

  const notificationCtx = useContext(NotificationContext);

  return (
    <Dialog
      transitionDuration={DEFAULT_FADEIN_DURATION}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          width: "466px",
          maxWidth: "466px",
          minHeight: "546px",
          maxHeight: "546px",
          borderRadius: "24px",
          margin: "20px",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        spacing="24px"
        p="40px"
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        boxSizing="border-box"
        overflow="hidden"
      >
        <Typography bold variant="large" sx={{ textAlign: "center" }}>
          {`Copy and move${props.title ? " " + props.title : ""}`}
        </Typography>
        <Stack spacing="12px" alignItems="center" width="100%">
          <SearchInput
            value={searchValue ?? ""}
            callback={(value: string) => {
              setSearchValue(value);
            }}
            clearCallback={() => setSearchValue(searchValue)}
            grey
            fullWidth
            height="40px"
          />
        </Stack>
        <Stack flex={1} overflow="scroll" width="100%">
          <Stack width="100%">
            {searchResults.map((lesson) => (
              <Stack
                key={lesson.id}
                height="42px"
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                px="12px"
                onMouseEnter={() => setHoveringLessonId(lesson.id)}
                onMouseLeave={() => setHoveringLessonId(undefined)}
                sx={{
                  transition: "0.2s",
                }}
                bgcolor={
                  hoveringLessonId === lesson.id
                    ? PALETTE.secondary.grey[1]
                    : undefined
                }
                spacing="8px"
              >
                <Stack
                  spacing="10px"
                  alignItems="center"
                  direction="row"
                  width="100%"
                  overflow="hidden"
                >
                  <Stack width="20px">
                    <VersionsIcon height="20px" width="20px" />
                  </Stack>

                  <Typography bold noWrap>
                    {lesson.title}
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    opacity: hoveringLessonId === lesson.id ? 1 : 0,
                    transition: "0.2s",
                  }}
                >
                  <UrsorButton
                    dark
                    variant="tertiary"
                    size="small"
                    onClick={() =>
                      userDetails?.id &&
                      ApiController.copyAndMoveContent(
                        props.id,
                        lesson.id,
                        userDetails.id
                      ).then(() => {
                        notificationCtx.success("Copied and moved Content");
                        router.push(`/lesson/${lesson.canonicalUrl}`);
                      })
                    }
                  >
                    Move
                  </UrsorButton>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        {/* <Stack height="50px" width="100%">
          <UrsorButton
            variant="secondary"
            backgroundColor="transparent"
            endIcon={PencilIcon}
            width="100%"
          >
            New Lesson
          </UrsorButton>
        </Stack> */}
      </Stack>
    </Dialog>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import ApiController from "../../../controllers/ApiController";
import _ from "lodash";
import UrsorSelect from "../../../components/inputs/UrsorSelect";
import { DEFAULT_WIDTH } from "../../../components/inputs/UrsorInputField";
import StepDialog, { IDialogStepDetails } from "../../../components/StepDialog";
import { Box, Stack, borderRadius } from "@mui/system";
import { IContent } from "../../../components/LinkCard";
import { Grid } from "@mui/material";
import Typography from "../../../components/Typography";
import { PALETTE } from "../../../palette";
import UrsorFadeIn from "../../../components/UrsorFadeIn";
import { ILesson } from "../components/LessonCard";
import { getRandomColor } from "./LessonDialog";
import { hexToRgb } from "./LinkDialog";

const SUCCESS_MESSAGE = "Imported students";

interface IImportDialogButtonProps {
  selectable?: boolean;
  selected?: boolean;
  text: string;
}

export function ImportDialogButton(props: IImportDialogButtonProps) {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      py="5px"
      px="11px"
      bgcolor={
        props.selected
          ? PALETTE.secondary.purple[2]
          : props.selectable && hovering
          ? PALETTE.secondary.purple[1]
          : PALETTE.secondary.grey[2]
      }
      borderRadius="8px"
      sx={{
        transition: "0.2s",
        cursor: props.selectable ? "pointer" : "auto",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Typography
        bold
        noWrap
        color={
          props.selectable && (props.selected || hovering)
            ? PALETTE.font.light
            : PALETTE.font.dark
        }
        sx={{ pointerEvents: "none" }}
      >
        {props.text}
      </Typography>
    </Stack>
  );
}

export interface IImportLessonDialogProps {
  open: boolean;
  closeCallback: () => void;
  classId: string;
  lessonId?: string;
  linkCreationCallback?: (link: IContent) => void;
}

export default function ImportLessonDialog(props: IImportLessonDialogProps) {
  const userDetails = useUserContext().userDetails;

  //@ts-ignore
  const [gcCourses, setGCCourses] = useState<gapi.client.classroom.Course[]>(
    []
  );
  const [lessonsWithLinks, setLessonsWithLinks] = useState<
    { lesson: ILesson; links: IContent[] }[]
  >([]);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
    undefined
  );
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    props.open &&
      ApiController.getGCCourses(userDetails?.id).then((courses) =>
        setGCCourses(courses)
      );
  }, [props.open]);

  useEffect(() => {
    selectedCourse &&
      ApiController.getLessonsWithLinksFromGCCourse(
        userDetails?.id,
        selectedCourse
      ).then((lessons) => setLessonsWithLinks(lessons));
  }, [selectedCourse]);

  useEffect(() => {
    selectedCourse && step === 0 && setStep(1);
  }, [selectedCourse]);

  const submit = async () =>
    Promise.all(
      selectedLessons.map((lessonId) => {
        const lessonWithLinks = lessonsWithLinks.find(
          (lwl) => lwl.lesson.id === lessonId
        )!;
        if (props.lessonId) {
          /* import links into an existing lesson */
          return Promise.all(
            lessonWithLinks.links.map((link: any) =>
              ApiController.createLink({
                ...link,
                lessonId: props.lessonId,
                teacherOwnerId: userDetails?.id,
                backgroundColor: hexToRgb(getRandomColor()),
              }).then((link) => props.linkCreationCallback?.(link))
            )
          );
        } else {
          /* import a whole lesson */
          return ApiController.createLesson({
            ..._.omit(lessonWithLinks.lesson, "id"),
            backgroundColor: hexToRgb(getRandomColor()),
            classId: props.classId,
            teacherOwnerId: userDetails?.id,
          }).then((newLesson) =>
            Promise.all(
              lessonWithLinks.links.map((link: any) =>
                ApiController.createLink({
                  ...link,
                  lessonId: newLesson.id,
                  teacherOwnerId: userDetails?.id,
                  backgroundColor: hexToRgb(getRandomColor()),
                })
              )
            )
          );
        }
      })
    );

  const clearAll = () => {
    setStep(0);
    setSelectedCourse(undefined);
    setSelectedLessons([]);
    setLessonsWithLinks([]);
  };

  const initStepContent = (
    <Grid
      container
      rowGap="10px"
      columnGap="10px"
      justifyContent="center"
      width="85%"
    >
      {/* {gcCourses.map((course, index) => (
    <Grid
      key={course.id}
      item
      onClick={() => setSelectedCourse(course.id)}
    >
      <UrsorFadeIn duration={800} delay={index * 100}>
        <ImportDialogButton text={course.name!} />
      </UrsorFadeIn>
    </Grid>
  ))} */}
      <UrsorSelect
        items={gcCourses.map((c) => ({
          id: c.id!,
          value: c.name!,
        }))}
        selected={selectedCourse ? [selectedCourse] : []}
        callback={(id: string) => {
          setSelectedCourse(id);
          setStep(1);
        }}
        placeholder="Select a class"
        width={DEFAULT_WIDTH}
      />
    </Grid>
  );

  const steps: IDialogStepDetails[] = [
    {
      title: "Select a class",
      subtitle: [
        "Which Google Classrooms class should we",
        "bring lessons from?",
      ],
      button: {
        text: "Close",
        callback: props.closeCallback,
      },
      content: initStepContent,
      noNextButton: true,
    },
    {
      title: "Select lessons",
      subtitle: ["Which lessons should we", "bring over?"],
      button: {
        text: "Import",
        callback: () => {
          return submit().then(() => true);
        },
        disabled: selectedLessons.length === 0,
      },
      content: (
        <Grid
          container
          rowGap="10px"
          columnGap="10px"
          justifyContent="center"
          width="79%"
        >
          {lessonsWithLinks.map((lwl, index) => (
            <Grid
              item
              key={lwl.lesson.id}
              onClick={() =>
                setSelectedLessons((prev) =>
                  prev.includes(lwl.lesson.id)
                    ? prev.filter((id) => id !== lwl.lesson.id)
                    : [...prev, lwl.lesson.id]
                )
              }
            >
              <UrsorFadeIn duration={800} delay={index * 100}>
                <ImportDialogButton
                  text={lwl.lesson.title!}
                  selectable
                  selected={selectedLessons.includes(lwl.lesson.id)}
                />
              </UrsorFadeIn>
            </Grid>
          ))}
        </Grid>
      ),
      backButtonCallback: () => {
        setSelectedLessons([]);
        setSelectedCourse(undefined);
      },
    },
    {
      title:
        selectedLessons.length > 1
          ? "Your lessons are ready"
          : "Your lesson is ready",
      subtitle: [
        `You can now edit ${selectedLessons.length > 1 ? "them" : "it"}`,
        "or bring lessons from another class too.",
      ],
      content: (
        <Box
          component="img"
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/img/ursorOnboardingImage.png"
        />
      ),
      secondaryButton: {
        text: "Import from another class",
        callback: clearAll,
      },
      noBackButton: true,
    },
  ];

  return (
    <StepDialog
      open={props.open}
      steps={steps}
      step={step}
      callback={(newStep: number) => setStep(newStep)}
      closeCallback={() => {
        clearAll();
        props.closeCallback();
      }}
    />
  );
}

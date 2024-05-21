import { Box, Stack } from "@mui/system";
import React from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import ClassIntroDialogButton from "../components/ClassIntroDialogButton";
import { useDialogContext } from "../DialogContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useGoogleClassroomAPIContext } from "../../../contexts/GoogleClassroomAPIContext";
import DefaultIllustration from "../../../images/DefaultIllustration.svg";
import GoogleClassroomLogo from "../../../images/GoogleClassroomLogo.svg";

export interface IAddLessonForkDialogProps {
  open: boolean;
  closeCallback: () => void;
}

export default function AddLessonForkDialog(props: IAddLessonForkDialogProps) {
  const gcApi = useGoogleClassroomAPIContext();
  const userCtx = useUserContext();
  const dialogCtx = useDialogContext();

  //const [open, setOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   setOpen(
  //     !!(
  //       classroomCtx.lessons &&
  //       classroomCtx.students &&
  //       classroomCtx.students.length + classroomCtx.lessons.length === 0
  //     )
  //   );
  // }, [classroomCtx.students?.length, classroomCtx.lessons?.length]);

  //const [hovering, setHovering] = useState<boolean>(false);

  return (
    <UrsorDialog
      title={"Add Lesson"}
      subtitle={[
        "You can create a lesson,",
        "or bring one in from Google Classroom.",
      ]}
      supertitle="Add a Lesson"
      open={props.open}
      loading={false}
      button={{
        text: "Close",
        callback: props.closeCallback,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <Stack
        direction="row"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        spacing="30px"
      >
        <Box
          onClick={() => {
            dialogCtx.open("createLesson");
          }}
          height="100%"
        >
          <ClassIntroDialogButton
            title="Create new"
            illustration={DefaultIllustration}
          />
        </Box>
        <Box
          onClick={() =>
            gcApi.setGoogleAuthWarningCallbackAndFeature("importLesson", () =>
              dialogCtx.open("importLesson")
            )
          }
          height="100%"
        >
          <ClassIntroDialogButton
            title="Import from Google Classroom"
            illustration={GoogleClassroomLogo}
          />
        </Box>
      </Stack>
    </UrsorDialog>
  );
}

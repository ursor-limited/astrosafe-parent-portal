import React, { useEffect, useState } from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import UrsorInputField from "../../../components/inputs/UrsorInputField";
import ApiController from "../../../controllers/ApiController";
import { Stack } from "@mui/system";
import NotificationContext from "../../../contexts/NotificationContext";
import _ from "lodash";
import { useLocalStorage } from "usehooks-ts";
import { ITeacher } from "../../AdminPage/AdminPageTeachersTab";
import { useUserContext } from "../../../contexts/UserContext";
import ToggleWithText from "../../../components/ToggleWithText";

export const FIELD_SPACING = "12px";
const SUCCESS_MESSAGE = "Edited your details";

export interface IEditTeacherDialogProps {
  open: boolean;
  closeCallback: () => void;
}

export default function EditTeacherDialog(props: IEditTeacherDialogProps) {
  const userCtx = useUserContext();
  const notificationCtx = React.useContext(NotificationContext);

  const [name, setName] = useState<string>("");
  const [teachingName, setTeachingName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userCtx.userDetails) {
      setName(userCtx.userDetails.realName);
      setTeachingName(userCtx.userDetails.teacherName);
    }
  }, [userCtx.userDetails]);

  return (
    <UrsorDialog
      title={"Edit your details"}
      subtitle={["Here you can", "change your name."]}
      open={props.open}
      loading={loading}
      button={{
        text: "Save changes",
        disabled:
          name === userCtx.userDetails?.realName &&
          teachingName === userCtx.userDetails.teacherName,
        callback: async () => {
          ApiController.updateTeacher(userCtx.userDetails?.id, {
            realName: name,
            teacherName: teachingName,
          })
            .then(() => notificationCtx.success(SUCCESS_MESSAGE))
            .finally(() => {
              userCtx.load();
              props.closeCallback();
            })
            .catch((error) => notificationCtx.error(error.message));
        },
      }}
      onCloseCallback={props.closeCallback}
    >
      <Stack width="100%" spacing={FIELD_SPACING} alignItems="center">
        <UrsorInputField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          value={name}
          placeholder={"Name"}
        />
        <UrsorInputField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTeachingName(event.target.value)
          }
          value={teachingName}
          placeholder={"Name"}
        />
      </Stack>
    </UrsorDialog>
  );
}

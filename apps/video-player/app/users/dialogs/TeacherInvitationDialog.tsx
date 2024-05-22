import BrowserApiController, { ISchool } from "@/app/browserApi";
import { useBrowserUserContext } from "@/app/components/BrowserUserContext";
import NotificationContext from "@/app/components/NotificationContext";
import UrsorDialog from "@/app/components/UrsorDialog";
import { Stack } from "@mui/system";
import _ from "lodash";
import React, { useState } from "react";
import { Typography, UrsorInputField } from "ui";

export interface ITeacherInvitationDialogProps {
  open: boolean;
  closeCallback: () => void;
  callback: () => void;
  school: ISchool;
}

export default function TeacherInvitationDialog(
  props: ITeacherInvitationDialogProps
) {
  const notificationCtx = React.useContext(NotificationContext);
  const [email, setEmail] = useState<string>("");
  const userDetails = useBrowserUserContext().userDetails;
  return (
    <UrsorDialog
      title="Add a Teacher"
      subtitle={["Invite a Teacher by email."]}
      supertitle="Add a Teacher"
      open={props.open}
      onCloseCallback={() => {
        props.closeCallback();
        setEmail("");
      }}
      backButtonCallback={() => {
        props.closeCallback();
        setEmail("");
      }}
      button={{
        text: "Invite",
        callback: () =>
          BrowserApiController.inviteTeacher(
            //userCtx.userDetails?.schoolId,
            email,
            userDetails?.id ?? ""
          )
            .then(() => notificationCtx.success("Invited Teacher"))
            .then(props.callback)
            .then(props.closeCallback)
            .then(() => setEmail("")),
        disabled: !email,
      }}
      secondaryButton={{
        // variant: "ghost",
        text: "Copy Join Code",
        callback: () => {
          navigator.clipboard.writeText(props.school.teacherCode);
          notificationCtx.success("Copied to clipboard.");
        },
      }}
    >
      <Stack spacing="60px" alignItems="center">
        <UrsorInputField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          value={email}
          placeholder={"r.feynman@academy.co.uk"}
          width={"410px"}
        />
        <Stack spacing="16px" alignItems="center">
          <Typography variant="medium">Or share the Join Code:</Typography>
          <Typography variant="h3">
            {_.chunk(props.school.teacherCode, 3).join("-").replaceAll(",", "")}
          </Typography>
        </Stack>
      </Stack>
    </UrsorDialog>
  );
}

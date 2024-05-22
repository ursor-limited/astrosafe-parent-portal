import React, { useState } from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import UrsorInputField from "../../../components/inputs/UrsorInputField";
import { TeacherAddition } from "../UsersPageTeachersTab";

export type UserType = "student" | "teacher";

export interface ITeacherAdditionDialogProps {
  open: boolean;
  onCloseCallback: () => void;
  submitCallback: (teacherDetails: TeacherAddition) => Promise<void>;
}

export default function TeacherAdditionDialog(
  props: ITeacherAdditionDialogProps
) {
  const [email, setEmail] = useState<string>("");

  return (
    <UrsorDialog
      title={`Invite a Teacher to ASTRO`}
      supertitle="Add a Teacher"
      subtitle={[
        "Enter the email of a Teacher whom you want to invite to ASTRO.",
        "An email will be sent with instructions on how to get started!",
      ]}
      open={props.open}
      onCloseCallback={() => {
        setEmail("");
        props.onCloseCallback();
      }}
      backButtonCallback={() => {
        setEmail("");
        props.onCloseCallback();
      }}
      button={{
        text: "Invite",
        disabled: email.length === 0,
        callback: async () => {
          await props.submitCallback({ email });
          setEmail("");
          props.onCloseCallback();
        },
      }}
    >
      <UrsorInputField
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
        value={email}
        placeholder={"AdaLovelace@example.com"}
      />
    </UrsorDialog>
  );
}

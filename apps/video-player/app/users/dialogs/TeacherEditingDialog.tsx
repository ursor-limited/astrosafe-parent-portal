import React, { useState } from "react";
import { Box, Stack, Switch } from "@mui/material";
import { PALETTE, Typography, UrsorInputField } from "ui";
import UrsorToggle from "@/app/components/UrsorToggle";
import { ITeacher, TeacherUpdate } from "../UsersPageTeachersTab";
import { useBrowserUserContext } from "@/app/components/BrowserUserContext";
import UrsorDialog from "@/app/components/UrsorDialog";

export const SWITCH_LENGTH = 61; // px
export const SWITCH_HEIGHT = 33; // px
export const SWITCH_THUMB_MARGIN = 3;
export const SWITCH_THUMB_SIZE = SWITCH_HEIGHT - 2 * SWITCH_THUMB_MARGIN;
export const SWITCH_MOVEMENT_DISTANCE =
  SWITCH_LENGTH - SWITCH_THUMB_SIZE - 2 * SWITCH_THUMB_MARGIN;

export const switchStyle = {
  width: `${SWITCH_LENGTH}px`,
  height: `${SWITCH_HEIGHT}px`,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: `${SWITCH_THUMB_MARGIN}px`,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: `translateX(${SWITCH_MOVEMENT_DISTANCE}px)`,
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: PALETTE.primary.indigo,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: `${SWITCH_THUMB_SIZE}px`,
    height: `${SWITCH_THUMB_SIZE}px`,
  },
  "& .MuiSwitch-track": {
    borderRadius: "50px",
    backgroundColor: "#E9E9EA",
    opacity: 1,
  },
};

export interface ITeacherEditingDialogProps {
  teacher: ITeacher;
  open: boolean;
  onCloseCallback: () => void;
  submitCallback: (update: TeacherUpdate) => void;
  deleteAccountCallback: () => void;
}

export default function TeacherEditingDialog(
  props: ITeacherEditingDialogProps
) {
  const userCtx = useBrowserUserContext();

  const [teachingName, setTeachingName] = useState<string>(
    props.teacher.teacherName
  );
  const [realName, setRealName] = useState<string>(props.teacher.realName);
  const [isAdmin, setIsAdmin] = useState<boolean>(props.teacher.isAdmin);

  const [successViewOpen, setSuccessViewOpen] = useState<boolean>(false);

  const getValuesChanged = () =>
    teachingName !== props.teacher.teacherName ||
    realName !== props.teacher.realName ||
    isAdmin !== props.teacher.isAdmin;

  return (
    <UrsorDialog
      title={"Edit Teacher account"}
      supertitle="Edit Teacher account"
      open={props.open}
      onCloseCallback={() => {
        setSuccessViewOpen(false);
        props.onCloseCallback();
      }}
      button={{
        text: "Save changes",
        disabled: !getValuesChanged(),
        callback: async () => {
          props.submitCallback({
            teacherName: teachingName,
            realName: realName,
            isAdmin: isAdmin,
          });
        },
      }}
    >
      <Stack spacing={5}>
        <Stack spacing={2} alignItems="center">
          <UrsorInputField
            onChange={(change: React.ChangeEvent<HTMLInputElement>) =>
              setRealName(change.target.value)
            }
            value={realName}
            placeholder={"Real name"}
          />
          <UrsorInputField
            onChange={(change: React.ChangeEvent<HTMLInputElement>) =>
              setTeachingName(change.target.value)
            }
            value={teachingName}
            placeholder={"Real name"}
            width="400px"
          />
          {userCtx.userDetails?.id !== props.teacher.id ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="normal"
                faded
                sx={{
                  width: 0,
                  overflow: "visible",
                  direction: "rtl",
                }}
              >
                Admin
              </Typography>

              <UrsorToggle
                checked={isAdmin}
                callback={() => setIsAdmin(!isAdmin)}
              />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </UrsorDialog>
  );
}

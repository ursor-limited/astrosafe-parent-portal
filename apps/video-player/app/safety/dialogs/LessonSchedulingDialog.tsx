import React from "react";
import UrsorDialog from "../../../components/UrsorDialog";
import UrsorDatePicker from "../../../components/inputs/UrsorDatePicker";
import NotificationContext from "../../../contexts/NotificationContext";
import { getIsToday } from "./StudentDialog/StudentDialogFeedItemCard";

export interface ILessonSchedulingDialogProps {
  open: boolean;
  closeCallback: () => void;
  selected: Date;
  selectionCallback: (date: Date) => void;
  completeCallback: () => void;
  draftCallback: () => void;
  //releaseNowCallback: () => void;
}

export default function LessonSchedulingDialog(
  props: ILessonSchedulingDialogProps
) {
  const notificationCtx = React.useContext(NotificationContext);
  return (
    <UrsorDialog
      open={props.open}
      title={"Schedule Lesson Posting Date"}
      subtitle={[
        "Select a date for when you want this lesson to appear",
        "on your students' devices.",
      ]}
      supertitle="Schedule Lesson"
      secondaryButton={{
        text: "Save as Draft",
        callback: () => {
          props.draftCallback();
          notificationCtx.success("Draft saved.");
        },
      }}
      button={{
        text: getIsToday(props.selected.toDateString())
          ? "Post now"
          : "Schedule",
        callback: () => {
          props.completeCallback();
          notificationCtx.success(
            getIsToday(props.selected.toDateString())
              ? "Lesson posted 🚀"
              : "Lesson scheduled"
          );
        },
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
    >
      <UrsorDatePicker
        value={props.selected ?? new Date()}
        onChange={props.selectionCallback}
        hidePast
      />
    </UrsorDialog>
  );
}

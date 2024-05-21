import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import _ from "lodash";
import NotificationContext from "../../../contexts/NotificationContext";
import ApiController from "../../../controllers/ApiController";
import UrsorFadeIn from "../../../components/UrsorFadeIn";
import { HIDE_SCROLLBAR } from "./LessonCard";
import { rgbToHex } from "../dialogs/LinkDialog";
import { PALETTE } from "../../../palette";
import { DEFAULT_CORNER_RADIUS } from "../../../components/UrsorPopover";
import { IFeedItem } from "../dialogs/StudentDialog/StudentDialogFeedItemCard";
import FeedItemCard, { FeedWelcomeCard } from "./FeedItemCard";
import FilterSelect from "./FilterSelect";
import FeedPopupFilterSelect, { FeedFilter } from "./FeedPopupFilterSelect";
import { useUserContext } from "../../../contexts/UserContext";
import { StudentWithState } from "../dialogs/StudentDialog/StudentDialog";
import Typography from "../../../components/Typography";
import LightMode from "../../../components/LightMode";
import { useUserDataContext } from "../../../contexts/UserDataContext";

const WIDTH = "324px";
const HEIGHT = "576px";
const PADDING = "12px";
export const SPACING = "8px";

export const UPDATE_PERIOD = 15000; // milliseconds

export interface IFeedPopupProps {
  open: boolean;
  closeCallback: () => void;
  classroomId?: string;
  statefulStudents?: StudentWithState[];
}

export default function FeedPopupContent(props: IFeedPopupProps) {
  const userCtx = useUserContext();
  const dataCtx = useUserDataContext();
  const notificationCtx = useContext(NotificationContext);
  const [classroomFeed, setClassroomFeed] = useState<IFeedItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FeedFilter>("classroom");

  useEffect(
    () => setSelectedFilter(props.classroomId ? "classroom" : "all"),
    [props.classroomId]
  );

  const loadFeed = () => {
    props.classroomId &&
      ApiController.getClassroomFeed(props.classroomId)
        .then((feed) => setClassroomFeed(feed))
        .catch((error) => notificationCtx.error(error.message));
  };

  useEffect(() => {
    if (!userCtx.userDetails?.id) {
      return;
    }
    loadFeed();
    const interval = setInterval(loadFeed, UPDATE_PERIOD);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [userCtx.userDetails?.id]);

  return (
    <Stack
      height={HEIGHT}
      width={WIDTH}
      bgcolor={PALETTE.primary.offWhite}
      p={PADDING}
      borderRadius={DEFAULT_CORNER_RADIUS}
      spacing="6px"
      overflow="hidden"
    >
      <LightMode>
        {props.classroomId ? (
          <FeedPopupFilterSelect
            selected={selectedFilter}
            callback={(id) => setSelectedFilter(id)}
          />
        ) : (
          <Typography bold variant="small">
            All Classrooms
          </Typography>
        )}
      </LightMode>
      {dataCtx.feed.length > 0 ? (
        <Stack direction="row" spacing="28px" flex={1} overflow="hidden">
          <Stack overflow="scroll" flex={1} sx={HIDE_SCROLLBAR}>
            <Stack spacing={SPACING} flex={1}>
              {selectedFilter === "all" ? (
                dataCtx.feed.length > 0 ? (
                  _.reverse(dataCtx.feed.slice()).map((item, index) => (
                    <Stack key={item.id}>
                      <UrsorFadeIn duration={1000} delay={index * 200}>
                        <FeedItemCard
                          key={item.id}
                          item={item}
                          currentClassroom={
                            item.actionObjectId === props.classroomId
                          }
                          closeCallback={props.closeCallback}
                          statefulStudents={props.statefulStudents}
                        />
                      </UrsorFadeIn>
                    </Stack>
                  ))
                ) : (
                  <UrsorFadeIn key="new" duration={1000} delay={500}>
                    <FeedWelcomeCard scope="teacher" />
                  </UrsorFadeIn>
                )
              ) : null}
              {selectedFilter === "classroom" ? (
                classroomFeed.length > 0 ? (
                  _.reverse(classroomFeed.slice()).map((item, index) => (
                    <Stack key={item.id}>
                      <UrsorFadeIn duration={1000} delay={index * 200}>
                        <FeedItemCard
                          key={item.id}
                          item={item}
                          currentClassroom
                          closeCallback={props.closeCallback}
                        />
                      </UrsorFadeIn>
                    </Stack>
                  ))
                ) : (
                  <UrsorFadeIn key="new" duration={1000} delay={500}>
                    <FeedWelcomeCard scope="classroom" />
                  </UrsorFadeIn>
                )
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}

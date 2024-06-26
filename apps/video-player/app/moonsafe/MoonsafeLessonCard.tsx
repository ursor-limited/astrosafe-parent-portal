import { useContext, useEffect, useState } from "react";
import { Stack, keyframes } from "@mui/system";
import { ILesson } from "../lesson/[subdirectory]/page";
import { PALETTE, Typography } from "ui";
import Star from "@/images/Star.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import CircleQuestionIcon from "@/images/icons/CircleQuestionIcon.svg";
import NotificationContext from "../components/NotificationContext";
import ApiController from "../api";
import UrsorActionButton from "../components/UrsorActionButton";
import { spin } from "../components/LessonCard";
import DeletionDialog from "../components/DeletionDialog";
import { useRouter } from "next/navigation";
import { SECONDARY_COLOR_ORDER } from "../dashboard/LinkDialog";
import useOrangeBorder from "../components/useOrangeBorder";
import _ from "lodash";

const MoonsafeLessonCardTag = (props: {
  text: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <Stack
    height="24px"
    px="8px"
    boxSizing="border-box"
    direction="row"
    spacing="8px"
    alignItems="center"
    bgcolor={PALETTE.secondary.grey[1]}
    borderRadius="12px"
    sx={{
      svg: {
        path: {
          fill: props.color,
        },
      },
    }}
  >
    <props.icon width="16px" height="16px" />
    <Typography color={props.color} variant="tiny" bold>
      {props.text}
    </Typography>
  </Stack>
);

const MoonsafeLessonCard = (
  props: ILesson & {
    clickCallback?: () => void;
    editingCallback?: () => void;
    deletionCallback?: () => void;
    strongShadow?: boolean;
  }
) => {
  const notificationCtx = useContext(NotificationContext);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);
  const submitDeletion = () =>
    ApiController.deleteLesson(props.id)
      .then(() => notificationCtx.negativeSuccess("Deleted Lesson."))
      .then(props.deletionCallback);

  const [stackCard1Color, setStackCard1Color] = useState<string>("#ffffff");
  const [stackCard2Color, setStackCard2Color] = useState<string>("#ffffff");
  useEffect(() => {
    setStackCard1Color(
      PALETTE.secondary[
        SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
      ][_.random(2, 5)]
    );
    setStackCard2Color(
      PALETTE.secondary[
        SECONDARY_COLOR_ORDER[_.random(SECONDARY_COLOR_ORDER.length - 1)]
      ][_.random(2, 5)]
    );
  }, []);

  const [hovering, setHovering] = useState<boolean>(false);

  const router = useRouter();

  const orangeBorderOn = useOrangeBorder(props.updatedAt);

  return (
    <>
      <Stack
        width="100%"
        position="relative"
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <Stack
          position="absolute"
          top={0}
          right={0}
          left={0}
          marginLeft="auto"
          marginRight="auto"
          width="calc(100% - 36px)"
          height="60px"
          borderRadius="12px"
          bgcolor={stackCard1Color}
          sx={{
            transform: `rotate(-${hovering ? 6 : 2.6}deg) translateY(-7px)`,
            transition: "0.4s",
          }}
          boxShadow={
            props.strongShadow
              ? "0 0 20px rgba(0,0,0,0.08)"
              : "0 0 12px rgba(0,0,0,0.06)"
          }
          zIndex={0}
        />
        <Stack
          position="absolute"
          top={0}
          right={0}
          left={0}
          marginLeft="auto"
          marginRight="auto"
          width="calc(100% - 20px)"
          height="60px"
          borderRadius="12px"
          bgcolor={stackCard2Color}
          sx={{
            transform: `rotate(${hovering ? 5 : 1.4}deg) translateY(-7px)`,
            transition: "0.4s",
          }}
          boxShadow={
            props.strongShadow
              ? "0 0 20px rgba(0,0,0,0.08)"
              : "0 0 12px rgba(0,0,0,0.06)"
          }
          zIndex={0}
        />
        {props.editingCallback && props.deletionCallback ? (
          <Stack
            position="absolute"
            top="11px"
            right="11px"
            zIndex={2}
            onClick={() => router.push(`/lesson/${props.canonicalUrl}`)}
          >
            <UrsorActionButton
              size="32px"
              iconSize="16px"
              notClickable
              actions={[
                {
                  text: "Edit",
                  kallback: () => props.editingCallback?.(),
                  icon: PencilIcon,
                },
                {
                  text: "Delete",
                  kallback: () => setDeletionDialogOpen(true),
                  icon: TrashcanIcon,
                  color: PALETTE.system.red,
                },
              ]}
            />
          </Stack>
        ) : null}
        <Stack
          borderRadius="12px"
          border={`4px solid rgb(255,255,255)`}
          boxSizing="border-box"
          sx={{
            transition: "0.2s",
            outline: orangeBorderOn
              ? `3px solid ${PALETTE.system.orange}`
              : undefined,
          }}
          bgcolor="rgb(255,255,255)"
          width="100%"
          boxShadow={
            props.strongShadow
              ? "0 0 20px rgba(0,0,0,0.08)"
              : "0 0 12px rgba(0,0,0,0.06)"
          }
          position="relative"
          pb="6px"
        >
          <Stack
            flex={1}
            onClick={props.clickCallback}
            sx={{
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { opacity: 0.6 },
            }}
            borderRadius="8px 8px 0 0"
            overflow="hidden"
          >
            <Stack
              height="235px"
              minHeight="235px"
              width="100%"
              direction="row"
              spacing="4px"
            >
              <Stack
                flex={1}
                bgcolor={PALETTE.secondary.orange[4]}
                position="relative"
                justifyContent="center"
                alignItems="center"
                sx={{
                  opacity: 0.74,
                  svg: {
                    transform: "rotate(26deg)",
                  },
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: props.imageUrls?.[0]
                    ? `url(${props.imageUrls[0]})`
                    : undefined,
                }}
              >
                {!props.imageUrls?.[0] ? (
                  <Stack
                    sx={{
                      animation: `${spin} 9s linear`,
                      animationIterationCount: "infinite",
                    }}
                  >
                    <Star height="52px" width="52px" />
                  </Stack>
                ) : null}
              </Stack>
              <Stack spacing="4px" width="50%">
                <Stack
                  flex={1}
                  bgcolor={PALETTE.secondary.blue[2]}
                  position="relative"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    opacity: 0.74,
                    svg: {
                      transform: "rotate(39deg)",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: props.imageUrls?.[1]
                      ? `url(${props.imageUrls[1]})`
                      : undefined,
                  }}
                >
                  {!props.imageUrls?.[1] ? (
                    <Stack
                      sx={{
                        animation: `${spin} 12s linear`,
                        animationDirection: "reverse",
                        animationIterationCount: "infinite",
                      }}
                    >
                      <Star height="20px" width="20px" />
                    </Stack>
                  ) : null}
                </Stack>
                <Stack
                  flex={1}
                  bgcolor={PALETTE.secondary.green[3]}
                  position="relative"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    opacity: 0.74,
                    svg: {
                      transform: "rotate(50deg)",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: props.imageUrls?.[2]
                      ? `url(${props.imageUrls[2]})`
                      : undefined,
                  }}
                >
                  {!props.imageUrls?.[2] ? (
                    <Stack
                      sx={{
                        animation: `${spin} 4s linear`,
                        animationIterationCount: "infinite",
                      }}
                    >
                      <Star height="20px" width="20px" />
                    </Stack>
                  ) : null}
                </Stack>
              </Stack>
            </Stack>
            <Stack px="4px" spacing="12px">
              <Stack alignItems="space-between" flex={1} minHeight="58px">
                <Stack pt="8px">
                  <Typography variant="h5" maxLines={1}>
                    {props.title}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" spacing="8px">
              <MoonsafeLessonCardTag
                text="1h 25m"
                color={PALETTE.secondary.grey[5]}
                icon={ClockIcon}
              />
              <MoonsafeLessonCardTag
                text={`${props.contents.length} videos`}
                color={PALETTE.system.red}
                icon={CirclePlayIcon}
              />
              <MoonsafeLessonCardTag
                text="Nintendo 64"
                color={PALETTE.secondary.blue[2]}
                icon={CircleQuestionIcon}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={submitDeletion}
        category="Lesson"
        title={props.title}
      />
      {/* ) : null} */}
    </>
  );
};

export default MoonsafeLessonCard;

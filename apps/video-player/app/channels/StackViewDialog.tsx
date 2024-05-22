import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import NotificationContext from "../components/NotificationContext";
import { AstroContent, GRID_SPACING } from "./ChannelsPageContents";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import BrowserApiController, { IStack } from "../browserApi";
import { IActionPopupItem } from "../components/ActionPopup";
import ClippyIcon from "@/images/icons/ClippyIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import UrsorFadeIn from "../components/UrsorFadeIn";
import BrowserLinkCard from "../safety/BrowserLinkCard";
import { PALETTE, Typography, UrsorButton } from "ui";
import useColumnWidth from "../dashboard/useColumnWidth";
import FixedBottomDialog from "../components/FixedBottomDialog";
import _ from "lodash";
import UrsorActionButton from "../components/UrsorActionButton";
import DeletionDialog from "./DeletionDialog";
import dayjs from "dayjs";
import Image from "next/image";

const WIDTH = "85%";

export interface IStackViewDialogProps {
  open: boolean;
  closeCallback: () => void;
  newLinkCallback: () => void;
  editCallback: () => void;
  openLinkCallback: (id: string) => void;
  editLinkCallback: (id: string) => void;
  stack?: IStack;
  links: IBrowserLink[];
}

export default function StackViewDialog(props: IStackViewDialogProps) {
  const userCtx = useBrowserUserContext();
  const notificationCtx = useContext(NotificationContext);

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IBrowserLink | IStack;
    }[][]
  >([]);

  const [stack, setStack] = useState<IStack | undefined>(undefined);
  useEffect(() => setStack(props.stack), [props.stack]);
  // const [selectedChannelId, setSelectedChannelId] = useState<
  //   string | undefined
  // >(undefined);
  // useEffect(() => {
  //   stack && setSelectedChannelId(stack.id);
  // }, [stack]);

  // const [selectedStackId, setSelectedStackId] = useState<string | undefined>(
  //   stackId
  // );

  const actions: IActionPopupItem[] = [
    // {
    //   text: "Enter class",
    //   icon: ArrowUpRightIcon,
    //   kallback: () => navigate("/classroom/" + props.classroom.id),
    // },
    {
      text: "Edit",
      icon: PencilIcon,
      kallback: () => props.editCallback?.(),
    },
    {
      text: "Duplicate",
      icon: ClippyIcon,
      kallback: () =>
        BrowserApiController.duplicateStack(stack?.id ?? "")
          .then(props.editCallback)
          .then(() => notificationCtx.success("Stack duplicated")),
    },
    // {
    //   text: "Duplicate",
    //   icon: ClippyIcon,
    //   kallback: duplicate,
    // },
    // {
    //   text: "Export",
    //   icon: UploadIcon,
    //   kallback: props.exportCallback,
    // },
    // {
    //   text: props.classroom.isArchived ? "Unarchive" : "Archive",
    //   icon: ClockIcon,
    //   kallback: () => archive(props.classroom.isArchived),
    // },
    {
      text: "Delete",
      icon: TrashcanIcon,
      kallback: () => setDeletionDialogOpen(true),
      color: PALETTE.system.red,
    },
  ];

  const { nColumns, setColumnsContainerRef } = useColumnWidth();
  useEffect(() => {
    if (nColumns < 0) return;
    const linkDetails = (
      props.links?.filter((l) => l.stackId === stack?.id) || []
    ).map((l) => ({
      type: "link" as AstroContent,
      details: l,
    }));
    const details = _.reverse(
      _.sortBy(linkDetails, (c) => new Date(c.details.createdAt)).slice()
    );
    const chunked = _.chunk(details, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [props.links, nColumns, stack]);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(
      userCtx?.userDetails?.schoolId ?? ""
    ).then((t) => setTeachers(t));
  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <>
      <FixedBottomDialog
        open={props.open}
        closeCallback={props.closeCallback}
        width={WIDTH}
        backgroundColor={PALETTE.secondary.grey[1]}
      >
        <Stack
          flex={1}
          width="100%"
          borderRadius="16px 16px 0 0"
          bgcolor={PALETTE.secondary.grey[1]}
          p={GRID_SPACING}
        >
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            pb="60px"
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                svg: {
                  path: {
                    fill: PALETTE.secondary.grey[4],
                  },
                },
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              onClick={props.closeCallback}
            >
              <ChevronLeft width="20px" height="20px" />
              <Typography color={PALETTE.secondary.grey[4]}>Back</Typography>
            </Stack>
            <Stack direction="row" spacing="12px">
              <Stack
                width="42px"
                height="42px"
                //bgcolor="rgb(255,255,255)"
                justifyContent="center"
                alignItems="center"
                borderRadius="100%"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
              >
                <UrsorActionButton
                  background="rgb(255,255,255)"
                  size="42px"
                  actions={actions}
                  large
                />
              </Stack>
              <UrsorButton
                dark
                variant="tertiary"
                endIcon={PlusIcon}
                onClick={props.newLinkCallback}
              >
                Add Link
              </UrsorButton>
            </Stack>
          </Stack>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing="12px"
            >
              <Stack flex={1}>
                <Typography>
                  {dayjs(stack?.createdAt).format("Do MMMM YYYY")}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    minWidth: "100%",
                    maxWidth: 0,
                  }}
                  noWrap
                >
                  {stack?.title}
                </Typography>
              </Stack>
              <Stack spacing="6px" pr="2px">
                <Stack spacing="8px" alignItems="center" direction="row">
                  <LinkIcon width="16px" height="16px" />
                  <Typography variant="medium">{`${stack?.nLinks} Link${
                    stack?.nLinks === 1 ? "" : "s"
                  }`}</Typography>
                </Stack>
                <Stack spacing="8px" alignItems="center" direction="row">
                  <PersonIcon width="16px" height="16px" />
                  <Typography variant="medium">{`By ${teachers.find(
                    (t) => t.id === stack?.creatorId
                  )?.teacherName}`}</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              height={stack?.description ? "80px" : "30px"}
              justifyContent="center"
            >
              <Typography>{stack?.description}</Typography>
            </Stack>
          </Stack>
          {cardColumns.flat().length === 0 ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <Stack>
                <UrsorFadeIn delay={300} duration={1000}>
                  <Stack spacing="0px" position="relative">
                    <Stack sx={{ opacity: 0.3, filter: "grayscale(1)" }}>
                      <Image
                        src="https://ursorassets.s3.eu-west-1.amazonaws.com/GraphIllustration.svg"
                        width={217}
                        height={207}
                        alt="Upgrade dialog illustration"
                      />
                    </Stack>
                    <Stack
                      position="absolute"
                      bottom="-8px"
                      width="100%"
                      alignItems="center"
                    >
                      <UrsorButton
                        onClick={props.newLinkCallback}
                        endIcon={PlusIcon}
                        dark
                        variant="tertiary"
                      >
                        Add Link
                      </UrsorButton>
                    </Stack>
                  </Stack>
                </UrsorFadeIn>
              </Stack>
            </Stack>
          ) : (
            <Stack
              ref={setColumnsContainerRef}
              direction="row"
              flex={1}
              spacing={GRID_SPACING}
            >
              {cardColumns.map((column, i) => (
                <Stack key={i} flex={1} spacing={GRID_SPACING}>
                  {column.map((item, j) => (
                    <Stack key={item.details.id}>
                      <UrsorFadeIn
                        key={item.details.id}
                        delay={j * 150 + i * 80}
                        duration={800}
                      >
                        <BrowserLinkCard
                          key={item.details.id}
                          link={item.details as IBrowserLink}
                          clickCallback={() => {
                            props.openLinkCallback(item.details.id);
                          }}
                          updateCallback={() => {
                            props.editLinkCallback(item.details.id);
                          }}
                          duplicateCallback={() => {
                            BrowserApiController.duplicateLink(
                              item.details.id,
                              userCtx.userDetails?.id ?? ""
                            ).then(props.editCallback);
                          }}
                        />
                      </UrsorFadeIn>
                    </Stack>
                  ))}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </FixedBottomDialog>
      {/* <LinkDialog
        channelId={selectedChannelId}
        stackId={selectedStackId}
        newChannelCallback={() =>
          dialogCtx.setChannelDialogProps({
            completionCallback: (id) => {
              setSelectedChannelId(id);
            },
            open: true,
            closeCallback: () => null,
          })
        }
        newStackCallback={() => setStackDialogOpen(true)}
        open={linkDialogOpen}
        closeCallback={() => setLinkDialogOpen(false)}
      /> */}
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={() =>
          BrowserApiController.deleteStack(stack?.id ?? "")
            .then(props.closeCallback)
            .then(props.editCallback)
            .then(() => notificationCtx.negativeSuccess("Stack deleted"))
        }
        category="Stack"
        title={stack?.title ?? ""}
      />
    </>
  );
}

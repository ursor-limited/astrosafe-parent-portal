"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { IActionPopupItem } from "../components/ActionPopup";
import PencilIcon from "@/images/icons/Pencil.svg";
import ClippyIcon from "@/images/icons/ClippyIcon.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import FolderIcon from "@/images/icons/FolderIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import NotificationContext from "../components/NotificationContext";
import BrowserApiController, { IStack } from "../browserApi";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";
import UrsorActionButton from "../components/UrsorActionButton";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import UrsorFadeIn from "../components/UrsorFadeIn";
import ChannelDialog from "../safety/ChannelDialog";
import PageLayout, {
  SIDEBAR_X_MARGIN,
  SIDEBAR_Y_MARGIN,
} from "../dashboard_DESTINED_FOR_THE_FURNACE/PageLayout";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import _ from "lodash";
import BrowserLinkCard from "../safety/BrowserLinkCard";
import StackCard from "../safety/StackCard";
import BrowserLinkDialog from "../safety/BrowserLinkDialog";
import AddDialog from "./AddDialog";
import StackViewDialog from "./StackViewDialog";
import LinkViewDialog from "./LinkViewDialog";
import Image from "next/image";
import useColumnWidth from "../dashboard_DESTINED_FOR_THE_FURNACE/useColumnWidth";
import StackDialog from "../safety/StackDialog";
import DeletionDialog from "../components/DeletionDialog";

export const GRID_SPACING = "20px";

export interface IChannel_DEPRECATED {
  id: string;
  creatorId?: string;
  schoolId: string;
  title: string;
  nLinks: number;
  nStacks: number;
  starter?: boolean;
  color: string;
}

const ChannelCard = (props: {
  channel: IChannel_DEPRECATED;
  nStacks: number;
  nLinks: number;
  selected: boolean;
  callback: () => void;
  editCallback: () => void;
  deleteCallback: () => void;
  updateCallback: () => void;
  hideCreator?: boolean;
}) => {
  const notificationCtx = useContext(NotificationContext);
  const [hovering, setHovering] = useState<boolean>(false);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const userDetails = useBrowserUserContext().userDetails;

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(userDetails?.schoolId ?? "").then(
      (t) => setTeachers(t)
    );
  useEffect(() => {
    userDetails?.schoolId && loadTeachers();
  }, [userDetails?.schoolId]);

  const actions: IActionPopupItem[] = [
    {
      text: "Edit",
      icon: PencilIcon,
      kallback: props.editCallback,
    },
    {
      text: "Duplicate",
      icon: ClippyIcon,
      kallback: () =>
        BrowserApiController.duplicateChannel(props.channel.id)
          .then(props.updateCallback)
          .then(() => notificationCtx.success("Channel duplicated")),
    },
    {
      text: "Delete",
      icon: TrashcanIcon,
      kallback: () => setDeletionDialogOpen(true),
      // dialogCtx.setDeletionDialogProps({
      //   category: "Channel",
      //   title: props.channel.title,
      //   open: true,
      //   deletionCallback: () =>
      //     BrowserApiController.deleteChannel(props.channel.id)
      //       .then(dataCtx.refreshChannels)
      //       .then(props.deleteCallback)
      //       .then(() => notificationCtx.negativeSuccess("Channel deleted")),
      //   closeCallback: () => null,
      // }),
      color: PALETTE.system.red,
    },
  ];
  return (
    <>
      <Stack
        borderRadius="12px"
        px="12px"
        py="8px"
        bgcolor={
          props.selected ? PALETTE.secondary.purple[2] : "rgb(255,255,255)"
        }
        direction="row"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        height="63px"
        minHeight="63px"
      >
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
          }}
          flex={1}
          onClick={props.callback}
          justifyContent="space-between"
          overflow="hidden"
        >
          <Stack direction="row" alignItems="center" spacing="8px">
            <Stack
              height="16px"
              width="16px"
              bgcolor={props.channel.color || PALETTE.secondary.green[2]}
              borderRadius="100%"
            />
            <Typography
              color={props.selected ? PALETTE.font.light : PALETTE.font.dark}
              bold
            >
              {props.channel.title}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing="12px"
            sx={{
              opacity: 0.6,
              svg: {
                path: {
                  stroke: props.selected
                    ? PALETTE.font.light
                    : PALETTE.font.dark,
                },
              },
            }}
            minWidth="100%"
            maxWidth={0}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing="3px"
              // sx={{
              //   opacity: props.nStacks > 0 ? 1 : props.selected ? 0.7 : 0.55,
              // }}
            >
              <FolderIcon height="12px" width="12px" />
              <Typography
                variant="small"
                color={props.selected ? PALETTE.font.light : PALETTE.font.dark}
                bold
              >
                {props.channel.nStacks}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing="2px"
              sx={{
                //opacity: props.nLinks > 0 ? 1 : props.selected ? 0.7 : 0.55,
                svg: {
                  path: {
                    fill: props.selected
                      ? PALETTE.font.light
                      : PALETTE.font.dark,
                  },
                },
              }}
            >
              <LinkIcon height="12px" width="12px" />
              <Typography
                variant="small"
                color={props.selected ? PALETTE.font.light : PALETTE.font.dark}
                bold
              >
                {props.channel.nLinks}
              </Typography>
            </Stack>
            {!props.hideCreator ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing="2px"
                sx={{
                  //opacity: props.nLinks > 0 ? 1 : props.selected ? 0.7 : 0.55,
                  svg: {
                    path: {
                      fill: props.selected
                        ? PALETTE.font.light
                        : PALETTE.font.dark,
                    },
                  },
                }}
                minWidth="100%"
                maxWidth={0}
              >
                <PersonIcon height="12px" width="12px" />
                <Typography
                  variant="small"
                  color={
                    props.selected ? PALETTE.font.light : PALETTE.font.dark
                  }
                  bold
                  noWrap
                >
                  {
                    teachers.find((t) => t.id === props.channel.creatorId)
                      ?.teacherName
                  }
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        <Stack
          justifyContent="center"
          sx={{
            // opacity: hovering ? 1 : 0,
            transition: "0.2s",
          }}
        >
          <UrsorActionButton
            size="16px"
            actions={actions}
            large
            buttonClickCallback={() => setHovering(false)}
            light={props.selected}
            background="transparent"
          />
        </Stack>
      </Stack>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={() =>
            BrowserApiController.deleteChannel(props.channel.id)
              .then(props.updateCallback)
              .then(() => notificationCtx.negativeSuccess("Channel deleted"))
          }
          category="Channel"
          title={props.channel.title}
        />
      ) : null}
    </>
  );
};

const ChannelsColumn = (props: {
  selected?: string;
  selectionCallback: (id: string) => void;
  deleteCallback: (id: string) => void;
  updateCallback: () => void;
  channels: IChannel_DEPRECATED[];
  my?: boolean;
  //editCallback: (id: string) => void;
}) => {
  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false);
  const [editingDialogId, setEditingDialogId] = useState<string | undefined>();
  return (
    <>
      <Stack spacing="12px" width="285px" minWidth="285px" overflow="hidden">
        <Stack
          height="48px"
          minHeight="48px"
          width="100%"
          justifyContent="center"
          alignItems="center"
          borderRadius="12px"
          bgcolor={PALETTE.secondary.grey[2]}
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.6 },
            transition: "0.2s",
            svg: {
              path: {
                fill: PALETTE.secondary.grey[4],
              },
            },
          }}
          onClick={
            () => setCreationDialogOpen(true)
            // dialogCtx.setChannelDialogProps({
            //   completionCallback: (id) => props.selectionCallback(id),
            //   open: true,
            //   closeCallback: () => null,
            // })
          }
          spacing="8px"
          direction="row"
        >
          <Typography bold variant="small" color={PALETTE.secondary.grey[4]}>
            Add Channel
          </Typography>
          <PlusIcon width="18px" height="18px" />
        </Stack>
        <Stack flex={1} spacing="12px" overflow="scroll" pb="173px">
          {_.reverse(props.channels.slice())?.map((c, i) => (
            <Stack key={c.id}>
              <UrsorFadeIn delay={i * 140} duration={800}>
                <ChannelCard
                  key={c.id}
                  channel={c}
                  selected={c.id === props.selected}
                  nStacks={
                    c.nStacks
                    // dataCtx.stacks?.filter((s) => s.channelId === c.id)
                    //   .length ?? 0
                  }
                  nLinks={
                    c.nLinks
                    // dataCtx.links?.filter((l) => l.channelId === c.id).length ??
                    // 0
                  }
                  callback={() => props.selectionCallback(c.id)}
                  editCallback={() => setEditingDialogId(c.id)}
                  updateCallback={props.updateCallback}
                  deleteCallback={() => props.deleteCallback(c.id)}
                  hideCreator={props.my}
                />
              </UrsorFadeIn>
            </Stack>
          ))}
        </Stack>
      </Stack>
      {creationDialogOpen ? (
        <ChannelDialog
          open={true}
          closeCallback={() => {
            setCreationDialogOpen(false);
          }}
          completionCallback={(id) => {
            props.selectionCallback(id);
            props.updateCallback();
          }}
        />
      ) : null}
      {editingDialogId ? (
        <ChannelDialog
          channel={props.channels.find((c) => c.id === editingDialogId)}
          open={true}
          closeCallback={() => {
            setEditingDialogId(undefined);
          }}
          updateCallback={props.updateCallback}
        />
      ) : null}
    </>
  );
};

export type AstroContent = "link" | "stack";

export default function LibraryPage() {
  const userDetails = useBrowserUserContext().userDetails;
  const notificationCtx = useContext(NotificationContext);

  const [channels, setChannels] = useState<IChannel_DEPRECATED[] | undefined>(
    undefined
  );
  const loadChannels = () =>
    BrowserApiController.getChannelsInSchool(userDetails?.schoolId ?? "")
      .then((c) => setChannels(c))
      .catch((error) => notificationCtx.error(error.message));
  useEffect(() => {
    userDetails?.schoolId && loadChannels();
  }, [userDetails?.schoolId]);

  const [stacks, setStacks] = useState<IStack[] | undefined>(undefined);
  const loadStacks = () =>
    BrowserApiController.getStacksInSchool(userDetails?.schoolId ?? "")
      .then((s) => setStacks(s))
      .catch((error) => notificationCtx.error(error.message));
  useEffect(() => {
    userDetails?.schoolId && loadStacks();
  }, [userDetails?.schoolId]);

  const [links, setLinks] = useState<IBrowserLink[] | undefined>(undefined);
  const loadLinks = () =>
    BrowserApiController.getLinksInSchool(userDetails?.schoolId ?? "")
      .then((l) => setLinks(l))
      .catch((error) => notificationCtx.error(error.message));
  useEffect(() => {
    userDetails?.schoolId && loadLinks();
  }, [userDetails?.schoolId]);

  const [my, setMy] = useState<boolean>(false);

  const [filteredChannels, setFilteredChannels] = useState<
    IChannel_DEPRECATED[]
  >([]);
  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    const filteredChannels =
      channels?.filter((c) => !my || c.creatorId === userDetails?.id) || [];
    if (filteredChannels.length > 0) {
      (!selectedChannelId ||
        !filteredChannels.map((c) => c.id).includes(selectedChannelId)) &&
        setSelectedChannelId(
          filteredChannels?.[filteredChannels.length - 1]?.id
        );
    } else {
      setSelectedChannelId(undefined);
    }
    setFilteredChannels(filteredChannels);
  }, [channels, selectedChannelId, userDetails?.id, my]);

  const duplicateLink = (id: string) =>
    BrowserApiController.duplicateLink(id, userDetails?.id ?? "")
      .then(loadLinks)
      .then(loadStacks)
      .then(loadChannels)
      .then(() => notificationCtx.success("Link duplicated"));

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IBrowserLink | IStack;
    }[][]
  >([]);

  // const [channelEditingDialogId, setChannelEditingDialogId] = useState<
  //   string | undefined
  // >(undefined);
  const [linkCreationDialogOpen, setLinkCreationDialogOpen] =
    useState<boolean>(false);
  const [stackCreationDialogOpen, setStackCreationDialogOpen] =
    useState<boolean>(false);
  const [linkEditingDialogId, setLinkEditingDialogId] = useState<
    string | undefined
  >(undefined);
  const [stackEditingDialogId, setStackEditingDialogId] = useState<
    string | undefined
  >(undefined);
  const [linkViewingDialogId, setLinkViewingDialogId] = useState<
    string | undefined
  >(undefined);
  const [stackViewingDialogId, setStackViewingDialogId] = useState<
    string | undefined
  >(undefined);
  const [newlyCreatedStackId, setNewlyCreatedStackId] = useState<
    string | undefined
  >(undefined);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const linkDetails = (
      links?.filter((l) => !l.stackId && l.channelId === selectedChannelId) ||
      []
    ).map((l) => ({
      type: "link" as AstroContent,
      details: l,
    }));
    const stackDetails = (
      stacks?.filter((s) => s.channelId === selectedChannelId) || []
    ).map((s) => ({
      type: "stack" as AstroContent,
      details: s,
    }));
    const allContentDetails = _.reverse(
      _.sortBy(
        [...linkDetails, ...stackDetails],
        (c) => new Date(c.details.createdAt)
      ).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [links, stacks, selectedChannelId, nColumns]);

  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  const [channelDialogOpen, setChannelDialogOpen] = useState<boolean>(false);

  return (
    <>
      <PageLayout
        title="Channels"
        description="This is where all of your created links & folders will appear."
        titleBackButton={true}
        bodyWidth="100%"
        fullHeight
        selectedSidebarItemId="channels"
        button={{
          text: "Add",
          callback: () => setAddDialogOpen(true),
          icon: PlusIcon,
        }}
        maxWidth={834}
      >
        <Stack
          flex={1}
          height="100%"
          direction="row"
          overflow="hidden"
          pl={`${SIDEBAR_X_MARGIN}px`}
          pt="30px"
        >
          <Stack spacing="12px">
            <Stack direction="row" spacing="30px">
              <Stack
                sx={{
                  opacity: !my ? 1 : 0.6,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                  transition: "0.2s",
                }}
                onClick={() => setMy(false)}
              >
                <Typography variant="large" bold>
                  All Channels
                </Typography>
              </Stack>
              <Stack
                sx={{
                  opacity: my ? 1 : 0.6,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                  transition: "0.2s",
                }}
                onClick={() => setMy(true)}
              >
                <Typography variant="large" bold>
                  My Channels
                </Typography>
              </Stack>
            </Stack>
            <ChannelsColumn
              selected={selectedChannelId}
              selectionCallback={(id) => setSelectedChannelId(id)}
              channels={filteredChannels}
              my={my}
              deleteCallback={(id) => {
                id === selectedChannelId &&
                  channels &&
                  setSelectedChannelId(
                    channels.filter((c) => c.id !== id)[0].id
                  );
              }}
              updateCallback={() => {
                loadChannels();
                loadStacks();
                loadLinks();
              }}
            />
          </Stack>
          <Stack width="40px" height="100%" alignItems="center">
            <Stack
              height="100%"
              width="1px"
              bgcolor={PALETTE.secondary.grey[2]}
            />
          </Stack>
          <Stack
            ref={setColumnsContainerRef}
            overflow="hidden"
            flex={1}
            pb="133px"
            spacing="10px"
          >
            <Typography variant="large" bold>
              {filteredChannels.find((c) => c.id === selectedChannelId)?.title}
            </Typography>
            {cardColumns.flat().length === 0 ? (
              <Stack flex={1} justifyContent="center" alignItems="center">
                <Stack>
                  <UrsorFadeIn delay={300} duration={1000}>
                    <Stack spacing="0px" position="relative">
                      <Stack sx={{ opacity: 0.3, filter: "grayscale(1)" }}>
                        <Image
                          src="https://ursorassets.s3.eu-west-1.amazonaws.com/graphIllustration.png"
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
                          onClick={() => setLinkCreationDialogOpen(true)}
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
              <Stack flex={1} overflow="scroll">
                <Stack
                  flex={1}
                  pb={SIDEBAR_Y_MARGIN}
                  direction="row"
                  spacing={GRID_SPACING}
                >
                  {cardColumns.map((column, i) => (
                    <Stack key={i} flex={1} spacing={GRID_SPACING}>
                      {column.map((item, j) => (
                        <Stack key={item.details.id}>
                          <UrsorFadeIn delay={j * 150 + i * 80} duration={800}>
                            {item.type === "link" ? (
                              <BrowserLinkCard
                                link={item.details as IBrowserLink}
                                clickCallback={() =>
                                  setLinkViewingDialogId(item.details.id)
                                }
                                editCallback={() =>
                                  setLinkEditingDialogId(item.details.id)
                                }
                                updateCallback={() => {
                                  loadLinks();
                                  loadStacks();
                                  loadChannels();
                                }}
                                duplicateCallback={() =>
                                  duplicateLink(item.details.id)
                                }
                              />
                            ) : (
                              <StackCard
                                stack={item.details as IStack}
                                clickCallback={() =>
                                  setStackViewingDialogId(item.details.id)
                                }
                                editCallback={() =>
                                  setStackEditingDialogId(item.details.id)
                                }
                                duplicateCallback={() =>
                                  BrowserApiController.duplicateStack(
                                    item.details.id
                                  )
                                    .then(loadLinks)
                                    .then(loadStacks)
                                    .then(loadChannels)
                                    .then(() =>
                                      notificationCtx.success(
                                        "Stack duplicated"
                                      )
                                    )
                                }
                                updateCallback={() => {
                                  loadLinks();
                                  loadStacks();
                                  loadChannels();
                                }}
                              />
                            )}
                          </UrsorFadeIn>
                        </Stack>
                      ))}
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </PageLayout>
      {linkCreationDialogOpen || linkEditingDialogId ? (
        <BrowserLinkDialog
          link={
            linkEditingDialogId
              ? links?.find((l) => l.id === linkEditingDialogId)
              : undefined
          }
          channelId={selectedChannelId}
          stackId={stackViewingDialogId || newlyCreatedStackId}
          creationCallback={(link) => {
            setSelectedChannelId(link.channelId);
            setStackViewingDialogId(link.stackId);
          }}
          updateCallback={loadLinks}
          // newChannelCallback={() =>
          //   dialogCtx.setChannelDialogProps({
          //     completionCallback: (id) => {
          //       setSelectedChannelId(id);
          //     },
          //     open: true,
          //     closeCallback: () => null,
          //   })
          // }
          // newStackCallback={() => setStackCreationDialogOpen(true)}
          open={true}
          closeCallback={() => {
            setLinkCreationDialogOpen(false);
            setLinkEditingDialogId(undefined);
            setNewlyCreatedStackId(undefined);
          }}
          backCallback={() => setAddDialogOpen(true)}
        />
      ) : null}
      {stackCreationDialogOpen || stackEditingDialogId ? (
        <StackDialog
          stack={
            stackEditingDialogId
              ? stacks?.find((l) => l.id === stackEditingDialogId)
              : undefined
          }
          channelId={selectedChannelId}
          newChannelCallback={
            () => setChannelDialogOpen(true)
            // dialogCtx.setChannelDialogProps({
            //   completionCallback: (id) => {
            //     setSelectedChannelId(id);
            //   },
            //   open: true,
            //   closeCallback: () => null,
            // })
          }
          completionCallback={(id, channelId) => {
            setNewlyCreatedStackId(id);
            setStackViewingDialogId(id);
            setSelectedChannelId(channelId);
          }}
          updateCallback={() => {
            loadLinks();
            loadChannels();
            loadStacks();
          }}
          open={true}
          closeCallback={() => {
            setStackCreationDialogOpen(false);
            setStackEditingDialogId(undefined);
          }}
          backCallback={() => setAddDialogOpen(true)}
        />
      ) : null}
      {linkViewingDialogId ? (
        <LinkViewDialog
          linkId={linkViewingDialogId}
          open={true}
          closeCallback={() => setLinkViewingDialogId(undefined)}
          openEditDialogCallback={() => {
            setLinkEditingDialogId(linkViewingDialogId);
            setLinkViewingDialogId(undefined);
          }}
          links={links || []}
        />
      ) : null}
      {stackViewingDialogId && links ? (
        <StackViewDialog
          stack={stacks?.find((s) => s.id === stackViewingDialogId)}
          links={links}
          open={true}
          closeCallback={() => setStackViewingDialogId(undefined)}
          newLinkCallback={() => {
            setSelectedChannelId(
              stacks?.find((s) => s.id === stackViewingDialogId)?.channelId
            );
            setLinkCreationDialogOpen(true);
          }}
          editCallback={() => setStackEditingDialogId(stackViewingDialogId)}
          openLinkCallback={(id) => setLinkViewingDialogId(id)}
          editLinkCallback={(id) => {
            setLinkEditingDialogId(id);
          }}
          updateCallback={() => {
            loadLinks();
            loadStacks();
            loadChannels();
          }}
        />
      ) : null}
      <ChannelDialog
        open={channelDialogOpen}
        closeCallback={() => setChannelDialogOpen(false)}
        completionCallback={(id) => setSelectedChannelId(id)}
      />
      <AddDialog
        open={addDialogOpen}
        closeCallback={() => setAddDialogOpen(false)}
        channelCallback={() => {
          setAddDialogOpen(false);
          setChannelDialogOpen(true);
          // dialogCtx.setChannelDialogProps({
          //   completionCallback: (id) => setSelectedChannelId(id),
          //   open: true,
          //   closeCallback: () => null,
          //   backCallback: () => setAddDialogOpen(true),
          // });
        }}
        stackCallback={() => {
          setAddDialogOpen(false);
          setStackCreationDialogOpen(true);
        }}
        linkCallback={() => {
          setAddDialogOpen(false);
          setLinkCreationDialogOpen(true);
        }}
      />
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import ClippyIcon from "@/images/icons/ClippyIcon.svg";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import { IBrowserLink } from "./DomainLinksDialog";
import NotificationContext from "../components/NotificationContext";
import { IActionPopupItem } from "../components/ActionPopup";
import { PALETTE, Typography } from "ui";
import { Stack, alpha } from "@mui/system";
import { getAgoText } from "../components/LinkCard";
import BrowserLinkDialog, { shouldBeLightText } from "./BrowserLinkDialog";
import UrsorActionButton from "../components/UrsorActionButton";
import DeletionDialog from "../components/DeletionDialog";
import BrowserApiController from "../browserApi";
import MovingDialog from "./MovingDialog";

const BrowserLinkCard = (props: {
  link: IBrowserLink;
  clickCallback?: () => void;
  updateCallback?: () => void;
  duplicateCallback?: () => void;
  noActionButton?: boolean;
}) => {
  const notificationCtx = useContext(NotificationContext);
  const [hovering, setHovering] = useState<boolean>(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState<boolean>(false);

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  const actions: IActionPopupItem[] = [
    {
      text: "View",
      icon: ListUnorderedIcon,
      kallback: () => props.clickCallback?.(),
    },
    {
      text: "Edit",
      icon: PencilIcon,
      kallback: () => setEditDialogOpen(true),
    },
    {
      text: "Duplicate",
      icon: ClippyIcon,
      kallback: () => props.duplicateCallback?.(),
    },
    {
      text: "Move",
      icon: ArrowUpRightIcon,
      kallback: () => setMoveDialogOpen(true),
    },
    {
      text: "Delete",
      icon: TrashcanIcon,
      kallback: () => setDeletionDialogOpen(true),
      // dialogCtx.setDeletionDialogProps({
      //   category: "Link",
      //   title: props.link.title,
      //   open: true,
      //   deletionCallback: () =>
      //     ApiController.deleteLink(props.link.id)
      //       .then(dataCtx.refreshLinks)
      //       .then(dataCtx.refreshStacks)
      //       .then(dataCtx.refreshChannels),
      //   closeCallback: () => null,
      // }),
      color: PALETTE.system.red,
    },
  ];
  const [lightText, setLightText] = useState<boolean>(false);
  useEffect(
    () => setLightText(shouldBeLightText(props.link.color)),
    [props.link.color]
  );
  const agoText = getAgoText(props.link.createdAt);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Stack
        position="relative"
        width="100%"
        minHeight="313px"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Stack
          bgcolor={props.link.color}
          borderRadius="12px"
          overflow="hidden"
          border={`4px solid ${props.link.color}`}
          boxSizing="border-box"
          flex={1}
          spacing="5px"
          onClick={props.clickCallback}
          sx={{
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { opacity: 0.6 },
          }}
        >
          <Stack
            width="100%"
            height="204px"
            minHeight="204px"
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              backgroundImage: `url(${props.link.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxSizing: "border-box",
            }}
            position="relative"
          />
          <Stack
            px="4px"
            pb="4px"
            pt="2px"
            justifyContent="space-between"
            flex={1}
          >
            <Stack direction="row" minWidth="100%" maxWidth={0}>
              <Typography
                bold
                variant="medium"
                color={lightText ? PALETTE.font.light : PALETTE.font.dark}
                maxLines={3}
              >
                {props.link.title}
              </Typography>
              <Stack minWidth="25px" width="25px" />
            </Stack>
            <Stack direction="row" spacing="4px">
              <Typography
                variant="small"
                color={alpha(
                  lightText ? PALETTE.font.light : PALETTE.font.dark,
                  0.7
                )}
              >
                {agoText.value}
              </Typography>
              <Typography
                variant="small"
                color={alpha(
                  lightText ? PALETTE.font.light : PALETTE.font.dark,
                  0.7
                )}
              >
                {agoText.text}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        {!props.noActionButton ? (
          <Stack
            position="absolute"
            top="217px"
            right="13px"
            sx={{
              opacity: hovering ? 1 : 0,
              cursor: "pointer",
              "&:hover": { opacity: 0.6 },
              transition: "0.2s",
            }}
          >
            <UrsorActionButton
              size="16px"
              actions={actions}
              large
              light={lightText}
            />
          </Stack>
        ) : null}
      </Stack>
      <DeletionDialog
        open={deletionDialogOpen}
        closeCallback={() => setDeletionDialogOpen(false)}
        deletionCallback={() =>
          BrowserApiController.deleteLink(props.link.id)
            .then(props.updateCallback)
            .then(() => notificationCtx.negativeSuccess("Link deleted"))
        }
        category="Link"
        title={props.link.title}
      />
      <MovingDialog
        open={moveDialogOpen}
        closeCallback={() => setMoveDialogOpen(false)}
        updateCallback={() => props.updateCallback?.()}
        title={props.link.title}
        id={props.link.id}
        category="link"
      />
      {editDialogOpen ? (
        <BrowserLinkDialog
          open={true}
          closeCallback={() => setEditDialogOpen(false)}
          updateCallback={props.updateCallback}
          link={props.link}
        />
      ) : null}
    </>
  );
};

export default BrowserLinkCard;

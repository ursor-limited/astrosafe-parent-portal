import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { IBrowserLink } from "./DomainLinksDialog";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import BrowserApiController from "../browserApi";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";
import { BORDER_RADIUS, UrsorInputField } from "ui/ursor-input-field";
import { PALETTE, Typography, UrsorButton } from "ui";
import { Stack } from "@mui/system";
import BrowserLinkCard from "./BrowserLinkCard";
import BrowserLinkDialog from "./BrowserLinkDialog";

const WIDTH = "1000px";
const MIN_HEIGHT = "760px";

export interface ILinkDeletionDialogProps {
  open: boolean;
  closeCallback: () => void;
  deletionCallback: () => void;
  updateCallback?: () => void;
  links: IBrowserLink[];
  singleLink?: boolean;
}

export default function LinkDeletionDialog(props: ILinkDeletionDialogProps) {
  const [deletionPhrase, setDeletionPhrase] = useState<string>("");
  const [userLinks, setUserLinks] = useState<Record<string, IBrowserLink[]>>(
    {}
  );
  const userCtx = useBrowserUserContext();

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(
      userCtx?.userDetails?.schoolId ?? ""
    ).then((t) => setTeachers(t));
  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    setUserLinks(
      props.links
        .filter((l) => l.creatorId)
        .reduce(
          (acc, cur) =>
            teachers.find((t) => t.id === cur.creatorId)
              ? {
                  ...acc,
                  [cur.creatorId!]: [...(acc[cur.creatorId!] || []), cur],
                }
              : acc,
          {} as Record<string, IBrowserLink[]>
        )
    );
  }, [props.links, teachers]);

  const [linkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog
        transitionDuration={DEFAULT_FADEIN_DURATION}
        open={props.open}
        onClose={props.closeCallback}
        PaperProps={{
          style: {
            width: WIDTH,
            maxWidth: WIDTH,
            minHeight: MIN_HEIGHT,
            maxHeight: MIN_HEIGHT,
            borderRadius: BORDER_RADIUS,
            background:
              props.links.length === 1
                ? "rgb(255,255,255)"
                : PALETTE.secondary.grey[1],
          },
        }}
        sx={{
          py: "10px",
          ".MuiBackdrop-root": BACKDROP_STYLE,
        }}
      >
        <Stack
          spacing="24px"
          p="40px"
          flex={1}
          justifyContent="space-between"
          overflow="hidden"
        >
          <Stack spacing="12px" alignItems="center">
            <Typography variant="h4" color={PALETTE.secondary.purple[2]}>
              {props.singleLink ? "Remove Link" : "Remove Domain"}
            </Typography>
            <Stack alignItems="center" spacing="5px">
              <Typography variant="medium">
                {`Are you sure you want to delete this ${
                  props.singleLink ? "Link" : "Domain"
                }?`}
              </Typography>
              <Typography variant="medium">
                {`The following ${
                  props.links.length > 1 ? props.links.length : ""
                } card${props.links.length > 1 ? "s" : ""} ${
                  props.links.length === 1
                    ? `of ${
                        props.links[0].creatorId === userCtx.userDetails?.id
                          ? "yours"
                          : teachers.find(
                              (t) => t.id === props.links[0].creatorId
                            )?.teacherName
                      } `
                    : ""
                }would be deleted.`}
              </Typography>
              <Typography variant="medium">
                To confirm your intention, type &quot;delete&quot; below.
              </Typography>
            </Stack>
          </Stack>

          <Stack alignItems="center">
            <UrsorInputField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDeletionPhrase(event.target.value)
              }
              value={deletionPhrase}
              placeholder={"delete"}
              width="36%"
              backgroundColor={
                props.links.length === 1
                  ? PALETTE.secondary.grey[1]
                  : "rgb(255,255,255)"
              }
            />
          </Stack>

          {props.links.length === 1 ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <Stack
                maxWidth="280px"
                minWidth="280px"
                sx={{ pointerEvents: "none" }}
              >
                <BrowserLinkCard
                  link={props.links[0]}
                  noActionButton={true}
                  updateCallback={props.updateCallback}
                />
              </Stack>
            </Stack>
          ) : (
            <Stack
              flex={1}
              pl="34px"
              pt="30px"
              boxSizing="border-box"
              borderRadius="12px"
              bgcolor="rgb(255,255,255)"
              boxShadow="0 5px 20px rgba(0,0,0,0.04)"
              position="relative"
              overflow="hidden"
            >
              {/* <Stack
            zIndex={2}
            position="absolute"
            right={0}
            top={0}
            height="100%"
            width="300px"
            sx={{
              background:
                "linear-gradient(-90deg, rgb(255,255,255), rgba(255,255,255,0))",
            }}
          /> */}
              {/* <Stack
            zIndex={2}
            position="absolute"
            right={0}
            bottom="0px"
            height="40px"
            width="100%"
            sx={{
              pointerEvents: "none",
              background:
                "linear-gradient(0deg, rgb(255,255,255), rgb(255,255,255), rgba(255,255,255,0))",
            }}
          /> */}
              <Stack spacing="20px" flex={1} overflow="scroll">
                {[
                  ...Object.entries(userLinks).map(([teacherId, links]) => (
                    <Stack
                      key={teacherId}
                      spacing="8px"
                      position="relative"
                      height="200px"
                      minHeight="200px"
                      overflow="scroll"
                    >
                      <Stack
                        position="absolute"
                        sx={{
                          transform: "scale(0.55)",
                          transformOrigin: "top left",
                        }}
                        spacing="14px"
                      >
                        <Stack direction="row" spacing="10px">
                          <Typography
                            variant="h4"
                            color={PALETTE.secondary.grey[4]}
                          >
                            {links.length}
                          </Typography>
                          <Typography
                            variant="h4"
                            color={PALETTE.secondary.grey[4]}
                            sx={{
                              fontWeight: 300,
                            }}
                          >
                            by
                          </Typography>
                          <Typography variant="h4">
                            {`${teachers.find((t) => t.id === teacherId)
                              ?.teacherName}${
                              teacherId === userCtx.userDetails?.id
                                ? " (you)"
                                : ""
                            }`}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing="16px"
                          sx={{ overflow: "scroll" }}
                        >
                          {[
                            ...links.map((l) => (
                              <Stack
                                key={l.id}
                                maxWidth="260px"
                                minWidth="260px"
                                sx={{ pointerEvents: "none" }}
                              >
                                <BrowserLinkCard
                                  link={l}
                                  noActionButton={true}
                                />
                              </Stack>
                            )),
                            <Stack key="BOO" width="42px" />,
                          ]}
                        </Stack>
                      </Stack>
                    </Stack>
                  )),
                  <Stack key="GOO" height="70px" />,
                ]}
              </Stack>
            </Stack>
          )}

          <Stack spacing="12px">
            <Stack position="relative" alignItems="center">
              <Stack width="36%">
                <UrsorButton
                  onClick={() => {
                    props.deletionCallback();
                    props.closeCallback();
                  }}
                  backgroundColor={PALETTE.system.red}
                  disabled={deletionPhrase !== "delete"}
                  width="100%"
                >
                  Do it
                </UrsorButton>
              </Stack>
              <Stack
                position="absolute"
                width="100%"
                justifyContent="center"
                bottom="-24px"
                sx={{
                  opacity: deletionPhrase === "delete" ? 1 : 0,
                  transition: "0.5s",
                }}
                alignItems="center"
              >
                <Typography
                  variant="small"
                  color={PALETTE.system.red}
                  sx={{ textAlign: "center" }}
                >
                  Note that this action cannot be undone.
                </Typography>
              </Stack>
            </Stack>
            {/* <UrsorButton onClick={props.closeCallback} variant="secondary">
            Go back
          </UrsorButton> */}
          </Stack>
        </Stack>
      </Dialog>
      <BrowserLinkDialog
        open={linkDialogOpen}
        closeCallback={() => setLinkDialogOpen(false)}
        updateCallback={props.updateCallback}
        creationCallback={props.updateCallback}
      />
    </>
  );
}

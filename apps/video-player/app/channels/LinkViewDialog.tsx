import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import X from "@/images/icons/X.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ArrowUpRightIcon from "@/images/icons/ArrowUpRight.svg";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import LinkIcon from "@/images/icons/LinkIcon.svg";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";
import BrowserLinkCard from "../safety/BrowserLinkCard";
import { Stack } from "@mui/system";
import { BORDER_RADIUS } from "ui/ursor-input-field";
import { CARD_WIDTH } from "../dashboard/LinkDialog";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import { PALETTE, Typography, UrsorButton } from "ui";
import dayjs from "dayjs";
import DetailsSection from "../monitor_old/DeviceDialog/DetailsSection";
import BrowserApiController from "../browserApi";

const WIDTH = "847px";
const MIN_HEIGHT = "432px";

export interface ILinkViewDialogProps {
  linkId: string;
  open: boolean;
  closeCallback: () => void;
  openEditDialogCallback: () => void;
  links: IBrowserLink[];
}

export default function LinkViewDialog(props: ILinkViewDialogProps) {
  const userCtx = useBrowserUserContext();
  const [link, setLink] = useState<IBrowserLink | undefined>(undefined);
  useEffect(
    () => setLink(props.links?.find((l) => l.id === props.linkId)),
    [props.linkId, props.links]
  );

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(
      userCtx?.userDetails?.schoolId ?? ""
    ).then((t) => setTeachers(t));
  useEffect(() => {
    loadTeachers();
  }, []);

  return link ? (
    <Dialog
      transitionDuration={DEFAULT_FADEIN_DURATION}
      open={props.open}
      onClose={props.closeCallback}
      PaperProps={{
        style: {
          width: WIDTH,
          maxWidth: WIDTH,
          height: MIN_HEIGHT,
          minHeight: MIN_HEIGHT,
          borderRadius: "24px",
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        p="40px"
        boxSizing="border-box"
        flex={1}
        direction="row"
        spacing="60px"
        alignItems="center"
      >
        <Stack
          width={"270px"}
          minWidth={"270px"}
          sx={{
            pointerEvents: "none",
          }}
        >
          <BrowserLinkCard link={link} noActionButton />
        </Stack>
        <Stack width="404px" flex={1} height="100%">
          <Stack flex={1} justifyContent="space-between">
            <Stack spacing="8px">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">{link.title}</Typography>
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                  }}
                  onClick={props.closeCallback}
                  zIndex={2}
                >
                  <X height="27px" width="27px" />
                </Stack>
              </Stack>
              <Stack direction="row" spacing="5px">
                <Typography color={PALETTE.secondary.grey[4]} bold>
                  Created on
                </Typography>
                <Typography color={PALETTE.secondary.grey[4]}>
                  {dayjs(link?.createdAt).format("Do MMMM YYYY")}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing="16px">
              <DetailsSection
                title="URL"
                icon={LinkIcon}
                titleSize="medium"
                contentFontSize="medium"
                contentFontColor={PALETTE.secondary.grey[4]}
                iconSize="17px"
              >
                <a
                  target="_blank"
                  href={link.url}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="medium"
                    color={PALETTE.secondary.grey[4]}
                    sx={{
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                    }}
                  >
                    {link.url}
                  </Typography>
                </a>
              </DetailsSection>
              <DetailsSection
                title="Accessible URL"
                icon={ShieldLockIcon}
                titleSize="medium"
                contentFontSize="medium"
                contentFontColor={PALETTE.secondary.grey[4]}
                iconSize="17px"
              >
                <a
                  target="_blank"
                  href={link.accessibleUrl}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="medium"
                    color={PALETTE.secondary.grey[4]}
                    sx={{
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                    }}
                  >
                    {link.accessibleUrl}
                  </Typography>
                </a>
              </DetailsSection>
              <DetailsSection
                title="Added by"
                icon={PersonIcon}
                titleSize="medium"
                contentFontSize="medium"
                contentFontColor={PALETTE.secondary.grey[4]}
                iconSize="17px"
              >
                {
                  teachers.find((t) => t.id === userCtx.userDetails?.id)
                    ?.teacherName
                }
              </DetailsSection>
            </Stack>
            <Stack justifyContent="flex-end" direction="row" spacing="10px">
              <div>
                <UrsorButton
                  variant="secondary"
                  onClick={props.openEditDialogCallback}
                  endIcon={PencilIcon}
                >
                  Edit
                </UrsorButton>
              </div>
              <div>
                <a
                  target="_blank"
                  href={link.url}
                  style={{
                    textDecoration: "none",
                  }}
                  rel="noreferrer"
                >
                  <UrsorButton onClick={() => null} endIcon={ArrowUpRightIcon}>
                    Visit site
                  </UrsorButton>
                </a>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  ) : (
    <></>
  );
}

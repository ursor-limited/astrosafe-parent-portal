import React, { Dialog } from "@mui/material";
import LinkDeletionDialog from "./LinkDeletionDialog";
import { IFilterDomain } from "./SafetyPageContents";
import {
  ITeacher,
  useBrowserUserContext,
} from "../components/BrowserUserContext";
import BrowserApiController from "../browserApi";
import { useContext, useEffect, useState } from "react";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../components/UrsorTable";
import dayjs from "dayjs";
import _ from "lodash";
import NotificationContext from "../components/NotificationContext";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import X from "@/images/icons/X.svg";
import DeletionDialog from "../components/DeletionDialog";
import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { getAbsoluteUrl } from "../api";
import {
  BACKDROP_STYLE,
  DEFAULT_FADEIN_DURATION,
} from "../components/UrsorDialog";
import UrsorActionButton from "../components/UrsorActionButton";
import UrsorFadeIn from "../components/UrsorFadeIn";
import BrowserLinkDialog from "./BrowserLinkDialog";

export interface IBrowserLink {
  id: string;
  creatorId?: string;
  schoolId: string;
  channelId: string;
  stackId?: string;
  title: string;
  url: string;
  accessibleUrl: string;
  imageUrl: string;
  color: string;
  starter?: boolean;
  updatedAt: string;
  createdAt: string;
}

const WIDTH = "80%";
const PADDING = "32px";

export interface IDomainLinksDialog {
  domain: IFilterDomain;
  open: boolean;
  closeCallback: () => void;
  updateCallback: () => void;
}

interface IDomainLinksDialogTableRowItems {
  title: string;
  url: string;
  creatorId?: string;
  createdAt: string;
}

export default function DomainLinksDialog(props: IDomainLinksDialog) {
  const userCtx = useBrowserUserContext();
  const [links, setLinks] = useState<IBrowserLink[]>([]);

  const loadLinks = () =>
    BrowserApiController.getDomainLinks(
      userCtx.userDetails?.schoolId ?? "",
      props.domain.domain
    ).then((links) => setLinks(links));

  useEffect(() => {
    loadLinks();
  }, [userCtx.userDetails?.schoolId, props.domain]);
  const [rows, setRows] = useState<
    IUrsorTableRow<IDomainLinksDialogTableRowItems>[]
  >([]);
  const [filteredRows, setFilteredRows] = useState<
    IUrsorTableRow<IDomainLinksDialogTableRowItems>[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        searchValue
          ? [row.items.title, row.items.url.replace("www.", "")]
              .join("_")
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          : true
      )
    );
  }, [rows, searchValue]);

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(
      userCtx?.userDetails?.schoolId ?? ""
    ).then((t) => setTeachers(t));
  useEffect(() => {
    loadTeachers();
  }, []);

  const TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "title",
      displayName: "Title",
      sortable: true,
      newTag: true,
    },
    {
      name: "url",
      displayName: "URL",
      sortable: true,
      link: true,
    },
    {
      name: "createdAt",
      displayName: "Added on",
      itemDisplay: (datetime) => dayjs(datetime).format("HH:mm, MM/DD/YY"),
    },
    {
      name: "creatorId",
      displayName: "Added by",
      itemDisplay: (id) => teachers.find((t) => t.id === id)?.teacherName ?? "",
    },
  ];

  useEffect(() => {
    (async () => {
      const linkRows: IUrsorTableRow<IDomainLinksDialogTableRowItems>[] =
        links?.map((l) => ({
          id: l.id,
          items: {
            title: l.title,
            url: l.url,
            creatorId: l.creatorId,
            createdAt: l.createdAt,
          },
          tags: [],
          disabled: false,
          url: l.url,
          newTagDatetime: l.createdAt,
        })) || [];
      setRows(
        _.reverse([
          ..._.sortBy(linkRows, (row) => new Date(row.items.createdAt)),
        ])
      );
    })();
  }, [links]);

  const [sortedColumn, setSortedColumn] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<IDomainLinksDialogTableRowItems>[]
  >([]);
  useEffect(() => {
    const sorted = _.sortBy(filteredRows, (row) =>
      //@ts-ignore
      row.items[sortedColumn].toLowerCase()
    );
    setSortedRows(sortDirection === "asc" ? _.reverse(sorted.slice()) : sorted);
  }, [filteredRows, sortDirection, sortedColumn]);

  const notificationCtx = useContext(NotificationContext);

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false);

  const actions = [
    {
      icon: TrashcanIcon,
      text: "Delete",
      kallback: () => setDeletionDialogOpen(true),
    },
  ];

  const [deletionDialogId, setDeletionDialogId] = useState<string | undefined>(
    undefined
  );

  const [linkDialogId, setLinkDialogId] = useState<string | undefined>(
    undefined
  );

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
            maxHeight: "80%",
            height: "80%",
            borderRadius: "24px",
          },
        }}
        sx={{
          py: "10px",
          ".MuiBackdrop-root": BACKDROP_STYLE,
        }}
      >
        <Stack
          flex={1}
          borderRadius="24px"
          bgcolor="rgb(255,255,255)"
          p={PADDING}
          spacing="24px"
          boxSizing="border-box"
        >
          <Stack width="100%" direction="row" justifyContent="space-between">
            <Stack direction="row" spacing="12px">
              {props.domain.logoUrl ? (
                <Stack
                  borderRadius="12px"
                  width="56px"
                  height="56px"
                  minWidth="20px"
                  minHeight="20px"
                  boxShadow="0 0 30px rgba(0,0,0,0.08)"
                  sx={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${props.domain.logoUrl})`,
                  }}
                />
              ) : null}
              <Stack pt="2px">
                <Typography variant="large" bold>
                  {props.domain.title || "Untitled Domain"}
                </Typography>
                <a
                  target="_blank"
                  href={getAbsoluteUrl(props.domain.domain)}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <Typography
                    color={PALETTE.secondary.grey[4]}
                    bold
                    sx={{
                      "&:hover": { opacity: 0.7 },
                      transition: "0.2s",
                    }}
                  >
                    {props.domain.domain}
                  </Typography>
                </a>
              </Stack>
            </Stack>
            <Stack direction="row" spacing="10px" position="relative">
              <Stack
                width="42px"
                height="42px"
                justifyContent="center"
                alignItems="center"
                borderRadius="100%"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
                position="absolute"
                right="42px"
                top="-6px"
              >
                <UrsorActionButton
                  background="rgb(255,255,255)"
                  size="42px"
                  actions={actions}
                  large
                />
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.6 },
                  transition: "0.2s",
                }}
                onClick={props.closeCallback}
              >
                <X height="30px" width="30px" />
              </Stack>
            </Stack>
          </Stack>
          {sortedRows.length > 0 ? (
            <Stack flex={1}>
              <UrsorFadeIn duration={800}>
                <UrsorTable
                  columns={TABLE_COLUMNS}
                  rows={sortedRows}
                  defaultSortedByColumn="creationDate"
                  defaultSortedAscending
                  selectedSort={sortedColumn}
                  ascending={sortDirection === "asc"}
                  sortSelectionCallback={(columnId) => {
                    if (columnId === sortedColumn) {
                      setSortDirection(
                        sortDirection === "asc" ? "desc" : "asc"
                      );
                    } else {
                      setSortedColumn(columnId);
                      setSortDirection("asc");
                    }
                  }}
                  getActionButtonItems={(id) => [
                    {
                      icon: PencilIcon,
                      text: "Edit",
                      kallback: () => setLinkDialogId(id),
                    },
                    {
                      icon: TrashcanIcon,
                      text: "Delete",
                      kallback: () => setDeletionDialogId(id),
                      // dialogCtx.setDeletionDialogProps({
                      //   category: "Link",
                      //   title: links.find((l) => l.id === id)?.title ?? "",
                      //   open: true,
                      //   deletionCallback: () =>
                      //     ApiController.deleteLink(id)
                      //       .then(dataCtx.refreshLinks)
                      //       .then(dataCtx.refreshStacks)
                      //       .then(dataCtx.refreshChannels)
                      //       .then(loadLinks)
                      //       .then(props.deletionCallback)
                      //       .then(() =>
                      //         notificationCtx.negativeSuccess("Link deleted")
                      //       ),
                      //   closeCallback: () => null,
                      // }),
                      color: PALETTE.system.red,
                    },
                  ]}
                  noHeaderGradient
                />
              </UrsorFadeIn>
            </Stack>
          ) : null}
        </Stack>
      </Dialog>
      {deletionDialogOpen ? (
        <DeletionDialog
          open={deletionDialogOpen}
          closeCallback={() => setDeletionDialogOpen(false)}
          deletionCallback={() =>
            BrowserApiController.deleteDomain(
              userCtx.userDetails?.schoolId ?? "",
              props.domain.id
            )
              .then(props.updateCallback)
              .then(() => notificationCtx.negativeSuccess("Domain deleted."))
          }
          category="Domain"
          title={props.domain.title ?? "Title"}
        />
      ) : null}
      {linkDialogId ? (
        <BrowserLinkDialog
          open={true}
          closeCallback={() => setLinkDialogId(undefined)}
          link={links.find((l) => l.id === linkDialogId)}
          updateCallback={props.updateCallback}
        />
      ) : null}
      {deletionDialogId ? (
        <LinkDeletionDialog
          open={true}
          links={links.filter((l) => l.id === deletionDialogId)}
          singleLink
          closeCallback={() => setDeletionDialogId(undefined)}
          updateCallback={loadLinks}
          deletionCallback={() =>
            BrowserApiController.deleteLink(deletionDialogId)
              .then(loadLinks)
              .then(props.updateCallback)
              .then(() => notificationCtx.negativeSuccess("Link deleted"))
          }
        />
      ) : null}
    </>
  );
}

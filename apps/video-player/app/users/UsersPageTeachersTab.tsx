import React, { useEffect, useState } from "react";
import BrowserApiController, { IChannel, IStack } from "../browserApi";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import NotificationContext from "../components/NotificationContext";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "../components/UrsorTable";
import { PALETTE, Typography } from "ui";
import { Stack } from "@mui/system";
import { ApprovalList } from "../safety/SafetyPageContents";
import UrsorFadeIn from "../components/UrsorFadeIn";
import { DEFAULT_FADEIN_DURATION } from "../components/UrsorDialog";
import PencilIcon from "@/images/icons/Pencil.svg";
import TrashcanIcon from "@/images/icons/TrashcanIcon.svg";
import _ from "lodash";
import UserDeletionDialog from "./dialogs/UserDeletionDialog";
import TeacherEditingDialog from "./dialogs/TeacherEditingDialog";

const ADD_SUCCESS_MESSAGE = "Invited Teacher to URSOR";
const DELETE_SUCCESS_MESSAGE = "Removed Teacher from your School's Astro.";
const INVITED_DELETE_SUCCESS_MESSAGE =
  "Removed invited Teacher from your School's Astro.";
const EDIT_SUCCESS_MESSAGE = "Saved changes to Teacher account";
export const PLACEHOLDER_FADEIN_DELAY = 800;

export interface ITeacher {
  id: string;
  email: string;
  teacherName: string;
  realName: string;
  backgroundColor: number[];
  isAdmin: boolean;
  isDeleted: boolean;
  schoolId: string;
  isJoined: boolean;
  viewedTutorial: boolean;
  gcConnectionStepDone: boolean;
  latestGCSyncTime?: string;
  gcSync: boolean;
  unseenFeedItems: boolean;
  gapiRefreshToken?: string;
  requestedSchoolId?: string;
  invitationPendingByInviterId?: string;
  onBoardingDone: boolean;
  filterNotificationCount?: number;
  devicesNotificationCount?: number;
  peopleNotificationCount?: number;
  updatedAt: string;
}

export type TeacherAddition = Pick<ITeacher, "email">;

export type TeacherUpdate = Partial<
  Pick<ITeacher, "teacherName" | "realName" | "isAdmin">
>;

export interface IAdminPageTeachersTabProps {
  teachers: ITeacher[];
  channels: IChannel[];
  stacks: IStack[];
  links: IBrowserLink[];
  submitCallback: () => void;
  updateCallback: () => void;
  searchValue?: string;
}

export const kickOutOfSchool = (teacherName: string, teacherId: string) =>
  BrowserApiController.createTemporarySchool(
    `${teacherName}'${
      teacherName[teacherName.length - 1] === "s" ? "" : "s"
    } Space`,
    teacherId
  ).then(
    (school) => BrowserApiController.changeSchool(teacherId, school.id)
    // ApiController.updateTeacher(teacherId, {
    //   schoolId: school.id,
    //   isAdmin: true,
    // })
  );

const tagColumnName = "name";

interface ITeachersTableRowItems {
  name: string;
  username: string;
  channels: IChannel[];
}

export default function UsersPageTeachersTab(
  props: IAdminPageTeachersTabProps
) {
  const notificationCtx = React.useContext(NotificationContext);
  const userCtx = useBrowserUserContext();

  const [deleteDialogId, setDeleteDialogId] = useState<string | undefined>(
    undefined
  );
  const [editDialogId, setEditDialogId] = useState<string | null>(null);
  const [rows, setRows] = useState<IUrsorTableRow<ITeachersTableRowItems>[]>(
    []
  );
  const [filteredRows, setFilteredRows] = useState<
    IUrsorTableRow<ITeachersTableRowItems>[]
  >([]);

  const TEACHERS_TABLE_COLUMNS: IUrsorTableColumn[] = [
    {
      name: "name",
      displayName: "Teacher",
      sortable: true,
      newTag: true,
      getExtraElement: (id) => {
        const teacher = props.teachers.find((t) => t.id === id);
        return teacher?.invitationPendingByInviterId &&
          props.teachers.find(
            (t) => t.id === teacher?.invitationPendingByInviterId
          ) ? (
          <Stack
            height="28px"
            px="13px"
            py="6px"
            borderRadius="14px"
            bgcolor="rgb(255,255,255)"
            justifyContent="center"
            border={`2px solid ${PALETTE.font.dark}`}
            sx={{ opacity: 0.7 }}
            boxSizing="border-box"
          >
            <Typography variant="small" bold color={PALETTE.font.dark}>
              Invited
            </Typography>
          </Stack>
        ) : (
          <Stack
            height="28px"
            px="10px"
            py="6px"
            borderRadius="14px"
            bgcolor="rgba(255,255,255,0.2)"
            justifyContent="center"
            sx={{
              opacity: teacher?.isAdmin ? 1 : 0,
            }}
            boxSizing="border-box"
          >
            <Typography variant="small" bold color={PALETTE.font.light}>
              Admin
            </Typography>
          </Stack>
        );
      },
    },
    {
      name: "username",
      displayName: "Username",
      sortable: true,
    },
  ];

  useEffect(() => {
    (async () => {
      const teacherRows: IUrsorTableRow<ITeachersTableRowItems>[] =
        props.teachers.length > 0
          ? await Promise.all(
              _.sortBy(props.teachers, (teacher) => !teacher.isAdmin).map(
                async (teacher: ITeacher) => ({
                  id: teacher.id,
                  items: {
                    name: teacher.teacherName,
                    username: teacher.email,
                    channels: props.channels.filter(
                      (c: IChannel) => c.creatorId === teacher.id
                    ),
                    stacks: props.stacks.filter(
                      (l) => l.creatorId === teacher.id
                    ),
                    links: props.links.filter(
                      (l) => l.creatorId === teacher.id
                    ),
                    //isJoined: teacher.isJoined,
                  },
                  tags: teacher.isAdmin
                    ? ["Admin"]
                    : teacher.invitationPendingByInviterId
                    ? ["Invited"]
                    : [],
                  disabled:
                    !!teacher.invitationPendingByInviterId &&
                    !!props.teachers.find(
                      (t) => t.id === teacher.invitationPendingByInviterId
                    ),
                  newTagDatetime: teacher.updatedAt,
                })
              )
            )
          : [];

      setRows(teacherRows);
    })();
  }, [props.teachers]);

  const submitTeacherDeletion = async () => {
    const teacher = props.teachers.find(
      (teacher) =>
        teacher.id === deleteDialogId || teacher.email === deleteDialogId
    );
    if (teacher) {
      if (teacher.schoolId !== userCtx.userDetails?.schoolId) {
        BrowserApiController.replyToInvitation(
          deleteDialogId ?? "",
          false
        ).then(() => {
          setDeleteDialogId(undefined);
          props.submitCallback();
          notificationCtx.negativeSuccess(INVITED_DELETE_SUCCESS_MESSAGE);
        });
      } else {
        return kickOutOfSchool(teacher.teacherName, teacher.id).then(() => {
          setDeleteDialogId(undefined);
          props.submitCallback();
          notificationCtx.negativeSuccess(DELETE_SUCCESS_MESSAGE);
        });
      }
    }
  };

  const submitTeacherUpdate = async (id: string, update: TeacherUpdate) =>
    BrowserApiController.updateTeacher(id, update)
      .finally(() => {
        setEditDialogId(null);
        props.submitCallback();
      })
      .catch((error) => notificationCtx.error(error.message));

  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        props.searchValue
          ? [row.items.name, row.items.username.split("@")[0]]
              .join("_")
              .toLowerCase()
              .includes(props.searchValue.toLowerCase())
          : true
      )
    );
  }, [rows, props.searchValue]);

  const [sortedColumn, setSortedColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedRows, setSortedRows] = useState<
    IUrsorTableRow<ITeachersTableRowItems>[]
  >([]);
  useEffect(() => {
    const sorted = _.sortBy(
      filteredRows,
      (row) =>
        //@ts-ignore
        row.items[sortedColumn]
    );
    setSortedRows(sortDirection === "asc" ? _.reverse(sorted.slice()) : sorted);
  }, [filteredRows, sortDirection, sortedColumn]);

  const [approvalRequests, setApprovalRequests] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const loadApprovalRequests = () =>
    BrowserApiController.getTeacherApprovalRequests(
      userCtx.userDetails?.schoolId ?? ""
    ).then((requests) => setApprovalRequests(requests));
  useEffect(() => {
    userCtx.userDetails?.schoolId && loadApprovalRequests();
  }, [userCtx.userDetails?.schoolId]);

  //const sidebarCtx = useSidebarNotificationContext();

  return (
    <Stack>
      {approvalRequests.length > 0 ? (
        <Stack spacing="12px">
          <Typography
            variant="medium"
            bold
          >{`${approvalRequests.length} pending to join`}</Typography>
          {approvalRequests.length > 0 ? (
            <Stack pb="26px">
              <ApprovalList
                requests={approvalRequests.map((r) => ({
                  id: r.id,
                  value: r.name,
                }))}
                approveCallback={(id) =>
                  BrowserApiController.approveTeacherJoiningRequest(
                    id,
                    userCtx.userDetails?.id ?? ""
                  )
                    .then(loadApprovalRequests)
                    // .then(sidebarCtx.refreshPendingPeopleCount)
                    // .then(dataCtx.refreshLinks)
                    .then(props.submitCallback)
                    .then(() =>
                      notificationCtx.success(
                        `${approvalRequests.find((r) => r.id === id)
                          ?.name} has joined as a Teacher.`
                      )
                    )
                }
                rejectCallback={(id) =>
                  BrowserApiController.cancelTeacherJoiningRequest(id).then(
                    loadApprovalRequests
                  )
                }
              />
            </Stack>
          ) : null}
        </Stack>
      ) : null}
      <UrsorFadeIn
        duration={DEFAULT_FADEIN_DURATION}
        delay={PLACEHOLDER_FADEIN_DELAY}
      >
        <Stack
          height="100%"
          spacing={approvalRequests.length > 0 ? "12px" : undefined}
          pb="32px"
        >
          {approvalRequests.length > 0 ? (
            <Typography variant="medium" bold>
              All Teachers
            </Typography>
          ) : null}
          <UrsorTable
            columns={TEACHERS_TABLE_COLUMNS}
            rows={sortedRows}
            tagColumnName={tagColumnName}
            selectedSort={sortedColumn}
            ascending={sortDirection === "asc"}
            sortSelectionCallback={(columnId) => {
              if (columnId === sortedColumn) {
                setSortDirection(sortDirection === "asc" ? "desc" : "asc");
              } else {
                setSortedColumn(columnId);
                setSortDirection("asc");
              }
            }}
            getActionButtonItems={
              userCtx.userDetails?.isAdmin
                ? (id) => [
                    {
                      icon: PencilIcon,
                      text: "Edit",
                      kallback: () => setEditDialogId(id),
                    },
                    ...(userCtx.userDetails?.isAdmin &&
                    id !== userCtx.userDetails.id
                      ? [
                          {
                            icon: TrashcanIcon,
                            text: "Delete",
                            kallback: () => setDeleteDialogId(id),
                            color: PALETTE.system.red,
                          },
                        ]
                      : []),
                  ]
                : undefined
            }
          />
        </Stack>
      </UrsorFadeIn>

      <UserDeletionDialog
        open={!!deleteDialogId}
        userDisplayName={
          props.teachers.find((teacher) => teacher.id === deleteDialogId)
            ?.realName!
        }
        onCloseCallback={() => setDeleteDialogId(undefined)}
        submitCallback={submitTeacherDeletion}
      />

      {editDialogId ? (
        <TeacherEditingDialog
          open={!!editDialogId}
          deleteAccountCallback={() => {
            setDeleteDialogId(editDialogId);
            setEditDialogId(null);
          }}
          teacher={
            props.teachers.find(
              (teacher) => teacher.id === editDialogId
            ) as ITeacher
          }
          onCloseCallback={() => setEditDialogId(null)}
          submitCallback={async (update: TeacherUpdate) =>
            submitTeacherUpdate(editDialogId as string, update)
              .then(props.updateCallback)
              .then(() => notificationCtx.success(EDIT_SUCCESS_MESSAGE))
          }
        />
      ) : null}
    </Stack>
  );
}

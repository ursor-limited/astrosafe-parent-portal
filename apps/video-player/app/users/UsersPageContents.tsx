"use client";

import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "../components/NotificationContext";
import UsersPageTeachersTab, { ITeacher } from "./UsersPageTeachersTab";
import BrowserApiController, { IChannel, ISchool, IStack } from "../browserApi";
import { IBrowserLink } from "../safety/DomainLinksDialog";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import PageLayout, { SIDEBAR_X_MARGIN } from "../dashboard/PageLayout";
import { Stack } from "@mui/system";
import { SearchInput } from "../dashboard/DashboardPageContents";
import TeacherInvitationDialog from "./dialogs/TeacherInvitationDialog";
import PersonIcon from "@/images/icons/PersonIcon.svg";

export const getUsername = (name: string, allNames: string[]) => {
  const amount = allNames.filter(
    (n) =>
      (n ?? "").replaceAll(/\s/g, "").toLowerCase() ===
      name.replaceAll(/\s/g, "").toLowerCase()
  ).length;
  return `${name.replaceAll(/\s/g, "")}${
    amount === 0 ? "" : amount + 1
  }`.toLowerCase();
};

export default function UsersPageContents() {
  const notificationCtx = useContext(NotificationContext);
  const userDetails = useBrowserUserContext().userDetails;

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [channels, setChannels] = useState<IChannel[] | undefined>(undefined);
  const loadChannels = () =>
    BrowserApiController.getChannelsInSchool(userDetails?.schoolId ?? "")
      .then((channels) => setChannels(channels))
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
  const [links, setLinks] = useState<IBrowserLink[]>([]);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const [printAllDialogOpen, setPrintAllDialogOpen] = useState<boolean>(false);

  const loadTeachers = () =>
    BrowserApiController.getTeachersInSchool(userDetails!.schoolId)
      .then((students) => setTeachers(students))
      .catch((error) => notificationCtx.error(error.message));

  const loadLinks = () =>
    BrowserApiController.getLinksInSchool(userDetails!.schoolId)
      .then((links) => setLinks(links))
      .catch((error) => notificationCtx.error(error.message));

  useEffect(() => {
    if (userDetails?.id) {
      // loadStudents();
      loadTeachers();
      // loadClasses();
      // loadLessons();
      loadLinks();
    }
  }, [userDetails?.id]);

  const [school, setSchool] = useState<ISchool | undefined>(undefined);
  const loadSchool = () => {
    userDetails?.schoolId &&
      BrowserApiController.getSchool(userDetails?.schoolId).then((school) => {
        setSchool(school);
      });
  };
  useEffect(() => {
    loadSchool();
  }, []);

  const [teacherInvitationDialogOpen, setTeacherInvitationDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <PageLayout
        scrollable
        title={"People"}
        description="These are all people who can add Links to the private Browser and who can monitor Devices."
        bodyWidth="100%"
        selectedSidebarItemId="people"
        button={{
          text: "Invite Teacher",
          callback: () => setTeacherInvitationDialogOpen(true),
          icon: PersonIcon,
        }}
      >
        <Stack spacing="12px" pl={`${SIDEBAR_X_MARGIN}px`}>
          <Stack direction="row" justifyContent="flex-end">
            {/* <Stack direction="row" spacing="12px">
              {TAB_ORDER.filter((tab) => userDetails?.isAdmin).map((tab) => (
                <Box
                  key={tab}
                  sx={{
                    "&:hover": { opacity: selectedTab === tab ? 1 : 0.6 },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("#" + tab)}
                >
                  <Tag
                    selected={selectedTab === tab}
                    text={`${TABS[tab].counter}${
                      !TABS[tab]?.numberGetter ||
                      TABS[tab]?.numberGetter?.() === 1
                        ? ""
                        : "s"
                    }`}
                    icon={TABS[tab].icon}
                    n={TABS[tab]?.numberGetter?.()}
                  />
                </Box>
              ))}
            </Stack> */}
            {/* )} */}
            <Stack
              direction="row"
              spacing="30px"
              alignItems="center"
              width="fit-content"
            >
              <SearchInput
                value={searchValue ?? ""}
                callback={(value: string) => {
                  setSearchValue(value);
                }}
                clearCallback={() => setSearchValue(undefined)}
              />
              {/* <Stack
                direction="row"
                alignItems="center"
                spacing="12px"
                sx={{
                  svg: {
                    path: {
                      fill: PALETTE.secondary.grey[3],
                    },
                  },
                }}
              >
                <InputTypography //@ts-ignore
                  value={searchValue}
                  placeholder={"Search"}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(event.target.value)
                  }
                  dynamicWidth
                />
                <Box width="16px" height="16px">
                  <SearchIcon width="16px" height="16px" />
                </Box>
              </Stack> */}
              {/* {TABS[selectedTab].printAllButton ? (
                <UrsorButton
                  size="small"
                  variant="secondary"
                  onClick={() => setPrintAllDialogOpen(true)}
                  endIcon={<DarkPrintIcon width="16px" height="16px" />}
                >
                  Print all
                </UrsorButton>
              ) : null} */}
            </Stack>
          </Stack>
          {channels && stacks ? (
            <UsersPageTeachersTab
              teachers={teachers}
              channels={channels}
              stacks={stacks}
              links={links}
              submitCallback={loadTeachers}
              searchValue={searchValue}
              updateCallback={loadTeachers}
            />
          ) : null}
        </Stack>
      </PageLayout>
      {school ? (
        <TeacherInvitationDialog
          open={teacherInvitationDialogOpen}
          closeCallback={() => setTeacherInvitationDialogOpen(false)}
          callback={loadTeachers}
          school={school}
        />
      ) : null}
    </>
  );
}

"use client";

import ApiController from "@/app/api";
import PageLayout from "@/app/components/PageLayout";
import UrsorTable, {
  IUrsorTableColumn,
  IUrsorTableRow,
} from "@/app/components/UrsorTable";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { IDevice } from "../filters/[id]/FilterPageContents";
import { DUMMY_GROUP_ID } from "../filters/FiltersPageContents";
import UsersTable from "./UsersTable";
import DevicesTable from "./DevicesTable";

export interface IUser {
  id: number;
  name: string;
  email: string;
  lastActive: string;
  avatarUrl: string;
  createdAt: string;
}

const AccountPageContents = () => {
  return (
    <PageLayout
      title="My Account"
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="account"
      button={{
        text: "Log out",
        callback: () => null,
        //   ApiController.createFolder(DEFAULT_TITLE, DUMMY_GROUP_ID).then((id) =>
        //     router.push(`/content/${id}`)
        //   ),
        icon: LogOutIcon,
      }}
      maxWidth={834}
      scrollable
    >
      <Stack pl="50px">
        <AstroBentoCard title="Users in my space" notCollapsible>
          <Stack spacing="24px">
            <UsersTable />
            <DevicesTable />
          </Stack>
        </AstroBentoCard>
      </Stack>
    </PageLayout>
  );
};

export default AccountPageContents;

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
import { PALETTE, Typography, UrsorButton } from "ui";

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
      <Stack pl="50px" spacing="12px">
        <AstroBentoCard title="Users in my space" notCollapsible>
          <Stack spacing="24px">
            <UsersTable />
            <DevicesTable />
          </Stack>
        </AstroBentoCard>
        <Stack direction="row" spacing="12px">
          <AstroBentoCard title="Boring bits" notCollapsible>
            <Stack spacing="6px">
              <a
                target="_blank"
                href="https://www.astrosafe.co/terms-and-conditions"
                style={{
                  textDecoration: "none",
                }}
              >
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                  }}
                >
                  <Typography color={PALETTE.secondary.blue[3]}>
                    Terms & Conditions
                  </Typography>
                </Stack>
              </a>
              <a
                target="_blank"
                href="https://www.astrosafe.co/app/privacy-policy"
                style={{
                  textDecoration: "none",
                }}
              >
                <Stack
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.6 },
                    transition: "0.2s",
                  }}
                >
                  <Typography color={PALETTE.secondary.blue[3]}>
                    Privacy policy
                  </Typography>
                </Stack>
              </a>
            </Stack>
          </AstroBentoCard>
          <AstroBentoCard
            title="Feedback"
            notCollapsible
            topRightStuff={
              <UrsorButton
                variant="secondary"
                size="small"
                onClick={() => window.open("mailto:hello@astrosafe.co")}
              >
                Send
              </UrsorButton>
            }
          >
            <Typography>{`We'd love to hear your thoughts! Please send us through any ideas you have about the app, or let us know if you encounter any bugs or hiccups!`}</Typography>
          </AstroBentoCard>
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default AccountPageContents;

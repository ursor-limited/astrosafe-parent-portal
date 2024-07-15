"use client";

import PageLayout from "@/app/components/PageLayout";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import PeopleIcon from "@/images/icons/PeopleIcon.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import DevicesTable from "./DevicesTable";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import _ from "lodash";
import EditProfileDialog from "./EditProfileDialog";

export const DUMMY_USER: IUser = {
  id: 1,
  name: "Bob Brown",
  nickname: "Mr. Brown",
  email: "bob@gmail.com",
  backgroundColor: PALETTE.secondary.blue[2],
  lastActive: "2024-05-05",
  createdAt: "2024-05-05",
};

export interface IUser {
  id: number;
  name: string;
  nickname: string;
  email: string;
  lastActive: string;
  backgroundColor: string;
  createdAt: string;
}

export type AstroPlanState = "freeTrial";

export const PLAN_BANNER_ITEMS: Record<
  AstroPlanState,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string }[]
> = {
  freeTrial: [
    {
      icon: PhoneIcon,
      text: "Connect unlimited Devices",
    },
    {
      icon: PeopleIcon,
      text: "Add unlimited parents or teachers",
    },
    {
      icon: ClockIcon,
      text: "X days left",
    },
  ],
};

export const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((x) => _.capitalize(x)[0])
    ?.slice(0, 2)
    .join("");

export const UserInitialsCircle = (props: {
  name: IUser["name"];
  color: IUser["backgroundColor"];
}) => (
  <Stack
    height="132px"
    width="132px"
    bgcolor={props.color}
    borderRadius="100%"
    overflow="hidden"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="h2" color="rgb(255,255,255)">
      {props.name ? getInitials(props.name) : ""}
    </Typography>
  </Stack>
);

const AccountPageContents = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  useEffect(() => setName(DUMMY_USER.name), []);
  const [nickname, setNickname] = useState<string | undefined>(undefined);
  useEffect(() => setNickname(DUMMY_USER.nickname), []);
  const [email, setEmail] = useState<string | undefined>(undefined);
  useEffect(() => setEmail(DUMMY_USER.email), []);

  const [planState, setPlanState] = useState<AstroPlanState>("freeTrial");

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  return (
    <>
      <PageLayout
        title="My Account"
        bodyWidth="100%"
        fullHeight
        selectedSidebarItemId="account"
        secondaryButton={{
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
          <Stack direction="row" spacing="12px" height="248px">
            <AstroBentoCard
              title="My profile"
              notCollapsible
              topRightStuff={
                <UrsorButton
                  size="small"
                  variant="secondary"
                  onClick={() => setEditDialogOpen(true)}
                  endIcon={PencilIcon}
                  iconSize={13}
                >
                  Edit
                </UrsorButton>
              }
            >
              <Stack
                direction="row"
                spacing="20px"
                alignItems="center"
                flex={1}
              >
                <UserInitialsCircle
                  name={name ?? ""}
                  color={DUMMY_USER.backgroundColor}
                />
                <Stack direction="row" spacing="26px" minWidth="400px">
                  <Stack width="100%" spacing="12px" alignItems="center">
                    <Stack spacing="4px" width="100%">
                      <Typography
                        variant="tiny"
                        bold
                        color={PALETTE.secondary.grey[3]}
                      >
                        Name
                      </Typography>
                      <Typography bold>{name}</Typography>
                    </Stack>
                    <Stack spacing="4px" width="100%">
                      <Typography
                        variant="tiny"
                        bold
                        color={PALETTE.secondary.grey[3]}
                      >
                        Nickname
                      </Typography>
                      <Typography bold>{nickname}</Typography>
                    </Stack>
                    <Stack spacing="4px" width="100%">
                      <Typography
                        variant="tiny"
                        bold
                        color={PALETTE.secondary.grey[3]}
                      >
                        Email
                      </Typography>
                      <Typography bold>{email}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </AstroBentoCard>
            <AstroBentoCard
              title="My plan"
              notCollapsible
              topRightStuff={
                <UrsorButton
                  size="small"
                  variant="secondary"
                  onClick={() => null}
                  endIcon={ChevronRightIcon}
                  iconSize={14}
                >
                  Manage plan
                </UrsorButton>
              }
            >
              <Stack
                borderRadius="12px"
                sx={{
                  background: `linear-gradient(0, ${PALETTE.secondary.blue[2]}, ${PALETTE.secondary.purple[2]})`,
                }}
                justifyContent="space-between"
                p="20px"
                flex={1}
              >
                <Typography variant="h4" color="rgb(255,255,255)">
                  Free trial
                </Typography>
                <Stack direction="row" alignItems="center">
                  <Stack flex={1}>
                    {PLAN_BANNER_ITEMS[planState].map((item, i) => (
                      <Stack
                        key={i}
                        direction="row"
                        spacing="8px"
                        alignItems="center"
                        sx={{
                          svg: {
                            path: {
                              fill: "rgb(255,255,255)",
                            },
                          },
                        }}
                      >
                        <item.icon height="12px" width="12px" />
                        <Typography color="rgb(255,255,255)">
                          {item.text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack height="100%" justifyContent="flex-end">
                    <UrsorButton dark endIcon={VerifiedIcon}>
                      Upgrade
                    </UrsorButton>
                  </Stack>
                </Stack>
              </Stack>
            </AstroBentoCard>
          </Stack>
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
      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={(name, nickname) => null}
      />
    </>
  );
};

export default AccountPageContents;

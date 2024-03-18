"use client";

import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { ButtonVariant, UrsorButton } from "ui/ursor-button";
import DeleteAccountDialog from "./dialogs/DeleteAccountDialog";
import PageLayout, {
  SIDEBAR_X_MARGIN,
  SIDEBAR_Y_MARGIN,
} from "../dashboard/PageLayout";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import MortarBoardIcon from "@/images/icons/MortarboardIcon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";
import dayjs from "dayjs";
// import mixpanel from "mixpanel-browser";

const PADDING = "20px";
const SECTION_SPACING = "10px";
const TITLE_CONTENT_SPACING = "6px";
const SCHOOL_SECTION_FADEIN_DELAY = 600;
export const TRIAL_DAYS = 14;

export interface IAccountPageProps {}

export const AccountPageSection = (props: {
  title: string;
  button?: { variant: ButtonVariant; text: string; callback: () => void };
  children: React.ReactNode;
  flex?: boolean;
  yFlex?: boolean;
  orange?: boolean;
  fadeInDelay: number;
}) => (
  <Stack
    flex={props.flex ? 1 : props.yFlex ? "1 0" : undefined}
    position="relative"
  >
    <Stack
      spacing="16px"
      bgcolor={props.orange ? PALETTE.secondary.orange[1] : "rgb(255,255,255)"}
      p={PADDING}
      border={
        props.orange ? `2px solid ${PALETTE.secondary.orange[4]}` : undefined
      }
      borderRadius="12px"
      flex={props.flex ? 1 : props.yFlex ? "1 0" : undefined}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="large" bold>
          {props.title}
        </Typography>
        {props.button ? (
          <UrsorButton
            onClick={props.button.callback}
            variant={props.button.variant}
            size="small"
          >
            {props.button.text}
          </UrsorButton>
        ) : null}
      </Stack>
      {props.children}
    </Stack>
  </Stack>
);

export const AccountPagePlanSection = (props: { remainingDays: number }) => (
  <AccountPageSection
    title="Plan"
    button={{
      variant: "primary",
      text: "Upgrade",
      callback: () => null,
    }}
    fadeInDelay={200}
  >
    {/* <Stack spacing="8px" width="100%">
      <Typography>Your worksheets</Typography>
      <Typography variant="h3">{"1 of 3"}</Typography>
    </Stack>
    <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
      <Typography>Your videos</Typography>
      <Typography variant="h3">{"1 of 3"}</Typography>
    </Stack> */}
    <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
      <Typography>Free trial remaining</Typography>
      <Typography variant="h3">{`${props.remainingDays} days left`}</Typography>
    </Stack>
  </AccountPageSection>
);

const AccountPageDetailsSection = (props: {}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [teachingName, setTeachingName] = useState<string | undefined>(
    undefined
  );
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);

  return (
    <AccountPageSection
      title="Profile"
      button={{
        variant: "secondary",
        text: "Leave School",
        callback: () => null,
      }}
      yFlex
      fadeInDelay={SCHOOL_SECTION_FADEIN_DELAY}
    >
      <Stack direction="row" spacing="14px">
        <Stack spacing={TITLE_CONTENT_SPACING} flex={1}>
          <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
            <Typography>Name</Typography>
            <UrsorInputField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              value={name}
              placeholder={"School name"}
              width="100%"
              leftAlign
            />
          </Stack>
          <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
            <Typography>Teaching name</Typography>

            <UrsorInputField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTeachingName(event.target.value)
              }
              value={teachingName}
              placeholder={"Website"}
              width="100%"
              leftAlign
            />
          </Stack>
          <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
            <Typography>Contact email</Typography>
            <UrsorInputField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              value={email}
              placeholder={"Contact email"}
              width="100%"
              leftAlign
            />
          </Stack>
        </Stack>
      </Stack>
      {/* <Stack
        flex={1}
        direction="row"
        alignItems="flex-end"
        sx={{
          opacity: saveButtonDisabled ? 0.4 : 1,
          pointerEvents: saveButtonDisabled ? "none" : undefined,
        }}
      >
        <UrsorButton size="small" onClick={submitSchoolUpdate}>
          Save
        </UrsorButton>
      </Stack> */}
    </AccountPageSection>
  );
};

export default function AccountPageContents(props: IAccountPageProps) {
  const notificationCtx = React.useContext(NotificationContext);
  const { logout } = useAuth0();

  // const userDetails = useUserContext().user;
  const { user } = useAuth0();

  const [name, setName] = useState<string>("");
  //const [teachingName, setTeachingName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    user?.name && setName(user.name);
  }, [user?.name]);

  useEffect(() => {
    user?.email && setEmail(user.email);
  }, [user?.email]);

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] =
    useState<boolean>(false);

  const userCtx = useUserContext();
  userCtx;
  const logOut = () => {
    //mixpanel.reset();
    localStorage.clear();
    logout();
  };

  return (
    <>
      <PageLayout
        scrollable
        bodyWidth="100%"
        selectedSidebarItemId="account"
        title="Account"
        description="Here you can manage your personal details, manage the School you are a part of, and manage your plan."
        secondaryButton={{
          text: "Log out",
          callback: logOut,
          icon: LogOutIcon,
        }}
        disableConnectionBar
      >
        <Stack
          direction="row"
          spacing={SECTION_SPACING}
          flex={1}
          pb={`calc(${SIDEBAR_Y_MARGIN} + 2px)`}
          pl={`${SIDEBAR_X_MARGIN}px`}
        >
          <Stack spacing={SECTION_SPACING} flex={1} minWidth="625px">
            <AccountPageSection
              title="Profile"
              // button={{
              //   variant: "secondary",
              //   text: "Delete account",
              //   callback: () => setDeleteAccountDialogOpen(true),
              // }}
              fadeInDelay={200}
            >
              <Stack direction="row" spacing="26px">
                <Stack>
                  <Stack
                    width="160px"
                    height="160px"
                    borderRadius="100%"
                    bgcolor={PALETTE.secondary.grey[1]}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      svg: {
                        path: {
                          fill: PALETTE.secondary.grey[3],
                        },
                      },
                    }}
                  >
                    <MortarBoardIcon height="60px" width="60px" />
                  </Stack>
                </Stack>
                <Stack width="100%" spacing="12px" alignItems="center">
                  <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
                    <Typography>My name</Typography>
                    <Stack
                      sx={{
                        pointerEvents: "none",
                      }}
                    >
                      <UrsorInputField
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setName(event.target.value)}
                        value={name}
                        placeholder={"Name"}
                        color={PALETTE.secondary.grey[4]}
                        width="100%"
                        leftAlign
                      />
                    </Stack>
                  </Stack>
                  {/* <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
                    <Typography>My teaching name</Typography>
                    <UrsorInputField
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTeachingName(event.target.value)
                      }
                      value={teachingName}
                      placeholder={"Teaching name"}
                      width="100%"
                      leftAlign
                    />
                  </Stack> */}
                  <Stack spacing={TITLE_CONTENT_SPACING} width="100%">
                    <Typography>My email</Typography>
                    <Stack
                      sx={{
                        pointerEvents: "none",
                      }}
                    >
                      <UrsorInputField
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setEmail(event.target.value)}
                        value={email}
                        placeholder={"Email"}
                        width="100%"
                        color={PALETTE.secondary.grey[4]}
                        leftAlign
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </AccountPageSection>
            <AccountPageSection
              title="Feedback"
              button={{
                variant: "primary",
                text: "Send",
                callback: () => window.open("mailto:hello@astrosafe.co"),
              }}
              fadeInDelay={700}
            >
              <Typography>
                We’d love to hear your thoughts! The good, the bad, and the
                ugly. Please send us through any considerations you have about
                the app, or let us know if you encounter any bugs or hiccups!
              </Typography>
            </AccountPageSection>
          </Stack>
          <Stack spacing={SECTION_SPACING} flex={1}>
            <AccountPagePlanSection
              remainingDays={
                TRIAL_DAYS - dayjs().diff(userCtx.user?.createdAt, "days")
              }
            />
            <AccountPageSection title="Boring bits" flex fadeInDelay={1100}>
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
            </AccountPageSection>
          </Stack>
        </Stack>
      </PageLayout>
      <DeleteAccountDialog
        open={deleteAccountDialogOpen}
        closeCallback={() => setDeleteAccountDialogOpen(false)}
        callback={() => {
          null;
        }}
      />
    </>
  );
}

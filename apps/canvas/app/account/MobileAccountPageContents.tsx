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
import HomeIcon from "@/images/icons/HomeIcon.svg";
import MortarBoardIcon from "@/images/icons/MortarboardIcon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../components/UserContext";
import NotificationContext from "../components/NotificationContext";
import dayjs from "dayjs";
import {
  AccountPagePlanSection,
  AccountPageSection,
} from "./AccountPageContents";
import { useRouter } from "next/navigation";
// import mixpanel from "mixpanel-browser";

const PADDING = "20px";
const SECTION_SPACING = "10px";
const TITLE_CONTENT_SPACING = "6px";
const SCHOOL_SECTION_FADEIN_DELAY = 600;
export const TRIAL_DAYS = 14;

export interface IAccountPageProps {}

export default function MobileAccountPageContents(props: IAccountPageProps) {
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

  const router = useRouter();

  return (
    <>
      <Stack
        flex={1}
        bgcolor={PALETTE.secondary.grey[1]}
        p="20px"
        overflow="scroll"
        spacing="20px"
      >
        <Stack>
          <UrsorButton
            onClick={() => router.push("/dashboard")}
            size="small"
            iconSize={14}
            shadow
            dark
            endIcon={HomeIcon}
          >
            Home
          </UrsorButton>
        </Stack>
        <Stack
          spacing={SECTION_SPACING}
          flex={1}
          pb={`calc(${SIDEBAR_Y_MARGIN} + 2px)`}
        >
          <Stack spacing={SECTION_SPACING} flex={1}>
            <AccountPageSection
              title="Profile"
              // button={{
              //   variant: "secondary",
              //   text: "Delete account",
              //   callback: () => setDeleteAccountDialogOpen(true),
              // }}
              fadeInDelay={200}
            >
              <Stack spacing="26px" alignItems="center">
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

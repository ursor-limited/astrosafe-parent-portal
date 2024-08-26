"use client";

import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import PeopleIcon from "@/images/icons/PeopleIcon.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import { Stack } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { PALETTE, Typography } from "@/ui";
import _ from "lodash";
import EditProfileDialog from "../components/EditProfileDialog";
import InviteDialog from "../components/InviteDialog";
import { IGroup } from "../../folders/[id]/contents/common";
import DeviceConnectDialog from "../../profiles/components/DeviceConnectDialog";
import DownloadDialog from "../../profiles/components/DownloadDialog";
import UpgradeDialog from "../../components/UpgradeDialog";
import { DUMMY_GROUP_ID } from "../../filters/contents/body-desktop";
import { useUserContext } from "../../components/UserContext";
import ApiController from "../../api";
import AccountPageDesktopBody from "./body-desktop";
import AccountPageMobileBody from "./body-mobile";
import TroomiManagePlanDialog from "../components/TroomiManagePlanDialog";
import NotificationContext from "@/app/components/NotificationContext";

export const DUMMY_USER_ID = 1;

export const VIBRANT_GRADIENT = `linear-gradient(0, ${PALETTE.secondary.blue[2]}, ${PALETTE.secondary.purple[2]})`;

export interface IUser {
  id: number;
  realName: string;
  displayName: string;
  email: string;
  groupId: IGroup["id"];
  createdAt: string;
}

export type AstroPlanState = "freeTrial" | "troomi";

export const PLAN_DISPLAY_NAMES: Record<AstroPlanState, string> = {
  freeTrial: "Free trial",
  troomi: "Troomi Plan",
};

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
  troomi: [
    {
      icon: PhoneIcon,
      text: "Connect up to 10 Devices",
    },
    {
      icon: PeopleIcon,
      text: "Add unlimited parents or teachers",
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
  name: IUser["realName"];
  size?: number;
  fontSize?: number;
}) => (
  <Stack
    height={`${props.size || 132}px`}
    width={`${props.size || 132}px`}
    minHeight={`${props.size || 132}px`}
    minWidth={`${props.size || 132}px`}
    bgcolor={PALETTE.secondary.blue[2]}
    borderRadius="100%"
    overflow="hidden"
    justifyContent="center"
    alignItems="center"
  >
    <Typography
      variant="h2"
      color="rgb(255,255,255)"
      sx={props.fontSize ? { fontSize: props.fontSize } : undefined}
    >
      {props.name ? getInitials(props.name) : ""}
    </Typography>
  </Stack>
);

const AccountPage = (props: { isMobile: boolean }) => {
  const userCtx = useUserContext();

  const [planState, setPlanState] = useState<AstroPlanState>("troomi");

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState<boolean>(false);

  const [connectDialogOpen, setConnectDialogOpen] = useState<boolean>(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState<boolean>(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState<boolean>(false);

  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const loadUsers = useCallback(
    () => ApiController.getGroupUsers(DUMMY_GROUP_ID).then(setAllUsers),
    []
  );
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const [troomiManagePlanDialogOpen, setTroomiManagePlanDialogOpen] =
    useState<boolean>(false);

  const MANAGE_PLAN_CALLBACKS: Record<AstroPlanState, () => void> = {
    freeTrial: () => null,
    troomi: () => setTroomiManagePlanDialogOpen(true),
  };

  const notificationCtx = useContext(NotificationContext);

  return userCtx.user ? (
    <>
      {props.isMobile ? (
        <AccountPageMobileBody
          user={userCtx.user}
          allUsers={allUsers}
          planState={planState}
          setUpgradeDialogOpen={() => setUpgradeDialogOpen(true)}
          setEditDialogOpen={() => setEditDialogOpen(true)}
          setInviteDialogOpen={() => setInviteDialogOpen(true)}
          setConnectDialogOpen={() => setConnectDialogOpen(true)}
          onManagePlan={() => MANAGE_PLAN_CALLBACKS[planState]()}
        />
      ) : (
        <AccountPageDesktopBody
          user={userCtx.user}
          allUsers={allUsers}
          planState={planState}
          setUpgradeDialogOpen={() => setUpgradeDialogOpen(true)}
          setEditDialogOpen={() => setEditDialogOpen(true)}
          setInviteDialogOpen={() => setInviteDialogOpen(true)}
          setConnectDialogOpen={() => setConnectDialogOpen(true)}
          onManagePlan={() => MANAGE_PLAN_CALLBACKS[planState]()}
        />
      )}
      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        name={userCtx.user.realName}
        nickName={userCtx.user.displayName}
        onSave={(name, nickname) =>
          ApiController.updateUser(DUMMY_USER_ID, name, nickname)
            .then(() => notificationCtx.success("Updated your details"))
            .then(userCtx.refresh)
            .then(() => setEditDialogOpen(false))
        }
        isMobile={props.isMobile}
      />
      <InviteDialog
        open={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
        onSubmit={(email) => ApiController.createUser(email).then(loadUsers)}
      />
      <DeviceConnectDialog
        open={connectDialogOpen}
        onClose={() => setConnectDialogOpen(false)}
        onOpen={() => {
          setDownloadDialogOpen(true);
          setConnectDialogOpen(false);
        }}
      />
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
      />
      <UpgradeDialog
        open={upgradeDialogOpen}
        closeCallback={() => setUpgradeDialogOpen(false)}
      />
      <TroomiManagePlanDialog
        open={troomiManagePlanDialogOpen}
        onClose={() => setTroomiManagePlanDialogOpen(false)}
        isMobile={props.isMobile}
      />
    </>
  ) : (
    <></>
  );
};

export default AccountPage;
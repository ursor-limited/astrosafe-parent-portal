import PageLayout from "@/app/components/PageLayout";
import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";
import VerifiedIcon from "@/images/icons/VerifiedIcon.svg";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import PencilIcon from "@/images/icons/Pencil.svg";
import ChevronRightIcon from "@/images/icons/ChevronRight.svg";
import PersonIcon from "@/images/icons/PersonIcon.svg";
import {
  AstroPlanState,
  IUser,
  PLAN_BANNER_ITEMS,
  PLAN_DISPLAY_NAMES,
  UserInitialsCircle,
  VIBRANT_GRADIENT,
} from "./common";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import UsersTable from "../components/UsersTable";
import DevicesTable from "../components/DevicesTable";
import MobilePageLayout from "@/app/components/MobilePageLayout";
import AccountPageHeader from "../components/AccountPageHeader";

const AccountPageMobileBody = (props: {
  user: IUser;
  allUsers: IUser[];
  setUpgradeDialogOpen: () => void;
  setEditDialogOpen: () => void;
  setInviteDialogOpen: () => void;
  setConnectDialogOpen: () => void;
  planState: AstroPlanState;
  onManagePlan: () => void;
}) => (
  <MobilePageLayout
    title="My Account"
    selectedPage="account"
    topRightElement={
      <UrsorButton
        size="small"
        dark
        variant="tertiary"
        onClick={() => null}
        endIcon={LogOutIcon}
        iconSize={16}
      >
        Log out
      </UrsorButton>
    }
    header={
      <AccountPageHeader
        setUpgradeDialogOpen={props.setUpgradeDialogOpen}
        isMobile
      />
    }
  >
    <Stack spacing="12px">
      <AstroBentoCard
        title="My profile"
        notCollapsible
        topRightStuff={
          <UrsorButton
            size="small"
            variant="secondary"
            onClick={props.setEditDialogOpen}
            endIcon={PencilIcon}
            iconSize={13}
          >
            Edit
          </UrsorButton>
        }
        isMobile
      >
        <Stack direction="row" spacing="20px" flex={1}>
          <UserInitialsCircle
            name={props.user.realName ?? ""}
            size={50}
            fontSize={18}
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
                <Typography bold>{props.user.realName}</Typography>
              </Stack>
              <Stack spacing="4px" width="100%">
                <Typography
                  variant="tiny"
                  bold
                  color={PALETTE.secondary.grey[3]}
                >
                  Nickname
                </Typography>
                <Typography bold>{props.user.displayName}</Typography>
              </Stack>
              <Stack spacing="4px" width="100%">
                <Typography
                  variant="tiny"
                  bold
                  color={PALETTE.secondary.grey[3]}
                >
                  Email
                </Typography>
                <Typography bold>{props.user.email}</Typography>
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
            onClick={props.onManagePlan}
            endIcon={ChevronRightIcon}
            iconSize={14}
          >
            Manage plan
          </UrsorButton>
        }
        isMobile
      >
        <Stack
          borderRadius="12px"
          sx={{
            background: VIBRANT_GRADIENT,
          }}
          justifyContent="space-between"
          p="20px"
          flex={1}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="large" bold color="rgb(255,255,255)">
              {PLAN_DISPLAY_NAMES[props.planState]}
            </Typography>
            {props.planState !== "troomi" ? (
              <UrsorButton
                dark
                endIcon={VerifiedIcon}
                size="small"
                backgroundColor="rgb(255,255,255)"
                fontColor={PALETTE.primary.navy}
                hoverOpacity={0.7}
                onClick={props.setUpgradeDialogOpen}
                iconSize={16}
              >
                Upgrade
              </UrsorButton>
            ) : null}
          </Stack>
          <Stack pt="12px" direction="row" alignItems="center" spacing="24px">
            <Stack flex={1}>
              {PLAN_BANNER_ITEMS[props.planState].map((item, i) => (
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
                  <Typography variant="small" color="rgb(255,255,255)">
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </AstroBentoCard>
      <AstroBentoCard title="Users in my space" notCollapsible isMobile>
        <Stack spacing="12px">
          <Stack direction="row" spacing="12px">
            <UrsorButton
              endIcon={PersonIcon}
              size="small"
              variant="secondary"
              iconSize={16}
              onClick={props.setInviteDialogOpen}
              width="100%"
            >
              Add an adult
            </UrsorButton>
            <UrsorButton
              endIcon={PhoneIcon}
              size="small"
              variant="secondary"
              iconSize={16}
              onClick={props.setConnectDialogOpen}
              width="100%"
            >
              Add a Device
            </UrsorButton>
          </Stack>

          <UsersTable users={props.allUsers} />
          <DevicesTable />
        </Stack>
      </AstroBentoCard>

      <AstroBentoCard title="Boring bits" notCollapsible isMobile>
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
        isMobile
      >
        <Typography>{`We'd love to hear your thoughts! Please send us through any ideas you have about the app, or let us know if you encounter any bugs or hiccups!`}</Typography>
      </AstroBentoCard>
    </Stack>
  </MobilePageLayout>
);

export default AccountPageMobileBody;

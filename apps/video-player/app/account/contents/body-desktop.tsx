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
  UserInitialsCircle,
  VIBRANT_GRADIENT,
} from "./common";
import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import UsersTable from "../components/UsersTable";
import DevicesTable from "../components/DevicesTable";
import AccountPageHeader from "../components/AccountPageHeader";
import { useWindowSize } from "usehooks-ts";

const SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD = 1408;

const AccountPageDesktopBody = (props: {
  user: IUser;
  allUsers: IUser[];
  setUpgradeDialogOpen: () => void;
  setEditDialogOpen: () => void;
  setInviteDialogOpen: () => void;
  setConnectDialogOpen: () => void;
  planState: AstroPlanState;
}) => {
  const { width } = useWindowSize();
  return (
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
      header={
        <AccountPageHeader
          setUpgradeDialogOpen={props.setUpgradeDialogOpen}
          smallerFont={width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD}
        />
      }
    >
      <Stack pl="50px" spacing="12px" pb="31px">
        <Stack
          direction={
            width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? "column" : "row"
          }
          spacing="12px"
          height={
            width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? undefined : "248px"
          }
        >
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
          >
            <Stack direction="row" spacing="20px" alignItems="center" flex={1}>
              <UserInitialsCircle name={props.user.realName ?? ""} />
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
                background: VIBRANT_GRADIENT,
              }}
              justifyContent="space-between"
              p="20px"
              flex={1}
            >
              <Typography variant="h4" color="rgb(255,255,255)">
                Free trial
              </Typography>
              <Stack direction="row" alignItems="center" spacing="24px">
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
                      <Typography color="rgb(255,255,255)">
                        {item.text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack height="100%" justifyContent="flex-end">
                  <UrsorButton
                    dark
                    endIcon={VerifiedIcon}
                    backgroundColor="rgb(255,255,255)"
                    fontColor={PALETTE.primary.navy}
                    hoverOpacity={0.7}
                    onClick={props.setUpgradeDialogOpen}
                  >
                    Upgrade
                  </UrsorButton>
                </Stack>
              </Stack>
            </Stack>
          </AstroBentoCard>
        </Stack>
        <AstroBentoCard
          title="Users in my space"
          notCollapsible
          topRightStuff={
            <Stack direction="row" spacing="12px">
              <UrsorButton
                endIcon={PersonIcon}
                size="small"
                variant="secondary"
                iconSize={16}
                onClick={props.setInviteDialogOpen}
              >
                Add an adult
              </UrsorButton>
              <UrsorButton
                endIcon={PhoneIcon}
                size="small"
                variant="secondary"
                iconSize={16}
                onClick={props.setConnectDialogOpen}
              >
                Add a Device
              </UrsorButton>
            </Stack>
          }
        >
          <Stack spacing="24px">
            <UsersTable users={props.allUsers} />
            <DevicesTable />
          </Stack>
        </AstroBentoCard>
        <Stack
          direction={
            width < SINGLE_COLUMN_WINDOW_WIDTH_THRESHOLD ? "column" : "row"
          }
          spacing="12px"
        >
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

export default AccountPageDesktopBody;

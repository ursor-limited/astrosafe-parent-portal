import { Stack } from "@mui/system";
import UrsorPopover from "./UrsorPopover";
import { ASTRO_MAGICAL_GRADIENT, STRIPE_CUSTOMER_PORTAL_URL } from "./header2";
import { PALETTE, Typography } from "ui";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import ListUnorderedIcon from "@/images/icons/ListUnorderedIcon.svg";
import CreditCardIcon from "@/images/icons/CreditCard.svg";
import LogOutIcon from "@/images/icons/LogOutIcon.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "./UserContext";

const ProfileButtonActualButton = (props: { initials: string }) => (
  <Stack
    p="2px"
    boxSizing="border-box"
    sx={{
      background: ASTRO_MAGICAL_GRADIENT,
    }}
    borderRadius="100%"
    height="42px"
    width="42px"
  >
    <Stack
      flex={1}
      borderRadius="100%"
      justifyContent="center"
      alignItems="center"
      bgcolor="#253D4D"
    >
      <Typography bold color={PALETTE.font.light}>
        {props.initials}
      </Typography>
    </Stack>
  </Stack>
);

const ProfilePopupButton = (props: {
  callback: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  // hoveringOnCallback: () => void;
  // hoveringOffCallback: () => void;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);
  return (
    <Stack
      height="36px"
      minHeight="36px"
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
        svg: {
          path: {
            fill: hovering
              ? PALETTE.secondary.purple[2]
              : PALETTE.secondary.grey[5],
          },
        },
      }}
      onClick={props.callback}
      direction="row"
      spacing="8px"
      alignItems="center"
      px="20px"
      bgcolor={hovering ? PALETTE.secondary.grey[1] : undefined}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <props.icon height="16px" width="16px" />
      <Typography
        variant="small"
        bold
        color={
          hovering ? PALETTE.secondary.purple[2] : PALETTE.secondary.grey[5]
        }
      >
        {props.text}
      </Typography>
    </Stack>
  );
};

const ProfileButton = () => {
  const { user, logout } = useAuth0();
  const userCtx = useUserContext();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Stack
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.7 },
        transition: "0.2s",
      }}
    >
      <UrsorPopover
        open={open}
        content={
          <Stack minWidth="250px">
            <Stack
              height="40px"
              sx={{
                background: ASTRO_MAGICAL_GRADIENT,
                "-webkit-text-fill-color": "transparent",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
              }}
              px="20px"
              justifyContent="center"
              borderBottom={`1px solid ${PALETTE.secondary.grey[2]}`}
            >
              <Typography bold variant="small">
                {user?.email}
              </Typography>
            </Stack>

            <ProfilePopupButton
              callback={() => router.push("/dashboard")}
              icon={ListUnorderedIcon}
              text="Dashboard"
            />

            {userCtx.user?.subscribed ? (
              <Link
                target="_blank"
                href={STRIPE_CUSTOMER_PORTAL_URL}
                style={{
                  textDecoration: "none",
                }}
                rel="noreferrer"
              >
                <ProfilePopupButton
                  callback={() => null}
                  icon={CreditCardIcon}
                  text="Manage plan"
                />
              </Link>
            ) : null}
            <ProfilePopupButton
              callback={() => {
                logout();
                localStorage.clear();
                //mixpanel.reset();
              }}
              icon={LogOutIcon}
              text="Log out"
            />
          </Stack>
        }
        closeCallback={() => setOpen(false)}
        placement="right"
        noPadding
      >
        <Stack onClick={() => setOpen(true)}>
          <ProfileButtonActualButton
            initials={(
              (user?.name?.split(" ")?.[0]?.[0] ?? "") +
              (user?.name?.split(" ")?.[1]?.[0] ?? "")
            ).toUpperCase()}
          />
        </Stack>
      </UrsorPopover>
    </Stack>
  );
};

export default ProfileButton;

import { Stack } from '@mui/system';
import UrsorPopover from './UrsorPopover';
import { PALETTE, Typography } from './../ui';
import useAuth from './../hooks/useAuth';
import { useState } from 'react';
import ListUnorderedIcon from './../images/ListUnorderedIcon.svgimages/icons/ListUnorderedIcon.svg';
import CreditCardIcon from './../images/CreditCard.svgimages/icons/CreditCard.svg';
import LogOutIcon from './../images/LogOutIcon.svg';
import useNavigate from '../hooks/useNavigate';
import { useUserContext } from './UserContext';
import { useLocalStorage } from 'usehooks-ts';

export const ASTRO_MAGICAL_GRADIENT =
  'linear-gradient(150deg, #FD9B41, #F279C5, #1D62F6, #0AE799)';

const ProfileButtonActualButton = (props: {
  initials: string;
  light?: boolean;
}) => (
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
      bgcolor={props.light ? 'rgba(255,255,255,0.97)' : '#253D4D'}
    >
      <Typography
        bold
        color={props.light ? PALETTE.font.dark : PALETTE.font.light}
      >
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
        cursor: 'pointer',
        '&:hover': { opacity: 0.7 },
        transition: '0.2s',
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

const ProfileButton = (props: { light?: boolean }) => {
  const { user, logout } = useAuth();
  const userCtx = useUserContext();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [
    subscriptionStatusChangePossible,
    setSubscriptionStatusChangePossible,
  ] = useLocalStorage<'cancelled' | 'renewed' | null>(
    's ubscriptionStatusChangePossible',
    null
  );

  return (
    <Stack
      sx={{
        cursor: 'pointer',
        '&:hover': { opacity: 0.7 },
        transition: '0.2s',
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
                '-webkit-text-fill-color': 'transparent',
                backgroundClip: 'text',
                '-webkit-background-clip': 'text',
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
              callback={() => navigate.push('/dashboard')}
              icon={ListUnorderedIcon}
              text="Dashboard"
            />

            {/* {userCtx.schoolIsSubscribed ? (
              <a
                target="_blank"
                href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL ?? ""}
                style={{
                  textDecoration: "none",
                }}
                rel="noreferrer"
              >
                <ProfilePopupButton
                  callback={() =>
                    userCtx.user
                      ? setSubscriptionStatusChangePossible(
                          !userCtx.schoolIsSubscribed
                            ? null
                            : userCtx.user.subscriptionDeletionDate
                            ? "renewed"
                            : "cancelled"
                        )
                      : null
                  }
                  icon={CreditCardIcon}
                  text="Manage plan"
                />
              </a>
            ) : null} */}
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
            light={props.light}
            initials={(
              (user?.name?.split(' ')?.[0]?.[0] ?? '') +
              (user?.name?.split(' ')?.[1]?.[0] ?? '')
            ).toUpperCase()}
          />
        </Stack>
      </UrsorPopover>
    </Stack>
  );
};

export default ProfileButton;

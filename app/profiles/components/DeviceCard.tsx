import { Stack } from '@mui/system';
import AstroCard from '../../filter/components/AstroCard';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import ChevronRightIcon from '@/images/icons/ChevronRight.svg';
import PhoneIcon from '@/images/icons/PhoneIcon.svg';
import GlobeIcon from '@/images/icons/GlobeIcon.svg';
import StrikeThroughGlobeIcon from '@/images/icons/StrikeThroughGlobeIcon.svg';
import FilterIcon from '@/images/icons/FilterIcon.svg';
import LinkExternalIcon from '@/images/icons/LinkExternalIcon.svg';
import { DeviceType, IDevice } from '../../filter/contents/common';
import AstroSwitch from '@/components/AstroSwitch';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFilter, IFilterUrl } from '@/filters/contents/common';
import ApiController, { getAbsoluteUrl } from '@/api';
import { IEnrichedDevice } from '../contents/common';
import { useElementSize } from 'usehooks-ts';
import { cleanUrl } from '../../profile/components/MobileInsightsTab';
import NotificationContext from '@/components/NotificationContext';
import { getInitials } from '@/account/contents/common';

export const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string> = {
  android: 'Android',
  chrome: 'Chromebook',
  ios: 'iOS',
};

export const DeviceCardSection = (props: {
  title: string;
  children: React.ReactNode;
}) => (
  <Stack
    flex={1}
    height="72px"
    minHeight="72px"
    boxSizing="border-box"
    px="12px"
    py="10px"
    justifyContent="space-between"
    borderRadius="8px"
    border={`1px solid ${PALETTE.secondary.grey[2]}`}
  >
    <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
      {props.title}
    </Typography>
    {props.children}
  </Stack>
);

export const DeviceCardBrowsingStatusSection = (props: {
  browsingEnabled: boolean;
  flipBrowsingEnabled: () => void;
}) => {
  const [setRef, size] = useElementSize();
  return (
    <Stack ref={setRef} flex={1}>
      <DeviceCardSection title="Browsing status">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing="6px"
        >
          <Stack
            spacing="8px"
            direction="row"
            alignItems="center"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            {(size.width ?? 0) > 276 ? (
              <GlobeIcon height="20px" width="20px" />
            ) : null}
            <Typography
              bold
              color={PALETTE.secondary.grey[5]}
              maxLines={1}
              sx={{ maxWidth: '100%', minWidth: 0 }}
            >
              {`Browsing is ${props.browsingEnabled ? 'enabled' : 'disabled'}`}
            </Typography>
          </Stack>
          <AstroSwitch
            on={props.browsingEnabled}
            callback={props.flipBrowsingEnabled}
          />
        </Stack>
      </DeviceCardSection>
    </Stack>
  );
};

export const DeviceCardScreenTimeSection = (props: {
  totalTime: number;
  elapsedTime: number;
  onClickView: () => void;
}) => (
  <DeviceCardSection title="Screen time left today">
    <Stack direction="row" alignItems="center" spacing="38px">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        width="100%"
      >
        <Stack
          flex={1}
          height="11px"
          bgcolor={PALETTE.secondary.grey[2]}
          borderRadius="6px"
          position="relative"
          overflow="hidden"
        >
          <Stack
            height="100%"
            width={`${Math.min(
              100,
              (100 * props.elapsedTime) / props.totalTime
            )}%`}
            bgcolor={PALETTE.secondary.purple[1]}
            borderRadius="6px"
          />
        </Stack>
        <Typography bold color={PALETTE.secondary.grey[3]}>
          {`${Math.floor(
            Math.max(0, props.totalTime - props.elapsedTime) / 60
          )}h ${Math.floor(
            Math.max(0, props.totalTime - props.elapsedTime) % 60
          )}m`}
        </Typography>
      </Stack>
      <UrsorButton variant="secondary" size="small" onClick={props.onClickView}>
        View
      </UrsorButton>
    </Stack>
  </DeviceCardSection>
);

export const DeviceCardCurrentUrlSection = (props: {
  url?: IFilterUrl['url'];
  title?: IFilterUrl['title'];
  disabled?: 'offline' | 'browsingDisabled';
  faviconUrl?: IFilterUrl['imageUrl'];
}) => {
  const navigate = useNavigate();
  return (
    <DeviceCardSection title="Currently visiting">
      {/* <Link
      href={props.url ? getAbsoluteUrl(props.url) : undefined}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
    > */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing="8px"
        sx={
          !props.disabled
            ? {
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.7 },
                svg: {
                  path: {
                    fill: PALETTE.secondary.purple[2],
                  },
                },
              }
            : undefined
        }
        onClick={
          !props.disabled
            ? () => navigate(getAbsoluteUrl(cleanUrl(props.url!)))
            : undefined
        }
      >
        <Stack direction="row" spacing="8px">
          {!props.disabled && props.faviconUrl ? (
            <Stack
              height="20px"
              width="20px"
              borderRadius="5px"
              overflow="hidden"
            >
              <img
                src={props.faviconUrl}
                height={20}
                width={20}
                alt="favicon"
              />
            </Stack>
          ) : null}
          <Typography
            bold
            color={
              props.disabled
                ? PALETTE.secondary.grey[4]
                : PALETTE.secondary.purple[2]
            }
            maxLines={1}
          >
            {props.disabled === 'browsingDisabled'
              ? 'Currently locked'
              : props.disabled === 'offline'
              ? 'Offline'
              : props.title}
          </Typography>
        </Stack>
        {!props.disabled ? (
          <LinkExternalIcon height="20px" width="20px" />
        ) : null}
      </Stack>
      {/* </Link> */}
    </DeviceCardSection>
  );
};

const DeviceCard = (
  props: IEnrichedDevice & {
    filterName?: IFilter['title'];
    hideToggles?: boolean;
    showBrowsing?: boolean;
    url?: string;
    button?: React.ReactNode;
    small?: boolean;
    onClick?: () => void;
    noExtras?: boolean;
  }
) => {
  const [browsingEnabled, setBrowsingEnabled] = useState<boolean>(false);
  useEffect(
    () => setBrowsingEnabled(!!props.config?.browsingAllowed),
    [props.config?.browsingAllowed]
  );
  const navigate = useNavigate();
  const onClick = () => navigate(`/profiles/${props.id}`);

  const notificationCtx = useContext(NotificationContext);
  return (
    <AstroCard>
      <Stack p="20px" boxSizing="border-box" position="relative">
        {props.button ? (
          <Stack
            position="absolute"
            top="28px"
            right="15px"
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.6 },
              transition: '0.2s',
            }}
            zIndex={2}
          >
            {props.button}
          </Stack>
        ) : null}
        <Stack
          direction="row"
          spacing="18px"
          position="relative"
          height={props.small ? '58px' : '90px'}
          alignItems="center"
          width="94%"
          onClick={props.onClick}
        >
          <Stack position="relative">
            <Stack
              minHeight={props.small ? '40px' : '84px'}
              minWidth={props.small ? '40px' : '84px'}
              borderRadius="100%"
              overflow="hidden"
              bgcolor={PALETTE.secondary.blue[2]}
              justifyContent="center"
              alignItems="center"
              onClick={onClick}
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.6 },
              }}
            >
              {props.profileAvatarUrl ? (
                <img
                  src={props.profileAvatarUrl}
                  height={props.small ? 40 : 84}
                  width={props.small ? 40 : 84}
                  alt="device profile"
                />
              ) : (
                <Typography color="rgb(255,255,255)" bold variant="h4">
                  {getInitials(props.name)}
                </Typography>
              )}
            </Stack>
            <Stack
              position="absolute"
              bottom={-2}
              right={-2}
              height="22px"
              width="22px"
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              bgcolor={
                props.online && browsingEnabled
                  ? PALETTE.secondary.green[4]
                  : PALETTE.secondary.grey[3]
              }
              border={`2px solid rgb(255,255,255)`}
              sx={{
                svg: {
                  path: {
                    fill: 'rgb(255,255,255)',
                  },
                },
              }}
            >
              {props.online && browsingEnabled ? (
                <GlobeIcon height="12px" width="12px" />
              ) : (
                <StrikeThroughGlobeIcon height="12px" width="12px" />
              )}
            </Stack>
          </Stack>
          <Stack justifyContent="center" spacing="4px">
            <Stack
              onClick={onClick}
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.6 },
              }}
            >
              <Typography
                bold
                variant="h5"
                maxLines={1}
                sx={{ wordBreak: 'break-all' }}
              >
                {props.name}
              </Typography>
            </Stack>
            <Stack direction="row" spacing="8px" alignItems="center">
              <PhoneIcon height="16px" width="16px" />
              <Typography maxLines={1}>
                {DEVICE_TYPE_DISPLAY_NAMES[props.deviceType]}
              </Typography>
            </Stack>
            {props.filterName ? (
              <Stack
                direction="row"
                spacing="8px"
                alignItems="center"
                sx={{
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': { opacity: 0.7 },
                  svg: {
                    path: {
                      fill: PALETTE.system.orange,
                    },
                  },
                }}
                onClick={() => navigate(`/filters/${props.filterId}`)}
              >
                <FilterIcon height="16px" width="16px" />
                <Typography maxLines={1}>{props.filterName}</Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        {!props.noExtras ? (
          <>
            <Stack spacing="12px" pt="20px">
              <DeviceCardCurrentUrlSection
                url={props.latestBrowsing?.url}
                disabled={
                  !browsingEnabled
                    ? 'browsingDisabled'
                    : !props.online
                    ? 'offline'
                    : undefined
                }
                title={props.latestBrowsing?.title}
                faviconUrl={props.latestBrowsing?.faviconUrl}
              />
              <DeviceCardScreenTimeSection
                totalTime={props.screenTime?.allowed ?? 0}
                elapsedTime={props.screenTime?.current ?? 0}
                onClickView={() => navigate(`/profiles/${props.id}?tab=limits`)}
              />
              <DeviceCardBrowsingStatusSection
                browsingEnabled={browsingEnabled}
                flipBrowsingEnabled={() => {
                  setBrowsingEnabled(!browsingEnabled);
                  ApiController.flipBrowsingAllowed(props.id, !browsingEnabled);
                  notificationCtx.success(
                    `Browsing is now ${
                      !browsingEnabled ? 'enabled' : 'disabled'
                    } on ${props.name}`
                  );
                }}
              />
            </Stack>

            {/* <Stack
              minHeight="70px"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              alignItems="center"
              justifyContent="center"
              direction="row"
              spacing="8px"
              onClick={() => navigate(`/profiles/${props.id}`)}
            >
              <Typography bold variant="small" color={PALETTE.primary.indigo}>
                Go to Device
              </Typography>
              <ChevronRightIcon height="16px" width="16px" />
            </Stack> */}
            <Stack pt="20px">
              <UrsorButton
                variant="secondary"
                endIcon={ChevronRightIcon}
                onClick={() => navigate(`/profiles/${props.id}`)}
                width="100%"
                backgroundColor="white"
              >
                Go to Device
              </UrsorButton>
            </Stack>
          </>
        ) : null}
      </Stack>
    </AstroCard>
  );
};

export default DeviceCard;

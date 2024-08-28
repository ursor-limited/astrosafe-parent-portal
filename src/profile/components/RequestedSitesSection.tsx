import { AstroBentoCard } from '@/filter/components/AstroBentoCard';
import { Stack } from '@mui/system';

import { PALETTE, Typography, UrsorButton } from '@/ui';
import { IRequestedSite } from './LimitsTab';
import ApiController from '@/api';
import { useContext } from 'react';
import NotificationContext from '@/components/NotificationContext';

const RequestedSiteRow = (
  props: IRequestedSite & {
    onApprove: () => void;
    onDeny: () => void;
  }
) => (
  <Stack
    direction="row"
    height="58px"
    alignItems="center"
    px="16px"
    justifyContent="space-between"
    spacing="10px"
    border={`2px solid ${PALETTE.secondary.orange[3]}`}
    borderRadius="8px"
    bgcolor={PALETTE.secondary.orange[1]}
    overflow="hidden"
  >
    <Stack direction="row" spacing="10px" alignItems="center" flex={1}>
      <Stack borderRadius="100%" overflow="hidden" minWidth="32px">
        <Stack
          minHeight="32px"
          minWidth="32px"
          borderRadius="100%"
          overflow="hidden"
        >
          {props.faviconUrl ? (
            <img src={props.faviconUrl} height={32} width={32} alt="favicon" />
          ) : null}
        </Stack>
      </Stack>
      <Stack
        sx={{ transform: 'translateY(-2px)' }}
        flex={1}
        // maxWidth={0}
        // minWidth="100%"
      >
        <Typography bold maxLines={1}>
          {props.title}
        </Typography>
        <Stack flex={1}>
          <Typography
            variant="tiny"
            bold
            color={PALETTE.secondary.grey[3]}
            maxLines={1}
          >
            {props.url}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
    <Stack direction="row" spacing="6px">
      <UrsorButton
        dark
        variant="tertiary"
        size="small"
        onClick={props.onApprove}
      >
        Approve
      </UrsorButton>
      <UrsorButton
        size="small"
        backgroundColor="transparent"
        variant="secondary"
        onClick={props.onDeny}
      >
        Deny
      </UrsorButton>
    </Stack>
  </Stack>
);

const RequestedSitesSection = (props: {
  sites: IRequestedSite[];
  onUpdate: () => void;
}) => {
  const notificationCtx = useContext(NotificationContext);
  return (
    <Stack spacing="12px">
      <Typography variant="large" bold>{`${props.sites.length} requested site${
        props.sites.length === 1 ? '' : 's '
      }`}</Typography>
      <Stack spacing="12px">
        {props.sites.slice(0, 3).map((s) => (
          <RequestedSiteRow
            key={s.id}
            {...s}
            onApprove={() =>
              ApiController.approveRequestedSite(s.id).then(() => {
                props.onUpdate();
                notificationCtx.success('Approved site');
              })
            }
            onDeny={() =>
              ApiController.denyRequestedSite(s.id).then(() => {
                props.onUpdate();
                notificationCtx.negativeSuccess('Denied site');
              })
            }
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default RequestedSitesSection;

import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IRequestedSite } from "./LimitsTab";
import ApiController from "@/app/api";
import { useContext } from "react";
import NotificationContext from "@/app/components/NotificationContext";

const RequestedSiteRow = (
  props: IRequestedSite & {
    onApprove: () => void;
    onDeny: () => void;
  }
) => (
  <Stack
    direction="row"
    height="48px"
    alignItems="center"
    px="16px"
    justifyContent="space-between"
    spacing="10px"
    border={`2px solid ${PALETTE.secondary.orange[3]}`}
    borderRadius="8px"
    bgcolor={PALETTE.secondary.orange[1]}
    overflow="hidden"
  >
    <Stack direction="row" spacing="10px" alignItems="center" width="30%">
      <Stack borderRadius="100%" overflow="hidden" minWidth="20px">
        <Stack height="20px" width="20px" borderRadius="100%" overflow="hidden">
          {props.faviconUrl ? (
            <Image
              src={props.faviconUrl}
              height={20}
              width={20}
              alt="favicon"
            />
          ) : null}
        </Stack>
      </Stack>
      <Typography bold noWrap>
        {props.title}
      </Typography>
    </Stack>
    <Stack flex={1}>
      <Typography noWrap sx={{ minWidth: "100%", maxWidth: 0 }}>
        {props.url}
      </Typography>
    </Stack>
    <Stack direction="row" spacing="6px">
      <UrsorButton size="small" onClick={props.onApprove}>
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
    <AstroBentoCard title={`${props.sites.length} requested sites`}>
      <Stack spacing="12px">
        {props.sites.slice(0, 3).map((s) => (
          <RequestedSiteRow
            key={s.id}
            {...s}
            onApprove={() =>
              ApiController.approveRequestedSite(s.id).then(() => {
                props.onUpdate();
                notificationCtx.success("Approved site");
              })
            }
            onDeny={() =>
              ApiController.denyRequestedSite(s.id).then(() => {
                props.onUpdate();
                notificationCtx.negativeSuccess("Denied site");
              })
            }
          />
        ))}
      </Stack>
    </AstroBentoCard>
  );
};

export default RequestedSitesSection;

import { AstroBentoCard } from "@/app/filters/[id]/components/AstroBentoCard";
import { IFilterUrl } from "@/app/filters/contents/common";
import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography, UrsorButton } from "ui";

const RequestedSiteRow = (
  props: IFilterUrl & {
    onApprove: () => void;
    onReject: () => void;
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
        <Image src={props.imageUrl} height={20} width={20} alt="favicon" />
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
        onClick={() => props.onReject}
      >
        Deny
      </UrsorButton>
    </Stack>
  </Stack>
);

const RequestedSitesSection = (props: { sites: IFilterUrl[] }) => (
  <AstroBentoCard title={`${props.sites.length} requested sites`}>
    <Stack spacing="12px">
      {props.sites.map((s) => (
        <RequestedSiteRow
          key={s.id}
          {...s}
          onApprove={() => null}
          onReject={() => null}
        />
      ))}
    </Stack>
  </AstroBentoCard>
);

export default RequestedSitesSection;

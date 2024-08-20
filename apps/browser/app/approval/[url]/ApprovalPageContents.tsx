import Image from "next/image";
import React from "react";
import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "../../../../../packages/ui";

const ApprovalPageContents = (props: { url: string; mobile?: boolean }) => (
  <Stack
    spacing="12px"
    alignItems="center"
    justifyContent="center"
    width="100%"
    height="100%"
  >
    <Image
      height={217}
      width={217}
      src="https://ursorassets.s3.eu-west-1.amazonaws.com/wondering_.png"
      alt="Empty state illustration"
    />
    <Stack spacing="12px" alignItems="center" pb="11px">
      <Typography variant="h3">Waiting for approval</Typography>
      <Stack width="320px">
        <Typography
          sx={{ textAlign: "center" }}
          color={PALETTE.secondary.grey[3]}
          variant="medium"
          bold
        >
          A request to access www.finh.cc was sent to your teacher.
        </Typography>
      </Stack>
    </Stack>
    <Link href={props.url} target="_blank" style={{ textDecoration: "none" }}>
      <UrsorButton backgroundColor={PALETTE.secondary.orange[3]}>
        Try again
      </UrsorButton>
    </Link>
  </Stack>
);

export default ApprovalPageContents;

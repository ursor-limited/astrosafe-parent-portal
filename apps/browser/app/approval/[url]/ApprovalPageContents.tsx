"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import Link from "next/link";
import { PALETTE, Typography, UrsorButton } from "../../../../../packages/ui";
import ApiController from "../../api";
import { DUMMY_DEVICE_ID } from "../../home/HomePageContents";
import { useRouter } from "next/navigation";

const ApprovalPageContents = (props: { url: string; isMobile?: boolean }) => {
  const [status, setStatus] = useState<"pending" | "denied">("pending");
  useEffect(() => {
    const domain = new URL(props.url).hostname;
    ApiController.getRequestedSites(DUMMY_DEVICE_ID).then((sites) => {
      const newStatus = sites.find((s) => new URL(s.url).hostname === domain)
        ?.status;
      newStatus && setStatus(newStatus);
    });
  }, [props.url]);
  const router = useRouter();
  return (
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
      <Stack
        spacing="12px"
        alignItems="center"
        pb={props.isMobile ? "7px" : "11px"}
      >
        <Typography variant={props.isMobile ? "h5" : "h3"}>
          {status === "pending" ? "Waiting for approval" : "Access denied"}
        </Typography>
        <Stack width="320px" alignItems="center">
          <Typography
            sx={{ textAlign: "center" }}
            color={PALETTE.secondary.grey[3]}
            variant={props.isMobile ? "normal" : "medium"}
            bold
          >
            {status === "pending"
              ? "A request to access"
              : "Your request to access"}
          </Typography>
          <Typography
            sx={{ textAlign: "center" }}
            color={PALETTE.secondary.grey[4]}
            variant={props.isMobile ? "normal" : "medium"}
            bold
          >
            {props.url
              .replace("http://", "")
              .replace("https://", "")
              .replace("www.", "")
              .replace(/\/$/, "")}
          </Typography>
          <Typography
            sx={{ textAlign: "center" }}
            color={PALETTE.secondary.grey[3]}
            variant={props.isMobile ? "normal" : "medium"}
            bold
          >
            {status === "pending"
              ? "was sent to your parent."
              : "was denied by your parent."}
          </Typography>
        </Stack>
      </Stack>
      {status === "pending" ? (
        <Link href={props.url} style={{ textDecoration: "none" }}>
          <UrsorButton backgroundColor={PALETTE.secondary.orange[3]}>
            Try again
          </UrsorButton>
        </Link>
      ) : (
        <UrsorButton
          backgroundColor={PALETTE.secondary.purple[2]}
          onClick={router.back}
        >
          Go back
        </UrsorButton>
      )}
    </Stack>
  );
};

export default ApprovalPageContents;

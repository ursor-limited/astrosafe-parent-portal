"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "../../../../packages/ui";
import ApiController from "../api";
import { DUMMY_DEVICE_ID } from "../home/HomePageContents";
import { useRouter } from "next/navigation";

const ApprovalPageContents = (props: { url: string; isMobile?: boolean }) => {
  const router = useRouter();
  const [status, setStatus] = useState<"pending" | "denied" | "approved">(
    "pending"
  );
  const load = useCallback(() => {
    const domain = new URL(props.url).hostname;
    ApiController.getRequestedSites(DUMMY_DEVICE_ID).then((sites) => {
      const newStatus = sites.find(
        (s: any) => new URL(s.url).hostname === domain
      )?.status;
      if (newStatus === "approved") {
        router.push(props.url);
      } else {
        newStatus && setStatus(newStatus);
      }
    });
  }, [props.url]);
  useEffect(() => {
    load();
  }, [load]);
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
        <UrsorButton
          backgroundColor={PALETTE.secondary.orange[3]}
          onClick={load}
        >
          Try again
        </UrsorButton>
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

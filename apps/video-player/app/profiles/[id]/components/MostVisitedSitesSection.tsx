import React, { useState } from "react";
import { PALETTE, Typography, UrsorButton } from "ui";
import { AstroBentoCard } from "../../../filters/[id]/components/AstroBentoCard";
import { Stack } from "@mui/system";
import { IVisitedSite } from "./InsightsTab";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import AllMostVisitedSitesDialog from "./AllMostVisitedSitesDialog";
import { cleanUrl } from "./MobileInsightsTab";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";

export const VisitedSiteRow = (
  props: IVisitedSite & {
    maxScreenTime: IVisitedSite["screenTime"];
    borderTop: boolean;
  }
) => (
  <Stack
    height="73px"
    borderTop={
      props.borderTop ? `2px solid ${PALETTE.secondary.grey[2]}` : undefined
    }
    sx={{
      cursor: "pointer",
      "&:hover": { opacity: 0.7 },
      transition: "0.2s",
    }}
    justifyContent="center"
  >
    <Link
      href={props.url}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
    >
      <Stack flex={1} direction="row" spacing="12px" alignItems="center">
        <Stack
          borderRadius="8px"
          overflow="hidden"
          minHeight={42}
          minWidth={42}
          boxShadow="0 0 12px rgba(0,0,0,0.1)"
        >
          <Image src={props.faviconUrl} height={42} width={42} alt="favicon" />
        </Stack>
        <Stack spacing="8px" width="100%">
          <Stack direction="row" spacing="8px" alignItems="center">
            <Typography
              bold
              maxLines={1}
              sx={{
                wordBreak: "break-all",
              }}
            >
              {props.title}
            </Typography>
            <Stack minWidth="20%">
              <Typography
                bold
                color={PALETTE.secondary.grey[3]}
                maxLines={1}
                sx={{
                  wordBreak: "break-all",
                }}
              >
                {cleanUrl(props.url).replace(/\/$/, "")}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing="12px">
            <Stack
              width={`${(100 * props.screenTime) / props.maxScreenTime}%`}
              height="8px"
              bgcolor={PALETTE.secondary.purple[1]}
              borderRadius="4px"
            />
            <Stack width="60px">
              <Typography bold variant="tiny">{`${Math.floor(
                props.screenTime / 60
              )}h ${Math.floor(props.screenTime % 60)}m`}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  </Stack>
);

const MostVisitedSitesSection = (props: {
  sites: IVisitedSite[];
  isMobile?: boolean;
}) => {
  const [allMostVisitedSitesDialogOpen, setAllMostVisitedSitesDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <AstroBentoCard
        title="Most visited sites today"
        notCollapsible
        paddingBottom="0"
        isMobile={props.isMobile}
        topRightStuff={
          <UrsorButton
            size="small"
            variant="secondary"
            onClick={() => setAllMostVisitedSitesDialogOpen(true)}
          >
            View all
          </UrsorButton>
        }
      >
        {_.reverse(props.sites.slice(-3)).map((site, i) => (
          <UrsorFadeIn key={site.url} delay={i * 90} duration={800}>
            <VisitedSiteRow
              {...site}
              maxScreenTime={_.max(props.sites.map((s) => s.screenTime)) ?? 1}
              borderTop={i > 0}
            />
          </UrsorFadeIn>
        ))}
      </AstroBentoCard>
      <AllMostVisitedSitesDialog
        sites={props.sites}
        open={allMostVisitedSitesDialogOpen}
        onClose={() => setAllMostVisitedSitesDialogOpen(false)}
        isMobile={props.isMobile}
      />
    </>
  );
};

export default MostVisitedSitesSection;

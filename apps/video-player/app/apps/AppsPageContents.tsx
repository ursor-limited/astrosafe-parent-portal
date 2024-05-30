"use client";

import React, { useContext, useEffect, useState } from "react";
import PageLayout, { SIDEBAR_X_MARGIN } from "../dashboard/PageLayout";
import { Stack } from "@mui/system";
import NotificationContext from "../components/NotificationContext";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import DynamicCardGrid from "../components/DynamicCardGrid";
import PlatformCard, { IPlatform } from "../safety/components/PlatformCard";
import UrsorFadeIn from "../components/UrsorFadeIn";
import PlatformDialog from "./PlatformDialog";
import { PALETTE, Typography } from "ui";
import BrowserApiController from "../browserApi";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import dynamic from "next/dynamic";

const UrsorLoading = dynamic(
  () => import("../components/UrsorLoading"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const DynamicallyLoadedPortal = dynamic(
  () => import("../components/DynamicallyLoadedPortal"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const CARD_SEPARATION = "28px";
export const MIN_CARD_WIDTH = "175px";

export interface IAppsPageProps {}

export default function AppsPageContents(props: IAppsPageProps) {
  const notificationCtx = useContext(NotificationContext);
  const [appDialogOpen, setAppDialogOpen] = useState<boolean>(false);
  const [editingDialogId, setEditingDialogId] = useState<string | undefined>();

  const userDetails = useBrowserUserContext().userDetails;

  const [apps, setApps] = useState<IPlatform[] | undefined>(undefined);
  const loadApps = () => {
    console.log(userDetails?.schoolId, "____+_");
    BrowserApiController.getAppsInSchool(userDetails?.schoolId ?? "").then(
      (apps) => setApps(apps)
    );
  };
  useEffect(() => {
    userDetails?.schoolId && loadApps();
  }, [userDetails?.schoolId]);

  return (
    <>
      <PageLayout
        title="Apps"
        bodyWidth="100%"
        selectedSidebarItemId="apps"
        description="These are Links to services that you want to give easy access to on your students' Browser, like Google Classroom."
        button={{
          text: "Add App",
          callback: () => setAppDialogOpen(true),
          // dialogCtx.setPlatformDialogProps({
          //   open: true,
          //   closeCallback: () => null,
          //   creationCallback: dataCtx.refreshApps,
          //   updateCallback: dataCtx.refreshApps,
          // }),
          icon: PlusIcon,
        }}
        scrollable
      >
        <Stack
          spacing="12px"
          overflow="scroll"
          pb="182px"
          pl={`${SIDEBAR_X_MARGIN}px`}
        >
          <Stack direction="row" justifyContent="space-between">
            <div />
          </Stack>
          <Stack>
            <DynamicCardGrid
              cardWidth={MIN_CARD_WIDTH}
              columnGap={CARD_SEPARATION}
              rowGap={CARD_SEPARATION}
              paddingRight="13px"
            >
              {apps?.map((p, index) => (
                <UrsorFadeIn key={p.id} duration={800} delay={120 * index}>
                  <PlatformCard
                    platform={p}
                    clickCallback={
                      () => setEditingDialogId(p.id)
                      // dialogCtx.setPlatformDialogProps({
                      //   open: true,
                      //   platform: p,
                      //   closeCallback: () => null,
                      //   creationCallback: dataCtx.refreshApps,
                      //   updateCallback: dataCtx.refreshApps,
                      // })
                    }
                    updateCallback={loadApps}
                    deletionCallback={() =>
                      BrowserApiController.deletePlatform(p.id)
                        .then(loadApps)
                        .then(() =>
                          notificationCtx.negativeSuccess("App deleted")
                        )
                    }
                  />
                </UrsorFadeIn>
              ))}
            </DynamicCardGrid>
          </Stack>
        </Stack>
        {!apps ? (
          <DynamicallyLoadedPortal>
            <Stack
              position="absolute"
              top={0}
              width="100vw"
              height="100vh"
              justifyContent="center"
              alignItems="center"
              sx={{
                pointerEvents: "none",
              }}
            >
              <UrsorLoading />
            </Stack>
          </DynamicallyLoadedPortal>
        ) : null}
        {apps && apps.length === 0 ? (
          <DynamicallyLoadedPortal>
            <Stack
              position="absolute"
              top={0}
              width="100vw"
              height="100vh"
              justifyContent="center"
              alignItems="center"
              sx={{
                pointerEvents: "none",
              }}
            >
              <Typography bold color={PALETTE.secondary.grey[3]}>
                No Apps added yet.
              </Typography>
            </Stack>
          </DynamicallyLoadedPortal>
        ) : null}
      </PageLayout>
      <PlatformDialog
        open={appDialogOpen}
        closeCallback={() => setAppDialogOpen(false)}
        creationCallback={loadApps}
      />
      {editingDialogId ? (
        <PlatformDialog
          open={!!editingDialogId}
          closeCallback={() => setEditingDialogId(undefined)}
          creationCallback={loadApps}
          updateCallback={loadApps}
          platform={apps?.find((a) => a.id === editingDialogId)}
        />
      ) : null}
    </>
  );
}

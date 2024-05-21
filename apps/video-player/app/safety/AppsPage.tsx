import React, { useContext } from "react";
import PageLayout from "../../components/PageLayout";
import { ReactComponent as PlusIcon } from "../../images/icons/PlusIcon.svg";
import { Box, Stack } from "@mui/system";
import NotificationContext from "../../contexts/NotificationContext";
import ApiController from "../../controllers/ApiController";
import _ from "lodash";
import { PALETTE } from "../../palette";
import { useOverallDialogContext } from "../../contexts/DialogContext";
import Typography from "../../components/Typography";
import DynamicCardGrid from "../../components/DynamicCardGrid";
import PlatformCard, {
  MIN_WIDTH as MIN_CARD_WIDTH,
} from "./components/PlatformCard";
import UrsorFadeIn from "../../components/UrsorFadeIn";
import { createPortal } from "react-dom";
import UrsorLoading from "../../components/spinners/UrsorLoading";
import { useUserDataContext } from "../../contexts/UserDataContext";

export const CARD_SEPARATION = "28px";

export interface ISchool {
  id: string;
  name: string;
  email: string;
  emailDomain: string;
  website: string;
  address: string;
  postcode: string;
  country: string;
  isDeleted: boolean;
  hasSharedAccounts: boolean;
}

export interface IAppsPageProps {}

export default function AppsPage(props: IAppsPageProps) {
  const notificationCtx = useContext(NotificationContext);
  const dialogCtx = useOverallDialogContext();
  const dataCtx = useUserDataContext();
  return (
    <>
      <PageLayout
        title="Apps"
        bodyWidth="100%"
        selectedSidebarItemId="apps"
        description="These are Links to services that you want to give easy access to on your students' Browser, like Google Classroom."
        button={{
          text: "Add App",
          callback: () =>
            dialogCtx.setPlatformDialogProps({
              open: true,
              closeCallback: () => null,
              creationCallback: dataCtx.refreshApps,
              updateCallback: dataCtx.refreshApps,
            }),
          icon: PlusIcon,
        }}
      >
        <Stack spacing="12px" overflow="scroll" pb="182px">
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
              {dataCtx.apps?.map((p, index) => (
                <UrsorFadeIn key={p.id} duration={800} delay={120 * index}>
                  <PlatformCard
                    platform={p}
                    clickCallback={() =>
                      dialogCtx.setPlatformDialogProps({
                        open: true,
                        platform: p,
                        closeCallback: () => null,
                        creationCallback: dataCtx.refreshApps,
                        updateCallback: dataCtx.refreshApps,
                      })
                    }
                    updateCallback={dataCtx.refreshApps}
                    deletionCallback={() =>
                      ApiController.deletePlatform(p.id)
                        .then(dataCtx.refreshApps)
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
        {!dataCtx.apps
          ? createPortal(
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
              </Stack>,
              document.body
            )
          : null}
        {dataCtx.apps && dataCtx.apps.length === 0
          ? createPortal(
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
              </Stack>,
              document.body
            )
          : null}
      </PageLayout>
    </>
  );
}

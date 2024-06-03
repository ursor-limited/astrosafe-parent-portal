import { Stack } from "@mui/system";
import ConnectBar from "./ConnectBar";
import { PALETTE, Typography } from "ui";
import Navbar, { NavbarButton } from "./Navbar";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import LandingView from "./LandingView";
import dynamic from "next/dynamic";

const DynamicallyLoadedPortal = dynamic(
  () => import("./DynamicallyLoadedPortal"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const OVERALL_X_PADDING = "20px";

const PageLayout = (props: {
  headerButtonId: NavbarButton;
  sections: {
    title: string;
    titleImage?: React.ReactNode;
    contents: React.ReactNode;
  }[];
  mobile?: boolean;
}) => {
  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    undefined
  );
  const [landingViewOpen, setLandingViewOpen] = useState<boolean>(false);
  useEffect(() => {
    !deviceId && setTimeout(() => setLandingViewOpen(true), 1500);
  }, [deviceId]);
  return (
    <>
      <Navbar selected={props.headerButtonId} />
      <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
        <Stack px={OVERALL_X_PADDING}>
          <ConnectBar mobile={!!props.mobile} />
        </Stack>
        {props.sections.map((section, i) => (
          <Stack key={i}>
            <Stack key={i} spacing="20px">
              <Stack
                px={OVERALL_X_PADDING}
                spacing="12px"
                direction="row"
                alignItems="center"
              >
                {section.titleImage}
                <Typography variant="h5">{section.title}</Typography>
              </Stack>
              {section.contents}
            </Stack>
            {i < props.sections.length - 1 ? (
              <Stack px={OVERALL_X_PADDING}>
                <Stack
                  width="100%"
                  height="2px"
                  bgcolor={PALETTE.secondary.grey[2]}
                />
              </Stack>
            ) : null}
          </Stack>
        ))}
      </Stack>
      {landingViewOpen ? (
        <DynamicallyLoadedPortal>
          <LandingView />
        </DynamicallyLoadedPortal>
      ) : null}
    </>
  );
};

export default PageLayout;

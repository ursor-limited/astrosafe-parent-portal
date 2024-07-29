import { Stack } from "@mui/system";
import ConnectBar from "./ConnectBar";
import { PALETTE, Typography } from "ui";
import Navbar, { NavbarButton } from "./Navbar";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import LandingView from "./LandingView";
import dynamic from "next/dynamic";
import MobileLandingView from "./MobileLandingView";
import useNativeDeviceId from "./useDeviceId";

const DynamicallyLoadedPortal = dynamic(
  () => import("./DynamicallyLoadedPortal"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

export const OVERALL_X_PADDING = "20px";

const PageLayout = (props: {
  headerButtonId: NavbarButton;
  mobile?: boolean;
  openConnect?: boolean;
  children: React.ReactNode;
}) => {
  const nativeDeviceId = useNativeDeviceId();
  const [deviceId, setDeviceId] = useLocalStorage<number | undefined>(
    "deviceId",
    undefined
  );
  const [landingViewOpen, setLandingViewOpen] = useState<boolean>(false);

  useEffect(() => {
    deviceId &&
      window.postMessage(
        {
          setDeviceId: deviceId,
        },
        "*"
      );
    deviceId &&
      window.postMessage(
        {
          setAvatarUrl:
            "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
        },
        "*"
      );
  }, [deviceId]);

  useEffect(() => {
    window.postMessage(
      {
        setAvatarUrl:
          "https://ursorassets.s3.eu-west-1.amazonaws.com/pingu_profile.jpg",
      },
      "*"
    );
  }, []);

  return (
    <>
      {!props.mobile ? <Navbar selected={props.headerButtonId} /> : null}
      {!deviceId ? (
        <ConnectBar mobile={!!props.mobile} openConnect={props.openConnect} />
      ) : null}
      <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
        {props.children}
      </Stack>
      {landingViewOpen ? (
        <DynamicallyLoadedPortal>
          {props.mobile ? <MobileLandingView /> : <LandingView />}
        </DynamicallyLoadedPortal>
      ) : null}
    </>
  );
};

export default PageLayout;

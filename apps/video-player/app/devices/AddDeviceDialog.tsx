import React, { useEffect, useState } from "react";
import {
  AddDeviceDialogContent,
  DeviceInstructionsStepContent,
  DeviceSelectionStepContent,
  MONITORING_UPDATE_PERIOD,
} from "./AddDeviceTutorialDialog";
import _ from "lodash";
import { useBrowserUserContext } from "../components/BrowserUserContext";
import BrowserApiController, { IDevice, ISchool } from "../browserApi";
import NotificationContext from "../components/NotificationContext";
import UrsorDialog from "../components/UrsorDialog";
import { PALETTE, Typography } from "ui";

export interface IAddDeviceDialogProps {
  open: boolean;
  closeCallback: () => void;
  limitReached?: boolean;
}

export default function AddDeviceDialog(props: IAddDeviceDialogProps) {
  const userCtx = useBrowserUserContext();
  const notificationCtx = React.useContext(NotificationContext);
  const [device, setDevice] = useState<IDevice | undefined>(undefined);
  const [deviceType, setDeviceType] = useState<"chrome" | "ipad" | undefined>(
    undefined
  );
  const [school, setSchool] = useState<ISchool | undefined>(undefined);

  const loadSchool = () => {
    userCtx.userDetails?.schoolId &&
      BrowserApiController.getSchool(userCtx.userDetails?.schoolId).then(
        (school) => {
          setSchool(school);
        }
      );
  };

  useEffect(() => {
    loadSchool();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => loadSchool(), MONITORING_UPDATE_PERIOD);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(
    () => school && setDevice(school.devices.find((d) => !d.connected)),
    [school?.devices]
  );

  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.closeCallback}
      backButtonCallback={
        showInstructions
          ? () => {
              setShowInstructions(false);
              setDeviceType(undefined);
            }
          : props.closeCallback
      }
      title={
        showInstructions
          ? deviceType
            ? `Install on ${
                deviceType === "chrome" ? "a Chrome Browser" : "an iPad Device"
              }`
            : "Select your Device"
          : school?.joinCode
          ? _.chunk(school.joinCode, 3).join("-").replaceAll(",", "")
          : ""
      }
      subtitle={
        props.limitReached
          ? [
              <Typography
                color={props.limitReached ? PALETTE.system.red : undefined}
                bold
              >
                Your School's Device limit has been reached.
              </Typography>,
              <Typography
                color={props.limitReached ? PALETTE.system.red : undefined}
              >
                Please contact hello@astrosafe.co to upgrade your plan.
              </Typography>,
            ]
          : showInstructions
          ? deviceType
            ? [
                `Complete the below actions on the student ${
                  deviceType === "chrome" ? "Chrome Browser" : "iPad device"
                }`,
                "you wish to install Astrosafe on.",
              ]
            : [
                "Select the device you want to install Astrosafe on.",
                "Only Chrome Browsers and iPad devices are supported.",
              ]
          : [
              "In one of the student Apps, click",
              <Typography variant="medium" bold>
                Connect to school
              </Typography>,
              "and enter the join code above.",
            ]
      }
      supertitle={showInstructions ? "Instructions" : "Add Device"}
      button={
        device
          ? {
              text: "Accept",
              // variant: "green",
              callback: () => {
                props.closeCallback();
                BrowserApiController.approveDevice(
                  device?.id,
                  userCtx.userDetails?.id ?? ""
                )
                  .then(loadSchool)
                  .then(() => notificationCtx.success("Approved Device"));
              },
            }
          : {
              text: showInstructions
                ? "Back to Device pairing"
                : "Installation instructions",
              // variant: "ghost",
              callback: () => {
                setShowInstructions(!showInstructions);
                showInstructions && setDeviceType(undefined);
              },
            }
      }
      secondaryButton={
        device
          ? {
              text: "Reject",
              // variant: "nippon",
              callback: () => {
                BrowserApiController.rejectDevice(
                  device?.id,
                  userCtx.userDetails?.id ?? ""
                )
                  .then(loadSchool)
                  .then(() =>
                    notificationCtx.negativeSuccess("Rejected Device")
                  );
              },
            }
          : undefined
      }
    >
      {showInstructions ? (
        deviceType ? (
          <DeviceInstructionsStepContent type={deviceType} />
        ) : (
          <DeviceSelectionStepContent
            callback={(type) => {
              setDeviceType(type);
            }}
          />
        )
      ) : (
        <AddDeviceDialogContent device={device} />
      )}
    </UrsorDialog>
  );
}

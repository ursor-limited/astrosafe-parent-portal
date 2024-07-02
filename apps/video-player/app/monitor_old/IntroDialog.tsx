// import React, { useEffect, useState } from "react";
// import { Stack } from "@mui/material";
// import IntroScreenshot from "../../../images/IntroScreenshot.png";
// import StepDialog, { IDialogStepDetails } from "../../components/StepDialog";
// import { ReactComponent as Wave } from "../../images/Wave.svg";
// import ChromeDeviceIllustration from "../../images/ChromeDeviceIllustration.png";
// import WonderingIllustration from "../../images/WonderingIllustration.svg";
// import iPadIllustration from "../../images/iPadIllustration.png";
// import AppsRow from "../../images/AppsRow.png";
// import ChromeCornerIllustration from "../../images/ChromeCornerIllustration.png";
// import { PALETTE } from "../../palette";
// import UrsorButton from "../../components/buttons/UrsorButton";
// import Typography from "../../components/Typography";
// import { Box, keyframes } from "@mui/system";
// import ApiController from "../../controllers/ApiController";
// import { useUserContext } from "../../contexts/UserContext";
// import { IDevice, ISchool } from "../AdminPage/AdminPage";
// import { useUserDataContext } from "../../contexts/UserDataContext";
// import _ from "lodash";
// import UrsorDialog from "../../components/UrsorDialog";

// const PULSE_AMPLITUDE = "12px";
// const EXTENSION_URL =
//   "https://chrome.google.com/webstore/detail/astrosafe/bgmnmkccofmfpgfbamfklejbjboddbep";
// const APP_STORE_URL = "https://apps.apple.com/app/astrosafe/id6444488742";

// export const MONITORING_UPDATE_PERIOD = 10000;

// export const pulse = keyframes`
//   from {
//     transform: translateY(-${PULSE_AMPLITUDE})
//   }
//   to {
//     transform: translateY(${PULSE_AMPLITUDE})
//   }
// `;

// export interface IIntroDialogProps {
//   open: boolean;
//   closeCallback: () => void;
// }

// export default function IntroDialog(props: IIntroDialogProps) {
//   const userCtx = useUserContext();
//   const dataCtx = useUserDataContext();

//   const [step, setStep] = useState<number>(0);
//   const [deviceType, setDeviceType] = useState<"chrome" | "ipad">("chrome");
//   const [device, setDevice] = useState<IDevice | undefined>(undefined);
//   const [school, setSchool] = useState<ISchool | undefined>(undefined);

//   return (
//     <UrsorDialog
//       open={props.open}
//       title={`Welcome ${userCtx.userDetails?.teacherName}`}
//       subtitle={[
//         "Astrosafe lets you share links with your students inside a safe Browser that lives on",
//         "their devices. Follow these instructions to get started.",
//       ]}
//       supertitle="Get started"
//       button={{
//         text: "Start",
//         callback: props.closeCallback,
//       }}
//       onCloseCallback={props.closeCallback}
//     >
//       <Stack
//         alignItems="center"
//         position="absolute"
//         bottom="138px"
//         width="100%"
//         height="19vh"
//       >
//         <img height="380px" width="auto" src={IntroScreenshot} />
//       </Stack>
//     </UrsorDialog>
//   );
// }

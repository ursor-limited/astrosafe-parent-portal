import { Stack } from "@mui/system";
import { Typography, UrsorButton } from "ui";
import { useUserContext } from "../components/UserContext";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import { getTrialDaysLeft } from "./DashboardPageContents";
import { isIOS } from "react-device-detect";

const MAX_LITE_MODE_ACTIONS = 3;

// export const useOutOfCreations = () => {
//   const userDetails = useUserContext().user;
//   return (
//     !userDetails?.subscribed &&
//     (userDetails?.creations ?? 0) >= MAX_LITE_MODE_ACTIONS
//   );
// };

export const useOnBasicMode = () => {
  const userCtx = useUserContext();
  return (
    !userCtx.schoolIsSubscribed &&
    getTrialDaysLeft(userCtx?.user?.freeTrialStart) <= 0
  );
};

const LiteModeBar = (props: {
  mobile?: boolean;
  upgradeCallback: () => void;
}) => {
  return (
    <Stack
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      marginLeft="auto"
      marginRight="auto"
      width="100%"
      height={!props.mobile ? "48px" : undefined}
      sx={{
        background: "linear-gradient(16deg, #F279C5, #1D62F6)",
      }}
      justifyContent="center"
      alignItems="center"
      zIndex={999}
      //boxShadow="0 0 24px rgba(0,0,0,0.08)"
      direction={props.mobile ? "column" : "row"}
      spacing={props.mobile ? "3px" : "16px"}
      py={props.mobile ? "10px" : undefined}
    >
      <Stack
        direction="row"
        spacing="5px"
        width={props.mobile ? "90%" : undefined}
        justifyContent={props.mobile ? "center" : undefined}
      >
        <Typography bold color="rgba(255,255,255,0.83)">
          You are currently on Basic Mode
        </Typography>
        {/* <Typography variant="medium" color="rgb(255,255,255)" bold>
          {Math.max(0, MAX_LITE_MODE_ACTIONS - (userDetails?.creations ?? 0))}
        </Typography>
        <Typography
          variant="medium"
          color="rgba(255,255,255,0.83)"
          bold
        >{`/ ${MAX_LITE_MODE_ACTIONS}`}</Typography>
        <Typography variant="medium" color="rgba(255,255,255,0.83)">
          content creations left this month.
        </Typography> */}
      </Stack>
      <Stack
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.66 },
          transition: "0.2s",
        }}
        onClick={props.upgradeCallback}
      >
        <Stack sx={{ pointerEvents: "none" }}>
          <UrsorButton
            dark
            size="small"
            fontColor="#4166EE"
            endIcon={RocketIcon}
            iconSize={14}
          >
            Upgrade to Premium
          </UrsorButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LiteModeBar;

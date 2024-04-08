import { Stack } from "@mui/system";
import { Typography, UrsorButton } from "ui";
import { useUserContext } from "../components/UserContext";

const MAX_LITE_MODE_ACTIONS = 3;

export const useOutOfCreations = () => {
  const userDetails = useUserContext().user;
  return (
    !userDetails?.subscribed &&
    (userDetails?.creations ?? 0) >= MAX_LITE_MODE_ACTIONS
  );
};

const LiteModeBar = (props: {
  mobile?: boolean;
  upgradeCallback: () => void;
}) => {
  const userDetails = useUserContext().user;
  return (
    <Stack
      position="absolute"
      bottom="40px"
      left={0}
      right={0}
      marginLeft="auto"
      marginRight="auto"
      width={!props.mobile ? "680px" : undefined}
      height={!props.mobile ? "64px" : undefined}
      sx={{
        background: "linear-gradient(16deg, #F279C5, #1D62F6)",
      }}
      justifyContent="center"
      alignItems="center"
      borderRadius="12px"
      zIndex={999}
      //boxShadow="0 0 24px rgba(0,0,0,0.08)"
      direction={props.mobile ? "column" : "row"}
      spacing={props.mobile ? "6px" : "24px"}
      py={props.mobile ? "18px" : undefined}
      mx={props.mobile ? "20px !important" : undefined}
    >
      <Stack
        direction="row"
        spacing="5px"
        width={props.mobile ? "90%" : undefined}
        justifyContent={props.mobile ? "center" : undefined}
      >
        <Typography variant="medium" color="rgb(255,255,255)" bold>
          {MAX_LITE_MODE_ACTIONS - (userDetails?.creations ?? 0)}
        </Typography>
        <Typography
          variant="medium"
          color="rgba(255,255,255,0.83)"
          bold
        >{`/ ${MAX_LITE_MODE_ACTIONS}`}</Typography>
        <Typography variant="medium" color="rgba(255,255,255,0.83)">
          content creations left this month.
        </Typography>
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
          <UrsorButton dark fontColor="#4166EE">
            Upgrade to unlimited
          </UrsorButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LiteModeBar;

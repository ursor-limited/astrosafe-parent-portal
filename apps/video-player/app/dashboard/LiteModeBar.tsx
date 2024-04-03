import { Stack } from "@mui/system";
import { Typography, UrsorButton } from "ui";
import { useUserContext } from "../components/UserContext";

const MAX_LITE_MODE_ACTIONS = 3;

export const useOutOfCreations = () => {
  const nCreations = useUserContext().user?.creations ?? 0;
  return nCreations >= MAX_LITE_MODE_ACTIONS;
};

const LiteModeBar = (props: { upgradeCallback: () => void }) => {
  const userDetails = useUserContext().user;
  return (
    <Stack
      position="absolute"
      bottom="40px"
      left={0}
      right={0}
      marginLeft="auto"
      marginRight="auto"
      width="680px"
      height="64px"
      sx={{
        background: "linear-gradient(16deg, #F279C5, #1D62F6)",
      }}
      justifyContent="center"
      alignItems="center"
      borderRadius="12px"
      zIndex={999}
      //boxShadow="0 0 24px rgba(0,0,0,0.08)"
      direction="row"
      spacing="24px"
    >
      <Stack direction="row" spacing="5px">
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

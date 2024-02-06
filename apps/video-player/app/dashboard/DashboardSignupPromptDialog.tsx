import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";

const DashboardSignupPromptDialog = (props: {
  open: boolean;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  return (
    <UrsorDialog
      supertitle="Sign in"
      title="Sign in"
      subtitle={[
        "Sign in to create videos, share them,",
        "and store them all in one place.",
      ]}
      open={props.open}
      button={{
        text: "Let's do it",
        callback: () => {
          props.mobile ? loginWithRedirect() : loginWithPopup();
          mixpanel.track("creation page - clicked signup button");
        },
        icon: ChevronRight,
      }}
      width="90%"
      maxWidth="880px"
      noCloseButton
    >
      <Stack
        height="380px"
        width="300px"
        sx={{
          backgroundImage: `url(https://ursorassets.s3.eu-west-1.amazonaws.com/page.png)`,
          backgroundSize: "cover",
          boxSizing: "border-box",
        }}
      />
    </UrsorDialog>
  );
};

export default DashboardSignupPromptDialog;

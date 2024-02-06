import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import { useAuth0 } from "@auth0/auth0-react";
import mixpanel from "mixpanel-browser";

const SignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();
  return (
    <UrsorDialog
      supertitle="Sign up"
      title="Sign up"
      subtitle={[
        "Your Video Link is ready to be shared.",
        "All you need to do is Sign Up.",
      ]}
      open={props.open}
      button={{
        text: "Sign up",
        callback: () => {
          props.closeCallback();
          props.mobile ? loginWithRedirect() : loginWithPopup();
          mixpanel.track("creation page - clicked signup button");
        },
        icon: ChevronRight,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
      width="90%"
      maxWidth="880px"
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

export default SignupPromptDialog;

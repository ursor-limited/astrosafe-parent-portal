import PersonIcon from "@/images/icons/PersonIcon.svg";
import Image from "next/image";
import { Stack } from "@mui/system";
import { PALETTE, UrsorButton } from "ui";
import UrsorDialog from "./UrsorDialog";

const FREE_VIDEO_LIMIT = 3;
const SCREENSHOT_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png";

const UpgradePromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Continue creating worksheets and safe videos with just the click of a button."
      open={props.open}
      titleSize={props.mobile ? "h4" : "h3"}
      noOverflowHidden
      onCloseCallback={props.closeCallback}
    >
      <Stack flex={1} alignItems="center">
        <Stack
          sx={{
            cursor: "pointer",
            "&:hover": { opacity: 0.7 },
            transition: "0.2s",
          }}
        >
          <UrsorButton
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            onClick={() => {
              null;
            }}
            endIcon={PersonIcon}
          >
            Upgrade now
          </UrsorButton>
        </Stack>
        <Stack
          width="727px"
          height="392px"
          borderRadius="20px"
          border={`6px solid ${PALETTE.secondary.grey[5]}`}
          sx={{
            transform: "translateY(30px)",
          }}
          overflow="hidden"
        >
          <Image
            src={SCREENSHOT_URL}
            width={727}
            height={454}
            priority={true}
            alt="signup dialog screenshot"
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default UpgradePromptDialog;

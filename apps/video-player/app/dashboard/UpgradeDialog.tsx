import RocketIcon from "@/images/icons/RocketIcon.svg";
import UrsorDialog from "../components/UrsorDialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Stack } from "@mui/system";
import { useLocalStorage } from "usehooks-ts";

const FREE_VIDEO_LIMIT = 3;

const BrowserDialog = (props: { open: boolean; closeCallback: () => void }) => {
  const router = useRouter();
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title={
        "Continue creating worksheets and safe videos with just the click of a button."
      }
      subtitle={[
        "Are you ready to enter our mindblowing edu-browser?",
        "You will be prompted to sign in again.",
      ]}
      open={props.open}
      button={{
        text: "Upgrade now",
        callback: () => {
          router.push("https://app.astrosafe.co");
        },
        icon: RocketIcon,
      }}
      onCloseCallback={props.closeCallback}
    >
      <Stack width="300px" height="300px">
        <Image
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/GraphIllustration.svg"
          width={500}
          height={500}
          alt="Upgrade dialog illustration"
        />
      </Stack>
    </UrsorDialog>
  );
};

export default BrowserDialog;

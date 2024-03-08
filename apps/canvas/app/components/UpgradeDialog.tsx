import { Stack } from "@mui/system";
import UrsorDialog from "./UrsorDialog";
import RocketIcon from "@/images/icons/RocketIcon.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import { useRouter } from "next/navigation";
import { useUserContext } from "./UserContext";

const UpgradeDialog = (props: { open: boolean; closeCallback: () => void }) => {
  const paymentLink = useUserContext().paymentLink;
  const router = useRouter();
  return (
    <UrsorDialog
      supertitle="Upgrade"
      title="Upgrade to Premium"
      subtitle={["Upgrade to create as many videos", "as you want!"]}
      open={props.open}
      button={{
        text: "Upgrade",
        callback: () => router.push(paymentLink ?? ""),
        icon: RocketIcon,
      }}
      onCloseCallback={props.closeCallback}
      backButtonCallback={props.closeCallback}
      width="90%"
      maxWidth="880px"
    >
      <GraphIllustration width={150} height={150} />
    </UrsorDialog>
  );
};

export default UpgradeDialog;

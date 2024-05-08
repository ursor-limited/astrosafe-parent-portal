import PencilIcon from "@/images/icons/Pencil.svg";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import { Stack } from "@mui/system";
import { UrsorButton, UrsorInputField } from "ui";
import UrsorDialog from "../components/UrsorDialog";
import ApiController from "../api";
import { useUserContext } from "../components/UserContext";
import { useContext, useEffect, useState } from "react";
import NotificationContext from "../components/NotificationContext";

export const SCREENSHOT_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/foo!.png";

const ShareDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  mobile?: boolean;
}) => {
  const { user } = useAuth0();
  const userDetails = useUserContext();
  const [title, setTitle] = useState<string>("");
  useEffect(
    () =>
      setTitle(
        userDetails.user?.externalDashboardTitle ||
          `${user?.given_name} ${user?.family_name}'${
            user?.family_name?.slice(-1)?.[0] === "s" ? "" : "s"
          } Dashboard`
      ),
    [user?.given_name, userDetails.user?.externalDashboardTitle]
  );

  const notificationCtx = useContext(NotificationContext);

  return (
    <UrsorDialog
      title={"Share your Dashboard"}
      subtitle={["Your dashboard will be shared as..."]}
      open={props.open}
      titleSize={props.mobile ? "h4" : "h3"}
      onCloseCallback={props.closeCallback}
      noPadding
      paddingTop="40px"
      paddingX="40px"
    >
      <Stack flex={1} alignItems="center" justifyContent="space-between">
        <Stack flex={1} alignItems="center" spacing="12px">
          <UrsorInputField
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value ?? "");
            }}
            width="420px"
            boldValue
          />
          <UrsorButton
            dark
            variant="tertiary"
            onClick={() =>
              userDetails.user?.id &&
              ApiController.setExternalDashboardTitle(
                userDetails.user.id,
                title
              ).then(() => {
                navigator.clipboard.writeText(
                  `${
                    window.location.href.split("/dashboard")[0]
                  }/user/${userDetails.user?.id}`
                );
                notificationCtx.success(
                  "Copied your Dashboard's shareable URL."
                );
                props.closeCallback();
                userDetails.refresh();
              })
            }
            endIcon={PencilIcon}
          >
            Confirm
          </UrsorButton>
        </Stack>
        <Image
          src={SCREENSHOT_URL}
          width={727}
          height={331}
          priority={true}
          alt="share dialog illustration"
        />
      </Stack>
    </UrsorDialog>
  );
};

export default ShareDialog;

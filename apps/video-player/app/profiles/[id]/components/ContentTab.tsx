import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import FolderCard from "../../../components/FolderCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useRouter } from "next/navigation";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import { PALETTE } from "ui";
import { IDevice } from "@/app/filters/[id]/contents/common";
import ApiController from "@/app/api";
import { useContext, useState } from "react";
import NotificationContext from "@/app/components/NotificationContext";
import FolderDeviceRemovalConfirmationDialog from "@/app/folders/[id]/components/FolderDeviceRemovalConfirmationDialog";

export type AstroContent = "video" | "channel" | "link";

export interface IContent {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

export interface IContentBucket {
  id: number;
  title: string;
  groupId: number;
  videos: IVideo[];
  channels: IChannel[];
  links: ILink[];
  lessons: ILesson[];
}

export interface ILink extends IContent {
  thumbnailUrl: string;
}
export interface IChannel extends IContent {
  profileUrl: string;
  bannerUrl: string;
}
export interface IVideo extends IContent {
  thumbnailUrl: string;
}
export interface ILesson extends IContent {
  imageUrls: string[];
}

const DevicePageContentTab = (props: {
  folders: IEnrichedContentBucket[];
  isMobile?: boolean;
  onUpdate: () => void;
  deviceId: IDevice["id"];
  deviceName: IDevice["name"];
}) => {
  const router = useRouter();
  const [
    folderDeviceRemovalConfirmationDialogId,
    setFolderDeviceRemovalConfirmationDialogId,
  ] = useState<number | undefined>();
  const notificationCtx = useContext(NotificationContext);
  return (
    <>
      <Stack pt="20px">
        <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
          {props.folders.map((f, i) => (
            <UrsorFadeIn key={f.id} duration={800} delay={100 * i}>
              <FolderCard
                key={f.id}
                {...f}
                clickCallback={() => router.push(`/folders/${f.id}`)}
                isMobile={props.isMobile}
                editingCallback={props.onUpdate}
                deletionCallback={props.onUpdate}
                extraActions={[
                  {
                    text: "Remove Device",
                    kallback: () =>
                      setFolderDeviceRemovalConfirmationDialogId(f.id),
                    icon: PhoneIcon,
                    color: PALETTE.system.red,
                  },
                ]}
              />
            </UrsorFadeIn>
          ))}
        </DynamicCardGrid>
      </Stack>
      {folderDeviceRemovalConfirmationDialogId ? (
        <FolderDeviceRemovalConfirmationDialog
          open={true}
          onClose={() => setFolderDeviceRemovalConfirmationDialogId(undefined)}
          onSubmit={() =>
            ApiController.removeFolderFromDevice(
              folderDeviceRemovalConfirmationDialogId,
              props.deviceId
            )
              .then(props.onUpdate)
              .then(() =>
                notificationCtx.negativeSuccess("Removed Folder from Device.")
              )
          }
          deviceName={props.deviceName}
          isMobile={props.isMobile}
        />
      ) : null}
    </>
  );
};

export default DevicePageContentTab;

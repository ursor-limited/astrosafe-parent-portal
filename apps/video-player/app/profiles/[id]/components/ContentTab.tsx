import DynamicCardGrid from "@/app/components/DynamicCardGrid";
import { Stack } from "@mui/system";
import FolderCard from "../../../components/FolderCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import { useRouter } from "next/navigation";
import { IEnrichedContentBucket } from "@/app/folders/contents/common";
import PhoneIcon from "@/images/icons/PhoneIcon.svg";
import PlusIcon from "@/images/icons/PlusIcon.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import { IDevice } from "@/app/filters/[id]/contents/common";
import ApiController from "@/app/api";
import { useContext, useState } from "react";
import NotificationContext from "@/app/components/NotificationContext";
import FolderDeviceRemovalConfirmationDialog from "@/app/folders/[id]/components/FolderDeviceRemovalConfirmationDialog";
import Image from "next/image";
import ProfilePageTabLayout from "../components/ProfilePageTabLayout";

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
  openAddFolderDialog: () => void;
}) => {
  const router = useRouter();
  const [
    folderDeviceRemovalConfirmationDialogId,
    setFolderDeviceRemovalConfirmationDialogId,
  ] = useState<number | undefined>();
  const notificationCtx = useContext(NotificationContext);
  return (
    <ProfilePageTabLayout
      title={`${props.folders.length} Content Folder${
        props.folders.length === 1 ? "" : "s"
      }`}
      rightSideElement={
        <UrsorButton
          dark
          variant="tertiary"
          size="small"
          endIcon={PlusIcon}
          iconSize={18}
          onClick={props.openAddFolderDialog}
        >
          Add Folder
        </UrsorButton>
      }
      explanation="Mario Kario 64 is the first game of the Super Mario franchise to let more than two people play simultaneously. It is also the first Mario Kart game to use three-dimensional graphics for its environment design, such as the addition of elevation, advanced collision physics, expanded camera controls, real walls that can obscure views, and increased aesthetic fidelity."
    >
      {props.folders.length > 0 ? (
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
      ) : (
        <Stack flex={1} justifyContent="center" alignItems="center">
          <UrsorFadeIn delay={600} duration={800}>
            <Stack
              height={props.isMobile ? "100%" : "457px"}
              justifyContent="center"
              alignItems="center"
              spacing="13px"
            >
              <Image
                src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png"
                width={props.isMobile ? 179 : 230}
                height={props.isMobile ? 152 : 195}
                alt="empty state illustration"
              />
              <Stack
                width={props.isMobile ? "100%" : "304px"}
                alignItems="center"
              >
                <Typography
                  color={PALETTE.secondary.grey[3]}
                  sx={{ textAlign: "center" }}
                  bold
                >
                  There is no Content currently assigned to this Device. Add an
                  existing Folder or create a new one.
                </Typography>
              </Stack>
            </Stack>
          </UrsorFadeIn>
        </Stack>
      )}
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
    </ProfilePageTabLayout>
  );
};

export default DevicePageContentTab;

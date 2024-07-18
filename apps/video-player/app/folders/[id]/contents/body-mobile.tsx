import { Stack } from "@mui/system";
import ContentPageDevicesSection from "../components/DevicesSection";
import { IDevice } from "@/app/filters/[id]/FilterPageContents";
import {
  AstroContent,
  IChannel,
  IContentBucket,
  ILink,
  IVideo,
} from "@/app/devices/[id]/ContentTab";
import { IContentCard } from "./common";

const FolderPageMobileBody = (props: {
  folderId: IContentBucket["id"];
  folder?: IContentBucket;
  contents: IContentCard[];
  allFolders: IContentBucket[];
  devices: IDevice[];
  setCreationDialogOpen: (type: AstroContent) => void;
  onEditFolder: () => void;
  loadFolderAndContents: () => void;
  setAddDeviceDialogOpen: () => void;
  onRemoveDevice: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedContentType: AstroContent | "all";
  setSelectedContentType: (type: AstroContent | "all") => void;
  setLinkEditingDialogId: (id: ILink["id"]) => void;
  setVideoEditingDialogId: (id: IVideo["id"]) => void;
  setChannelEditingDialogId: (id: IChannel["id"]) => void;
}) => {
  return (
    <Stack height="100%" width="100%" overflow="scroll" px="12px">
      <ContentPageDevicesSection
        devices={props.devices}
        folderId={props.folderId}
        onAdd={props.setAddDeviceDialogOpen}
        onRemove={props.onRemoveDevice}
      />
    </Stack>
  );
};

export default FolderPageMobileBody;

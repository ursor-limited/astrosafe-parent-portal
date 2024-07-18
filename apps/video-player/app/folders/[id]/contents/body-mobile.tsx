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
import { CONTENT_BRANDING, IContentCard } from "./common";
import { PALETTE, Typography } from "ui";
import { SearchInput } from "@/app/components/SearchInput";
import SortButton from "@/app/components/SortButton";
import { AddContentButton } from "../components/AddContentButton";
import LinkCard from "../components/LinkCard";
import VideoCard from "../components/VideoCard";
import ChannelCard from "../components/ChannelCard";
import UrsorFadeIn from "@/app/components/UrsorFadeIn";
import Image from "next/image";
import MobileContentPageDevicesSection from "../components/MobileDevicesSection";
import TitleRow, { ITitleRowItem } from "@/app/components/TitleRow";

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
  titleRow: ITitleRowItem[];
}) => {
  return (
    <Stack
      height="100%"
      width="100%"
      overflow="scroll"
      px="12px"
      py="24px"
      boxSizing="border-box"
    >
      <Stack pb="24px">
        <TitleRow items={props.titleRow} isMobile />
      </Stack>
      <Stack spacing="24px" pb="32px">
        <MobileContentPageDevicesSection
          devices={props.devices}
          folderId={props.folderId}
          onAdd={props.setAddDeviceDialogOpen}
          onRemove={props.onRemoveDevice}
        />
        <Stack justifyContent="center">
          <Stack
            width="100%"
            height="1px"
            bgcolor={PALETTE.secondary.grey[2]}
          />
        </Stack>
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="large"
            bold
          >{`${props.contents.length} pieces of Content in this Folder`}</Typography>
          <Stack
            direction="row"
            spacing="12px"
            alignItems="center"
            width="fit-content"
          >
            <SearchInput
              value={props.searchValue ?? ""}
              callback={(value: string) => {
                props.setSearchValue(value);
              }}
              clearCallback={() => props.setSearchValue("")}
              shadow
            />
            <SortButton
              noText
              selected={props.selectedContentType}
              callback={(id) =>
                props.setSelectedContentType(id as AstroContent | "all")
              }
              types={["all", "link", "video", "channel"]}
              displayNames={{
                all: "All",
                video: "Video",
                channel: "Channel",
                link: "Link",
              }}
              width="120px"
            />
          </Stack>
        </Stack> */}
        {/* <Stack direction="row" spacing="24px">
          {["link", "video", "channel"].map((c) => (
            <Stack
              key={c}
              onClick={() => props.setCreationDialogOpen(c as AstroContent)}
              flex={1}
            >
              <AddContentButton
                key={c as AstroContent}
                onClick={() => null}
                {...CONTENT_BRANDING[c as AstroContent]}
                fullWidth
              />
            </Stack>
          ))}
        </Stack> */}
        {/* <Stack
          bgcolor="rgb(255,255,255)"
          borderRadius="12px"
          border={`1px solid ${PALETTE.secondary.grey[2]}`}
          p="16px"
          boxSizing="border-box"
        >
          <Stack overflow="hidden" flex={1}>
            {props.contents.length > 0 ? (
              <Stack flex={1} direction="row" spacing="20px">
                {props.contents.map((x, i) => (
                  <Stack key={x.content.id}>
                    <UrsorFadeIn delay={i * 80} duration={800}>
                      {x.type === "link" ? (
                        <LinkCard
                          {...(x.content as ILink)}
                          onClick={() => null}
                          onDelete={props.loadFolderAndContents}
                          onOpenEditingDialog={() =>
                            props.setLinkEditingDialogId(x.content.id)
                          }
                        />
                      ) : x.type === "video" ? (
                        <VideoCard
                          {...(x.content as IVideo)}
                          onClick={() => null}
                          onDelete={props.loadFolderAndContents}
                          onOpenEditingDialog={() =>
                            props.setVideoEditingDialogId(x.content.id)
                          }
                        />
                      ) : x.type === "channel" ? (
                        <ChannelCard
                          {...(x.content as IChannel)}
                          onClick={() => null}
                          onDelete={props.loadFolderAndContents}
                          onOpenEditingDialog={() =>
                            props.setChannelEditingDialogId(x.content.id)
                          }
                        />
                      ) : null}
                    </UrsorFadeIn>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Stack
                height="457px"
                justifyContent="center"
                alignItems="center"
                spacing="13px"
              >
                <Image
                  src="https://ursorassets.s3.eu-west-1.amazonaws.com/Frame+427321506.png"
                  width={179}
                  height={152}
                  alt="empty state illustration"
                />
                <Stack width="444px">
                  <Typography
                    color={PALETTE.secondary.grey[3]}
                    sx={{ textAlign: "center" }}
                    bold
                  >
                    This Folder is currently empty. Click one of the buttons
                    above to add Content to the assigned Devices.
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack> */}
      </Stack>
    </Stack>
  );
};

export default FolderPageMobileBody;

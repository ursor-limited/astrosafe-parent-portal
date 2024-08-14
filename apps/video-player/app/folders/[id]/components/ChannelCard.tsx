import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";
import ApiController from "@/app/api";
import { IChannel } from "@/app/profiles/[id]/components/ContentTab";
import { PALETTE } from "ui";

const IMAGE_HEIGHT = 160;

const ChannelCard = (
  props: Omit<IChannel, "createdAt"> & {
    noPointerEvents?: boolean;
    noMenu?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onOpenEditingDialog?: () => void;
    isMobile?: boolean;
    twoLineTitleSectionHeight?: boolean;
  }
) => {
  return (
    <ContentCard
      type="channel"
      title={props.title}
      url={props.url}
      noPointerEvents={props.noPointerEvents}
      noMenu={props.noMenu}
      onDelete={() => ApiController.deleteLink(props.id).then(props.onDelete)}
      onOpenEditingDialog={() => props.onOpenEditingDialog?.()}
      isMobile={props.isMobile}
      twoLineTitleSectionHeight={props.twoLineTitleSectionHeight}
    >
      <Stack
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 4px rgba(0,0,0,0.08)"
      >
        {props.bannerUrl ? (
          <Image
            src={props.bannerUrl}
            style={{
              objectFit: "cover",
              justifyContent: "center",
              alignItems: "center",
            }}
            fill
            alt="banner image"
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
        {props.profileUrl ? (
          <Stack
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              height="72px"
              width="72px"
              borderRadius="100%"
              overflow="hidden"
              border="3px solid rgb(255,255,255)"
              position="relative"
              boxShadow="0 0 20px rgba(0,0,0,0.1)"
            >
              {props.profileUrl ? (
                <Image
                  src={props.profileUrl}
                  style={{
                    objectFit: "cover",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  fill
                  alt="profile image"
                />
              ) : (
                <Stack flex={1} bgcolor={PALETTE.secondary.grey[3]} />
              )}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </ContentCard>
  );
};

export default ChannelCard;

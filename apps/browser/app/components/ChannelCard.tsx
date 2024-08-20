import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";
import { IChannel } from "../home/HomePageContents";

const IMAGE_HEIGHT = 160;

const ChannelCard = (
  props: Omit<IChannel, "createdAt"> & {
    favorite?: boolean;
    flipFavorite?: () => void;
    onClick?: () => void;
    noPointerEvents?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onOpenEditingDialog?: () => void;
  }
) => {
  return (
    <ContentCard
      type="channel"
      id={props.id}
      title={props.title}
      onClick={props.onClick}
      favorite={props.favorite}
      flipFavorite={props.flipFavorite}
    >
      <Stack
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 4px rgba(0,0,0,0.08)"
      >
        <Image
          src={props.bannerUrl}
          style={{
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center",
          }}
          fill
          alt="channel card image"
        />
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
              <Image
                src={props.profileUrl}
                style={{
                  objectFit: "cover",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                fill
                alt="image card image"
              />
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </ContentCard>
  );
};

export default ChannelCard;

import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";
import Play from "@/images/play.svg";
import { IVideo } from "../home/HomePageContents";

const IMAGE_HEIGHT = 144;

const VideoCard = (
  props: Omit<IVideo, "createdAt"> & {
    favorite: boolean;
    setFavorite: () => void;
    onClick: () => void;
    noPointerEvents?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onOpenEditingDialog?: () => void;
  }
) => {
  return (
    <ContentCard
      type="video"
      id={props.id}
      title={props.title}
      onClick={props.onClick}
      favorite={props.favorite}
      setFavorite={props.setFavorite}
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
          src={props.thumbnailUrl}
          style={{
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center",
          }}
          fill
          alt="image card image"
        />
        <Stack
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "radial-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0))",
            svg: {
              fill: {
                path: "rgb(255,255,255)",
              },
            },
          }}
        >
          <Play width="26px" height="26px" />
        </Stack>
      </Stack>
    </ContentCard>
  );
};

export default VideoCard;

import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";
import { ILink } from "../home/HomePageContents";

const IMAGE_HEIGHT = 227;

const LinkCard = (
  props: Omit<ILink, "createdAt"> & {
    favorite: boolean;
    setFavorite: () => void;
    onClick: () => void;
    noPointerEvents?: boolean;
    onDelete?: () => void;
    onOpenEditingDialog?: () => void;
  }
) => {
  return (
    <ContentCard
      type="link"
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
        boxShadow="0 0 6px rgba(0,0,0,0.08)"
      >
        <Image
          src={props.thumbnailUrl}
          style={{ objectFit: "cover" }}
          fill
          alt="image card image"
        />
      </Stack>
    </ContentCard>
  );
};

export default LinkCard;

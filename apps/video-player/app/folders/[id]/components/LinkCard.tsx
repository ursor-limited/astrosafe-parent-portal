import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";
import ApiController from "@/app/api";
import { ILink } from "@/app/profiles/[id]/components/ContentTab";
import { PALETTE } from "ui";

const IMAGE_HEIGHT = 227;

const LinkCard = (
  props: Omit<ILink, "createdAt"> & {
    onClick: () => void;
    noPointerEvents?: boolean;
    onDelete?: () => void;
    onOpenEditingDialog?: () => void;
  }
) => {
  return (
    <ContentCard
      type="link"
      title={props.title}
      onClick={props.onClick}
      noPointerEvents={props.noPointerEvents}
      onDelete={() => ApiController.deleteLink(props.id).then(props.onDelete)}
      onOpenEditingDialog={() => props.onOpenEditingDialog?.()}
    >
      <Stack
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 6px rgba(0,0,0,0.08)"
      >
        {props.thumbnailUrl ? (
          <Image
            src={props.thumbnailUrl}
            style={{ objectFit: "cover" }}
            fill
            alt="image card image"
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
      </Stack>
    </ContentCard>
  );
};

export default LinkCard;

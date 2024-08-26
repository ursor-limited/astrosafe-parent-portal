import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";
import ApiController from "@/app/api";
import { ILink } from "@/app/profiles/[id]/components/ContentTab";
import { PALETTE } from "@/ui";

const IMAGE_HEIGHT = 227;

const LinkCard = (
  props: Partial<Omit<ILink, "createdAt">> & {
    noPointerEvents?: boolean;
    noMenu?: boolean;
    onDelete?: () => void;
    onOpenEditingDialog?: () => void;
    isMobile?: boolean;
    twoLineTitleSectionHeight?: boolean;
  }
) => {
  return (
    <ContentCard
      type="link"
      title={props.title}
      url={props.url}
      noPointerEvents={props.noPointerEvents}
      noMenu={props.noMenu}
      onDelete={() =>
        props.id && ApiController.deleteLink(props.id).then(props.onDelete)
      }
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
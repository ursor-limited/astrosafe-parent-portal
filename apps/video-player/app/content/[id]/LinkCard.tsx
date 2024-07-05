import { IContent } from "@/app/devices/[id]/ContentTab";
import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";

const IMAGE_HEIGHT = 227;

const LinkCard = (props: IContent & { onClick: () => void }) => {
  return (
    <ContentCard type="link" title={props.title} onClick={props.onClick}>
      <Stack
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 6px rgba(0,0,0,0.08)"
      >
        <Image
          src={props.imgUrl}
          style={{ objectFit: "cover" }}
          fill
          alt="image card image"
        />
      </Stack>
    </ContentCard>
  );
};

export default LinkCard;

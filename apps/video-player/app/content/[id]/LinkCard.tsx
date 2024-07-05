import { IContent } from "@/app/devices/[id]/ContentTab";
import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";

const IMAGE_HEIGHT = 227;

const LinkCard = (props: IContent) => {
  return (
    <ContentCard type="link">
      <Stack width={IMAGE_HEIGHT} borderRadius="8px" overflow="hidden">
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

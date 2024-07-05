import { IContent } from "@/app/devices/[id]/ContentTab";
import ContentCard from "./ContentCard";
import Image from "next/image";
import { Stack } from "@mui/system";

const IMAGE_HEIGHT = 160;

const ChannelCard = (props: IContent & { onClick: () => void }) => {
  return (
    <ContentCard
      type="videoChannel"
      title={props.title}
      onClick={props.onClick}
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
          src={props.imgUrl}
          style={{
            objectFit: "cover",
            justifyContent: "center",
            alignItems: "center",
          }}
          fill
          alt="image card image"
        />
        {props.thumbnailImgUrl ? (
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
                src={props.thumbnailImgUrl}
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

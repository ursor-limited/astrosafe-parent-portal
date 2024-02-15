import { Stack } from "@mui/system";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { getImageSize } from "react-image-size";
import useMousePosition from "./useMousePosition";
import { PALETTE } from "ui";
import AstroElementFrame from "./AstroElementFrame";

const DEFAULT_WIDTH = 300;

const AstroImage = (props: {
  url: string;
  selected: boolean;
  selectionCallback: () => void;
}) => {
  const [dropzoneRef, setDropzoneRef] = useState<HTMLElement | null>();
  const [downloadImageUrl, setDownloadImageUrl] = useState<string | undefined>(
    undefined
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    undefined
  );
  const [imageUploadCallback, setImageUploadCallback] = useState<
    undefined | (() => Promise<void>)
  >(undefined);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  useEffect(() => {
    props.url &&
      getImageSize(props.url).then(
        (dims) => dims && setAspectRatio(dims.width / dims.height)
      );
  }, []);
  return (
    <AstroElementFrame
      aspectRatio={aspectRatio}
      selectionCallback={props.selectionCallback}
      selected={props.selected}
    >
      <ImageUploader
        previewUrlCallback={setPreviewImageUrl}
        downloadUrlCallback={(url, upload) => {
          setDownloadImageUrl(url);
          setImageUploadCallback(() => upload);
        }}
        ref={setDropzoneRef}
      >
        <Stack
          width="100%"
          height="100%"
          sx={{
            backgroundImage: `url(${props.url})`,
            backgroundSize: "contain",
          }}
          position="relative"
        />
      </ImageUploader>
    </AstroElementFrame>
  );
};

export default AstroImage;

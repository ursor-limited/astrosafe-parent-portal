import { Stack } from "@mui/system";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { getImageSize } from "react-image-size";
import AstroElementFrame from "./AstroElementFrame";
import { IAstroCanvasElement } from "./Canvas";

const DEFAULT_WIDTH = 300;

export const getNewImageDetails: (
  url: string,
  id: string,
  x: number,
  y: number
) => Promise<IAstroCanvasElement> = async (url, id, x, y) => {
  const dims = await getImageSize(url);
  return {
    id,
    width: DEFAULT_WIDTH,
    height: (dims.height * DEFAULT_WIDTH) / dims.width,
    x,
    y,
    type: "image",
    value: url,
  };
};

const AstroImage = (props: {
  selected: boolean;
  selectionCallback: () => void;
  frameChangeCallback: (
    width: number,
    height: number,
    x: number,
    y: number
  ) => void;
  details: IAstroCanvasElement;
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
    props.details.value &&
      getImageSize(props.details.value).then(
        (dims) => dims && setAspectRatio(dims.width / dims.height)
      );
  }, []);
  return (
    <AstroElementFrame
      aspectRatio={aspectRatio}
      width={props.details.width}
      height={props.details.height}
      x={props.details.x}
      y={props.details.y}
      selectionCallback={props.selectionCallback}
      selected={props.selected}
      changeCallback={(width, height, x, y) => {
        props.frameChangeCallback(width, height, x, y);
      }}
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
            backgroundImage: `url(${props.details.value})`,
            backgroundSize: "contain",
          }}
          position="relative"
        />
      </ImageUploader>
    </AstroElementFrame>
  );
};

export default AstroImage;

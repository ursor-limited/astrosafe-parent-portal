import { Stack } from "@mui/system";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { getImageSize } from "react-image-size";

const DUMMY_URL =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/safetubeFooterScreenshot.png";

const DEFAULT_WIDTH = 300;

const AstroImage = () => {
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
    getImageSize(DUMMY_URL).then(
      (dims) => dims && setAspectRatio(dims.width / dims.height)
    );
  }, []);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  //() => dropzoneRef?.click()
  return (
    <ImageUploader
      previewUrlCallback={setPreviewImageUrl}
      downloadUrlCallback={(url, upload) => {
        setDownloadImageUrl(url);
        setImageUploadCallback(() => upload);
      }}
      ref={setDropzoneRef}
    >
      <Stack
        width={`${DEFAULT_WIDTH}px`}
        height={width / aspectRatio}
        sx={{
          backgroundImage: `url(${DUMMY_URL})`,
          backgroundSize: "contain",
        }}
      />
    </ImageUploader>
  );
};

export default AstroImage;

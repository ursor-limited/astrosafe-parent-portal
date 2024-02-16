import { Stack } from "@mui/system";
import UrsorDialog from "../components/UrsorDialog";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import GraphIllustration from "@/images/GraphIllustration.svg";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { PALETTE } from "ui";
import { getImageSize } from "react-image-size";

const IMAGE_HEIGHT = 300;

const ImageSelectionDialog = (props: {
  open: boolean;
  closeCallback?: () => void;
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
    previewImageUrl &&
      getImageSize(previewImageUrl).then(
        (dims) => dims && setAspectRatio(dims.width / dims.height)
      );
  }, [previewImageUrl]);
  return (
    <UrsorDialog
      supertitle="Add image"
      title="Add image"
      subtitle={["Select an image."]}
      open={props.open}
      button={{
        text: "Add",
        callback: () => {},
        icon: ChevronRight,
      }}
      width="90%"
      maxWidth="880px"
      noCloseButton
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
          width={IMAGE_HEIGHT * aspectRatio}
          maxWidth="90%"
          height={IMAGE_HEIGHT}
          maxHeight="500px"
          borderRadius="16px"
          border={
            !previewImageUrl
              ? `3px solid ${PALETTE.secondary.grey[2]}`
              : undefined
          }
          sx={{
            backgroundImage: `url(${previewImageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          position="relative"
          onClick={() => dropzoneRef?.click()}
        />
      </ImageUploader>
    </UrsorDialog>
  );
};

export default ImageSelectionDialog;

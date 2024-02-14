import { Stack } from "@mui/system";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { getImageSize } from "react-image-size";
import useMousePosition from "./useMousePosition";

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

  const [pressed, setPressed] = useState<boolean>(false);
  const [pressCoordinates, setPressCoordinates] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const mousePosition = useMousePosition();

  const [dragDistanceX, setDragDistanceX] = useState<number>(0);
  const [dragDistanceY, setDragDistanceY] = useState<number>(0);
  useEffect(
    () => {
      if (pressCoordinates) {
        setDragDistanceX((mousePosition.x ?? 0) - pressCoordinates.x);
        setDragDistanceY((mousePosition.y ?? 0) - pressCoordinates.y);
      } else {
        setDragDistanceX(0);
        setDragDistanceY(0);
      }
      [pressCoordinates, mousePosition.x, mousePosition.y];
    },
    //   setDragDistance(
    //     Math.sqrt(
    //       Math.pow((mousePosition.x ?? 0) - pressCoordinates.x, 2) +
    //         Math.pow((mousePosition.y ?? 0) - pressCoordinates.y, 2)
    //     )
    //   ),
    [pressCoordinates, mousePosition.x, mousePosition.y]
  );
  //   const [scale, setScale] = useState<number>(1);
  //useEffect(() => setWidth(DEFAULT_WIDTH + dragDistanceX), [dragDistanceX]);

  return (
    <Stack
      onMouseDown={(event) => {
        setPressCoordinates({ x: event.clientX, y: event.clientY });
        setPressed(true);
      }}
      onMouseUp={() => {
        setPressed(false);
        setPressCoordinates(undefined);
        setWidth(width + dragDistanceX);
        setDragDistanceX(0);
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
          width={`${width + dragDistanceX}px`}
          height={(width + dragDistanceX) / aspectRatio}
          sx={{
            backgroundImage: `url(${DUMMY_URL})`,
            backgroundSize: "contain",
          }}
        />
      </ImageUploader>
    </Stack>
  );
};

export default AstroImage;

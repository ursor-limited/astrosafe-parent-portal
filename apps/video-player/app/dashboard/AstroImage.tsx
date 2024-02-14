import { Stack } from "@mui/system";
import ImageUploader from "./ImageUploader";
import { useEffect, useState } from "react";
import { getImageSize } from "react-image-size";
import useMousePosition from "./useMousePosition";
import { PALETTE } from "ui";

const DUMMY_URL =
  "https://images.aeonmedia.co/images/8eac4719-7f56-4d0a-9a32-aae431c8ca07/built-ecologies-emilio-ambasz-landscape-2-v2.jpg?width=828&quality=75&format=auto";

const DEFAULT_WIDTH = 300;

const AstroImage = (props: {
  resizingStartCallback: () => void;
  resizingEndCallback: () => void;
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
    getImageSize(DUMMY_URL).then(
      (dims) => dims && setAspectRatio(dims.width / dims.height)
    );
  }, []);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [x, setX] = useState<number>(DEFAULT_WIDTH);
  const [y, setY] = useState<number>(DEFAULT_WIDTH);

  const mousePosition = useMousePosition();

  const [scalePressCoordinates, setScalePressCoordinates] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const [scaleDragDistanceX, setScaleDragDistanceX] = useState<number>(0);
  const [scaleDragDistanceY, setScaleDragDistanceY] = useState<number>(0);
  useEffect(
    () => {
      if (scalePressCoordinates) {
        setScaleDragDistanceX((mousePosition.x ?? 0) - scalePressCoordinates.x);
        setScaleDragDistanceY((mousePosition.y ?? 0) - scalePressCoordinates.y);
      } else {
        setScaleDragDistanceX(0);
        setScaleDragDistanceY(0);
      }
    },
    //   setDragDistance(
    //     Math.sqrt(
    //       Math.pow((mousePosition.x ?? 0) - pressCoordinates.x, 2) +
    //         Math.pow((mousePosition.y ?? 0) - pressCoordinates.y, 2)
    //     )
    //   ),
    [scalePressCoordinates, mousePosition.x, mousePosition.y]
  );

  const [positionPressCoordinates, setPositionPressCoordinates] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [positionDragDistanceX, setPositionDragDistanceX] = useState<number>(0);
  const [positionDragDistanceY, setPositionDragDistanceY] = useState<number>(0);
  useEffect(() => {
    if (positionPressCoordinates) {
      setPositionDragDistanceX(
        (mousePosition.x ?? 0) - positionPressCoordinates.x
      );
      setPositionDragDistanceY(
        (mousePosition.y ?? 0) - positionPressCoordinates.y
      );
    } else {
      setPositionDragDistanceX(0);
      setPositionDragDistanceY(0);
    }
  }, [positionPressCoordinates, mousePosition.x, mousePosition.y]);

  return (
    <Stack
      //   onMouseDown={(event) => {
      //     setPressCoordinates({ x: event.clientX, y: event.clientY });
      //     setPressed(true);
      //   }}
      //   onMouseUp={() => {
      //     setPressed(false);
      //     setPressCoordinates(undefined);
      //     setWidth(width + dragDistanceX);
      //     setDragDistanceX(0);
      //   }}
      //   border={`3px solid ${PALETTE.secondary.purple[2]}`}
      position="absolute"
      left={`${x + positionDragDistanceX}px`}
      top={`${y + positionDragDistanceY}px`}
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
          width={`${width + scaleDragDistanceX}px`}
          height={(width + scaleDragDistanceX) / aspectRatio}
          sx={{
            backgroundImage: `url(${DUMMY_URL})`,
            backgroundSize: "contain",
          }}
          position="relative"
        >
          <Stack
            top={0}
            left={0}
            height="100%"
            width="100%"
            position="absolute"
            sx={{
              pointerEvents: scalePressCoordinates ? "none" : undefined,
              cursor: "move",
            }}
            onMouseDown={(event) => {
              setPositionPressCoordinates({
                x: event.clientX,
                y: event.clientY,
              });
            }}
            onMouseUp={() => {
              setPositionPressCoordinates(undefined);
              setX(x + positionDragDistanceX);
              setY(y + positionDragDistanceY);
              setPositionDragDistanceX(0);
              setPositionDragDistanceY(0);
            }}
          />
          <Stack
            width="5px"
            pl="3px"
            height="100%"
            position="absolute"
            right="-5px"
            top={0}
            sx={{
              cursor: "ew-resize",
              pointerEvents: positionPressCoordinates ? "none" : undefined,
            }}
            onMouseDown={(event) => {
              setScalePressCoordinates({ x: event.clientX, y: event.clientY });
              props.resizingStartCallback();
            }}
            onMouseUp={() => {
              setScalePressCoordinates(undefined);
              setWidth(width + scaleDragDistanceX);
              setScaleDragDistanceX(0);
              props.resizingEndCallback();
            }}
          >
            <Stack flex={1} bgcolor={PALETTE.secondary.purple[2]} />
          </Stack>
        </Stack>
      </ImageUploader>
    </Stack>
  );
};

export default AstroImage;

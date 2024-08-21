import { Stack } from '@mui/system';
import ImageUploader from '../components/ImageUploader';
import { useEffect, useState } from 'react';
import { getImageSize } from 'react-image-size';
import useMousePosition from './useMousePosition';
import { PALETTE } from '@/ui';

const DUMMY_URL =
  'https://images.aeonmedia.co/images/8eac4719-7f56-4d0a-9a32-aae431c8ca07/built-ecologies-emilio-ambasz-landscape-2-v2.jpg?width=828&quality=75&format=auto';

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 100;

const AstroElementFrame = (props: {
  imageUrl?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  dynamicHeight?: boolean;
  aspectRatio?: number;
  noVerticalResizing?: boolean;
  selectionCallback: () => void;
  changeCallback: (width: number, height: number, x: number, y: number) => void;
  selected: boolean;
  children?: React.ReactNode;
}) => {
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  // useEffect(() => {
  //   props.changeCallback(width, height, x, y);
  // }, [width, height, x, y]);

  useEffect(() => {
    props.width && setWidth(props.width);
  }, [props.width]);

  useEffect(() => {
    props.height && setHeight(props.height);
  }, [props.height]);

  useEffect(() => {
    props.x && setX(props.x);
  }, [props.x]);

  useEffect(() => {
    props.y && setY(props.y);
  }, [props.y]);

  // useEffect(() => {
  //   if (props.aspectRatio) {
  //     setHeight(DEFAULT_WIDTH / props.aspectRatio);
  //   } else {
  //     props.height && setHeight(props.height);
  //   }
  // }, [props.height, props.aspectRatio]);

  const mousePosition = useMousePosition();

  const [scaleDragDistanceXRight, setScaleDragDistanceXRight] =
    useState<number>(0);
  const [scalePressCoordinatesRight, setScalePressCoordinatesRight] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  useEffect(() => {
    if (scalePressCoordinatesRight) {
      setScaleDragDistanceXRight(
        (mousePosition.x ?? 0) - scalePressCoordinatesRight.x
      );
    } else {
      setScaleDragDistanceXRight(0);
    }
  }, [scalePressCoordinatesRight, mousePosition.x, mousePosition.y]);

  const [scaleDragDistanceXLeft, setScaleDragDistanceXLeft] =
    useState<number>(0);
  const [scalePressCoordinatesLeft, setScalePressCoordinatesLeft] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  useEffect(() => {
    if (scalePressCoordinatesLeft) {
      setScaleDragDistanceXLeft(
        scalePressCoordinatesLeft.x - (mousePosition.x ?? 0)
      );
    } else {
      setScaleDragDistanceXLeft(0);
    }
  }, [scalePressCoordinatesLeft, mousePosition.x, mousePosition.y]);

  const [scaleDragDistanceBottom, setScaleDragDistanceBottom] =
    useState<number>(0);
  const [scalePressCoordinatesBottom, setScalePressCoordinatesBottom] =
    useState<{ x: number; y: number } | undefined>(undefined);
  useEffect(() => {
    if (scalePressCoordinatesBottom) {
      setScaleDragDistanceBottom(
        (mousePosition.y ?? 0) - scalePressCoordinatesBottom.y
      );
    } else {
      setScaleDragDistanceBottom(0);
    }
  }, [scalePressCoordinatesBottom, mousePosition.x, mousePosition.y]);

  const [scaleDragDistanceTop, setScaleDragDistanceTop] = useState<number>(0);
  const [scalePressCoordinatesTop, setScalePressCoordinatesTop] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  useEffect(() => {
    if (scalePressCoordinatesTop) {
      setScaleDragDistanceTop(
        scalePressCoordinatesTop.y - (mousePosition.y ?? 0)
      );
    } else {
      setScaleDragDistanceTop(0);
    }
  }, [scalePressCoordinatesTop, mousePosition.x, mousePosition.y]);

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

  const getHeight = () => {
    if (
      props.aspectRatio &&
      (scaleDragDistanceXLeft || scaleDragDistanceXRight)
    ) {
      return (
        (width + (scaleDragDistanceXRight + scaleDragDistanceXLeft) * 2) /
        props.aspectRatio
      );
    } else {
      return height + (scaleDragDistanceBottom + scaleDragDistanceTop) * 2;
    }
  };

  const getWidth = () => {
    if (
      props.aspectRatio &&
      (scaleDragDistanceBottom || scaleDragDistanceTop)
    ) {
      return (
        (height + (scaleDragDistanceBottom + scaleDragDistanceTop) * 2) *
        props.aspectRatio
      );
    } else {
      return width + (scaleDragDistanceXRight + scaleDragDistanceXLeft) * 2;
    }
  };

  return (
    <Stack
      position='absolute'
      left={`${x + positionDragDistanceX}px`}
      top={`${y + positionDragDistanceY}px`}
      width={`${getWidth()}px`}
      height={props.dynamicHeight ? undefined : `${getHeight()}px`}
      sx={{
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Stack width='100%' height='100%' position='relative'>
        <Stack
          top={0}
          left={0}
          height='100%'
          width='100%'
          sx={{
            pointerEvents: scalePressCoordinatesRight ? 'none' : undefined,
            cursor: 'move',
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
            props.changeCallback(
              width,
              height,
              x + positionDragDistanceX,
              y + positionDragDistanceY
            );
          }}
          onClick={props.selectionCallback}
        >
          {props.children}
        </Stack>
        {props.selected ? (
          <>
            <Stack
              width='5px'
              pr='3px'
              height='calc(100% + 10px)'
              position='absolute'
              left='-5px'
              top='-5px'
              sx={{
                cursor: 'ew-resize',
                pointerEvents: positionPressCoordinates ? 'none' : undefined,
              }}
              onMouseDown={(event) => {
                setScalePressCoordinatesLeft({
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              onMouseUp={() => {
                setScalePressCoordinatesLeft(undefined);
                setWidth(width + scaleDragDistanceXLeft * 2);
                setHeight(getHeight());
                setScaleDragDistanceXLeft(0);
                props.changeCallback(
                  width + scaleDragDistanceXLeft * 2,
                  getHeight(),
                  x,
                  y
                );
              }}
              boxSizing='border-box'
            >
              <Stack flex={1} bgcolor={PALETTE.secondary.purple[2]} />
            </Stack>
            <Stack
              width='5px'
              pl='3px'
              height='calc(100% + 10px)'
              position='absolute'
              right='-5px'
              top='-5px'
              sx={{
                cursor: 'ew-resize',
                pointerEvents: positionPressCoordinates ? 'none' : undefined,
              }}
              onMouseDown={(event) => {
                setScalePressCoordinatesRight({
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              onMouseUp={() => {
                setScalePressCoordinatesRight(undefined);
                setWidth(width + scaleDragDistanceXRight * 2);
                setHeight(getHeight());
                setScaleDragDistanceXRight(0);
                props.changeCallback(
                  width + scaleDragDistanceXRight * 2,
                  getHeight(),
                  x,
                  y
                );
              }}
              boxSizing='border-box'
            >
              <Stack flex={1} bgcolor={PALETTE.secondary.purple[2]} />
            </Stack>
            <Stack
              height='5px'
              pt='3px'
              width='calc(100% + 10px)'
              position='absolute'
              bottom='-5px'
              left='-5px'
              sx={{
                cursor: props.noVerticalResizing ? undefined : 'ns-resize',
                pointerEvents:
                  props.noVerticalResizing || positionPressCoordinates
                    ? 'none'
                    : undefined,
              }}
              onMouseDown={(event) => {
                setScalePressCoordinatesBottom({
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              onMouseUp={() => {
                setScalePressCoordinatesBottom(undefined);
                setHeight(height + scaleDragDistanceBottom * 2);
                setWidth(getWidth());
                setScaleDragDistanceBottom(0);
                props.changeCallback(
                  getWidth(),
                  height + scaleDragDistanceBottom * 2,
                  x,
                  y
                );
              }}
              boxSizing='border-box'
            >
              <Stack flex={1} bgcolor={PALETTE.secondary.purple[2]} />
            </Stack>
            <Stack
              height='5px'
              pb='3px'
              width='calc(100% + 10px)'
              position='absolute'
              top='-5px'
              left='-5px'
              sx={{
                cursor: props.noVerticalResizing ? undefined : 'ns-resize',
                pointerEvents:
                  props.noVerticalResizing || positionPressCoordinates
                    ? 'none'
                    : undefined,
              }}
              onMouseDown={(event) => {
                setScalePressCoordinatesTop({
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              onMouseUp={() => {
                setScalePressCoordinatesTop(undefined);
                setHeight(height + scaleDragDistanceTop * 2);
                setWidth(getWidth());
                setScaleDragDistanceTop(0);
                props.changeCallback(
                  getWidth(),
                  height + scaleDragDistanceTop * 2,
                  x,
                  y
                );
              }}
              boxSizing='border-box'
            >
              <Stack flex={1} bgcolor={PALETTE.secondary.purple[2]} />
            </Stack>
            <Stack
              position='absolute'
              height='8px'
              width='8px'
              bgcolor='rgb(255,255,255)'
              border={`2px solid ${PALETTE.secondary.purple[2]}`}
              left='-10px'
              bottom='-10px'
              sx={{
                pointerEvents: 'none',
              }}
            />
            <Stack
              position='absolute'
              height='8px'
              width='8px'
              bgcolor='rgb(255,255,255)'
              border={`2px solid ${PALETTE.secondary.purple[2]}`}
              right='-10px'
              bottom='-10px'
              sx={{
                pointerEvents: 'none',
              }}
            />
            <Stack
              position='absolute'
              height='8px'
              width='8px'
              bgcolor='rgb(255,255,255)'
              border={`2px solid ${PALETTE.secondary.purple[2]}`}
              left='-10px'
              top='-10px'
              sx={{
                pointerEvents: 'none',
              }}
            />
            <Stack
              position='absolute'
              height='8px'
              width='8px'
              bgcolor='rgb(255,255,255)'
              border={`2px solid ${PALETTE.secondary.purple[2]}`}
              right='-10px'
              top='-10px'
              sx={{
                pointerEvents: 'none',
              }}
            />
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default AstroElementFrame;

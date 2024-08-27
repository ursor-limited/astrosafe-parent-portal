import { Backdrop } from '@mui/material';
import { Stack, keyframes } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { BORDER_RADIUS } from './UrsorDialog';
import { HIDE_SCROLLBAR } from './DynamicCardGrid';
import dynamic from 'next/dynamic';

const DynamicallyLoadedPortal = dynamic(
  () => import('./DynamicallyLoadedPortal'),
  { ssr: false } // not including this component on server-side due to its dependence on "document"
);

export const CHANGES_SAVED_NOTIFICATION_DURATION = 2600;
const SLIDE_IN_BEZIER = 'cubic-bezier(.16,.98,.39,.98)';
const SLIDE_OUT_BEZIER = 'cubic-bezier(.51,-0.07,.57,-0.05)';
export const SLIDE_IN_DURATION = 900;
const SLIDE_OUT_DURATION = 750;
const TOP_MARGIN = '75px';

export const slideIn = keyframes`
from {
  transform: translateY(2000px);
}
to {
  transform: translateY(0px);
}
`;

export const slideOut = keyframes`
from {
  transform: translateY(0px);
}
to {
  transform: translateY(2000px);
}
`;

export interface IFixedBottomDialog {
  open: boolean;
  closeCallback: () => void;
  width: string;
  noScroll?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
}

export default function FixedBottomDialog(props: IFixedBottomDialog) {
  const [slidingOut, setSlidingOut] = useState<boolean>(false);
  const onClose = useCallback(() => {
    setSlidingOut(true);
    setTimeout(() => {
      setSlidingOut(false);
      props.closeCallback();
    }, 900);
  }, []);

  return (
    <DynamicallyLoadedPortal>
      <Stack
        width="100%"
        height="100%"
        sx={{
          pointerEvents: props.open ? undefined : 'none',
        }}
        role="presentation"
      >
        <Backdrop
          onClick={onClose}
          sx={{
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(3px)',
            zIndex: 999,
          }}
          open={props.open && !slidingOut}
          transitionDuration={SLIDE_IN_DURATION}
        />
        {props.open || slidingOut ? (
          <Stack
            position="absolute"
            width={props.width}
            left={0}
            right={0}
            m="auto"
            top={0}
            height="110%"
            alignItems="center"
            overflow="scroll"
            sx={HIDE_SCROLLBAR}
            zIndex={999}
          >
            <Stack
              width="100%"
              minHeight={TOP_MARGIN}
              height={TOP_MARGIN}
              onClick={onClose}
            />
            <Stack
              flex={1}
              width="100%"
              sx={{
                transform: 'translateY(1000px)',
                animation: `${slidingOut ? slideOut : slideIn} ${
                  slidingOut ? SLIDE_OUT_DURATION : SLIDE_IN_DURATION
                }ms ${
                  slidingOut ? SLIDE_OUT_BEZIER : SLIDE_IN_BEZIER
                } forwards`,
              }}
              position="relative"
              pb={!props.noScroll ? '100px' : undefined} // prevents seeing the bottom edge during the animation
              borderRadius={`${BORDER_RADIUS} ${BORDER_RADIUS} 0 0`}
              bgcolor={props.backgroundColor || 'rgb(255,255,255)'}
              overflow={props.noScroll ? 'hidden' : undefined}
            >
              {props.children}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </DynamicallyLoadedPortal>
  );
}

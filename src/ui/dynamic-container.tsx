/* eslint-disable eslint-comments/require-description -- foolish requirement */
/* eslint-disable @typescript-eslint/ban-ts-comment -- no time to fix */
import React, { useRef } from 'react';
import { Box } from '@mui/system';
import { useResizeObserver } from './use-resize-observer';

export interface DynamicContainerProps {
  width?: string;
  duration?: number;
  children: React.ReactNode;
}

/* from https://dev.to/anxiny/dynamic-dimension-react-container-with-transition-effect-part-2-resize-observer-5h18 */
export function DynamicContainer(props: DynamicContainerProps): JSX.Element {
  const content = useRef(null);
  const rect = useResizeObserver(content);

  return (
    <Box
      style={{
        transition: `${props.duration || 600}ms`, //@ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        height: `${rect?.height}px`,
        width: props.width ?? '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={content}
        style={{
          width: props.width ?? '100%',
          height: 'fit-content',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

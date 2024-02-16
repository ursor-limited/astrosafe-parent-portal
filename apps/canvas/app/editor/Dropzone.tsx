/* from https://blog.alexdevero.com/react-file-dropzone/ */

import { Box, Stack } from "@mui/system";
import React, { forwardRef } from "react";

// Define interface for component props/api:
export interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFileDrop?: (files: File) => void;
}

export const DropZone = forwardRef(
  (props: React.PropsWithChildren<DropZoneProps>, ref) => {
    const {
      onDragStateChange,
      onFileDrop,
      onDrag,
      onDragIn,
      onDragOut,
      onDrop,
    } = props;

    const [file, setFile] = React.useState<File | undefined>(undefined);
    // Create state to keep track when dropzone is active/non-active:
    const [isDragActive, setIsDragActive] = React.useState(false);
    // Prepare ref for dropzone element:
    const dropZoneRef = React.useRef<null | HTMLDivElement>(null);

    // Create handler for dragenter event:
    const handleDragIn = React.useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        onDragIn?.();

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
          setIsDragActive(true);
        }
      },
      [onDragIn]
    );

    // Create handler for dragleave event:
    const handleDragOut = React.useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        onDragOut?.();

        setIsDragActive(false);
      },
      [onDragOut]
    );

    // Create handler for dragover event:
    const handleDrag = React.useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        onDrag?.();
        if (!isDragActive) {
          setIsDragActive(true);
        }
      },
      [isDragActive, onDrag]
    );

    // Create handler for drop event:
    const handleDrop = React.useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragActive(false);

        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
          // dropped
          onFileDrop?.(event.dataTransfer.files[0]);
          event.dataTransfer.clearData();
        } else if (event.target?.files && event.target.files.length > 0) {
          // clicked
          onFileDrop?.(event.target.files[0]);
        }
      },
      [onFileDrop]
    );

    // React.useEffect(() => {

    // }, [props.open]);

    // Obser active state and emit changes:
    React.useEffect(() => {
      onDragStateChange?.(isDragActive);
    }, [isDragActive]);

    // Attach listeners to dropzone on mount:
    React.useEffect(() => {
      const tempZoneRef = dropZoneRef?.current;
      if (tempZoneRef) {
        tempZoneRef.addEventListener("dragenter", handleDragIn);
        tempZoneRef.addEventListener("dragleave", handleDragOut);
        tempZoneRef.addEventListener("dragover", handleDrag);
        tempZoneRef.addEventListener("drop", handleDrop);
      }

      // Remove listeners from dropzone on unmount:
      return () => {
        tempZoneRef?.removeEventListener("dragenter", handleDragIn);
        tempZoneRef?.removeEventListener("dragleave", handleDragOut);
        tempZoneRef?.removeEventListener("dragover", handleDrag);
        tempZoneRef?.removeEventListener("drop", handleDrop);
      };
    }, []);

    // Render <div> with ref and children:
    return (
      <Stack
        ref={dropZoneRef}
        width="100%"
        height="100%"
        position="relative"
        sx={{
          "&:hover": { opacity: 0.5 },
          transition: "0.2s",
        }}
        alignItems="center"
      >
        <input // @ts-ignore
          ref={ref}
          id="upload-button"
          style={{
            cursor: "pointer",
            opacity: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleDrop}
        />
        {props.children}
      </Stack>
    );
  }
);

DropZone.displayName = "DropZone";

export default DropZone;

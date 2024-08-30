import React from 'react';
export interface DropZoneProps {
    onDragStateChange?: (isDragActive: boolean) => void;
    onDrag?: () => void;
    onDragIn?: () => void;
    onDragOut?: () => void;
    onDrop?: () => void;
    onFileDrop?: (files: File) => void;
}
export declare const DropZone: React.ForwardRefExoticComponent<DropZoneProps & {
    children?: React.ReactNode | undefined;
} & React.RefAttributes<unknown>>;
export default DropZone;

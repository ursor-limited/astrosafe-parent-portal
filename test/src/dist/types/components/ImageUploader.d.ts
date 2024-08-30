import React from 'react';
export interface ILessonImageUploaderProps {
    previewUrlCallback: (previewUrl: string) => void;
    downloadUrlCallback: (url: string, upload: () => Promise<void>) => void;
    dialogOpen?: {
        open: boolean;
        closeCallback: () => void;
    };
    children?: React.ReactNode;
}
declare const ImageUploader: React.ForwardRefExoticComponent<ILessonImageUploaderProps & React.RefAttributes<unknown>>;
export default ImageUploader;

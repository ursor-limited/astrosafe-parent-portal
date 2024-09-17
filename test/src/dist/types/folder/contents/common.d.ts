import React from 'react';
import { AstroContent, IContent } from './../../profile/components/ContentTab';
export declare const FOLDER_DELETION_DIALOG_SUBTITLE = "If you delete this Folder all of the Content within the Folder will also be deleted and it will no longer be accessible on the assigned Devices.";
export interface IGroup {
    id: number;
    title: string;
    joinCode: string;
}
export interface IAstroContentBranding {
    title: string;
    color: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
export declare const CONTENT_BRANDING: Record<AstroContent, IAstroContentBranding>;
export interface IContentCard {
    type: AstroContent;
    content: IContent;
}
export default function FolderPage(props: {
    folderId: number;
    isMobile: boolean;
    email: string;
}): import("react/jsx-runtime").JSX.Element;

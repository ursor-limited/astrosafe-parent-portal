import * as react_jsx_runtime from 'react/jsx-runtime';

declare const Folders: (props: {
    email: string;
}) => react_jsx_runtime.JSX.Element;

declare const Folder: ({ props }: {
    props: {
        folderId: string;
        email: string;
    };
}) => react_jsx_runtime.JSX.Element;

export { Folder as FolderPage, Folders as FoldersPage };

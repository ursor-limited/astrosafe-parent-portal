import * as react_jsx_runtime from 'react/jsx-runtime';

declare const Folders: () => react_jsx_runtime.JSX.Element;

declare const Folder: ({ params }: {
    params: {
        id: string;
    };
}) => react_jsx_runtime.JSX.Element;

declare const Filter: ({ params }: {
    params: {
        id: string;
    };
}) => react_jsx_runtime.JSX.Element;

declare const Filters: () => react_jsx_runtime.JSX.Element;

type AstroAccountTab = 'content' | 'insights' | 'apps' | 'limits';

declare const Profile$1: ({ params, searchParams, }: {
    params: {
        id: string;
    };
    searchParams: {
        tab: AstroAccountTab;
    };
}) => react_jsx_runtime.JSX.Element;

declare const Profile: () => react_jsx_runtime.JSX.Element;

declare const Channel: ({ params }: {
    params: {
        id: string;
    };
}) => react_jsx_runtime.JSX.Element;

export { Channel as ChannelPage, Filter as FilterPage, Filters as FiltersPage, Folder as FolderPage, Folders as FoldersPage, Profile$1 as ProfilePage, Profile as ProfilesPage };

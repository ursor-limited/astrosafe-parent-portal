declare const SearchWordsSection: (props: {
    blockedSearchWords: string[];
    addWord: (word: string) => void;
    removeWord: (word: string) => void;
    isMobile?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default SearchWordsSection;

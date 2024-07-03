import { AstroSectionCard } from "./AstroSectionCard";
import ThumbsDownIcon from "@/images/icons/ThumbsDownIcon.svg";
import StopIcon from "@/images/icons/StopIcon.svg";
import XIcon from "@/images/icons/X.svg";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorInputField } from "ui";
import { IFilterUrl } from "../../FiltersPageContents";
import { useEffect, useState } from "react";
import _ from "lodash";

const SearchWordsSection = (props: {
  blockedSearchWords: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <AstroSectionCard
      icon={StopIcon}
      iconColor={PALETTE.system.red}
      title={`${props.blockedSearchWords.length} blocked search word${
        props.blockedSearchWords.length === 1 ? "" : "s"
      }`}
      subtitle="Enter words that you want to be blocked or flagged if they are entered in the search engine on the device."
    >
      <Stack spacing="20px">
        <UrsorInputField
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
          onEnterKey={() => {
            props.addWord(inputValue);
            setInputValue("");
          }}
          placeholder="Add a word to block"
          width="100%"
          leftAlign
          boldValue
        />
      </Stack>
      <Stack direction="row" spacing="12px">
        {props.blockedSearchWords.map((bs, i) => (
          <Stack
            key={i}
            height="36px"
            minWidth="98px"
            direction="row"
            bgcolor={PALETTE.secondary.grey[1]}
            borderRadius="8px"
            px="12px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="small" bold>
              {bs}
            </Typography>
            <Stack
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
              }}
              onClick={() => props.removeWord(inputValue)}
            >
              <XIcon width="16px" height="16px" />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </AstroSectionCard>
  );
};

export default SearchWordsSection;

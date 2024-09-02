import { AstroBentoCard } from './AstroBentoCard';
import { ReactComponent as StopIcon } from './../../images/StopIcon.svgimages/icons/StopIcon.svg';
import { ReactComponent as XIcon } from './../../images/X.svg';
import { Stack } from '@mui/system';
import { PALETTE, Typography, UrsorInputField } from './../../ui';
import { useState } from 'react';
import _ from 'lodash';
import { Grid } from '@mui/material';

const BlockedWordTag = (props: { word: string; onClick: () => void }) => (
  <Stack
    height="36px"
    minWidth="98px"
    direction="row"
    bgcolor={PALETTE.secondary.grey[1]}
    borderRadius="8px"
    px="12px"
    alignItems="center"
    justifyContent="space-between"
    spacing="9px"
  >
    <Typography variant="small" bold>
      {props.word}
    </Typography>
    <Stack
      sx={{
        cursor: 'pointer',
        '&:hover': { opacity: 0.6 },
        transition: '0.2s',
      }}
      onClick={props.onClick}
    >
      <XIcon width="16px" height="16px" />
    </Stack>
  </Stack>
);

const SearchWordsSection = (props: {
  blockedSearchWords: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  isMobile?: boolean;
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <AstroBentoCard
      icon={StopIcon}
      iconColor={PALETTE.system.red}
      title={`${props.blockedSearchWords.length} blocked search word${
        props.blockedSearchWords.length === 1 ? '' : 's '
      }`}
      subtitle="Enter words that you want to be blocked or flagged if they are entered in the search engine on the Device."
      isMobile={props.isMobile}
    >
      <Stack spacing="6px">
        <UrsorInputField
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
          onEnterKey={() => {
            props.addWord(inputValue);
            setInputValue('');
          }}
          placeholder="Add a word to block"
          width="100%"
          leftAlign
          boldValue
        />
        {props.isMobile ? (
          <Grid container gap="6px">
            {props.blockedSearchWords.map((bs, i) => (
              <Grid key={i} item>
                <BlockedWordTag
                  word={bs}
                  onClick={() => props.removeWord(bs)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack direction="row" spacing="12px">
            {props.blockedSearchWords.map((bs, i) => (
              <BlockedWordTag
                key={i}
                word={bs}
                onClick={() => props.removeWord(bs)}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </AstroBentoCard>
  );
};

export default SearchWordsSection;

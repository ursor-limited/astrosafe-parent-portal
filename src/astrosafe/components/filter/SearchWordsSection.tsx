import React, { useState, useEffect } from 'react'
import { ReactComponent as StopIcon } from '../../../images/StopIcon.svg'
import { ReactComponent as XIcon } from '../../../images/X.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography, UrsorInputField } from '../../../ui'
import _ from 'lodash'
import { Grid } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
import { AstroBentoCard } from '../../../filter/components/AstroBentoCard'
import { isMobile } from 'react-device-detect'
import ApiController from '../../../api'

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
)

interface SearchWordsSectionProps {
  filterId: number
  email: string
}

const SearchWordsSection: React.FC<SearchWordsSectionProps> = ({
  filterId,
  email,
}) => {
  useAuth(email)

  const [inputValue, setInputValue] = useState<string>('')

  const [blockedSearchWords, setBlockedSearchWords] = useState<string[]>([])

  useEffect(() => {
    ApiController.getBlockedSearchWords(filterId).then(setBlockedSearchWords)
  }, [filterId])

  const addToBlockedSearchWords = (word: string) => {
    setBlockedSearchWords([...blockedSearchWords, word])
    ApiController.addBlockedSearchWord(filterId, word)
  }

  const removeFromBlockedSearchWords = (word: string) => {
    setBlockedSearchWords(blockedSearchWords.filter((w) => w !== word))
    ApiController.removeBlockedSearchWord(filterId, word)
  }

  return (
    <AstroBentoCard
      icon={StopIcon}
      iconColor={PALETTE.system.red}
      title={`${blockedSearchWords.length} blocked search word${
        blockedSearchWords.length === 1 ? '' : 's '
      }`}
      subtitle="Enter words that you want to be blocked or flagged if they are entered in the search engine on the Device."
      isMobile={isMobile}
    >
      <Stack spacing="6px">
        <UrsorInputField
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
          onEnterKey={() => {
            addToBlockedSearchWords(inputValue)
            setInputValue('')
          }}
          placeholder="Add a word to block"
          width="100%"
          leftAlign
          boldValue
        />
        {isMobile ? (
          <Grid container gap="6px">
            {blockedSearchWords.map((bs, i) => (
              <Grid key={i} item>
                <BlockedWordTag
                  word={bs}
                  onClick={() => removeFromBlockedSearchWords(bs)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack direction="row" spacing="12px">
            {blockedSearchWords.map((bs, i) => (
              <BlockedWordTag
                key={i}
                word={bs}
                onClick={() => removeFromBlockedSearchWords(bs)}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </AstroBentoCard>
  )
}

export default SearchWordsSection

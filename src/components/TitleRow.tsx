import { Stack } from '@mui/system'
import UrsorPopover from './UrsorPopover'
import { PALETTE, Typography } from './../ui'
import { ReactComponent as ChevronDown } from './../images/ChevronDown.svg'
import { useState } from 'react'

export interface ITitleRowItem {
  text: string
  image?: React.ReactNode
  options?: {
    text: string
    imageUrl?: string
    image?: React.ReactNode
    callback: () => any
  }[]
  label?: string // a small grey text between the actual text and the chevron
  callback?: () => any
}

const TitleRowItemCore = (
  props: ITitleRowItem & { last: boolean; isMobile?: boolean }
) => {
  const [open, setOpen] = useState<boolean>(false)
  const ActualItem = (
    <Stack
      direction="row"
      spacing={props.isMobile ? '6px' : '12px'}
      onClick={() => {
        if (props.options?.length === 0) return
        setOpen(true)
        props.callback?.()
      }}
      alignItems="flex-end"
    >
      {props.image}
      <Stack justifyContent="center">
        <Typography
          bold
          variant={props.isMobile ? 'medium' : 'h4'}
          color={!props.last ? PALETTE.secondary.grey[3] : undefined}
          maxLines={1}
          sx={{ wordBreak: 'break-all' }}
        >
          {props.text}
        </Typography>
      </Stack>
      {props.label ? (
        <Stack
          justifyContent="flex-end"
          height="100%"
          sx={{ transform: 'translateY(-1px)' }}
        >
          <Typography
            variant={props.isMobile ? 'tiny' : 'normal'}
            color={PALETTE.secondary.grey[4]}
          >
            {props.label}
          </Typography>
        </Stack>
      ) : null}
      {props.options && props.options.length > 0 ? (
        <ChevronDown
          height={props.isMobile ? '24px' : '32px'}
          width={props.isMobile ? '24px' : '32px'}
        />
      ) : null}
    </Stack>
  )
  return props.options && props.options.length > 0 ? (
    <UrsorPopover
      open={open}
      content={
        <Stack spacing="10px">
          {props.options?.map((o, i) => (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              spacing="8px"
              sx={{
                cursor: 'pointer',
                '&:hover': { opacity: 0.6 },
                transition: '0.2s',
              }}
              onClick={o.callback}
            >
              {o.image || o.imageUrl ? (
                <Stack borderRadius="100%" overflow="hidden">
                  <img
                    src={o.imageUrl ?? ''}
                    height={20}
                    width={20}
                    alt="option image"
                  />
                </Stack>
              ) : null}
              <Typography bold>{o.text}</Typography>
            </Stack>
          ))}
        </Stack>
      }
      placement="left"
      closeCallback={() => setOpen(false)}
    >
      {ActualItem}
    </UrsorPopover>
  ) : (
    ActualItem
  )
}

const TitleRow = (props: { items: ITitleRowItem[]; isMobile?: boolean }) => {
  return (
    <Stack
      direction="row"
      spacing={props.isMobile ? '6px' : '12px'}
      alignItems="center"
    >
      {props.items.map((x, i) => {
        const isLast = i === (props.items?.length ?? 0) - 1
        return (
          <Stack
            key={i}
            alignItems="center"
            direction="row"
            spacing={props.isMobile ? '6px' : '12px'}
            sx={
              !(isLast && x.options?.length === 0)
                ? {
                    cursor: 'pointer',
                    transition: '0.2s',
                    '&:hover': { opacity: 0.7 },
                  }
                : undefined
            }
          >
            <TitleRowItemCore
              {...x}
              last={i === (props.items?.length ?? 0) - 1}
              isMobile={props.isMobile}
            />
            {!isLast ? (
              <Typography
                bold
                variant={props.isMobile ? 'medium' : 'h4'}
                color={PALETTE.secondary.grey[3]}
              >
                /
              </Typography>
            ) : null}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default TitleRow

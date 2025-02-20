import React from 'react'
import { Stack } from '@mui/system'
import UrsorPopover, { IUrsorPopoverProps } from './UrsorPopover'
import { PALETTE, Typography } from './../ui'

const SPACING = '8px'
const ICON_SIZE = '16px'

export const PopupList = (props: {
  items: IActionPopupItem[]
  closeCallback: () => any
}) => (
  <Stack spacing={SPACING}>
    {props.items.map((item, index) => (
      <Stack
        key={index}
        sx={{
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': { opacity: 0.3 },
          svg: { path: { fill: item.color ?? PALETTE.font.dark } },
        }}
        onClick={() => {
          props.closeCallback()
          item.kallback()
        }}
        direction="row"
        spacing="8px"
        alignItems="center"
      >
        {item.icon ? <item.icon height={ICON_SIZE} width={ICON_SIZE} /> : null}
        <Typography color={item.color} variant="normal" bold>
          {item.text}
        </Typography>
      </Stack>
    ))}
  </Stack>
)

export interface IActionPopupItem {
  text: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  kallback: () => any
  color?: string
}

export interface IActionPopupProps {
  open: boolean
  items: IActionPopupItem[]
  placement?: IUrsorPopoverProps['placement']
  disableOverflowFlip?: boolean
  closeCallback: () => any
  zIndex?: number
  children: React.ReactNode
}

export default function ActionPopup(props: IActionPopupProps) {
  return (
    <UrsorPopover
      open={props.open}
      content={
        <PopupList items={props.items} closeCallback={props.closeCallback} />
      }
      closeCallback={props.closeCallback}
      placement={props.placement}
      zIndex={props.zIndex}
      flip
    >
      {props.children}
    </UrsorPopover>
  )
}

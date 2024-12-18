import { Stack } from '@mui/system'
import React, { useState } from 'react'
import ActionPopup, { IActionPopupItem } from './ActionPopup'
import { ReactComponent as MoreIcon } from './../images/MoreIcon.svg'
import { PALETTE } from './../ui'

const DEFAULT_SIZE = '12px'
const LARGE_SIZE = '20px'

export interface IUrsorActionButtonProps {
  actions: IActionPopupItem[]
  size?: string
  iconSize?: string
  threeDots?: boolean
  large?: boolean
  light?: boolean
  background?: string
  fontColor?: string
  shadow?: boolean
  border?: boolean
  notClickable?: boolean
  buttonClickCallback?: () => any
}

export default function UrsorActionButton(props: IUrsorActionButtonProps) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <ActionPopup
      open={open}
      items={props.actions}
      closeCallback={() => setOpen(false)}
      placement="right"
      zIndex={9999}
    >
      <Stack
        height={props.size ?? '40px'}
        width={props.size ?? '40px'}
        justifyContent="center"
        alignItems="center"
        sx={{
          background: props.background || 'rgb(255,255,255)',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.7,
          },
          transition: '0.2s',
          svg: {
            transform: 'rotate(90deg)',
            path: {
              fill:
                props.fontColor ||
                (props.light ? PALETTE.font.light : PALETTE.font.dark),
            },
          },
        }}
        borderRadius="100%"
        border={
          props.border
            ? `2px solid ${
                props.fontColor ||
                (props.light ? PALETTE.font.light : PALETTE.font.dark)
              }`
            : undefined
        }
        boxSizing="border-box"
        onClick={() => {
          if (props.notClickable) return
          setOpen(!open)
          props.buttonClickCallback?.()
        }}
        boxShadow={props.shadow ? '0 0 16px rgba(0,0,0,0.08)' : undefined}
      >
        <MoreIcon
          height={props.iconSize || (props.large ? LARGE_SIZE : DEFAULT_SIZE)}
          width={props.iconSize || (props.large ? LARGE_SIZE : DEFAULT_SIZE)}
        />
      </Stack>
    </ActionPopup>
  )
}

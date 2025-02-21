/* eslint-disable @typescript-eslint/no-unsafe-assignment -- idiotic rule */
import { useState } from 'react'
import { TextField } from '@mui/material'
import { PALETTE } from './palette'
import { FONT_SIZES, LINE_HEIGHTS } from './typography'
import { Stack } from '@mui/system'

const N_ROWS = 3
const BOLD_FONT_WEIGHT = 450

export interface UrsorTextFieldProps {
  width?: string
  height?: string
  borderRadius?: string
  backgroundColor?: string
  border?: string
  outline?: string
  backgroundBlur?: string
  password?: boolean
  paddingLeft?: string
  centerAlign?: boolean
  fontSize?: string
  color?: string
  boldValue?: boolean
  noBold?: boolean
  value?: string
  onEnterKey?: () => any
  onBlur?: () => any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any
  onKeyPress?: () => any
  placeholder?: string
  endIcon?: JSX.Element
  white?: boolean
  noBorder?: boolean
  flex?: boolean
}

export function UrsorTextField(props: UrsorTextFieldProps): JSX.Element {
  const [hovering, setHovering] = useState<boolean>(false)
  const [active, setActive] = useState(false)
  return (
    <Stack
      sx={{
        '.MuiFormControl-root': {
          paddingY: '4px',
        },
      }}
      flex={props.flex ? 1 : undefined}
    >
      <TextField
        inputProps={{
          style: {
            fontSize: props.fontSize ?? FONT_SIZES.normal,
            textAlign: props.centerAlign ? 'center' : undefined,
            color: props.color ?? PALETTE.font.dark,
            padding: '0 !important',
            lineHeight: `${LINE_HEIGHTS.normal}px`,
            fontWeight: props.boldValue ? BOLD_FONT_WEIGHT : undefined,
            height: props.height,
          },
          form: {
            autoComplete: 'off',
          },
        }}
        multiline
        onBlur={() => {
          setActive(false)
          props.onBlur?.()
        }}
        onChange={props.onChange}
        onFocus={() => {
          setActive(true)
        }}
        onMouseEnter={() => {
          setHovering(true)
        }}
        onMouseLeave={() => {
          setHovering(false)
        }}
        onKeyPress={props.onKeyPress}
        placeholder={props.placeholder}
        rows={N_ROWS}
        sx={{
          '.MuiInputBase-root': {
            paddingY: 0,
            paddingLeft: '12px',
            paddingRight: '12px',
            fontFamily: 'inherit',
          },
          '::-webkit-scrollbar': {
            display: 'block !important',
          },
          overflow: 'hidden',
          width: props.width,
          height: props.height,
          borderRadius: '8px',
          outline: props.outline,
          background: props.white
            ? 'rgb(255,255,255)'
            : props.backgroundColor ?? PALETTE.secondary.grey[1],
          backdropFilter: props.backgroundBlur,
          '& fieldset': { border: 'none' },
          transition: '0.2s',
          border: !props.noBorder
            ? `2px solid ${
                // eslint-disable-next-line no-nested-ternary -- idiotic rule
                active
                  ? PALETTE.secondary.purple[2]
                  : hovering
                  ? PALETTE.secondary.purple[1]
                  : 'transparent'
              }`
            : undefined,
        }}
        value={props.value}
      />
    </Stack>
  )
}

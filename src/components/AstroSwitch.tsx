import { Stack } from '@mui/system'
import { useState } from 'react'
import { PALETTE } from './../ui'

const AstroSwitch = (props: {
  on: boolean
  compromise?: boolean
  callback: () => any
  small?: boolean
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}) => {
  const [hovering, setHovering] = useState<boolean>(false)
  return (
    <Stack
      height={props.small ? '16px' : '28px'}
      minHeight={props.small ? '16px' : '28px'}
      width={props.small ? '34px' : '60px'}
      minWidth={props.small ? '34px' : '60px'}
      bgcolor={
        props.compromise
          ? PALETTE.system.orange
          : props.on
          ? PALETTE.system.green
          : PALETTE.secondary.grey[3]
      }
      borderRadius={props.small ? '8px' : '20px'}
      px="2px"
      boxSizing="border-box"
      justifyContent="center"
      onMouseEnter={() => {
        setHovering(true)
      }}
      onMouseLeave={() => {
        setHovering(false)
      }}
      sx={{
        cursor: 'pointer',
      }}
      onClick={props.callback}
    >
      <Stack
        height={props.small ? '13px' : '24px'}
        width={props.small ? '13px' : '24px'}
        borderRadius="100%"
        sx={{
          background: 'rgb(255,255,255)',
          opacity: hovering ? 0.7 : 1,
          transition: '0.2s ease-out',
          transform: `translateX(${
            props.compromise
              ? props.small
                ? 9
                : 16
              : !props.on
              ? 0
              : props.small
              ? 17
              : 32
          }px)`,
          svg: {
            path: {
              fill: PALETTE.secondary.grey[3],
            },
          },
        }}
        justifyContent="center"
        alignItems="center"
      >
        {props.icon ? <props.icon height="14px" width="14px" /> : null}
      </Stack>
    </Stack>
  )
}

export default AstroSwitch

import { ReactComponent as PhoneIcon } from './../../images/PhoneIcon.svg'
import { ReactComponent as PeopleIcon } from './../../images/PeopleIcon.svg'
import { ReactComponent as ClockIcon } from './../../images/ClockIcon.svg'
import { Stack } from '@mui/system'
import { PALETTE, Typography } from './../../ui'
import _ from 'lodash'
import { IGroup } from '../../folder/contents/common'
export const DUMMY_USER_ID = 1

export const VIBRANT_GRADIENT = `linear-gradient(0, ${PALETTE.secondary.blue[2]}, ${PALETTE.secondary.purple[2]})`

export interface IUser {
  id: number
  realName: string
  displayName: string
  email: string
  groupId: IGroup['id']
  createdAt: string
}

export type AstroPlanState = 'freeTrial' | 'troomi'

export const PLAN_DISPLAY_NAMES: Record<AstroPlanState, string> = {
  freeTrial: 'Free trial',
  troomi: 'Troomi Plan',
}

export const PLAN_BANNER_ITEMS: Record<
  AstroPlanState,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string }[]
> = {
  freeTrial: [
    {
      icon: PhoneIcon,
      text: 'Connect unlimited Devices',
    },
    {
      icon: PeopleIcon,
      text: 'Add unlimited parents or teachers',
    },
    {
      icon: ClockIcon,
      text: 'X days left',
    },
  ],
  troomi: [
    {
      icon: PhoneIcon,
      text: 'Connect up to 10 Devices',
    },
    {
      icon: PeopleIcon,
      text: 'Add unlimited parents or teachers',
    },
  ],
}

export const getInitials = (name: string) =>
  name
    ?.split(' ')
    .map((x) => _.capitalize(x)[0])
    ?.slice(0, 2)
    .join('')

export const UserInitialsCircle = (props: {
  name: IUser['realName']
  size?: number
  fontSize?: number
}) => (
  <Stack
    height={`${props.size || 132}px`}
    width={`${props.size || 132}px`}
    minHeight={`${props.size || 132}px`}
    minWidth={`${props.size || 132}px`}
    bgcolor={PALETTE.secondary.blue[2]}
    borderRadius="100%"
    overflow="hidden"
    justifyContent="center"
    alignItems="center"
  >
    <Typography
      variant="h2"
      color="rgb(255,255,255)"
      sx={props.fontSize ? { fontSize: props.fontSize } : undefined}
    >
      {props.name ? getInitials(props.name) : ''}
    </Typography>
  </Stack>
)

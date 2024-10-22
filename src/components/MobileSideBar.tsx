import { Stack } from '@mui/system'
import { PALETTE, Typography } from './../ui'
import { ReactComponent as PeopleIcon } from './../images/PeopleIcon.svg'
import { ReactComponent as FilterIcon } from './../images/FilterIcon.svg'
import { ReactComponent as BookIcon } from './../images/BookIcon.svg'
import { ReactComponent as VersionsIcon } from './../images/VersionsIcon.svg'
import { ReactComponent as XIcon } from './../images/X.svg'
import _ from 'lodash'

import { UserInitialsCircle } from './../account/contents/common'
import useNavigate from '../hooks/useNavigate'

export const astroPages = [
  'profiles',
  'filters',
  'content',
  'lessons',
  'account',
] as const
export type AstroPage = (typeof astroPages)[number]
const PAGE_ICONS: Record<AstroPage, React.FC<React.SVGProps<SVGSVGElement>>> = {
  profiles: PeopleIcon,
  filters: FilterIcon,
  content: BookIcon,
  lessons: VersionsIcon,
  account: VersionsIcon,
}

const PAGE_ROUTES: Record<AstroPage, string> = {
  profiles: 'profiles',
  filters: 'filters',
  content: 'folders',
  lessons: 'lessons',
  account: 'account',
}

const PAGE_DISPLAY_NAMES: Record<AstroPage, string> = {
  profiles: 'Kids',
  filters: 'Filters',
  content: 'Content',
  lessons: 'Lessons',
  account: 'Account',
}

const MobileSideBar = (props: {
  open: boolean
  onClose: () => any
  selectedPage: AstroPage
}) => {
  const navigate = useNavigate()
  return (
    <>
      <Stack
        position="absolute"
        bgcolor="rgba(0,0,0,0.2)"
        width="100%"
        height="100%"
        onClick={props.onClose}
        sx={{
          pointerEvents: props.open ? undefined : 'none',
          opacity: props.open ? 1 : 0,
          transition: '0.5s',
          backdropFilter: 'blur(2px)',
        }}
        zIndex={999}
      />
      <Stack
        position="absolute"
        spacing="32px"
        height="100%"
        width="272px"
        bgcolor="rgb(255,255,255)"
        px="28px"
        py="56px"
        boxSizing="border-box"
        sx={{
          transform: `translateX(${props.open ? 0 : '-100%'})`,
          transition: '0.5s',
        }}
        zIndex={1000}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <img
            src="https://ursorassets.s3.eu-west-1.amazonaws.com/astroLogo!.png"
            height={20}
            width={59}
            alt="astro"
          />
          <Stack onClick={props.onClose}>
            <XIcon height="28px" width="28px" />
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" height="100%">
          <Stack spacing="24px">
            {['profiles', 'filters', 'content'].map((page) => {
              const Icon = PAGE_ICONS[page as AstroPage]
              return (
                <Stack
                  key={page}
                  direction="row"
                  spacing="12px"
                  alignItems="center"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.7 },
                    transition: '0.2s',
                    svg: {
                      path: {
                        fill:
                          props.selectedPage === page
                            ? PALETTE.secondary.purple[2]
                            : PALETTE.primary.navy,
                      },
                    },
                  }}
                  onClick={() =>
                    navigate.push(`/${PAGE_ROUTES[page as AstroPage]}`)
                  }
                >
                  <Icon height="28px" width="28px" />
                  <Typography
                    bold
                    color={
                      props.selectedPage === page
                        ? PALETTE.secondary.purple[2]
                        : PALETTE.primary.navy
                    }
                  >
                    {PAGE_DISPLAY_NAMES[page as AstroPage]}
                  </Typography>
                </Stack>
              )
            })}
          </Stack>
          <Stack
            direction="row"
            spacing="12px"
            alignItems="center"
            onClick={() =>
              navigate.push(`/${PAGE_ROUTES['account' as AstroPage]}`)
            }
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.7 },
              transition: '0.2s',
            }}
          >
            <UserInitialsCircle size={32} fontSize={12} name={'Mario Super'} />
            <Typography
              bold
              color={
                props.selectedPage === 'account'
                  ? PALETTE.secondary.purple[2]
                  : PALETTE.primary.navy
              }
            >
              Account
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default MobileSideBar

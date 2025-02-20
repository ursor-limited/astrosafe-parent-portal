import React from 'react'
import useNavigate from '../../hooks/useNavigate'
import { IVideo } from './../../profile/components/ContentTab'
import { Stack } from '@mui/system'
import UrsorFadeIn from './../../components/UrsorFadeIn'
import VideoCard from './../../folder/components/VideoCard'
import EmptyStateIllustration from './../../components/EmptyStateIllustration'
import { ITitleRowItem } from './../../components/TitleRow'
import { IActionPopupItem } from './../../components/ActionPopup'
import MobilePageLayout from './../../components/MobilePageLayout'

const ChannelPageMobileBody = (props: {
  videos: IVideo[]
  onUpdate: () => any
  setVideoEditingDialogId: (id: IVideo['id']) => any
  titleRow: ITitleRowItem[]
  actions: IActionPopupItem[]
  isProd: boolean
  onBack: () => any
}) => {
  const navigate = useNavigate()
  return (
    <MobilePageLayout
      titleRow={props.titleRow.slice(-1)[0]}
      titleBackButtonCallback={props.onBack}
      selectedPage="content"
      actions={props.actions}
    >
      {props.videos.length > 0 ? (
        <Stack pb="33px">
          <Stack spacing="20px">
            {props.videos.map((v, i) => (
              <UrsorFadeIn key={v.id} duration={800} delay={i * 90}>
                <VideoCard
                  {...v}
                  onDelete={props.onUpdate}
                  onOpenEditingDialog={() =>
                    props.setVideoEditingDialogId(v.id)
                  }
                  twoLineTitleSectionHeight
                  isProd={props.isProd}
                />
              </UrsorFadeIn>
            ))}
          </Stack>
        </Stack>
      ) : (
        <EmptyStateIllustration paddingTop={20}>
          No Videos in this Channel
        </EmptyStateIllustration>
      )}
    </MobilePageLayout>
  )
}

export default ChannelPageMobileBody

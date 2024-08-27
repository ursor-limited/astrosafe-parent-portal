import ContentCard from './ContentCard';

import { Stack } from '@mui/system';
import ApiController from '@/api';
import {
  IChannel,
  IContentBucket,
} from '@/app/profiles/[id]/components/ContentTab';
import { PALETTE } from '@/ui';
import { useNavigate } from 'react-router-dom';

const IMAGE_HEIGHT = 160;

const ChannelCard = (
  props: Partial<Omit<IChannel, 'createdAt'>> & {
    noPointerEvents?: boolean;
    noMenu?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onOpenEditingDialog?: () => void;
    isMobile?: boolean;
    twoLineTitleSectionHeight?: boolean;
    folderId?: IContentBucket['id'];
  }
) => {
  const navigate = useNavigate();
  return (
    <ContentCard
      type="channel"
      title={props.title}
      onClick={
        props.noPointerEvents
          ? undefined
          : () => navigate(`/channel/${props.id}`)
      }
      noPointerEvents={props.noPointerEvents}
      noMenu={props.noMenu}
      onDelete={() =>
        props.id && ApiController.deleteChannel(props.id).then(props.onDelete)
      }
      onOpenEditingDialog={() => props.onOpenEditingDialog?.()}
      isMobile={props.isMobile}
      twoLineTitleSectionHeight={props.twoLineTitleSectionHeight}
    >
      <Stack
        height={IMAGE_HEIGHT}
        width="100%"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        boxShadow="0 0 4px rgba(0,0,0,0.08)"
      >
        {props.bannerUrl ? (
          <img
            src={props.bannerUrl}
            style={{
              objectFit: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            fill
            alt="banner image"
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
        {props.profileUrl ? (
          <Stack
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              height="72px"
              width="72px"
              borderRadius="100%"
              overflow="hidden"
              border="3px solid rgb(255,255,255)"
              position="relative"
              boxShadow="0 0 20px rgba(0,0,0,0.1)"
            >
              {props.profileUrl ? (
                <img
                  src={props.profileUrl}
                  style={{
                    objectFit: 'cover',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  fill
                  alt="profile image"
                />
              ) : (
                <Stack flex={1} bgcolor={PALETTE.secondary.grey[3]} />
              )}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </ContentCard>
  );
};

export default ChannelCard;

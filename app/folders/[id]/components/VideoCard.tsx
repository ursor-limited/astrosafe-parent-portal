import Image from 'next/image';
import { Stack } from '@mui/system';
import Play from '@/images/play.svg';
import ApiController from '@/app/api';
import ContentCard from './ContentCard';
import { IVideo } from '@/app/profiles/[id]/components/ContentTab';
import { PALETTE } from '@/ui';

const IMAGE_HEIGHT = 144;

const VideoCard = (
  props: Omit<IVideo, 'createdAt'> & {
    // onClick: () => void;
    noPointerEvents?: boolean;
    noMenu?: boolean;
    onDelete?: () => void;
    onUpdate?: () => void;
    onOpenEditingDialog?: () => void;
    isMobile?: boolean;
    twoLineTitleSectionHeight?: boolean;
  }
) => {
  return (
    <ContentCard
      type='video'
      title={props.title}
      url={props.url}
      noPointerEvents={props.noPointerEvents}
      noMenu={props.noMenu}
      onDelete={() => ApiController.deleteVideo(props.id).then(props.onDelete)}
      onOpenEditingDialog={() => props.onOpenEditingDialog?.()}
      isMobile={props.isMobile}
      twoLineTitleSectionHeight={props.twoLineTitleSectionHeight}
    >
      <Stack
        height={IMAGE_HEIGHT}
        width='100%'
        borderRadius='8px'
        overflow='hidden'
        position='relative'
        boxShadow='0 0 4px rgba(0,0,0,0.08)'
      >
        {props.thumbnailUrl ? (
          <Image
            src={props.thumbnailUrl}
            style={{
              objectFit: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            fill
            alt='video card image'
          />
        ) : (
          <Stack flex={1} bgcolor={PALETTE.secondary.grey[2]} />
        )}
        <Stack
          position='absolute'
          top={0}
          left={0}
          width='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
          sx={{
            background: 'radial-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0))',
            svg: {
              fill: {
                path: 'rgb(255,255,255)',
              },
            },
          }}
        >
          <Play width='26px' height='26px' />
        </Stack>
      </Stack>
    </ContentCard>
  );
};

export default VideoCard;

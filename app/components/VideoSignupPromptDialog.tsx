import UrsorDialog from './UrsorDialog';
import ChevronRight from '@/images/icons/ChevronRight.svg';
import PersonIcon from '@/images/icons/PersonIcon.svg';
import useAuth from '@/app/hooks/useAuth';
import mixpanel from 'mixpanel-browser';
import { useLocalStorage } from 'usehooks-ts';

import { Stack } from '@mui/system';

const FREE_VIDEO_LIMIT = 3;

const VideoSignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  createCallback: () => void;
  //signinCallback: () => void;
  mobile?: boolean;
}) => {
  const { login } = useAuth();
  const [freeVideoCreationCount, setFreeVideoCreationCount] =
    useLocalStorage<number>('freeVideoCreationCount', 0);
  return (
    <UrsorDialog
      supertitle="Sign in"
      title={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? 'Create an Account'
          : 's tore all your videos in one place'
      }
      subtitle={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? [
              'You have reached your video limit, but don’t worry,',
              'you can continue to create videos with a free account.',
            ]
          : [
              'Your video is ready. Create an account to store your',
              'videos in a dashboard and create unlimited videos.',
            ]
      }
      open={props.open}
      button={{
        text: 's ign in',
        callback: () => {
          props.closeCallback();
          props.mobile ? login() : login();
          //props.signinCallback();
          mixpanel.track('clicked signup button', {
            freeVideoCreationCount,
          });
        },
        icon: PersonIcon,
      }}
      secondaryButton={
        freeVideoCreationCount >= FREE_VIDEO_LIMIT
          ? undefined
          : {
              text: 's kip to video',
              callback: () => {
                mixpanel.track('clicked skip', {
                  freeVideoCreationCount,
                });
                props.createCallback();
                props.closeCallback();
              },
              icon: ChevronRight,
            }
      }
      onCloseCallback={props.closeCallback}
      width="90%"
      maxWidth="630px"
      titleMaxWidth="400px"
      titleSize={props.mobile ? 'h4' : 'h3'}
    >
      {!props.mobile ? (
        <Stack borderRadius="12px" overflow="hidden">
          <img
            src={
              'https://ursorassets.s3.eu-west-1.amazonaws.com/safetubePreviewScreenshot.png'
            }
            loader={({ src }) => {
              return src;
            }}
            width={415}
            height={300}
            alt="Screenshot"
          />
        </Stack>
      ) : (
        <img
          src="https://ursorassets.s3.eu-west-1.amazonaws.com/graphIllustration.png"
          width={300}
          height={300}
          alt="Upgrade dialog illustration"
        />
      )}
    </UrsorDialog>
  );
};

export default VideoSignupPromptDialog;

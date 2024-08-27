import UrsorDialog from './UrsorDialog';
import PersonIcon from '@/images/icons/PersonIcon.svg';

import { Stack } from '@mui/system';
import { PALETTE, UrsorButton } from '@/ui';

const FREE_VIDEO_LIMIT = 3;
const SCREENSHOT_URL =
  'https://ursorassets.s3.eu-west-1.amazonaws.com/signupScreenshot.png';

const WorksheetSignupPromptDialog = (props: {
  open: boolean;
  closeCallback: () => void;
  callback: () => void;
  mobile?: boolean;
}) => {
  return (
    <UrsorDialog
      supertitle="Sign in"
      title="Your worksheet is ready for download"
      subtitle={[
        'Login or create a free account to get your worksheet',
        'and use all of our teaching resources.',
      ]}
      open={props.open}
      // button={{
      //   text: 'Sign in',
      //   callback: () => {
      //     props.closeCallback();
      //     props.mobile ? login() : login();
      //     //props.signinCallback();
      //     // mixpanel.track('clicked signup button', {
      //     //   freeWorksheetCreationCount,
      //     // });
      //   },
      //   icon: PersonIcon,
      // }}
      titleSize={props.mobile ? 'h4' : 'h3'}
      noOverflowHidden
      noCloseButton
    >
      <Stack flex={1} alignItems="center">
        <Stack
          sx={{
            cursor: 'pointer',
            '&:hover': { opacity: 0.7 },
            transition: '0.2s',
          }}
        >
          <UrsorButton
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            onClick={props.callback}
            endIcon={PersonIcon}
          >
            Sign in
          </UrsorButton>
        </Stack>
        <Stack
          width="727px"
          height="392px"
          borderRadius="20px"
          border={`6px solid ${PALETTE.secondary.grey[5]}`}
          sx={{
            transform: 'translateY(30px)',
          }}
          overflow="hidden"
        >
          <img
            src={SCREENSHOT_URL}
            width={727}
            height={454}
            priority={true}
            //objectFit='contain'
            alt="worksheet signup dialog screenshot"
          />
        </Stack>
      </Stack>
    </UrsorDialog>
  );
};

export default WorksheetSignupPromptDialog;

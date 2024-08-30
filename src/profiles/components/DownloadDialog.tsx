import UrsorDialog from './../../components/UrsorDialog';
import DownloadIcon from './../../images/icons/DownloadIcon.svgimages/icons/DownloadIcon.svg';
import { Stack } from '@mui/system';

import { PALETTE, Typography, UrsorButton } from './../../ui';

const PLATFORMS: { name: string; logoUrl: string; url: string }[] = [
  {
    name: 'iOS',
    logoUrl: 'https://ursorassets.s3.eu-west-1.amazonaws.com/appleLogo.png',
    url: 'https://test.com',
  },
  {
    name: 'Mac',
    logoUrl: 'https://ursorassets.s3.eu-west-1.amazonaws.com/appleLogo.png',
    url: 'https://test.com',
  },
  {
    name: 'Android',
    logoUrl: 'https://ursorassets.s3.eu-west-1.amazonaws.com/androidLogo.png',
    url: 'https://test.com',
  },
  {
    name: 'Chrome extension',
    logoUrl: 'https://ursorassets.s3.eu-west-1.amazonaws.com/chromeLogo.png',
    url: 'https://test.com',
  },
];

const DownloadCard = (props: { imageUrl: string; name: string }) => (
  <Stack
    width="200px"
    height="207px"
    bgcolor={PALETTE.secondary.grey[1]}
    borderRadius="12px"
    p="12px"
    boxSizing="border-box"
    justifyContent="space-between"
    alignItems="center"
  >
    <Stack
      borderRadius="8px"
      bgcolor="rgb(255,255,255)"
      width="100%"
      alignItems="center"
    >
      <img src={props.imageUrl} height={83} width={83} alt="platform logo" />
    </Stack>
    <Typography bold variant="medium">
      {props.name}
    </Typography>
    <UrsorButton
      size="small"
      endIcon={DownloadIcon}
      iconSize={16}
      dark
      variant="tertiary"
      width="123px"
    >
      Download
    </UrsorButton>
  </Stack>
);

const DownloadDialog = (props: {
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
}) => (
  <UrsorDialog
    open={props.open}
    onCloseCallback={props.onClose}
    title="Download Browser App"
    subtitle={[
      'Download the version of AstroSafe that matches',
      "your kid's Device.",
    ]}
    width="926px"
    height="510px"
    isMobile={props.isMobile}
    scrollable
  >
    <Stack
      spacing={props.isMobile ? '12px' : '20px'}
      direction={props.isMobile ? 'column' : 'row'}
      alignItems="center"
      flex={1}
    >
      {PLATFORMS.map((p) => (
        <DownloadCard key={p.name} imageUrl={p.logoUrl} name={p.name} />
      ))}
    </Stack>
  </UrsorDialog>
);

export default DownloadDialog;

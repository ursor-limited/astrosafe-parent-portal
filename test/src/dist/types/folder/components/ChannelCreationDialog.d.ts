import { IEnrichedContentBucket } from '../../folders/contents/common';
import { IChannel } from '../../profile/components/ContentTab';
declare const ChannelCreationDialog: (props: {
  open: boolean;
  onClose: () => void;
  folderId: IEnrichedContentBucket['id'];
  creationCallback: () => void;
  updateDetails?: {
    channel: IChannel;
    callback?: () => void;
  };
}) => import('react/jsx-runtime').JSX.Element;
export default ChannelCreationDialog;

import { IContentBucket, IVideo } from '../../profile/components/ContentTab';
declare const VideoCreationDialog: (props: {
  open: boolean;
  onClose: () => void;
  folderId: IContentBucket['id'];
  creationCallback: () => void;
  updateDetails?: {
    video: IVideo;
    callback?: () => void;
  };
  belongsToChannel?: boolean;
}) => import('react/jsx-runtime').JSX.Element;
export default VideoCreationDialog;

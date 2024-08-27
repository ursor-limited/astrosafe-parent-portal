import React from 'react';
import { Stack } from '@mui/system';
import _ from 'lodash';
import UrsorDialog from '@/app/components/UrsorDialog';

const INPUT_PHRASE = 'delete';

const TroomiManagePlanDialog = (props: {
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
}) => {
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      button={{
        text: 'Got it',
        callback: props.onClose,
      }}
      title="Contact us"
      subtitle={[
        'Please email hello@astrosafe.co if you want to update or change your AstroSafe subscription which comes with your Troomi plan.',
      ]}
      width="482px"
      dynamicHeight
      isMobile={props.isMobile}
    >
      <Stack />
    </UrsorDialog>
  );
};

export default TroomiManagePlanDialog;

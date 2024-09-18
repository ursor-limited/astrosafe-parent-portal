import React$1 from 'react';

interface DeviceCardProps {
    email: string;
    deviceId: string;
    small?: boolean;
    noExtras?: boolean;
    onClick?: () => void;
    onFilterClick?: () => void;
    onClickView?: () => void;
    gotoDeviceOnClick?: () => void;
    onClickOpen?: () => void;
}
declare const DeviceCard: React.FC<DeviceCardProps>;

interface AddDeviceButtonProps {
    onClick: () => void;
}
declare const AddDeviceButton: React$1.FC<AddDeviceButtonProps>;

interface DeviceScreenTimeCardProps$1 {
    email: string;
    deviceId: string;
}
declare const DeviceScreenTimeCard: React$1.FC<DeviceScreenTimeCardProps$1>;

interface DeviceScreenTimeCardProps {
    email: string;
    deviceId: string;
}
declare const DeviceMostVisitedSitesCard: React$1.FC<DeviceScreenTimeCardProps>;

export { AddDeviceButton, DeviceCard, DeviceMostVisitedSitesCard, DeviceScreenTimeCard };

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

export { DeviceCard };

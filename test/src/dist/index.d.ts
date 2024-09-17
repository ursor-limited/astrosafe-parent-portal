interface DeviceCardProps {
    email: string;
    deviceId: number;
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

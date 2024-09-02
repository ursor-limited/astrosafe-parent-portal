import { DeviceType } from '../../filter/contents/common';
import { IFilter } from '../../filters/contents/common';
import { IEnrichedDevice } from '../contents/common';
export declare const DEVICE_TYPE_DISPLAY_NAMES: Record<DeviceType, string>;
export declare const DeviceCardFilterSection: (props: {
  filterId: IFilter['id'];
  changeFilter: (id: IFilter['id']) => void;
}) => import('react/jsx-runtime').JSX.Element;
declare const HorizontalDeviceCard: (
  props: IEnrichedDevice & {
    onClickViewScreenTime: () => void;
    onUpdate: () => void;
  }
) => import('react/jsx-runtime').JSX.Element;
export default HorizontalDeviceCard;

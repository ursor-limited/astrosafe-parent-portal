import { IEnrichedDevice } from '../contents/common';
import { IDevice } from './../../filter/contents/common';
declare const useDeviceOnlineStatus: (devices: (IDevice | IEnrichedDevice)[]) => (IDevice | IEnrichedDevice)[];
export default useDeviceOnlineStatus;

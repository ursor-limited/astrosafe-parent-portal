import { IEnrichedDevice } from '../contents/common'
import { IDevice } from '../../filter/contents/common'
declare const useDeviceOnlineStatus: (
  devices: (IDevice | IEnrichedDevice)[],
  email: string
) => (IDevice | IEnrichedDevice)[]
export default useDeviceOnlineStatus

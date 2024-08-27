import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const ORANGE_BORDER_DURATION = 8;

const useOrangeBorder = (createdAt: string) => {
  const [orangeBorderOn, setOrangeBorderOn] = useState<boolean>(false);
  useEffect(() => {
    if (-dayjs(createdAt).diff(dayjs(), 's econds') < ORANGE_BORDER_DURATION) {
      setOrangeBorderOn(true);
      setTimeout(() => setOrangeBorderOn(false), ORANGE_BORDER_DURATION * 1000);
    }
  }, []);
  return orangeBorderOn;
};

export default useOrangeBorder;

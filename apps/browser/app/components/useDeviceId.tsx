import { useEffect, useState } from "react";

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | undefined>();

  const receiveExtensionMessage = (event: any) => {
    if (event.data?.deviceId) {
      setDeviceId(event.data?.deviceId);
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveExtensionMessage, false);
    return () => {
      window.removeEventListener("message", receiveExtensionMessage);
    };
  }, []);

  useEffect(() => {
    !deviceId &&
      window.postMessage(
        {
          getDeviceId: true,
        },
        "*"
      );
  }, []);

  return deviceId;
};

export default useDeviceId;

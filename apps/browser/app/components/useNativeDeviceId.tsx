import { useEffect, useState } from "react";

const useNativeDeviceId = () => {
  const [nativeDeviceId, setNativeDeviceId] = useState<string | undefined>(
    undefined
  );

  const receiveExtensionMessage = (event: any) => {
    if (event.data?.nativeDeviceId) {
      setNativeDeviceId(event.data.nativeDeviceId);
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveExtensionMessage, false);
    return () => {
      window.removeEventListener("message", receiveExtensionMessage);
    };
  }, [nativeDeviceId]);

  useEffect(() => {
    !nativeDeviceId &&
      window.postMessage(
        {
          getNativeDeviceId: true,
        },
        "*"
      );
  }, []);

  return nativeDeviceId;
};

export default useNativeDeviceId;

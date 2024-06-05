// from https://www.robinwieruch.de/react-hook-detect-click-outside-component/

import { useEffect, useState } from "react";

const useOutsideClick = (callback: () => void) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      //@ts-ignore
      if (ref && !ref?.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return setRef;
};

export default useOutsideClick;

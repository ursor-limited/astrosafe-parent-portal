import { RefObject, useEffect, useRef, useState } from "react";

/* from https://dev.to/anxiny/dynamic-dimension-react-container-with-transition-effect-part-2-resize-observer-5h18 */
export function useResizeObserver(ref: RefObject<Element>) {
  const [element, setElement] = useState<Element | null>(null);
  const [rect, setRect] = useState<DOMRect | undefined>(undefined);
  const observer = useRef<ResizeObserver | undefined>(undefined);

  //Clean up observer
  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!element) return;
    // Element has changed, disconnect old observer
    cleanOb();

    const ob = (observer.current = new ResizeObserver(([entry]) => {
      // inlineSize and blockSize in entry.borderBoxSize and contentBoxSize
      // inlineSize means height when write-mode is horizontal, and width when write-mode is vertical.
      // blockSize means width when write-mode is horizontal, and height when write-mode is vertical.
      // So, for the sake of simplicity, I will use getBoundingClientRect
      setRect(entry.target.getBoundingClientRect());
    }));
    ob.observe(element);

    // disconnect when component is unmounted
    return () => {
      cleanOb();
    };
  }, [element]);

  return rect;
}

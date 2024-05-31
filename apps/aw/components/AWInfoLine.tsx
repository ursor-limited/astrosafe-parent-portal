import { DM_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import useOutsideClick from "./useOutsideClick";
import { createPortal } from "react-dom";
import InfoIcon from "@/images/icons/InfoIcon.svg";

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export interface IAWInfoLineProps {
  prompt: string;
  content: string;
}

const AWInfoLine = (props: IAWInfoLineProps) => {
  const [open, setOpen] = useState<boolean>(false);
  //const onOutsideClick = () => setOpen(false);
  //const setOutsideClickRef = useOutsideClick(onOutsideClick);

  const [listY, setListY] = useState<number>(0);
  const [listX, setListX] = useState<number>(0);

  const [iconPositionRef, setIconPositionRef] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setListY(iconPositionRef?.getBoundingClientRect()?.bottom ?? 0);
    setListX(iconPositionRef?.getBoundingClientRect()?.left ?? 0);
  }, [
    iconPositionRef?.getBoundingClientRect()?.bottom,
    iconPositionRef?.getBoundingClientRect()?.left,
  ]);
  return (
    <>
      {createPortal(
        <div
          className="absolute z-10 p-[10px] rounded border-[1px] bg-white border-solid border-darkTeal-5 text-darkTeal-5 text-sm max-w-[320px]"
          style={{
            boxShadow: "0 0 50px rgba(0,0,0,0.12)",
            left: listX,
            top: listY,
            opacity: open ? 1 : 0,
            pointerEvents: open ? undefined : "none",
            transition: "0.3s",
            transform: "translateY(-16px)",
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {props.content}
        </div>,
        document.body
      )}
      <div className="flex gap-[8px] items-center">
        <div className={`text-lightTeal-0 text-sm ${dmMono.className}`}>
          {props.prompt}
        </div>
        <div
          ref={setIconPositionRef}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <InfoIcon />
        </div>
      </div>
    </>
  );
};

export default AWInfoLine;

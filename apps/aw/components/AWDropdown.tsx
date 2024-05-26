"use client";

import { IAWMultiChoiceFieldOption } from "@/app/insurance-application/InsuranceApplicationPage";
import { useEffect, useState } from "react";
import useOutsideClick from "./useOutsideClick";
import ChevronDownIcon from "@/images/icons/ChevronDownIcon.svg";
import { createPortal } from "react-dom";

function AWDropdownList(props: {
  open: boolean;
  options?: IAWMultiChoiceFieldOption[];
  width?: number;
  setValue: (id: string) => void;
}) {
  const [listRef, setListRef] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    setWidth(listRef?.getBoundingClientRect()?.width ?? 0);
    setHeight(listRef?.getBoundingClientRect()?.height ?? 0);
  }, [
    listRef?.getBoundingClientRect()?.width,
    listRef?.getBoundingClientRect()?.height,
  ]);
  const [hoveringRowId, setHoveringRowId] = useState<string | undefined>();
  return (
    <div
      className="overflow-hidden"
      style={{
        height,
        width: props.width || width,
        pointerEvents: props.open ? undefined : "none",
      }}
    >
      {/* <div className="h-full w-full"> */}
      <div
        className="w-fit py-[5px] flex flex-col rounded-[4px] border-2 border-solid border-greyscale-6 bg-greyscale-white duration-500"
        style={{
          transform: `translateY(${props.open ? 0 : -100}%)`,
        }}
        ref={setListRef}
      >
        {props.options?.map((o) => (
          <div
            key={o.id}
            className={`h-[34px] box-border w-full px-[10px] flex items-center ${
              hoveringRowId === o.id ? "text-darkTeal-2" : "text-darkTeal-5"
            } ${hoveringRowId === o.id ? "bg-greyscale-1" : ""} cursor-pointer`}
            onMouseEnter={() => setHoveringRowId(o.id)}
            onMouseLeave={() => setHoveringRowId(undefined)}
            onClick={() => props.setValue(o.id)}
          >
            {o.text}
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export function AWDropdown(props: {
  value?: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  options?: IAWMultiChoiceFieldOption[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const onOutsideClick = () => setOpen(false);
  // useEffect(() => {
  //   window.addEventListener("onclick", handleClick);
  //   return () => {
  //     window.removeEventListener("onclick", handleClick);
  //   };
  // }, [handleClick]);

  const setOutsideClickRef = useOutsideClick(onOutsideClick);

  const [listY, setListY] = useState<number>(0);
  const [listX, setListX] = useState<number>(0);

  const [listPositionRef, setListPositionRef] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setListY(listPositionRef?.getBoundingClientRect()?.bottom ?? 0);
    setListX(listPositionRef?.getBoundingClientRect()?.left ?? 0);
  }, [
    listPositionRef?.getBoundingClientRect()?.bottom,
    listPositionRef?.getBoundingClientRect()?.left,
  ]);
  return (
    <div ref={setOutsideClickRef}>
      {createPortal(
        <div
          className="absolute z-10 overflow-visible"
          style={{ left: listX, top: listY }}
        >
          <AWDropdownList
            open={open}
            options={props.options}
            setValue={props.setValue}
          />
        </div>,
        document.body
      )}
      <div
        ref={setListPositionRef}
        className="h-[50px] w-full flex items-center px-lg bg-fields-bg rounded-xs relative cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`w-full text-base/[18px] ${
            props.value
              ? "text-fields-text-filling"
              : "text-fields-text-placeholder"
          }`}
        >
          {props.options?.find((o) => o.id === props.value)?.text ||
            props.placeholder}
        </div>
        <ChevronDownIcon height="16px" width="16px" />
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import useOutsideClick from "./useOutsideClick";
import ChevronDownIcon from "@/images/icons/ChevronDownIcon.svg";
import { createPortal } from "react-dom";
import { IAWMultiChoiceFieldOption } from "@/app/insurance-application/[flow]/components/form-dialog";
import { useWindowSize } from "usehooks-ts";
import { SCROLLABLE_PAGE_ID } from "@/app/insurance-application/[flow]/mainFlow/controller";

const WINDOW_BOTTOM_LIST_MARGIN = 16;

function AWDropdownList(props: {
  open: boolean;
  options?: IAWDropdownOption["options"];
  width?: number;
  maxHeight?: number;
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
    props.options?.length,
  ]);

  const [hoveringRowId, setHoveringRowId] = useState<string | undefined>();
  return (
    <div
      className="overflow-hidden"
      style={{
        height,
        maxHeight: props.maxHeight,
        width: props.width,
        pointerEvents: props.open ? undefined : "none",
      }}
    >
      <div
        className="h-full rounded-[4px] border-2 border-solid border-greyscale-6 bg-greyscale-white overflow-scroll overflow-x-scroll duration-500"
        style={{
          transform: `translateY(${props.open ? 0 : -100}%)`,
        }}
      >
        <div className="w-full py-[5px] flex flex-col" ref={setListRef}>
          <div>
            {props.options?.map((o) => (
              <div
                key={o.id}
                className={`h-[34px] box-border w-full px-[10px] flex gap-xl items-center ${
                  hoveringRowId === o.id ? "text-darkTeal-2" : "text-darkTeal-5"
                } ${
                  hoveringRowId === o.id ? "bg-greyscale-1" : ""
                } cursor-pointer`}
                onMouseEnter={() => setHoveringRowId(o.id)}
                onMouseLeave={() => setHoveringRowId(undefined)}
                onClick={() => props.setValue(o.id)}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {o.displayKey ? (
                  <div className="font-medium">{o.displayKey}</div>
                ) : null}
                {o.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface IAWDropdownOption {
  value?: string;
  setValue: (newValue: string) => void;
  displayKey?: string;
  placeholder?: string;
  options?: (IAWMultiChoiceFieldOption & {
    searchableStrings?: string[];
    displayKey?: string;
  })[];
  highlightEmpty?: boolean;
}

export default function AWDropdown(props: IAWDropdownOption) {
  const [open, setOpen] = useState<boolean>(false);

  const [textFieldValue, setTextFieldValue] = useState<string>("");
  useEffect(
    () =>
      setTextFieldValue(
        props.options?.find((o) => o.id === props.value)?.text ?? ""
      ),
    [props.value, props.options]
  );
  const [filteredOptions, setFilteredOptions] = useState<
    IAWMultiChoiceFieldOption[]
  >([]);
  useEffect(() => {
    props.options &&
      setFilteredOptions(
        textFieldValue
          ? props.options?.filter((o) =>
              [o.text, o.searchableStrings?.join("") ?? ""]
                .join("")
                .toLowerCase()
                .includes(textFieldValue.toLowerCase())
            )
          : props.options
      );
  }, [textFieldValue, props.options]);

  const onOutsideClick = () => setOpen(false);
  const setOutsideClickRef = useOutsideClick(onOutsideClick);

  const [listY, setListY] = useState<number>(0);
  const [listX, setListX] = useState<number>(0);
  const [listWidth, setListWidth] = useState<number>(0);

  const [listPositionRef, setListPositionRef] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setListY(listPositionRef?.getBoundingClientRect()?.bottom ?? 0);
    setListX(listPositionRef?.getBoundingClientRect()?.left ?? 0);
    setListWidth(listPositionRef?.getBoundingClientRect()?.width ?? 0);
  }, [
    listPositionRef?.getBoundingClientRect()?.bottom,
    listPositionRef?.getBoundingClientRect()?.left,
    listPositionRef?.getBoundingClientRect()?.width,
  ]);

  const handleScroll = useCallback(() => {
    setListY(listPositionRef?.getBoundingClientRect()?.bottom ?? 0);
  }, [listPositionRef]);

  useEffect(() => {
    if (open) {
      document
        .getElementById(SCROLLABLE_PAGE_ID)
        ?.addEventListener("scroll", handleScroll);
      return () => {
        document
          .getElementById(SCROLLABLE_PAGE_ID)
          ?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [open, handleScroll]);

  const [listMaxHeight, setListMaxHeight] = useState<number>(0);

  const { height } = useWindowSize();

  useEffect(() => {
    setListMaxHeight(
      height -
        (listPositionRef?.getBoundingClientRect()?.bottom ?? 0) -
        WINDOW_BOTTOM_LIST_MARGIN
    );
  }, [listPositionRef?.getBoundingClientRect()?.bottom, height]);

  const [inputRef, setInputRef] = useState<HTMLElement | null>(null);

  return (
    <div className="w-full" ref={setOutsideClickRef}>
      {createPortal(
        <div
          className="absolute z-10 overflow-visible"
          style={{
            left: listX,
            top: listY,
            width: listWidth,
            pointerEvents: open ? undefined : "none",
          }}
        >
          <AWDropdownList
            open={open}
            options={filteredOptions}
            setValue={props.setValue}
            width={listWidth}
            maxHeight={listMaxHeight}
          />
        </div>,
        document.body
      )}
      <div
        ref={setListPositionRef}
        className="h-[50px] w-full flex gap-xl items-center px-lg bg-fields-bg rounded-xs relative cursor-pointer"
        style={{
          border: props.highlightEmpty ? `1px solid #F50000` : undefined,
        }}
        onClick={() => {
          setOpen(!open);
          setTextFieldValue("");
          inputRef?.focus();
        }}
      >
        {props.displayKey &&
        textFieldValue ===
          props.options?.find((o) => o.id === props.value)?.text ? (
          <div className="font-medium text-[18px]">{props.displayKey}</div>
        ) : null}
        <input
          ref={setInputRef}
          className={`w-full text-[18px] bg-transparent placeholder-greyscale-6 text-fields-text-pressed placeholder:text-fields-text-placeholder`}
          placeholder={props.placeholder}
          value={textFieldValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTextFieldValue(event.target.value);
          }}
          style={{
            outline: "none",
          }}
        />
        <ChevronDownIcon />
      </div>
    </div>
  );
}

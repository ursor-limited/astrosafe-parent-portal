"use client";

import ChevronLeftIcon from "@/images/icons/ChevronLeftIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon.svg";
import { DM_Mono } from "next/font/google";

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function InsuranceApplicationDialog(props: {
  title: string;
  leftCallback?: () => void;
  rightCallback?: () => void;
  rightArrowFaded?: boolean;
  stepper?: { n: number; current: number };
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-background-primary flex justify-center items-center">
      <div
        className="bg-greyscale-white w-[1050px] flex flex-col border-2 border-solid border-greyscale-6 justify-center items-center"
        style={{
          boxShadow: "0 0 33px rgba(0,0,0,0.09)",
        }}
      >
        <div className="h-[48px] w-full flex items-center justify-between px-[14px]">
          <div
            className="cursor-pointer hover:opacity-60 duration-200"
            onClick={props.leftCallback}
            style={{
              opacity:
                !props.leftCallback || props.stepper?.current === 0 ? 0 : 1,
              pointerEvents:
                !props.leftCallback || props.stepper?.current === 0
                  ? "none"
                  : undefined,
            }}
          >
            <ChevronLeftIcon height="20px" width="20px" />
          </div>
          {props.stepper ? (
            <div className="h-[8px] w-[600px] bg-[#E0E3E6] px-[2px] rounded-[4px] flex justify-between items-center relative">
              <div
                className="absolute left-0 top-0 h-full rounded-[4px] bg-lightTeal-2"
                style={{
                  width: `${
                    (100 * props.stepper.current) / (props.stepper.n - 1)
                  }%`,
                  transition: "0.79s cubic-bezier(.47,-0.04,.06,1.01)",
                }}
              />
              {[...Array(props.stepper.n).keys()].map((i) => (
                <div
                  key={i}
                  className={`h-[4px] w-[4px] rounded-full ${
                    i < props.stepper!.current
                      ? "bg-[#E0E3E6]"
                      : "bg-darkTeal-0"
                  } z-10`}
                />
              ))}
            </div>
          ) : null}
          <div
            className="cursor-pointer hover:opacity-60 duration-200"
            onClick={props.rightCallback}
            style={{
              opacity: !props.rightCallback
                ? 0
                : props.rightArrowFaded
                ? 0.35
                : 1,
              pointerEvents:
                !props.rightCallback || props.rightArrowFaded
                  ? "none"
                  : undefined,
            }}
          >
            <ChevronRightIcon height="20px" width="20px" />
          </div>
        </div>
        <div
          className={`h-[50px] w-full box-border bg-[#F0F1F1] px-3xl flex items-center font-medium text-darkTeal-2 text-xl border-y-2 border-y-greyscale-6 ${dmMono.className}`}
        >
          {props.title.toUpperCase()}
        </div>
        {props.children}
      </div>
    </div>
  );
}

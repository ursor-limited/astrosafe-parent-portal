"use client";

import ChevronLeftIcon from "@/images/icons/ChevronLeftIcon.svg";
import ChevronRightIcon from "@/images/icons/ChevronRightIcon.svg";
import { DM_Mono } from "next/font/google";
import { AWInsuranceApplicationMainFlowStep } from "../mainFlow/controller";
import { useLocalStorage } from "usehooks-ts";
import { AWInsuranceApplicationInvitedFlowStep } from "../invitedFlows/controller";
import { AWInsuranceApplicationPersonalFlowStep } from "../personalFlow/controller";

const CONTENTS_MIN_HEIGHT = 525;

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function InsuranceApplicationDialog(props: {
  title: string;
  //backCallback: () => void;
  //leftCallback?: () => void;
  //rightCallback?: () => void;
  progress?: number;
  children: React.ReactNode;
  backbuttonStep?:
    | AWInsuranceApplicationMainFlowStep
    | AWInsuranceApplicationInvitedFlowStep
    | AWInsuranceApplicationPersonalFlowStep;
}) {
  const [currentStep, setCurrentStep] = useLocalStorage<
    | AWInsuranceApplicationMainFlowStep
    | AWInsuranceApplicationInvitedFlowStep
    | AWInsuranceApplicationPersonalFlowStep
    | undefined
  >("currentStep", "welcome");
  return (
    <div
      className="bg-greyscale-white w-[1050px] h-fit flex flex-col border-2 border-solid border-greyscale-6 justify-center items-center"
      style={{
        boxShadow: "0 0 33px rgba(0,0,0,0.09)",
      }}
    >
      <div className="h-[48px] w-full flex items-center justify-between px-[14px]">
        <div
          className="cursor-pointer hover:opacity-60 duration-200"
          onClick={() => setCurrentStep(props.backbuttonStep)}
          style={{
            opacity: !props.backbuttonStep || props.progress === 0 ? 0 : 1,
            pointerEvents:
              !props.backbuttonStep || props.progress === 0
                ? "none"
                : undefined,
          }}
        >
          <ChevronLeftIcon height="20px" width="20px" />
        </div>
        {props.progress ? (
          <div className="h-[8px] w-[600px] bg-[#E0E3E6] px-[2px] rounded-[4px] flex justify-between items-center relative">
            <div
              className="absolute left-0 top-0 h-full rounded-[4px] bg-lightTeal-2"
              style={{
                width: `${100 * props.progress}%`,
                transition: "0.79s cubic-bezier(.47,-0.04,.06,1.01)",
              }}
            />
            {[...Array(5).keys()].map((i) => (
              <div
                key={i}
                className={`h-[4px] w-[4px] rounded-full ${
                  props.progress === 1 || i / 4 < props.progress!
                    ? "bg-[#E0E3E6]"
                    : "bg-darkTeal-0"
                } z-10`}
              />
            ))}
          </div>
        ) : null}
        <div />
      </div>
      <div
        className={`h-[50px] w-full box-border bg-[#F0F1F1] px-3xl flex items-center font-medium text-darkTeal-2 text-xl border-y-2 border-y-greyscale-6 ${dmMono.className}`}
      >
        {props.title.toUpperCase()}
      </div>
      <div
        className="w-full flex justify-center"
        style={{
          minHeight: CONTENTS_MIN_HEIGHT,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

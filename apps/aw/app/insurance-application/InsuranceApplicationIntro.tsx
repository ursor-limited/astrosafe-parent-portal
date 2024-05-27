import { AWButton } from "@/components/AWButton";
import InsuranceApplicationDialog from "./InsuranceApplicationDialog";
import { STEPS } from "./InsuranceApplicationPage";

export default function InsuranceApplicationIntro(props: {}) {
  return (
    <InsuranceApplicationDialog title={"START APPLICATION"}>
      <div className="h-full w-full flex">
        <div className="flex flex-col p-3xl gap-3xl h-full w-[525px] items-between">
          <div className="font-medium text-xl">
            The application intake form consists of the following sections.
          </div>
          <div className="flex flex-col">
            {STEPS.map((step) => (
              <div className="flex gap-[10px] items-center">
                <div className="h-[12px] w-[12px] rounded-full border-[1px] border-solid border-greyscale-7"></div>
                <div className="text-xl underline underline-offset-2 decoration-1">
                  {step.title}
                </div>
              </div>
            ))}
          </div>
          <AWButton onClick={() => null}>Start</AWButton>
        </div>
        <div className="flex flex-1"></div>
      </div>
    </InsuranceApplicationDialog>
  );
}

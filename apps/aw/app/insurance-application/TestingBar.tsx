import { AWButton } from "@/components/AWButton";
import { AWInsuranceApplicationStep } from "./InsuranceApplicationPage";
import { useLocalStorage } from "usehooks-ts";

const TestingBar = () => {
  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationStep | undefined
  >("currentStep", "submit");
  return (
    <div className="absolute top-0 left-0 flex flex-col w-full text-xs text-darkTeal-5">
      <div className="flex  w-full justify-between items-center p-lg">
        <div className="flex gap-lg">
          <AWButton size="xs" onClick={() => localStorage.clear()}>
            Clear data
          </AWButton>
          <AWButton
            size="xs"
            variant="secondary"
            onClick={() => setCurrentStep("submit")}
          >
            Go to Resume
          </AWButton>
        </div>
      </div>
      <div className="pl-lg">
        Guys, this top bar is just for your benefit. The user shall not see
        this.
      </div>
    </div>
  );
};

export default TestingBar;

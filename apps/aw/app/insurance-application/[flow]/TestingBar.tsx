import { AWButton } from "@/components/AWButton";
import {
  AWInsuranceApplicationFlow,
  AWInsuranceApplicationMainFlowStep,
} from "./mainFlow/controller";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AWDropdown = dynamic(
  () => import("@/components/AWDropdown"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const TestingBar = (props: { flow: AWInsuranceApplicationFlow }) => {
  const [currentStep, setCurrentStep] = useLocalStorage<
    AWInsuranceApplicationMainFlowStep | undefined
  >("currentStep", "submit");
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 flex flex-col w-full text-xs text-darkTeal-5">
      <div className="flex  w-full justify-between items-center p-lg">
        <div className="flex gap-lg">
          <AWButton
            size="xs"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Clear data
          </AWButton>
          {props.flow === "main" ? (
            <AWButton
              size="xs"
              variant="secondary"
              onClick={() => setCurrentStep("submit")}
            >
              Go to Resume
            </AWButton>
          ) : null}
        </div>
        <div>
          Guys, this top bar is just for your benefit. The user shall not see
          this.
        </div>
        <div className="flex gap-lg items-center">
          <div className="font-medium text-lg">Select flow:</div>
          <div style={{ width: "158px" }} className="flex gap-lg">
            <AWDropdown
              value={props.flow}
              setValue={(f) => {
                //setFlow(f as AWInsuranceApplicationFlow);
                localStorage.clear();
                router.push(`/insurance-application/${f}`);
              }}
              options={[
                {
                  id: "main",
                  text: "Main",
                },
                {
                  id: "executive",
                  text: "Executive",
                },
                {
                  id: "digAddMan",
                  text: "DigAssMan",
                },
                {
                  id: "shareholder",
                  text: "25% Shareholder",
                },
                {
                  id: "shareholderKeyHolder",
                  text: "25% SH Keyholder",
                },
              ]}
              placeholder="Flow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingBar;

import React from "react";
import InsuranceApplicationMainFlowController, {
  AWInsuranceApplicationFlow,
} from "./mainFlow/controller";
import InsuranceApplicationInvitedFlowsController from "./invitedFlows/controller";
import InsuranceApplicationPersonalFlowController from "./personalFlow/controller";

async function AnchorWatch({
  params,
}: {
  params: { flow: AWInsuranceApplicationFlow };
}) {
  return params.flow === "main" ? (
    <InsuranceApplicationMainFlowController />
  ) : params.flow === "personal" ? (
    <InsuranceApplicationPersonalFlowController />
  ) : (
    <InsuranceApplicationInvitedFlowsController flow={params.flow} />
  );
}

export default AnchorWatch;

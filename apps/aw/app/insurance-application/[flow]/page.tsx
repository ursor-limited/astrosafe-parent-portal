import React from "react";
import InsuranceApplicationMainFlowController, {
  AWInsuranceApplicationFlow,
} from "./mainFlow/controller";
import InsuranceApplicationInvitedFlowsController from "./invitedFlows/controller";

async function AnchorWatch({
  params,
}: {
  params: { flow: AWInsuranceApplicationFlow };
}) {
  return params.flow === "main" ? (
    <InsuranceApplicationMainFlowController />
  ) : (
    <InsuranceApplicationInvitedFlowsController flow={params.flow} />
  );
}

export default AnchorWatch;

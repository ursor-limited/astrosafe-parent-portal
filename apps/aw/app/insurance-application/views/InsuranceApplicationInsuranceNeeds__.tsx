// import { useEffect, useState } from "react";
// import {
//   AWFormSection,
//   AWInsuranceApplicationStep,
//   STEP_TITLES,
// } from "../InsuranceApplicationPage";
// import InsuranceApplicationFormDialog, {
//   IAWFormInputAnswer,
//   IAWFormSection,
// } from "../components/InsuranceApplicationFormDialog";
// import { CHECKPOINT_STEPS } from "./InsuranceApplicationCheckpoints";
// import { useLocalStorage } from "usehooks-ts";
// import InsuranceApplicationDialog from "../components/InsuranceApplicationDialog";
// import { AWButton } from "@/components/AWButton";

// // THIS SECTION HAS SO MUCH CUSTOM LOGIC THAT IT WAS BEST TO MAKE IT WHOLLY MANUALLY

// // export const SECTIONS: IAWFormSection[] = [
// //   {
// //     id: "6658cc99bae2560206764d9e",
// //     title:
// //       "Approximately how many Bitcoin (or equivalent value in USD)  does the prospective insured intend store in Trident Vault and insure?",
// //     inputs: [
// //       {
// //         id: "6658ccae6d9b6f8e9de7d699",
// //         inputType: "textAndDropdown",
// //         placeholder: "Quantity",
// //         dropdownPlaceholder:
// //       },
// //     ],
// //   },
// // ];

// const PROSPECTIVE_INSURED_SECTION: IAWFormSection = {
//   id: "6658d17dae46a105af0be6b1",
//   title:
//     "Is the Bitcoin to be insured the property of the prospective insured?",
//   inputs: [
//     {
//       id: "6658d2b8b876632b2e886cc6",
//       inputType: "multiChoice",
//       options: [
//         {
//           id: "6658d2f319539091e72b48a9",
//           text: "Yes",
//         },
//         {
//           id: "6658d2fe7e1330344086c121",
//           text: "No",
//         },
//       ],
//     },
//     {
//       id: "6658d31fad53b64069c83b24",
//       inputType: "text",
//       title: "If no, who is the title holder of the Bitcoin?",
//       placeholder: 'Legal name'
//     },
//   ],
// };

// export default function InsuranceApplicationInsuranceNeeds(props: {
//   nextCallback: () => void;
// }) {
//   // const [answers, setAnswers] = useState<IAWFormInputAnswer[]>([]);

//   // const setValue = (id: string, newValue?: string) => {
//   //   setAnswers((prev) =>
//   //     prev.find((a) => a.inputId === id)
//   //       ? prev.map((a) =>
//   //           a.inputId === id ? { inputId: id, value: newValue } : a
//   //         )
//   //       : [...prev, { inputId: id, value: newValue }]
//   //   );
//   // };

//   // const [committedAnswers, setCommittedAnswers] = useLocalStorage<
//   //   Partial<Record<AWInsuranceApplicationStep, IAWFormInputAnswer[]>>
//   // >("committedAnswers", {});
//   // useEffect(
//   //   () => setAnswers(committedAnswers["insuranceNeeds"] || []),
//   //   [committedAnswers]
//   // );

//   // const [canProceed, setCanProceed] = useState<boolean>(false);
//   // useEffect(
//   //   () =>
//   //     setCanProceed(
//   //       props.sections
//   //         .flatMap((s) => [
//   //           ...(s.inputs || []),
//   //           ...(s.subsections ? s.subsections.flatMap((ss) => ss.inputs) : []),
//   //         ])
//   //         .every(
//   //           (input) =>
//   //             input.optional ||
//   //             answers.find((a) => a.inputId === input?.id)?.value
//   //         )
//   //     ),
//   //   [answers]
//   // );

//   // const commitAnswers = () =>
//   //   setCommittedAnswers({ ...committedAnswers, [props.stepId]: answers });

//   const [prospectiveInsuredYes, setProspectiveInsuredYes] =
//     useState<boolean>(false);
//   return (
//     <InsuranceApplicationDialog
//       title={STEP_TITLES.insuranceNeeds}
//       // rightArrowFaded={!canProceed}
//       progress={
//         (CHECKPOINT_STEPS.indexOf("insuranceNeeds") - 1) /
//         CHECKPOINT_STEPS.length
//       }
//     >
//       <div className="w-[600px] h-full justify-center flex flex-col gap-[32px] py-[64px]">
//         <div className="w-full flex flex-col gap-[46px]">
//           <AWFormSection
//             key="prospectiveInsured"
//             i={2}
//             answers={}
//             setValue={setValue}
//             prefill={() => prefill(section)}
//             //commit={commitAnswers}
//           />
//         </div>
//         <div className="w-full justify-center flex gap-[16px]">
//           <AWButton width={182} variant="secondary" onClick={commitAnswers}>
//             Save
//           </AWButton>
//           <AWButton
//             width={182}
//             disabled={!canProceed}
//             onClick={() => {
//               commitAnswers();
//               //setStepIndex(stepIndex + 1);
//               props.nextCallback();
//             }}
//           >
//             Next
//           </AWButton>
//         </div>
//       </div>
//     </InsuranceApplicationDialog>
//   );
// }

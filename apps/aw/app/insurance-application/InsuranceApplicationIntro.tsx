import { AWButton } from "@/components/AWButton";

export default function InsuranceApplicationIntro(props: {}) {
  return (
    <div className="h-full w-full flex">
      <div className="p-3xl h-full w-[525px] items-between">
        <div className="font-medium text-xl">
          The application intake form consists of the following sections.
        </div>
        <AWButton onClick={() => null}>Start</AWButton>
      </div>
      <div className="flex flex-1"></div>
    </div>
  );
}

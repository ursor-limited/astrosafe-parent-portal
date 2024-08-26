import React from "react";
import { useRouter } from "next/navigation";
import { IVideo } from "../../../profiles/[id]/components/ContentTab";
import { Stack } from "@mui/system";
import UrsorFadeIn from "../../../components/UrsorFadeIn";
import VideoCard from "../../../folders/[id]/components/VideoCard";
import EmptyStateIllustration from "../../../components/EmptyStateIllustration";
import { ITitleRowItem } from "../../../components/TitleRow";
import { IActionPopupItem } from "../../../components/ActionPopup";
import MobilePageLayout from "@/app/components/MobilePageLayout";

const ChannelPageMobileBody = (props: {
  videos: IVideo[];
  onUpdate: () => void;
  setVideoEditingDialogId: (id: IVideo["id"]) => void;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
  onBack: () => void;
}) => {
  const router = useRouter();
  return (
    <MobilePageLayout
      titleRow={props.titleRow.slice(-1)[0]}
      titleBackButtonCallback={props.onBack}
      selectedPage="content"
      actions={props.actions}
    >
      {props.videos.length > 0 ? (
        <Stack pb="33px">
          <Stack spacing="20px">
            {props.videos.map((v, i) => (
              <UrsorFadeIn key={v.id} duration={800} delay={i * 90}>
                <VideoCard
                  {...v}
                  onDelete={props.onUpdate}
                  onOpenEditingDialog={() =>
                    props.setVideoEditingDialogId(v.id)
                  }
                  twoLineTitleSectionHeight
                />
              </UrsorFadeIn>
            ))}
          </Stack>
        </Stack>
      ) : (
        <EmptyStateIllustration paddingTop={20}>
          No Videos in this Channel
        </EmptyStateIllustration>
      )}
    </MobilePageLayout>
  );
};

export default ChannelPageMobileBody;

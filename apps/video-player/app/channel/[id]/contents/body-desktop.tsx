import React from "react";
import { useRouter } from "next/navigation";
import { IVideo } from "../../../profiles/[id]/components/ContentTab";
import PageLayout from "../../../components/PageLayout";
import { Stack } from "@mui/system";
import DynamicCardGrid from "../../../components/DynamicCardGrid";
import UrsorFadeIn from "../../../components/UrsorFadeIn";
import VideoCard from "../../../folders/[id]/components/VideoCard";
import EmptyStateIllustration from "../../../components/EmptyStateIllustration";
import { ITitleRowItem } from "../../../components/TitleRow";
import { IActionPopupItem } from "../../../components/ActionPopup";

const ChannelPageDesktopBody = (props: {
  videos: IVideo[];
  onUpdate: () => void;
  setVideoEditingDialogId: (id: IVideo["id"]) => void;
  titleRow: ITitleRowItem[];
  actions: IActionPopupItem[];
}) => {
  const router = useRouter();
  return (
    <PageLayout
      titleRow={props.titleRow}
      bodyWidth="100%"
      fullHeight
      selectedSidebarItemId="content"
      actions={props.actions}
      maxWidth={834}
      scrollable
    >
      {props.videos.length > 0 ? (
        <Stack pt="20px" pb="33px" pl="51px">
          <DynamicCardGrid cardWidth="292px" rowGap="40px" columnGap="20px">
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
          </DynamicCardGrid>
        </Stack>
      ) : (
        <EmptyStateIllustration paddingTop={20}>
          No Videos in this Channel
        </EmptyStateIllustration>
      )}
    </PageLayout>
  );
};

export default ChannelPageDesktopBody;

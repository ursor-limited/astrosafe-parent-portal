import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "ui";
import InfoButton, { IInfoButtonProps } from "@/app/components/InfoButton";

export const INFOS: Record<string, IInfoButtonProps> = {
  folders: {
    title: "What are Content Folders?",
    text: "A Folder is a collection of Links, Videos, and Video Channels that can be assigned to Devices. Once assigned to the Device they will be discover this Content from their homepage. Please note that the Folder will override the Filters and allow access to the sites you add to make it easy to share Content with your kids without worrying about Filter settings.",
  },
  folderDevice: {
    title: "What happens when I add a Device?",
    text: "By adding a Device to a Content Folder all of the Content will appear on the Device's homepage and will be accessible on their Device. You won't have to worry about configuring the Filter to access the Content!",
  },
  filters: {
    title: "How does a Filter work?",
    text: "A Filter is a set of rules to keep your Device safe. Toggle on the Categories you want to be accessible and we'll take care of the rest. If you want to handle websites more specifically you can add them to the Allow list or Block list. This lets you create exceptions to your Categories. For example you might want to block social media - but allow Facebook because your family uses it in a safe and appropriate environment. You can toggle off social media but add facebook.com to the Allow list. Similarly for the Block list you might want to specifically block sites that would otherwise be allowed. The Blocked Words apply only to search engines, to prevent certain terms being searched.",
  },
};

const ProfilePageTabLayout = (props: {
  title: string;
  rightSideElement?: React.ReactNode;
  info: IInfoButtonProps;
  mobile?: boolean;
  children: React.ReactNode;
}) => (
  <Stack flex={1} spacing="24px">
    <Stack spacing="6px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="flex-end" spacing="16px">
          <Typography variant="h5">{props.title}</Typography>
          {!props.mobile ? (
            <Stack sx={{ transform: "translateY(1px)" }}>
              <InfoButton {...props.info} />
            </Stack>
          ) : null}
        </Stack>
        {props.rightSideElement}
      </Stack>
      {props.mobile ? <InfoButton {...props.info} /> : null}
    </Stack>
    {props.children}
  </Stack>
);

export default ProfilePageTabLayout;

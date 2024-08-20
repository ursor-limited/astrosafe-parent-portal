import React from "react";
import { Stack } from "@mui/system";
import { Typography } from "ui";
import InfoButton, { IInfoButtonProps } from "@/app/components/InfoButton";

export const INFOS: Record<string, IInfoButtonProps> = {
  folders: {
    title: "What are Content Folders?",
    text: "A Folder is a collection of Links, Videos, and Video Channels that can be assigned to Devices. Once assigned to the Device they will be discover this Content from their homepage. Please note that the Folder will override the Filters and allow access to the sites you add to make it easy to share Content with your kids without worrying about Filter settings.",
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
        <Stack direction="row" alignItems="center" spacing="16px">
          <Typography variant="h5">{props.title}</Typography>
          {!props.mobile ? <InfoButton {...props.info} /> : null}
        </Stack>
        {props.rightSideElement}
      </Stack>
      {props.mobile ? <InfoButton {...props.info} /> : null}
    </Stack>
    {props.children}
  </Stack>
);

export default ProfilePageTabLayout;

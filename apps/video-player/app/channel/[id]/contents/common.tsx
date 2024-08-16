"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ApiController from "../../../api";
import {
  IChannel,
  IContentBucket,
  IVideo,
} from "../../../profiles/[id]/components/ContentTab";
import ChannelPageDesktopBody from "./body-desktop";

const ChannelPage = (props: {
  id: IChannel["id"];
  folderId?: IContentBucket["id"];
  isMobile: boolean;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState<IChannel["title"]>("");
  const [videos, setVideos] = useState<IVideo[]>([]);
  const load = useCallback(
    () =>
      ApiController.getChannel(props.id).then((c) => {
        setTitle(c.title);
        setVideos(c.videos);
      }),
    [props.id]
  );
  useEffect(() => {
    load();
  }, [load]);

  const [folder, setFolder] = useState<IContentBucket | undefined>();
  useEffect(() => {
    props.folderId && ApiController.getFolder(props.folderId).then(setFolder);
  }, [props.folderId]);

  const [videoEditingDialogId, setVideoEditingDialogId] = useState<
    IVideo["id"] | undefined
  >();

  const titleRow = [
    ...(folder
      ? [
          {
            text: "My Folders",
            callback: () => router.push("/folders"),
          },
          {
            text: folder?.title ?? "",
            callback: () => router.push(`/folders/${props.folderId}`),
          },
        ]
      : []),
    {
      text: title,
    },
  ];

  return (
    <>
      {props.isMobile ? (
        <></>
      ) : (
        // <ChannelPageMobileBody
        //   folders={folders}
        //   createFolder={() => setCreationDialogOpen(true)}
        //   onUpdate={loadFolders}
        // />
        <ChannelPageDesktopBody
          videos={videos}
          onUpdate={load}
          titleRow={titleRow}
          setVideoEditingDialogId={setVideoEditingDialogId}
        />
      )}
    </>
  );
};

export default ChannelPage;

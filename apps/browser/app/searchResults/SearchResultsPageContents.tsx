"use client";

import { useEffect, useState } from "react";
import ApiController, {
  IBrowserLink,
  IChannel,
  IPlatform,
  IStack,
  IVideo,
  getAbsoluteUrl,
} from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import _ from "lodash";
import PageLayout from "../components/PageLayout";
import BrowserLinkCard from "../components/BrowserLinkCard";
import { BrowserContent, IBrowserContent } from "../home/AstroContentColumns";
import VideoCard from "../components/VideoCard";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const DUMMY_VIDEOS = [
  {
    id: "6658dd53d54478910600b2ac",
    title: "Coolest kids",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/Frame_427320551.webp",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
  {
    id: "6659d2b1b66f5d5ee1349b01",
    title: "Star Wars",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/seals2.png",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
  {
    id: "6659d2b4b886df523356cb13",
    title: "Pokemon",
    videoChannelId: "6659a32823838b9510e565e2",
    thumbnailUrl:
      "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    creatorId: "",
    comments: [],
    createdAt: "",
    updatedAt: "",
    url: "https://www.youtube.com/watch?v=0S_colMG1Uo",
  },
];

export type AstroContent = "link" | "stack";

const AstroContentRow = (props: {
  videos: IVideo[];
  links: IBrowserLink[];
}) => {
  const [allContentDetails, setAllContentDetails] = useState<
    {
      type: BrowserContent;
      details: IBrowserLink | IVideo;
    }[]
  >([]);
  useEffect(() => {
    if (!props.links || !props.videos) return;
    const linkDetails = props.links.map((l) => ({
      type: "link" as BrowserContent,
      details: l,
    }));
    const videoDetails = props.videos.map((v) => ({
      type: "video" as BrowserContent,
      details: v,
    }));
    const all = [
      ..._.reverse(
        _.sortBy(
          [...linkDetails, ...videoDetails],
          (c) => new Date(c.details.createdAt)
        ).slice()
      ),
    ];
    setAllContentDetails(all);
  });

  const router = useRouter();

  return (
    <Stack direction="row" spacing="12px">
      {[
        <Stack key="lp" minWidth="8px" />,
        ...allContentDetails.map((c) => (
          <Stack
            key={c.details.id}
            onClick={() => router.push(c.details.url)}
            minWidth="350px"
            width="350px"
          >
            {c.type === "link" ? (
              <BrowserLinkCard link={c.details as IBrowserLink} />
            ) : c.type === "video" ? (
              <VideoCard video={c.details as IVideo} />
            ) : null}
          </Stack>
        )),
        <Stack key="rp" minWidth="8px" />,
      ]}
    </Stack>
  );
};

export default function SearchResultsPageContents(props: { mobile: boolean }) {
  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    undefined
  );

  const [videos, setVideos] = useState<IVideo[]>(DUMMY_VIDEOS);
  const [links, setLinks] = useState<IBrowserLink[]>([]);
  useEffect(() => {
    (deviceId
      ? ApiController.getLinks(deviceId)
      : ApiController.getGuestLinks()
    ).then((links) => setLinks(_.reverse(links.slice())));
  }, [deviceId]);

  return (
    <PageLayout
      headerButtonId="home"
      mobile={props.mobile}
      sections={[
        {
          title: "Suggested",
          contents: (
            <Stack overflow="scroll">
              <AstroContentRow videos={videos} links={links} />
            </Stack>
          ),
        },
      ]}
    />
  );
}

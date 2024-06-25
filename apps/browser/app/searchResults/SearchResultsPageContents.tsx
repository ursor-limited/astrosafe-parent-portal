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
import { useRouter } from "next/navigation";
import { Typography } from "ui";
import Image from "next/image";

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

interface ISearchResult {
  title: string;
  description: string;
  imageUrl: string;
}

const AstroContentRow = (props: {
  videos: IVideo[];
  links: IBrowserLink[];
  filter?: string;
}) => {
  const [allContentDetails, setAllContentDetails] = useState<
    {
      type: BrowserContent;
      details: IBrowserLink | IVideo;
    }[]
  >([]);
  useEffect(() => {
    if (!props.links || !props.videos) return;
    const linkDetails = props.links
      .filter(
        (l) =>
          !props.filter ||
          l.title.toLowerCase().includes(props.filter.toLowerCase())
      )
      .map((l) => ({
        type: "link" as BrowserContent,
        details: l,
      }));
    const videoDetails = props.videos
      .filter(
        (v) =>
          !props.filter ||
          v.title.toLowerCase().includes(props.filter.toLowerCase())
      )
      .map((v) => ({
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
  }, [props.links, props.videos]);

  const router = useRouter();

  return (
    <Stack direction="row" spacing="12px">
      {[
        <Stack key="lp" minWidth="8px" />,
        ...allContentDetails.map((c) => {
          return (
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
          );
        }),
        <Stack key="rp" minWidth="8px" />,
      ]}
    </Stack>
  );
};

const AstroSearchResultsColumn = (props: {
  searchResults: ISearchResult[];
}) => (
  <Stack spacing="12px">
    {props.searchResults.map((sr) => (
      <Stack
        bgcolor="rgb(255,255,255)"
        borderRadius="12px"
        height="84px"
        px="12px"
        py="12px"
        boxSizing="border-box"
        justifyContent="space-between"
      >
        <Stack spacing="12px" direction="row">
          <Stack
            width="26px"
            height="26px"
            borderRadius="100%"
            overflow="hidden"
          >
            <Image
              src={sr.imageUrl}
              width={26}
              height={26}
              alt="domain favicon"
            />
          </Stack>
          <Typography variant="large" bold>
            {sr.title}
          </Typography>
        </Stack>
        <Typography maxLines={1}>{sr.description}</Typography>
      </Stack>
    ))}
  </Stack>
);

export default function SearchResultsPageContents(props: {
  mobile: boolean;
  searchTerm: string;
}) {
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

  const [searchResults, setSearchResults] = useState<ISearchResult[]>([
    {
      title: "Booo",
      description: "Bofof",
      imageUrl:
        "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    },
    {
      title: "Booodd",
      description: "Bofof",
      imageUrl:
        "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    },
    {
      title: "Bosssdsdoo",
      description: "Bofof",
      imageUrl:
        "https://ursorassets.s3.eu-west-1.amazonaws.com/testImage2.jpeg",
    },
  ]);

  return (
    <PageLayout
      headerButtonId="home"
      mobile={props.mobile}
      sections={[
        {
          title: "Suggested",
          contents: (
            <Stack overflow="scroll">
              <AstroContentRow
                videos={videos}
                links={links}
                filter={props.searchTerm}
              />
            </Stack>
          ),
        },
        {
          title: "More results",
          contents: (
            <Stack overflow="scroll" px="20px" pb="42px">
              <AstroSearchResultsColumn searchResults={searchResults} />
            </Stack>
          ),
        },
      ]}
    />
  );
}

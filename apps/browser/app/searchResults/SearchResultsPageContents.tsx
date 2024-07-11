"use client";

import { useEffect, useState } from "react";
import ApiController, {
  IBrowserLink,
  IChannel,
  IPlatform,
  IStack,
  IVideo_DEPRECATED,
  getAbsoluteUrl,
} from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import _ from "lodash";
import BrowserLinkCard from "../components/BrowserLinkCard";
import { BrowserContent, IBrowserContent } from "../home/AstroContentColumns";
import VideoCard from "../components/VideoCard";
import { useRouter } from "next/navigation";
import { PALETTE, Typography } from "ui";
import Image from "next/image";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import CirclePlayIcon from "@/images/icons/CirclePlay.svg";
import ImageIcon from "@/images/icons/ImageIcon.svg";

const SearchResultsCategoryButton = (props: {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selected: boolean;
  onClick: () => void;
}) => (
  <Stack
    direction="row"
    spacing="4px"
    alignItems="center"
    borderRadius="99px"
    bgcolor="rgb(255,255,255)"
    height="31px"
    px="12px"
    sx={{
      svg: {
        path: {
          fill: props.selected ? PALETTE.secondary.purple[2] : undefined,
          transition: "0.2s",
        },
      },
    }}
    onClick={props.onClick}
  >
    <props.icon width="16px" height="16px" />
    <Typography
      color={props.selected ? PALETTE.secondary.purple[2] : undefined}
      bold
      sx={{
        transition: "0.2s",
      }}
    >
      {props.text}
    </Typography>
  </Stack>
);

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
  videos: IVideo_DEPRECATED[];
  links: IBrowserLink[];
  filter?: string;
}) => {
  const [allContentDetails, setAllContentDetails] = useState<
    {
      type: BrowserContent;
      details: IBrowserLink | IVideo_DEPRECATED;
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
                <VideoCard video={c.details as IVideo_DEPRECATED} />
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
    {props.searchResults.map((sr, i) => (
      <Stack
        key={i}
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
          <Typography variant="large" bold maxLines={1}>
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

  const [videos, setVideos] = useState<IVideo_DEPRECATED[]>(DUMMY_VIDEOS);
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
      title: "Booodds dsd sd s d s d s d  s d sdssdsddsd",
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

  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "image" | "video"
  >("all");

  return (
    <Stack spacing="20px" height="100%" overflow="scroll" pt="20px">
      <Stack spacing="20px">
        <Stack direction="row" spacing="10px" px="20px">
          <SearchResultsCategoryButton
            text="All"
            icon={SearchIcon}
            selected={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          />
          <SearchResultsCategoryButton
            text="Videos"
            icon={CirclePlayIcon}
            selected={selectedCategory === "video"}
            onClick={() => setSelectedCategory("video")}
          />
          <SearchResultsCategoryButton
            text="Images"
            icon={ImageIcon}
            selected={selectedCategory === "image"}
            onClick={() => setSelectedCategory("image")}
          />
        </Stack>
        <Stack spacing="20px">
          <Stack px="20px" spacing="12px" direction="row" alignItems="center">
            <Typography variant="h5">Suggested</Typography>
          </Stack>
          <Stack overflow="scroll">
            <AstroContentRow
              videos={videos}
              links={links}
              filter={props.searchTerm}
            />
          </Stack>
        </Stack>
        <Stack spacing="20px">
          <Stack px="20px" spacing="12px" direction="row" alignItems="center">
            <Typography variant="h5">Other results</Typography>
          </Stack>
          <Stack overflow="scroll" px="20px" pb="42px">
            <AstroSearchResultsColumn searchResults={searchResults} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

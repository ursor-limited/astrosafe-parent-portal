"use client";

import { useEffect, useState } from "react";
import ApiController, {
  IBrowserLink,
  IChannel,
  IPlatform,
  IStack,
  getAbsoluteUrl,
} from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import ChannelButton from "./ChannelButton";
import useColumnWidth from "../components/useColumnWidth";
import AstroContentColumns, { BrowserContent } from "./AstroContentColumns";
import _ from "lodash";
import PlatformCard from "../components/PlatformCard";
import { useRouter } from "next/navigation";
import PageLayout from "../components/PageLayout";
import UrsorFadeIn from "../components/UrsorFadeIn";
import StarFillIcon from "@/images/icons/StarFillIcon.svg";
import TelescopeIcon from "@/images/icons/TelescopeIcon.svg";
import { PALETTE } from "ui";
import useDeviceId from "../components/useDeviceId";

export type AstroContent = "link" | "stack";

const OVERALL_X_PADDING = "20px";

export default function HomePageContents(props: { mobile: boolean }) {
  const deviceId = useDeviceId();

  const [favorites, setFavorites] = useLocalStorage<
    {
      contentId: string;
      contentType: BrowserContent;
    }[]
  >("favorites", []);
  const [discoverLinks, setDiscoverLinks] = useState<IBrowserLink[]>([]);
  //const [discoverStacks, setDiscoverStacks] = useState<IStack[]>([]);

  useEffect(() => {
    if (deviceId) {
      ApiController.getDevice(deviceId).then((d) => setFavorites(d?.favorites));
      ApiController.getDiscoverContents(deviceId).then((response) => {
        if (response) {
          setDiscoverLinks(response);
          //setDiscoverStacks(response.links);
        }
      });
    }
  }, [deviceId]);

  const [channels, setChannels] = useState<IChannel[]>([]);
  const [links, setLinks] = useState<IBrowserLink[]>([]);
  const [stacks, setStacks] = useState<IStack[]>([]);
  const [apps, setApps] = useState<IPlatform[]>([]);
  useEffect(() => {
    (deviceId
      ? ApiController.getLinks(deviceId)
      : ApiController.getGuestLinks()
    ).then((links) => setLinks(_.reverse(links.slice())));
    deviceId
      ? ApiController.getStacks(deviceId).then((stacks) => setStacks(stacks))
      : setStacks([]);
    (deviceId
      ? ApiController.getChannels(deviceId)
      : ApiController.getGuestChannels()
    ).then((channels) => setChannels(channels));
    (deviceId
      ? ApiController.getApps(deviceId)
      : ApiController.getGuestApps()
    ).then((apps) => setApps(_.reverse(apps.slice())));
  }, [deviceId]);

  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);

  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [showDiscover, setShowDiscover] = useState<boolean>(true);

  const [filteredLinks, setFilteredLinks] = useState<IBrowserLink[]>([]);
  useEffect(
    () =>
      setFilteredLinks(
        showDiscover
          ? discoverLinks
          : links?.filter((l) =>
              showFavorites
                ? favorites.find((f) => f.contentId === l.id)
                : !l.stackId && l.channelId === selectedChannelId
            )
      ),
    [
      links,
      selectedChannelId,
      showFavorites,
      showDiscover,
      discoverLinks,
      favorites,
    ]
  );
  const [filteredStacks, setFilteredStacks] = useState<IStack[]>([]);
  useEffect(
    () =>
      setFilteredStacks(
        showDiscover
          ? []
          : stacks?.filter((s) =>
              showFavorites
                ? favorites.find((f) => f.contentId === s.id)
                : s.channelId === selectedChannelId
            )
      ),
    [stacks, selectedChannelId, showFavorites, favorites]
  );

  const [cardColumns, setCardColumns] = useState<
    {
      type: AstroContent;
      details: IBrowserLink | IStack;
    }[][]
  >([]);

  const { nColumns, setColumnsContainerRef } = useColumnWidth();

  useEffect(() => {
    const linkDetails = (
      links?.filter((l) =>
        showDiscover
          ? discoverLinks
          : showFavorites
          ? favorites.find((f) => f.contentId === l.id)
          : !l.stackId && l.channelId === selectedChannelId
      ) || []
    ).map((l) => ({
      type: "link" as AstroContent,
      details: l,
    }));
    const stackDetails = (
      stacks?.filter((s) =>
        showFavorites
          ? favorites.find((f) => f.contentId === s.id)
          : s.channelId === selectedChannelId
      ) || []
    ).map((s) => ({
      type: "stack" as AstroContent,
      details: s,
    }));
    const allContentDetails = _.reverse(
      _.sortBy(
        [...linkDetails, ...stackDetails],
        (c) => new Date(c.details.createdAt)
      ).slice()
    );
    const chunked = _.chunk(allContentDetails, nColumns);
    setCardColumns(
      [...Array(nColumns).keys()].map((i) =>
        _.compact(chunked.map((chunk) => chunk[i]))
      )
    );
  }, [links, stacks, selectedChannelId, nColumns]);

  const router = useRouter();

  return (
    <PageLayout
      headerButtonId="home"
      mobile={props.mobile}
      sections={[
        {
          title: "Home",
          contents: (
            <Stack overflow="scroll" height="162px">
              <Stack
                direction="row"
                spacing="12px"
                px={OVERALL_X_PADDING}
                boxSizing="border-box"
              >
                {[
                  ...apps.map((a, i) => (
                    <Stack
                      key={a.id}
                      onClick={() => setSelectedChannelId(a.id)}
                    >
                      <UrsorFadeIn duration={1200} delay={i * 70}>
                        <PlatformCard
                          key={a.id}
                          platform={a}
                          clickCallback={() =>
                            router.push(getAbsoluteUrl(a.url))
                          }
                        />
                      </UrsorFadeIn>
                    </Stack>
                  )),
                  <Stack key="padding" minWidth="8px" />,
                ]}
              </Stack>
            </Stack>
          ),
        },
        {
          title: "Channels",
          contents: (
            <>
              <Stack overflow="scroll">
                <Stack
                  direction="row"
                  spacing="12px"
                  px={OVERALL_X_PADDING}
                  boxSizing="border-box"
                >
                  {[
                    <UrsorFadeIn key="discover" duration={800} delay={700}>
                      <Stack
                        onClick={() => {
                          setSelectedChannelId(undefined);
                          setShowDiscover(true);
                          setShowFavorites(false);
                        }}
                      >
                        <ChannelButton
                          title="AstroSafe Discover"
                          icon={TelescopeIcon}
                          selected={showDiscover}
                        />
                      </Stack>
                    </UrsorFadeIn>,
                    <UrsorFadeIn key="favorites" duration={800} delay={790}>
                      <Stack
                        onClick={() => {
                          setSelectedChannelId(undefined);
                          setShowFavorites(true);
                          setShowDiscover(false);
                        }}
                      >
                        <ChannelButton
                          title="My favorites"
                          icon={StarFillIcon}
                          selected={showFavorites}
                        />
                      </Stack>
                    </UrsorFadeIn>,
                    <Stack
                      key="line"
                      height="100%"
                      minWidth="2px"
                      bgcolor={PALETTE.secondary.grey[2]}
                    />,
                    ...channels.map((c, i) => (
                      <UrsorFadeIn
                        key={c.id}
                        duration={800}
                        delay={700 + (i + 1) * 90}
                      >
                        <Stack
                          onClick={() => {
                            setSelectedChannelId(c.id);
                            setShowFavorites(false);
                            setShowDiscover(false);
                          }}
                        >
                          <ChannelButton
                            key={c.id}
                            title={c.title}
                            color={c.color}
                            selected={selectedChannelId === c.id}
                          />
                        </Stack>
                      </UrsorFadeIn>
                    )),
                    <Stack key="padding" minWidth="8px" />,
                  ]}
                </Stack>
              </Stack>
              <Stack flex={1} overflow="scroll" px={OVERALL_X_PADDING}>
                <AstroContentColumns
                  title={
                    showDiscover
                      ? "AstroSafe Discover"
                      : showFavorites
                      ? "Favorites"
                      : channels.find((c) => c.id === selectedChannelId)
                          ?.title ?? ""
                  }
                  links={filteredLinks}
                  stacks={filteredStacks}
                  videos={[]}
                  shareSelectedStackIdWithExtension
                  emptyStateText="No Links yet."
                  mobile={props.mobile}
                />
              </Stack>
            </>
          ),
        },
      ]}
    />
  );
}

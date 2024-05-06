"use client";

import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { getImageSize } from "react-image-size";
import AstroElementFrame from "./AstroElementFrame";
import { IAstroCanvasElement } from "./Canvas";
import dynamic from "next/dynamic";
import { deNoCookiefy } from "../components/utils";

const Player = dynamic(
  () => import("@/app/components/player"),
  { ssr: false } // not including this component on server-side due to its dependence on 'document'
);

const VIDEO_WIDTH = 800;
const VIDEO_HEIGHT = 550;

export const getNewVideoPlayerDetails: (
  url: string,
  id: string,
  x: number,
  y: number
) => Promise<IAstroCanvasElement> = async (url, id, x, y) => {
  return {
    id,
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    x,
    y,
    type: "player",
    value: url,
  };
};

const extractUrl = (html: string) => html.split('src="')[1].split("?")[0];

const AstroVideoPlayer = (props: {
  selected: boolean;
  selectionCallback: () => void;
  frameChangeCallback: (
    width: number,
    height: number,
    x: number,
    y: number
  ) => void;
  details: IAstroCanvasElement;
}) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  useEffect(() => {
    props.details.value &&
      getImageSize(props.details.value).then(
        (dims) => dims && setAspectRatio(dims.width / dims.height)
      );
  }, []);

  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => setOriginalUrl(props.details.value), [props.details.value]);
  useEffect(() => {
    props.details.value &&
      setOriginalUrl(
        decodeURIComponent(props.details.value.replace("/shorts/", "/embed/"))
      );
  }, [props.details.value]);

  useEffect(() => {
    fetch(
      `https://noembed.com/embed?url=${encodeURIComponent(
        deNoCookiefy(originalUrl)
      )}`
    )
      .then((response) => response.json())
      .then((details) => {
        if (!details.html) {
          // setShowInvalidUrlView(true);
        } else if (details.error?.includes("403")) {
          // setShowForbiddenVideoView(true);
        } else {
          setUrl(deNoCookiefy(extractUrl(details.html)));
        }
      });
    // .catch(() => setShowInvalidUrlView(true));
  }, [originalUrl]);

  const [provider, zetProvider] = useState<"youtube" | "vimeo" | undefined>(
    undefined
  );
  useEffect(() => {
    url && zetProvider(url.includes("vimeo") ? "vimeo" : "youtube");
  }, [url]);
  const [playing, setPlaying] = useState<boolean>(false);
  return (
    <AstroElementFrame
      aspectRatio={aspectRatio}
      width={props.details.width}
      height={props.details.height}
      x={props.details.x}
      y={props.details.y}
      selectionCallback={props.selectionCallback}
      selected={props.selected}
      changeCallback={(width, height, x, y) => {
        props.frameChangeCallback(width, height, x, y);
      }}
    >
      <Stack
        width="100%"
        height="100%"
        sx={{
          backgroundImage: `url(${props.details.value})`,
          backgroundSize: "contain",
        }}
        position="relative"
      />
      {provider && url ? (
        <Player
          playerId="player"
          url={url}
          provider={provider}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          setDuration={(d) => null}
          // noKitemark={playerWidth < VIDEO_WIDTH}
          //setFullscreen={setFullscreen}
          playingCallback={(p) => setPlaying(p)}
          // mobile={mobile}
        />
      ) : null}
    </AstroElementFrame>
  );
};

export default AstroVideoPlayer;

"use client";

import { useEffect, useState } from "react";
import ApiController, { IBrowserLink, IChannel } from "../api";
import { useLocalStorage } from "usehooks-ts";
import { Stack } from "@mui/system";
import { Typography } from "ui";
import ChannelButton from "./ChannelButton";

const OVERALL_X_PADDING = "20px";

export default function HomePageContents() {
  const [deviceId, setDeviceId] = useLocalStorage<string | undefined>(
    "deviceId",
    "659685e649ded4f6a4e28c53"
  );

  const [channels, setChannels] = useState<IChannel[]>([]);
  useEffect(() => {
    // (deviceId
    //   ? ApiController.getLinks(deviceId)
    //   : ApiController.getGuestLinks()
    // ).then((links) => setLinks(_.reverse(links.slice())));
    // deviceId
    //   ? ApiController.getStacks(deviceId).then((stacks) => setStacks(stacks))
    //   : setStacks([]);
    (deviceId
      ? ApiController.getChannels(deviceId)
      : ApiController.getGuestChannels()
    ).then((channels) => setChannels(channels));
  }, [deviceId]);

  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    !channels.find((c) => c.id === selectedChannelId) &&
      setSelectedChannelId(channels[channels.length - 1]?.id);
  }, [channels]);

  return (
    <Stack spacing="20px" flex={1}>
      <Stack px={OVERALL_X_PADDING}>
        <Typography variant="h5">Channels</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing="12px"
        px={OVERALL_X_PADDING}
        overflow="scroll"
      >
        {channels.map((c) => (
          <ChannelButton key={c.id} title={c.title} color={c.color} />
        ))}
      </Stack>
    </Stack>
  );
}

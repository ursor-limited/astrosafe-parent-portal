import React from "react";
import { Stack } from "@mui/system";
import Fire from "@/images/Fire.png";
import Telescope from "@/images/Telescope.png";
import Rocket from "@/images/Rocket.png";
import { ContentAgeMode } from "../browserApi";
import Image from "next/image";

export interface IContentAgeModeIconProps {
  mode: ContentAgeMode;
  size: number;
}

export default function ContentAgeModeIcon(props: IContentAgeModeIconProps) {
  return (
    <Image
      height={props.size}
      width={props.size}
      src={
        props.mode === "trailblazer"
          ? Fire
          : props.mode === "explorer"
          ? Telescope
          : Rocket
      }
      alt="content age mode icon"
    />
  );
}

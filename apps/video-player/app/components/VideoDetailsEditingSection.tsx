"use client";

import { IVideo } from "@/app/components/player";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import ApiController from "@/app/api";
import ArrowUpRight from "@/images/icons/ArrowUpRight.svg";
import Pencil from "@/images/icons/Pencil.svg";
import { PALETTE, Typography, UrsorButton } from "ui";
import UrsorInputField from "./ursor-input-field";

const VideoDetailsEditingSection = (props: { details: IVideo }) => {
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    props.details?.title && setTitle(props.details.title);
  }, [props.details?.title]);

  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    props.details?.url && setUrl(props.details.url);
  }, [props.details?.url]);

  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    props.details?.description && setDescription(props.details.description);
  }, [props.details?.description]);

  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [ipAddress] = useLocalStorage<string | undefined>(
    "IPAddress",
    undefined
  );
  const [isCreator, setIsCreator] = useState<boolean>(false);
  useEffect(
    () =>
      setIsCreator(
        localStorage.getItem("IPAddress") === props.details?.creatorId
      ),
    [ipAddress, props.details?.creatorId]
  );
  const [editing, setEditing] = useState<boolean>(false);

  // const [schoolId] = useLocalStorage<string | undefined>("schoolId", undefined);
  // console.log(schoolId, "opopopopop");

  const save = () => {
    setEditing(!editing);
    editing &&
      props.details.id &&
      ApiController.updateVideo(props.details.id, { title, description });
  };

  return (
    <Stack width="100%" position="relative" overflow="visible">
      {/* {isCreator ? (
            <Stack
              position="absolute"
              left={editing ? "-80px" : "-34px"}
              top="5px"
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.6 },
                transition: "0.2s",
                svg: {
                  path: {
                    fill: PALETTE.font.light,
                  },
                },
              }}
              onClick={save}
            >
              {editing ? (
                <UrsorButton
                  mode="dark"
                  variant="secondary"
                  size="small"
                  onClick={() => null}
                >
                  Save
                </UrsorButton>
              ) : (
                <Pencil width="16px" height="16px" />
              )}
            </Stack>
          ) : null} */}
      <Stack width="100%" spacing="5px">
        <Typography bold variant="large" color={PALETTE.font.light}>
          {title}
        </Typography>
        <Stack width="100%" justifyContent="center">
          <Stack
            px="12px"
            py="8px"
            bgcolor="rgba(0,0,0,0.3)"
            borderRadius="12px"
          >
            <Typography variant="small" color="rgba(255,255,255,0.8)">
              {window.location.href}
            </Typography>
          </Stack>
        </Stack>
        {/* <UrsorButton dark variant="secondary">Share</UrsorButton> */}
        {isCreator && editing ? (
          <UrsorInputField
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            placeholder="Description"
            width="100%"
            backgroundColor={PALETTE.secondary.grey[2]}
            leftAlign
            onEnterKey={save}
          />
        ) : !description && isCreator ? (
          <Typography color="rgba(255,255,255,0.5)">
            No description yet.
          </Typography>
        ) : (
          <Typography color={PALETTE.font.light}>{description}</Typography>
        )}
        {/* {isCreator ? (
              <Stack width="100%" alignItems="flex-end">
                <div>
                  <UrsorButton
                    variant="tertiary"
                    onClick={() => setEditing(!editing)}
                    size="small"
                  >
                    {editing ? "Save" : "Edit"}
                  </UrsorButton>
                </div>
              </Stack>
            ) : null} */}
      </Stack>
      {isCreator ? (
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          pt="30px"
        >
          <Stack width="100%">
            <div>
              <UrsorButton
                variant="secondary"
                dark
                //onClick={() => navigate("/")}
                //onClick={() => { if (editing){save()} else { () => setEditing(true))}}}
                //onClick={editing ? (() => save()) : (() => setEditing(true)))}
                // onClick={() => {
                //   if (editing) {
                //     save();
                //   } else {
                //     setEditing(false);
                //   }
                // }}
                //onClick={() => setEditing(!editing)}
                onClick={() => {
                  setEditing(!editing);
                }}
                // onClick={() => {
                //   if (!editing) {
                //     console.log("ppp");
                //     player?.loadModule("captions"); // undocumented hack to turn the captions on, from https://stackoverflow.com/a/22725822/1014352
                //     // player?.setOption("captions", "track", {
                //     //   languageCode: "jp",
                //     // });
                //     player?.loadModule("cc");
                //   } else {
                //     // player.unloadModule("captions"); //Works for html5 ignored by AS3
                //     // player.unloadModule("cc"); //Works for AS3 ignored by html5
                //   }
                //   // player?.setOption("cc", "track", {
                //   //   languageCode: "jp",
                //   // });

                //   setEditing(!editing);
                // }}
                endIcon={Pencil}
              >
                {editing ? "Save" : "Edit"}
              </UrsorButton>
            </div>
          </Stack>
          <Stack
            // sx={{
            //   animation: copiedUrl ? `${fadeOut} 0.8s ease-out` : undefined,
            //   animationFillMode: "forwards",
            // }}
            position="relative"
            alignItems="center"
          >
            <Stack sx={{ opacity: copiedUrl ? 0 : 1 }}>
              <UrsorButton
                variant="tertiary"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopiedUrl(true);
                }}
                endIcon={ArrowUpRight}
              >
                Share
              </UrsorButton>
            </Stack>
            <Stack
              position="absolute"
              top="10px"
              sx={{
                pointerEvents: copiedUrl ? undefined : "none",
                opacity: copiedUrl ? 1 : 0,
                transition: "0.3s",
                //animation: `${fadeIn} 0.8s ease-out`,
              }}
            >
              <Typography
                variant="medium"
                bold
                color={PALETTE.font.light}
                noWrap
              >
                Copied URL to clipboard.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default VideoDetailsEditingSection;

import { Dialog } from "@mui/material";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import Image from "next/image";
import { useState } from "react";
import _ from "lodash";

const AVATARS: { imageUrl: string; color: string }[] = [
  {
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/pizza_icon.png",
    color: PALETTE.secondary.pink[3],
  },
  {
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/statue_icon.png",
    color: PALETTE.secondary.green[4],
  },
  {
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/ball_icon.png",
    color: PALETTE.secondary.blue[2],
  },
  {
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/leaf_icon.png",
    color: PALETTE.secondary.purple[2],
  },
  {
    imageUrl: "https://ursorassets.s3.eu-west-1.amazonaws.com/rocket_icon.png",
    color: PALETTE.secondary.orange[3],
  },
];

export const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((x) => _.capitalize(x)[0])
    ?.slice(0, 2)
    .join("");

const AvatarSelectionDialog = (props: {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
}) => {
  const [name, setName] = useState<string>("");
  const [initialsAvatar, setInitialsAvatar] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<
    number | undefined
  >();
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: 746,
          borderRadius: 32,
          padding: "32px",
          background: PALETTE.secondary.grey[1],
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack
        spacing="40px"
        justifyContent="center"
        alignItems="center"
        flex={1}
        pt="16px"
      >
        <Stack width="478px">
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Customise this profile. Who is this Browser for?
          </Typography>
        </Stack>
        <UrsorInputField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          placeholder="Write your name"
          width="335px"
          height="44px"
          backgroundColor="rgb(255,255,255)"
          paddingLeft="0"
        />
        <Stack spacing="26px">
          <Stack spacing="26px" direction="row">
            {[
              PALETTE.secondary.orange[3],
              PALETTE.secondary.blue[2],
              PALETTE.secondary.purple[2],
              PALETTE.secondary.green[4],
              PALETTE.secondary.pink[3],
            ].map((c, i) => (
              <Stack
                key={c}
                position="relative"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                  transition: "0.2s",
                  pointerEvents:
                    _.isNumber(selectedAvatarIndex) &&
                    selectedAvatarIndex === i &&
                    initialsAvatar
                      ? "none"
                      : undefined,
                }}
              >
                <Stack
                  borderRadius="100%"
                  bgcolor={c}
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                  height="90px"
                  width="90px"
                  onClick={() => {
                    setInitialsAvatar(true);
                    setColor(c);
                    setSelectedAvatarIndex(i);
                  }}
                >
                  <Typography color="rgb(255,255,255)" variant="h4">
                    {getInitials(name)}
                  </Typography>
                </Stack>
                {_.isNumber(selectedAvatarIndex) &&
                selectedAvatarIndex === i &&
                initialsAvatar ? (
                  <Stack
                    position="absolute"
                    left={0}
                    right={0}
                    top={0}
                    bottom={0}
                    margin="auto"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      minWidth="100px"
                      minHeight="100px"
                      borderRadius="100%"
                      border={`5px solid ${PALETTE.secondary.purple[1]}`}
                    />
                  </Stack>
                ) : null}
              </Stack>
            ))}
          </Stack>
          <Stack spacing="26px" direction="row">
            {AVATARS.map((a, i) => (
              <Stack
                key={i}
                position="relative"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                  transition: "0.2s",
                  pointerEvents:
                    _.isNumber(selectedAvatarIndex) &&
                    selectedAvatarIndex === i &&
                    !initialsAvatar
                      ? "none"
                      : undefined,
                }}
              >
                <Stack
                  borderRadius="100%"
                  bgcolor={a.color}
                  overflow="hidden"
                  alignItems="center"
                  justifyContent="center"
                  height="90px"
                  width="90px"
                  onClick={() => {
                    setInitialsAvatar(false);
                    setColor(a.color);
                    setImageUrl(a.imageUrl);
                    setSelectedAvatarIndex(i);
                  }}
                >
                  <Image src={a.imageUrl} height={62} width={62} alt="avatar" />
                </Stack>
                {_.isNumber(selectedAvatarIndex) &&
                selectedAvatarIndex === i &&
                !initialsAvatar ? (
                  <Stack
                    position="absolute"
                    left={0}
                    right={0}
                    top={0}
                    bottom={0}
                    margin="auto"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      minWidth="100px"
                      minHeight="100px"
                      borderRadius="100%"
                      border={`5px solid ${PALETTE.secondary.purple[1]}`}
                    />
                  </Stack>
                ) : null}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <UrsorButton
          disabled={!selectedAvatarIndex || !name}
          onClick={props.onNext}
        >
          Next
        </UrsorButton>
      </Stack>
    </Dialog>
  );
};

export default AvatarSelectionDialog;

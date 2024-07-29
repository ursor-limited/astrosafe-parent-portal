import { Dialog, Grid } from "@mui/material";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { Stack, alpha, grid } from "@mui/system";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import Image from "next/image";
import { useState } from "react";
import _ from "lodash";

const AVATAR_IMAGE_URL_BASE =
  "https://ursorassets.s3.eu-west-1.amazonaws.com/profileIcon";

const AVATAR_IMAGE_IDS = [
  4, 18, 5, 6, 7, 15, 2, 1, 3, 19, 10, 9, 8, 16, 17, 11, 12, 13, 14,
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
  isMobile?: boolean;
}) => {
  const [name, setName] = useState<string>("");
  const [initialsAvatar, setInitialsAvatar] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<
    number | undefined
  >();

  const [gridRef, setGridRef] = useState<HTMLElement | null>(null);
  const [hideGradient, setHideGradient] = useState<boolean>(false);

  const handleScroll = () => {
    if (gridRef) {
      const { scrollTop, scrollHeight, clientHeight } = gridRef;
      setHideGradient(scrollTop + clientHeight >= scrollHeight);
    }
  };

  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: 746,
          height: 602,
          borderRadius: 32,
          padding: "32px",
          paddingBottom: 0,
          background: PALETTE.secondary.grey[1],
        },
      }}
      sx={{
        py: "10px",
        ".MuiBackdrop-root": BACKDROP_STYLE,
      }}
    >
      <Stack flex={1} overflow="hidden">
        <Stack
          spacing={props.isMobile ? "28px" : "40px"}
          justifyContent="center"
          alignItems="center"
          pt="16px"
          overflow="hidden"
        >
          <Stack width="240px" height="60px">
            <Typography
              variant={props.isMobile ? "h5" : "h4"}
              sx={{ textAlign: "center" }}
            >
              Create your personal profile
            </Typography>
          </Stack>
          <UrsorInputField
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            placeholder="Write your name"
            width={props.isMobile ? "100%" : "335px"}
            height="44px"
            backgroundColor="rgb(255,255,255)"
            paddingLeft="0"
          />
          <Stack position="relative" overflow="hidden">
            <Stack
              position="absolute"
              bottom={0}
              left={0}
              height="90px"
              width="100%"
              sx={{
                opacity: hideGradient ? 0 : 1,
                transition: "0.3s",
                pointerEvents: "none",
                background: `linear-gradient(${alpha(
                  PALETTE.secondary.grey[1],
                  0
                )}, ${PALETTE.secondary.grey[1]})`,
                transform: "translateY(1px)",
              }}
              zIndex={2}
            />
            <Stack
              overflow="scroll"
              ref={setGridRef}
              onScroll={handleScroll}
              pt="10px"
            >
              <Grid gap="26px" container justifyContent="center">
                {[
                  <Stack
                    key="initials"
                    position="relative"
                    sx={{
                      cursor: "pointer",
                      "&:hover": props.isMobile ? undefined : { opacity: 0.7 },
                      transition: "0.2s",
                      pointerEvents: initialsAvatar ? "none" : undefined,
                    }}
                  >
                    <Stack
                      borderRadius="100%"
                      bgcolor={PALETTE.secondary.blue[4]}
                      overflow="hidden"
                      alignItems="center"
                      justifyContent="center"
                      height={props.isMobile ? 64 : 90}
                      width={props.isMobile ? 64 : 90}
                      onClick={() => {
                        setInitialsAvatar(true);
                        //setColor(c);
                        //setSelectedAvatarIndex(i);
                      }}
                    >
                      <Typography
                        color="rgb(255,255,255)"
                        variant={props.isMobile ? "h5" : "h4"}
                      >
                        {getInitials(name)}
                      </Typography>
                    </Stack>
                    {initialsAvatar ? (
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
                          minWidth={props.isMobile ? "70px" : "100px"}
                          minHeight={props.isMobile ? "70px" : "100px"}
                          borderRadius="100%"
                          border={`${props.isMobile ? 3 : 5}px solid ${
                            PALETTE.secondary.purple[1]
                          }`}
                        />
                      </Stack>
                    ) : null}
                  </Stack>,
                  ...AVATAR_IMAGE_IDS.map((i) => (
                    <Grid key={i} item>
                      <Stack
                        position="relative"
                        sx={{
                          cursor: "pointer",
                          "&:hover": props.isMobile
                            ? undefined
                            : { opacity: 0.7 },
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
                          overflow="hidden"
                          alignItems="center"
                          justifyContent="center"
                          height={props.isMobile ? 64 : 90}
                          width={props.isMobile ? 64 : 90}
                          onClick={() => {
                            setInitialsAvatar(false);
                            // setColor(a.color);
                            // setImageUrl(a.imageUrl);
                            setSelectedAvatarIndex(i);
                          }}
                        >
                          <Image
                            src={`${AVATAR_IMAGE_URL_BASE}${i}.png`}
                            height={props.isMobile ? 64 : 90}
                            width={props.isMobile ? 64 : 90}
                            alt="avatar"
                          />
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
                              minWidth={props.isMobile ? "70px" : "100px"}
                              minHeight={props.isMobile ? "70px" : "100px"}
                              borderRadius="100%"
                              border={`${props.isMobile ? 3 : 5}px solid ${
                                PALETTE.secondary.purple[1]
                              }`}
                            />
                          </Stack>
                        ) : null}
                      </Stack>
                    </Grid>
                  )),
                ]}
              </Grid>
            </Stack>
          </Stack>
        </Stack>
        <Stack py="24px" alignItems="center">
          <UrsorButton
            disabled={!selectedAvatarIndex || !name}
            onClick={props.onNext}
          >
            Next
          </UrsorButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AvatarSelectionDialog;

import { Stack } from "@mui/system";
import { useState } from "react";
import ChevronLeft from "@/images/icons/ChevronLeft.svg";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "ui";
import { useRouter } from "next/navigation";
import ChevronRight from "@/images/icons/ChevronRight.svg";
import { GRADIENT } from "@/app/dashboard/DashboardPageContents";

export default function InvalidUrlView(props: { mobile: boolean }) {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [invalidUrl, setInvalidUrl] = useState<boolean>(false);
  return (
    <Stack
      height="100vh"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      spacing="36px"
    >
      <Stack
        sx={{
          background: "linear-gradient(76deg, #F279C5, #FD9B41)",
          "-webkit-text-fill-color": "transparent",
          backgroundClip: "text",
          "-webkit-background-clip": "text",
        }}
      >
        <Typography variant="h1">Ooooops...</Typography>
      </Stack>
      <Stack spacing="5px" alignItems="center">
        <Typography variant="medium" bold color="rgba(255,255,255,0.65)">
          Unfortunately, we couldn’t create a video from that link!
        </Typography>
        <Typography variant="medium" bold color="rgba(255,255,255,0.65)">
          Please enter a valid Vimeo or YouTube link to create a safe video
          link.
        </Typography>
      </Stack>
      <Stack
        width="100%"
        spacing="16px"
        direction={props.mobile ? "column" : "row"}
        alignItems="center"
      >
        <UrsorInputField
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
            setInvalidUrl(false);
          }}
          placeholder="Enter Youtube or Vimeo URL"
          width="100%"
          leftAlign
          boldValue
          color={invalidUrl ? PALETTE.system.red : undefined}
        />
        <Stack
          sx={{
            opacity: inputValue ? 1 : 0.5,
            pointerEvents: inputValue ? undefined : "none",
          }}
        >
          <UrsorButton
            backgroundColor={GRADIENT}
            hoverOpacity={0.7}
            endIcon={ChevronRight}
            iconColor={PALETTE.font.light}
            onClick={async () => {
              if (await urlIsInvalid(inputValue)) {
                setInvalidUrl(true);
              } else {
                router.push(
                  `video/create?url=${encodeURIComponent(inputValue)}`
                );
              }
            }}
          >
            Create video
          </UrsorButton>
        </Stack>
      </Stack>
      <UrsorButton
        size="large"
        dark
        variant="tertiary"
        onClick={() => router.push("/video")}
        startIcon={ChevronLeft}
      >
        Back
      </UrsorButton>
      {/* <Stack direction="row" width="50%" spacing="20px">
        <UrsorInputField
          value={url}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(event.target.value)
          }
          placeholder="Paste in a YouTube or Vimeo URL"
          width="100%"
          backgroundColor={INPUT_FIELD_BACKGROUND_COLOR}
          color={INPUT_FIELD_TEXT_COLOR}
          backgroundBlur="blur(3px)"
          boldValue
          leftAlign
        />
        <Stack
          sx={{
            opacity: url ? 1 : 0.5,
            pointerEvents: url ? undefined : "none",
          }}
        >
          <UrsorButton
            dark
            variant="tertiary"
            onClick={() =>
              router.push(`/video/create?url=${encodeURIComponent(url)}`)
            }
            backgroundColor="linear-gradient(150deg, #F279C5, #FD9B41)"
            hoverOpacity={0.7}
            endIcon={ChevronRight}
            iconColor={PALETTE.font.light}
          >
            {"Let's go again"}
          </UrsorButton>
        </Stack>
      </Stack> */}
    </Stack>
  );
}

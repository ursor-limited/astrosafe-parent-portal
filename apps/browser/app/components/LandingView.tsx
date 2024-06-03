import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";

const LandingViewCard = (props: {
  title: string;
  items?: string[];
  text?: string;
  buttonCallback: () => void;
  buttonText: string;
  secondaryButton?: boolean;
  smallText?: string;
  color?: string;
  titleWidth: number;
}) => (
  <Stack
    width="321px"
    height="381px"
    borderRadius="12px"
    bgcolor={props.color}
    p="20px"
    boxSizing="border-box"
    spacing="20px"
    justifyContent="space-between"
  >
    <Stack width="100%" alignItems="center" spacing="20px">
      <Stack width={props.titleWidth} spacing="20px">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {props.title}
        </Typography>
      </Stack>
      <Stack spacing="8px" width="100%">
        {props.items?.map((item, i) => (
          <Stack
            key={i}
            direction="row"
            spacing="7px"
            alignItems="center"
            sx={{ svg: { path: { fill: PALETTE.system.green } } }}
          >
            <CheckCircleIcon height="18px" width="18px" />
            <Typography variant="small">{item}</Typography>
          </Stack>
        )) || <Typography variant="small">{props.text}</Typography>}
      </Stack>
    </Stack>

    <Stack width="100%" spacing="12px" alignItems="center">
      <Typography variant="small">{props.smallText}</Typography>
      <UrsorButton
        dark={!props.secondaryButton}
        variant={props.secondaryButton ? "secondary" : "tertiary"}
        size="large"
        width="100%"
      >
        {props.buttonText}
      </UrsorButton>
    </Stack>
  </Stack>
);

const LandingView = () => (
  <Stack
    position="absolute"
    top={0}
    left={0}
    width="100vw"
    height="100vh"
    bgcolor={PALETTE.primary.navy}
    justifyContent="center"
    alignItems="center"
  >
    <Stack direction="row" spacing="32px">
      <LandingViewCard
        title="Continue in guest mode"
        items={[
          "Block adverts on all pages",
          "Block all social media",
          "Search using our filter",
        ]}
        buttonCallback={() => null}
        buttonText="Continue as guest"
        smallText="You can upgrade later*"
        color={PALETTE.secondary.orange[1]}
        titleWidth={192}
      />
      <LandingViewCard
        title="Continue with a family or school plan"
        items={[
          "Manage with a family plan",
          "Block adverts on all pages",
          "Block all social media",
          "Search using our filter",
          "Monitor history from control app",
          "Curate their YouTube",
          "Manage your browsing filter",
        ]}
        buttonCallback={() => null}
        buttonText="Connect to a plan"
        color="#E2DDFF"
        titleWidth={250}
      />
      <LandingViewCard
        title="Don't have a family or school plan?"
        text="Follow this link and get one for secure browsing"
        buttonCallback={() => null}
        buttonText="Buy a plan"
        smallText="You can upgrade later*"
        secondaryButton
        color={PALETTE.secondary.grey[1]}
        titleWidth={230}
      />
    </Stack>
  </Stack>
);

export default LandingView;

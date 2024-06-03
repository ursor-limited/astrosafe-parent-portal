import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import CheckCircleIcon from "@/images/icons/CheckCircleIcon.svg";

const LandingViewCard = (props: {
  title: string;
  items: string[];
  buttonCallback: () => void;
  buttonText: string;
  smallText?: string;
  color?: string;
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
      <Stack width="192px" spacing="20px">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {props.title}
        </Typography>
      </Stack>
      <Stack spacing="8px" width="100%">
        {props.items.map((item, i) => (
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
        ))}
      </Stack>
    </Stack>

    <Stack width="100%" spacing="12px" alignItems="center">
      <Typography variant="small">{props.smallText}</Typography>
      <UrsorButton dark variant="tertiary" size="large" width="100%">
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
      />
    </Stack>
  </Stack>
);

export default LandingView;

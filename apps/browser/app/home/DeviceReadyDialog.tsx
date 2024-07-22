import { Dialog } from "@mui/material";
import { BACKDROP_STYLE } from "../components/UrsorDialog";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "ui";
import VideoCameraIcon from "@/images/icons/VideoCameraIcon.svg";
import ClockIcon from "@/images/icons/ClockIcon.svg";
import GlobeIcon from "@/images/icons/GlobeIcon.svg";
import ShieldLockIcon from "@/images/icons/ShieldLockIcon.svg";

const DeviceReadyDialogValueCard = (props: {
  color: string;
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <Stack
    height="81px"
    width="141px"
    borderRadius="12px"
    border={`2px solid ${props.color}`}
    alignItems="center"
    justifyContent="center"
    bgcolor="rgb(255,255,255)"
    spacing="8px"
    sx={{
      svg: {
        path: {
          fill: props.color,
        },
      },
    }}
  >
    <props.icon width="20px" height="20px" />
    <Stack alignItems="center">
      <Typography variant="small" bold color={props.color}>
        999+
      </Typography>
      <Typography variant="tiny" bold color={props.color}>
        {props.text}
      </Typography>
    </Stack>
  </Stack>
);

const DeviceReadyDialog = (props: { open: boolean; onClose: () => void }) => {
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: 746,
          maxWidth: "90%",
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
        spacing="30px"
        justifyContent="center"
        alignItems="center"
        flex={1}
        pt="16px"
      >
        <Stack spacing="12px" justifyContent="center" alignItems="center">
          <Stack width="380px" spacing="5px" alignItems="center">
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              The Safe Browser for
            </Typography>
            <Stack direction="row" alignItems="center" spacing="8px">
              <Stack
                sx={{
                  background: `linear-gradient(180deg, ${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
                  "-webkit-text-fill-color": "transparent",
                  backgroundClip: "text",
                  "-webkit-background-clip": "text",
                }}
              >
                <Typography variant="h4">Alex</Typography>
              </Stack>
              <Typography variant="h4">is ready!</Typography>
            </Stack>
          </Stack>
          <Stack width="240px">
            <Typography variant="small" sx={{ textAlign: "center" }}>
              We've added curated Content that Alex will surely enjoy.
            </Typography>
          </Stack>
          <Stack direction="row" spacing="12px" pt="12px">
            <DeviceReadyDialogValueCard
              text="Links"
              color={PALETTE.secondary.orange[3]}
              icon={GlobeIcon}
            />
            <DeviceReadyDialogValueCard
              text="Videos"
              color={PALETTE.secondary.purple[2]}
              icon={VideoCameraIcon}
            />
            <DeviceReadyDialogValueCard
              text="Time limit"
              color={PALETTE.secondary.green[4]}
              icon={ClockIcon}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing="20px" width="100%">
          <Stack
            borderRadius="20px"
            border={`2px solid ${PALETTE.secondary.grey[2]}`}
            justifyContent="center"
            alignItems="center"
            spacing="24px"
            p="32px"
            bgcolor="rgb(255,255,255)"
            width="100%"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.purple[2],
                },
              },
            }}
          >
            <Stack>
              <GlobeIcon height="35px" width="35px" />
            </Stack>
            <Stack width="251px">
              <Typography bold variant="h5" sx={{ textAlign: "center" }}>
                Try out the browser and set up later
              </Typography>
            </Stack>
            <Stack width="251px">
              <Typography
                bold
                variant="small"
                color={PALETTE.secondary.grey[4]}
                sx={{ textAlign: "center" }}
              >
                Let your child enjoy the browser; connect the portal later.
              </Typography>
            </Stack>
            <UrsorButton variant="secondary" onClick={props.onClose}>
              Stay in kids' Browser
            </UrsorButton>
          </Stack>
          <Stack
            borderRadius="20px"
            border={`2px solid ${PALETTE.secondary.purple[2]}`}
            justifyContent="center"
            alignItems="center"
            spacing="24px"
            p="32px"
            bgcolor="rgb(255,255,255)"
            width="100%"
            sx={{
              svg: {
                path: {
                  fill: PALETTE.secondary.purple[2],
                },
              },
            }}
          >
            <Stack>
              <ShieldLockIcon height="35px" width="35px" />
            </Stack>
            <Stack width="251px">
              <Typography bold variant="h5" sx={{ textAlign: "center" }}>
                Finish your secure parental setup
              </Typography>
            </Stack>
            <Stack width="280px">
              <Typography
                bold
                variant="small"
                color={PALETTE.secondary.grey[4]}
                sx={{ textAlign: "center" }}
              >
                Learn more about monitoring, setting filters and adding your own
                content
              </Typography>
            </Stack>
            <UrsorButton dark variant="tertiary">
              Go to Parental Controls
            </UrsorButton>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default DeviceReadyDialog;

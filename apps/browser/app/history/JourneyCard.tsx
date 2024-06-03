import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IJourney } from "./HistoryPageContents";
import Image from "next/image";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import dayjs from "dayjs";

const JourneyCard = (props: { journey: IJourney }) => (
  <Stack
    borderRadius="12px"
    p="12px"
    spacing="12px"
    bgcolor={PALETTE.secondary.grey[1]}
  >
    <Stack
      direction="row"
      spacing="10px"
      alignItems="center"
      sx={{ svg: { path: { fill: PALETTE.secondary.orange[3] } } }}
    >
      <SearchIcon width="16px" height="16px" />
      <Typography bold>{props.journey.title}</Typography>
    </Stack>
    <Stack spacing="12px" pl="26px">
      {props.journey.urls.map((x, i) => (
        <Stack key={i} direction="row" spacing="24px" alignItems="center">
          <Stack width="70px">
            <Typography bold color={PALETTE.secondary.grey[3]}>
              {dayjs(x.timestamp).format("HH:mm a")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="12px" alignItems="center">
            <Stack
              minWidth="17px"
              minHeight="17px"
              borderRadius="100%"
              overflow="hidden"
              spacing="10px"
            >
              {x.favIconUrl ? (
                <div
                  style={{
                    position: "relative",
                    height: "17px",
                    width: "17px",
                    borderRadius: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={x.favIconUrl}
                    style={{ objectFit: "cover" }}
                    fill
                    alt="domain favicon"
                  />
                </div>
              ) : null}
            </Stack>
            <Stack direction="row" spacing="5px">
              <Typography bold>{x.title}</Typography>
              <Typography bold color={PALETTE.secondary.grey[3]}>
                {`- ${x.domain}`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default JourneyCard;

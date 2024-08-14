import { Stack } from "@mui/system";
import { PALETTE, Typography } from "ui";
import { IJourney } from "./HistoryPageContents_legacy";
import Image from "next/image";
import SearchIcon from "@/images/icons/SearchIcon.svg";
import dayjs from "dayjs";

const JourneyCard = (props: { journey: IJourney; mobile?: boolean }) => (
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
          {!props.mobile ? (
            <Stack width="70px">
              <Typography bold color={PALETTE.secondary.grey[3]}>
                {dayjs(x.timestamp).format("hh:mm a")}
              </Typography>
            </Stack>
          ) : null}

          <Stack direction="row" spacing="12px" alignItems="center">
            <Stack spacing="4px">
              <Stack
                width={props.mobile ? "32px" : "17px"}
                height={props.mobile ? "32px" : "17px"}
                borderRadius="100%"
                overflow="hidden"
                spacing="10px"
              >
                {x.favIconUrl ? (
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
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
            </Stack>

            <Stack>
              <Stack direction="row" spacing="5px">
                <Typography bold>{x.title}</Typography>
                {!props.mobile ? (
                  <Typography bold color={PALETTE.secondary.grey[3]}>
                    {`- ${x.domain}`}
                  </Typography>
                ) : null}
              </Stack>
              {props.mobile ? (
                <Stack direction="row" spacing="6px">
                  <Typography
                    bold
                    color={PALETTE.secondary.grey[3]}
                    variant="tiny"
                  >
                    {dayjs(x.timestamp).format("hh:mm a")}
                  </Typography>
                  <Typography
                    bold
                    color={PALETTE.secondary.grey[4]}
                    variant="tiny"
                  >
                    {`- ${x.domain}`}
                  </Typography>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default JourneyCard;

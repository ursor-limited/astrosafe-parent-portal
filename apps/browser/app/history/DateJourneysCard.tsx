import { Stack } from "@mui/system";
import JourneyCard from "./JourneyCard";
import { IJourney, getIsToday, getIsYesterday } from "./HistoryPageContents";
import HistoryIcon from "@/images/icons/HistoryIcon.svg";
import dayjs from "dayjs";
import { Typography } from "ui";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);

const DateJourneysCard = (props: { date: string; journeys: IJourney[] }) => (
  <Stack p="20px" borderRadius="20px" bgcolor="rgb(255,255,255)" spacing="20px">
    <Stack direction="row" spacing="8px" alignItems="center">
      <HistoryIcon width="20px" height="20px" />
      <Stack direction="row" spacing="5px">
        {dayjs().diff(props.date, "days") < 8 ? (
          <Typography bold>
            {getIsToday(props.date)
              ? "Today"
              : getIsYesterday(props.date)
              ? "Yesterday"
              : `${dayjs(props.date).format("dddd")}`}
          </Typography>
        ) : (
          <Typography bold>{dayjs(props.date).format("Do MMMM")}</Typography>
        )}
      </Stack>
    </Stack>

    {props.journeys.map((journey, i) => (
      <JourneyCard key={i} journey={journey} />
    ))}
  </Stack>
);

export default DateJourneysCard;

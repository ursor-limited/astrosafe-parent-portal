import { Stack } from "@mui/system";
import moment from "moment";
import { PALETTE, Typography, UrsorButton } from "ui";

const BigCard = (props: {
  rightStuff: React.ReactNode;
  title: string;
  createdAt?: string;
  children: React.ReactNode;
}) => (
  <Stack
    width="100%"
    alignItems="center"
    justifyContent="center"
    spacing="100px"
    p="40px"
  >
    <Stack
      position="relative"
      width="83%"
      pb="24px"
      borderRadius="16px"
      bgcolor={PALETTE.secondary.grey[1]}
    >
      <Stack spacing="50px" width="100%">
        <Stack
          direction="row"
          px="24px"
          pt="24px"
          justifyContent="space-between"
        >
          <Stack />
          {props.rightStuff}
        </Stack>
        <Stack spacing="32px" px="24px">
          <Stack spacing="4px">
            {props.createdAt ? (
              <Typography>
                {moment(props.createdAt).format("Do MMMM YYYY")}
              </Typography>
            ) : null}
            <Typography variant="h2">{props.title}</Typography>
          </Stack>
          <Typography>
            In this session we will be practising our division skills! Watch the
            videos on long division and decimal places to understand how
            division works. Then get stuck in with the activities on Fun Brain
            and Google Experiments!
          </Typography>
        </Stack>
      </Stack>
      {props.children}
    </Stack>
  </Stack>
);

export default BigCard;

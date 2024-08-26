import { Stack } from "@mui/system";
import Image from "next/image";
import { PALETTE, Typography } from "@/ui";
import PeopleIcon from "@/images/icons/PeopleIcon.svg";
import { IDevice } from "../contents/common";

const ProfileImageRow = (props: {
  imageUrls: IDevice["profileAvatarUrl"][];
  deviceCount: number;
}) => (
  <Stack direction="row" spacing="4px" height="42px">
    {props.imageUrls.length > 0 ? (
      <>
        <Stack direction="row" spacing="36px">
          {props.imageUrls.slice(0, 3).map((url, i) => (
            <Stack key={i} width={0} position="relative" overflow="visible">
              <Stack position="absolute" bottom={0} left={0}>
                <Stack
                  borderRadius="100%"
                  overflow="hidden"
                  boxShadow="0 0 16px rgba(0,0,0,0.1)"
                >
                  <Image src={url} width={42} height={42} alt="profile image" />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
        {props.deviceCount > 3 ? (
          <Stack
            height="63px"
            direction="row"
            spacing="4px"
            alignItems="center"
            sx={{
              transform: "translate(48px, -10px)",
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
          >
            <Typography
              variant="small"
              bold
              color={PALETTE.secondary.grey[4]}
            >{`+${props.deviceCount - 3}`}</Typography>
            <PeopleIcon height="12px" width="12px" />
          </Stack>
        ) : null}
      </>
    ) : (
      <Stack direction="row" spacing="6px" height="42px" alignItems="center">
        <Stack
          bgcolor={PALETTE.secondary.grey[2]}
          width="42px"
          height="42px"
          overflow="hidden"
          borderRadius="100%"
        />
        <Typography variant="small" bold color={PALETTE.secondary.grey[3]}>
          No Devices yet
        </Typography>
      </Stack>
    )}
  </Stack>
);

export default ProfileImageRow;

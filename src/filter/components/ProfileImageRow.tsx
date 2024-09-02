import { Stack } from '@mui/system';

import { PALETTE, Typography } from './../../ui';
import PeopleIcon from './../../images/PeopleIcon.svg';
import { IDevice } from '../contents/common';
import { getInitials } from './../../account/contents/common';

const ProfileImageRow = (props: {
  devices: {
    name: IDevice['name'];
    profileAvatarUrl: IDevice['profileAvatarUrl'];
  }[];
  totalDeviceCount: number;
}) => (
  <Stack direction="row" spacing="4px" height="42px">
    {props.devices.length > 0 ? (
      <>
        <Stack direction="row" spacing="36px">
          {props.devices.slice(0, 3).map((d, i) => (
            <Stack key={i} width={0} position="relative" overflow="visible">
              <Stack position="absolute" bottom={0} left={0}>
                <Stack
                  borderRadius="100%"
                  overflow="hidden"
                  boxShadow="0 0 12px rgba(0,0,0,0.14)"
                  minWidth={42}
                  minHeight={42}
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={PALETTE.secondary.blue[2]}
                >
                  {d.profileAvatarUrl ? (
                    <img
                      src={d.profileAvatarUrl}
                      height={42}
                      width={42}
                      alt="profile image"
                    />
                  ) : (
                    <Typography color="rgb(255,255,255)" bold>
                      {getInitials(d.name)}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
        {props.totalDeviceCount > 3 ? (
          <Stack
            height="63px"
            direction="row"
            spacing="4px"
            alignItems="center"
            sx={{
              transform: 'translate(48px, -10px)',
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
            >{`+${props.totalDeviceCount - 3}`}</Typography>
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

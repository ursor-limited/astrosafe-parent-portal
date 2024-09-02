import { Stack } from '@mui/system';
import { IDevice } from '../filter/contents/common';
import DynamicCardGrid from './DynamicCardGrid';
import UrsorFadeIn from './UrsorFadeIn';
import XIcon from './../images/X.svg';
import PlusIcon from './../images/PlusIcon.svg';
import { BACKDROP_STYLE, BORDER_RADIUS } from './UrsorDialog';
import { Dialog } from '@mui/material';
import { Typography, UrsorButton } from './../ui';
import { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import DeviceCard from '../profiles/components/DeviceCard';
import InfoButton from './InfoButton';
import { INFOS } from '../profile/components/ProfilePageTabLayout';

const AllDevicesDialog = (props: {
  title: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  onRemove?: (id: IDevice['id']) => void;
  devices: IDevice[];
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
  useEffect(
    () =>
      setFilteredDevices(
        props.devices.filter((d) =>
          d.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [props.devices, searchValue]
  );
  return (
    <Dialog
      transitionDuration={800}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          maxWidth: 1308,
          width: '70%',
          maxHeight: 726,
          height: '70%',
          borderRadius: BORDER_RADIUS,
          margin: '20px',
          padding: '32px',
        },
      }}
      sx={{
        py: '10px',
        '.MuiBackdrop-root': BACKDROP_STYLE,
      }}
    >
      <Stack spacing="32px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing="8px">
            <Typography variant="h5">{props.title}</Typography>
            <InfoButton {...INFOS.folderDevice} />
          </Stack>
          <Stack direction="row" spacing="12px" alignItems="center">
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
              onClick={props.onAdd}
            >
              Add Device
            </UrsorButton>
            <SearchInput
              value={searchValue}
              callback={setSearchValue}
              clearCallback={() => setSearchValue('')}
              grey
            />
          </Stack>
        </Stack>
        <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
          {filteredDevices.map((d, i) => (
            <UrsorFadeIn key={i} duration={800} delay={i * 150}>
              <DeviceCard
                {...d}
                button={
                  props.onRemove ? (
                    <Stack onClick={() => props.onRemove!(d.id)}>
                      <XIcon height={16} width={16} />
                    </Stack>
                  ) : undefined
                }
                hideToggles
                noExtras
              />
            </UrsorFadeIn>
          ))}
        </DynamicCardGrid>
      </Stack>
    </Dialog>
  );
};

export default AllDevicesDialog;

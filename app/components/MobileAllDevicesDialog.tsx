import { Stack } from '@mui/system';
import { IDevice } from '../filters/[id]/contents/common';
import UrsorFadeIn from './UrsorFadeIn';
import XIcon from '@/images/icons/X.svg';
import PlusIcon from '@/images/icons/PlusIcon.svg';
import { BACKDROP_STYLE, BORDER_RADIUS } from './UrsorDialog';
import { Dialog } from '@mui/material';
import { Typography, UrsorButton } from '@/ui';
import { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import MobileDeviceCard from '../profiles/components/MobileDeviceCard';
import DynamicCardGrid from './DynamicCardGrid';

const MobileAllDevicesDialog = (props: {
  title: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  onRemove: (id: IDevice['id']) => void;
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
          maxWidth: '90%',
          width: '90%',
          height: '70%',
          borderRadius: BORDER_RADIUS,
          margin: '20px',
          padding: '24px',
        },
      }}
      sx={{
        py: '10px',
        '.MuiBackdrop-root': BACKDROP_STYLE,
      }}
    >
      <Stack spacing="32px" flex={1}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing="12px"
        >
          <Stack direction="row">
            <Typography variant="large" bold>
              {props.title}
            </Typography>
            <Stack
              width="40px"
              alignItems="flex-end"
              pt="3px"
              onClick={props.onClose}
            >
              <XIcon height="22px" width="22px" />
            </Stack>
          </Stack>
          <SearchInput
            value={searchValue}
            callback={setSearchValue}
            clearCallback={() => setSearchValue('')}
            grey
            fullWidth
            iconSize="18px"
          />
        </Stack>
        <DynamicCardGrid cardWidth="150px" columnGap="12px" rowGap="12px">
          {filteredDevices.map((d, i) => (
            <UrsorFadeIn key={i} duration={800} delay={i * 150}>
              <MobileDeviceCard
                {...d}
                button={
                  <Stack onClick={() => props.onRemove(d.id)}>
                    <XIcon height={16} width={16} />
                  </Stack>
                }
                noExtras
              />
            </UrsorFadeIn>
          ))}
        </DynamicCardGrid>
      </Stack>
      <UrsorButton
        dark
        variant="tertiary"
        onClick={props.onAdd}
        width="100%"
        endIcon={PlusIcon}
      >
        Add Device
      </UrsorButton>
    </Dialog>
  );
};

export default MobileAllDevicesDialog;

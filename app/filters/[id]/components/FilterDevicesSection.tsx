import DynamicCardGrid from '@/components/DynamicCardGrid';
import { AstroBentoCard } from './AstroBentoCard';
import ChevronRightIcon from '@/images/icons/ChevronRight.svg';
import PlusIcon from '@/images/icons/PlusIcon.svg';
import XIcon from '@/images/icons/X.svg';
import { Stack } from '@mui/system';
import { PALETTE, Typography, UrsorButton } from '@/ui';
import _ from 'lodash';
import { IDevice } from '../contents/common';
import UrsorFadeIn from '@/components/UrsorFadeIn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AllDevicesDialog from '@/components/AllDevicesDialog';
import DeviceCard from '@/profiles/components/DeviceCard';
import { INFOS } from '@/profiles/[id]/components/ProfilePageTabLayout';

const FilterPageDevicesSection = (props: {
  devices: IDevice[];
  onAdd: () => void;
  onRemove: () => void;
  openChangeFilterDialogForDevice: (device: IDevice) => void;
}) => {
  const navigate = useNavigate();
  const [hoveringOnButton, setHoveringOnButton] = useState<boolean>(false);
  const [devicesGridDialogOpen, setDevicesGridDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <AstroBentoCard
        title={
          props.devices.length === 0
            ? 'No Devices yet have this Filter applied'
            : props.devices.length === 1
            ? 'Filter applied to this Device'
            : `Filter applied to these ${props.devices.length ?? 0} Devices`
        }
        info={INFOS.filterDevice}
        notCollapsible
        topRightStuff={
          <Stack direction="row" spacing="12px">
            <UrsorButton
              size="small"
              variant="secondary"
              endIcon={ChevronRightIcon}
              iconSize={16}
              onClick={() => setDevicesGridDialogOpen(true)}
            >
              View all
            </UrsorButton>
            <UrsorButton
              dark
              variant="tertiary"
              size="small"
              endIcon={PlusIcon}
              iconSize={16}
              onClick={props.onAdd}
            >
              Add Device
            </UrsorButton>
          </Stack>
        }
      >
        {props.devices.length > 0 ? (
          <DynamicCardGrid cardWidth="292px" rowGap="8px" columnGap="20px">
            {props.devices.map((d, i) => (
              <UrsorFadeIn key={i} duration={800} delay={i * 150}>
                <Stack
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.7 },
                    transition: '0.2s',
                  }}
                >
                  <DeviceCard
                    {...d}
                    button={
                      <Stack
                        onClick={() => props.openChangeFilterDialogForDevice(d)}
                      >
                        <XIcon height={16} width={16} />
                      </Stack>
                    }
                    noExtras
                    onClick={() => navigate(`/profiles/${d.id}`)}
                  />
                </Stack>
              </UrsorFadeIn>
            ))}
          </DynamicCardGrid>
        ) : (
          <Stack
            height="90px"
            spacing="1px"
            borderRadius="8px"
            border={`1px solid ${PALETTE.secondary.grey[2]}`}
            justifyContent="center"
            alignItems="center"
            bgcolor={
              hoveringOnButton ? PALETTE.secondary.grey[1] : 'rgb(255,255,255)'
            }
            sx={{
              transition: '0.2s',
              cursor: 'pointer',
              svg: {
                path: {
                  fill: PALETTE.secondary.grey[4],
                },
              },
            }}
            onMouseEnter={() => setHoveringOnButton(true)}
            onMouseLeave={() => setHoveringOnButton(false)}
            onClick={props.onAdd}
          >
            <PlusIcon height="32px" width="32px" />
            <Typography
              bold
              color={PALETTE.secondary.grey[hoveringOnButton ? 4 : 3]}
            >
              Add a Device
            </Typography>
          </Stack>
        )}
      </AstroBentoCard>
      <AllDevicesDialog
        title={`${props.devices.length} ${
          props.devices.length === 1 ? 'Device has' : 'Devices have'
        } this Filter applied`}
        devices={props.devices.slice(0, 4)}
        open={devicesGridDialogOpen}
        onClose={() => setDevicesGridDialogOpen(false)}
        onAdd={props.onAdd}
        onRemove={(id) => {
          const device = props.devices.find((d) => d.id === id);
          device && props.openChangeFilterDialogForDevice(device);
        }}
      />
    </>
  );
};

export default FilterPageDevicesSection;

import ApiController from '@/app/api';
import { SearchInput } from '@/app/components/SearchInput';
import UrsorDialog from '@/app/components/UrsorDialog';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { PALETTE, Typography } from '@/ui';
import { IGroup } from '../contents/common';
import { IDevice } from '@/app/filters/[id]/contents/common';

const AddDeviceDialog = (props: {
  title: string;
  subtitle: string[];
  emptyText: string;
  open: boolean;
  onClose: () => void;
  onAdd: (id: IDevice['id']) => void;
  addedDevices: IDevice[];
  groupId: IGroup['id'];
  isMobile?: boolean;
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [allDevices, setAllDevices] = useState<IDevice[]>([]);
  useEffect(() => {
    props.groupId &&
      ApiController.getGroupEnrichedDevices(props.groupId).then((d) =>
        setAllDevices(d)
      );
  }, [props.groupId]);

  const [nonAddedDevices, setNonAddedDevices] = useState<IDevice[]>([]);
  useEffect(
    () =>
      setNonAddedDevices(
        allDevices.filter(
          (d) => !props.addedDevices.find((device) => device.id === d.id)
        )
      ),
    [allDevices, props.addedDevices]
  );

  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
  useEffect(
    () =>
      setFilteredDevices(
        nonAddedDevices.filter(
          (d) =>
            !searchValue ||
            d.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      ),
    [nonAddedDevices, searchValue]
  );
  return (
    <UrsorDialog
      open={props.open}
      onCloseCallback={props.onClose}
      title={props.title}
      subtitle={props.subtitle}
      width="434px"
      height={props.isMobile ? '76%' : undefined}
      isMobile={props.isMobile}
    >
      <SearchInput
        value={searchValue}
        callback={setSearchValue}
        clearCallback={() => setSearchValue('')}
        fullWidth
        iconSize="18px"
        grey
      />
      {nonAddedDevices.length === 0 ? (
        <Stack flex={1} justifyContent="center" width="66%">
          <Typography
            color={PALETTE.secondary.grey[3]}
            bold
            sx={{ textAlign: 'center' }}
          >
            {props.emptyText}
          </Typography>
        </Stack>
      ) : (
        <Stack pt="16px" spacing="16px" width="100%">
          {filteredDevices.map((d) => (
            <Stack
              key={d.id}
              direction="row"
              spacing="8px"
              px="8px"
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.7 },
              }}
              onClick={() => props.onAdd(d.id)}
            >
              <Stack
                borderRadius="100%"
                overflow="hidden"
                minWidth={23}
                minHeight={23}
                bgcolor={PALETTE.secondary.blue[2]}
              >
                {d.profileAvatarUrl ? (
                  <img
                    src={d.profileAvatarUrl}
                    height={23}
                    width={23}
                    alt="avatar"
                  />
                ) : null}
              </Stack>
              <Typography maxLines={1} bold>
                {d.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </UrsorDialog>
  );
};

export default AddDeviceDialog;

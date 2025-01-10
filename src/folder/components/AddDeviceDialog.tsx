import ApiController from './../../api'
import { SearchInput } from './../../components/SearchInput'
import UrsorDialog from './../../components/UrsorDialog'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { PALETTE, Typography } from './../../ui'
import { IGroup } from '../contents/common'
import { IDevice } from './../../filter/contents/common'

const AddDeviceDialog = ({
  title,
  subtitle,
  emptyText,
  open,
  onClose,
  onAdd,
  addedDevices,
  groupId,
  isMobile,
  isProd = false,
}: {
  title: string
  subtitle: string[]
  emptyText: string
  open: boolean
  onClose: () => any
  onAdd: (id: IDevice['id']) => any
  addedDevices: IDevice[]
  groupId: IGroup['id']
  isMobile?: boolean
  isProd: boolean
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [allDevices, setAllDevices] = useState<IDevice[]>([])
  useEffect(() => {
    groupId &&
      new ApiController(isProd)
        .getGroupEnrichedDevices(groupId)
        .then((d) => setAllDevices(d))
  }, [groupId])

  const [nonAddedDevices, setNonAddedDevices] = useState<IDevice[]>([])
  useEffect(
    () =>
      setNonAddedDevices(
        allDevices.filter(
          (d) => !addedDevices.find((device) => device.id === d.id)
        )
      ),
    [allDevices, addedDevices]
  )

  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([])
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
  )
  return (
    <UrsorDialog
      open={open}
      onCloseCallback={onClose}
      title={title}
      subtitle={subtitle}
      width="434px"
      height={isMobile ? '76%' : undefined}
      isMobile={isMobile}
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
            {emptyText}
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
              onClick={() => onAdd(d.id)}
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
  )
}

export default AddDeviceDialog

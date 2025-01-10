import React from 'react'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { PALETTE, Typography } from './../../ui'
import { IFilter } from '../../astrosafe/components/filters/AllFilters'
import { IGroup } from '../../folder/contents/common'
import ApiController from '../../api'
import UrsorDialog from '../../components/UrsorDialog'
import { IDevice } from '../contents/common'
import { ReactComponent as FilterIcon } from './../../images/FilterIcon.svg'

interface ChangeFilterDialogProps {
  open: boolean
  onClose: () => any
  submitChange: (id: IFilter['id']) => any
  currentFilterId: IFilter['id']
  groupId: IGroup['id']
  isMobile?: boolean
  deviceName: IDevice['name']
  isProd: boolean
}

const ChangeFilterDialog: React.FC<ChangeFilterDialogProps> = ({
  open,
  onClose,
  submitChange,
  currentFilterId,
  groupId,
  isMobile,
  deviceName,
  isProd,
}) => {
  const [allFilters, setAllFilters] = useState<IFilter[]>([])

  useEffect(() => {
    new ApiController(isProd)
      .getGroupFilters(groupId)
      .then((d) => setAllFilters(d))
  }, [groupId])

  return (
    <UrsorDialog
      open={open}
      onCloseCallback={onClose}
      title="Change Filter"
      subtitle={['Change the Filter of', deviceName]}
      width="434px"
      dynamicHeight
      isMobile={isMobile}
    >
      <Stack pt="16px" spacing="16px" width="100%">
        {allFilters
          .filter((f) => f.id !== currentFilterId)
          .map((f) => (
            <Stack
              key={f.id}
              direction="row"
              spacing="8px"
              px="8px"
              sx={{
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.7 },
                svg: {
                  path: {
                    fill: PALETTE.secondary.orange[3],
                  },
                },
              }}
              onClick={() => {
                submitChange(f.id)
                onClose()
              }}
              alignItems="center"
            >
              <FilterIcon height="16px" width="16px" />
              <Typography maxLines={1} bold>
                {f.title}
              </Typography>
            </Stack>
          ))}
      </Stack>
    </UrsorDialog>
  )
}

export default ChangeFilterDialog

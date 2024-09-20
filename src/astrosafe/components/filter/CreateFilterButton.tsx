import React, { useState } from 'react'
import { UrsorButton } from '../../../ui'
import { ReactComponent as PlusIcon } from '../../../images/PlugIcon.svg'
import FilterCreationDialog from '../../../filter/components/FilterCreationDialog'
import ApiController from '../../../api'
import { IFilter } from '../filters/AllFilters'
import useAuth from '../../../hooks/useAuth'
import { isMobile } from 'react-device-detect'

interface CreateFilterButtonProps {
  email: string
  onCreateFilter: (filter: IFilter) => {}
}

const CreateFilterButton: React.FC<CreateFilterButtonProps> = ({
  email,
  onCreateFilter = (filter: IFilter) => {},
}) => {
  const [filterCreationDialogOpen, setFilterCreationDialogOpen] =
    useState<boolean>(false)

  const { user } = useAuth(email)

  return (
    <>
      <UrsorButton
        dark
        variant="tertiary"
        size="small"
        endIcon={PlusIcon}
        onClick={() => setFilterCreationDialogOpen(true)}
      >
        Add a Filter
      </UrsorButton>

      <FilterCreationDialog
        open={filterCreationDialogOpen}
        onClose={() => setFilterCreationDialogOpen(false)}
        onSubmit={(title: IFilter['title']) =>
          user?.group_id &&
          ApiController.createFilter(user.group_id, title).then((f) =>
            onCreateFilter(f)
          )
        }
        isMobile={isMobile}
      />
    </>
  )
}

export default CreateFilterButton

'use client'

import React, { useEffect, useState } from 'react'
import AllFiltersPageDesktopBody from './body-desktop'
import AllFiltersPageMobileBody from './body-mobile'
import ApiController from '../../api'

import FilterCreationDialog from '../../filter/components/FilterCreationDialog'
import { IDevice } from '../../filter/contents/common'
import _ from 'lodash'
import useAuth from '../../hooks/useAuth'

export interface IFilterCategory {
  id: number
  categoryId: number
  title: string
  permanentlyBlocked: boolean
  subCategories: IFilterSubcategory[]
}

export interface IFilterSubcategory {
  id: number
  categoryId: IFilterCategory['id']
  title: string
}

export interface IFilterUrl {
  id: number
  url: string
  title: string
  imageUrl: string
  createdAt: string
  groupId: number
}

export interface IFilterDomain {
  id: number
  domain: string
  title: string
  faviconUrl: string
  urls: IFilterUrl[]
}

export interface IFilterBlacklistedWord {
  id: number
  word: string
}

export interface IFilter {
  id: number
  title: string
  filterWordBlacklist: IFilterBlacklistedWord[]
  filterCategoryWhitelist: IFilterSubcategory[]
  allowedSiteExceptions: IFilterUrl[]
  blockedSiteExceptions: IFilterUrl[]
  official: boolean
  groupId: number
}

export interface IGroupFilter {
  id: IFilter['id']
  title: IFilter['title']
  official: IFilter['official']
  devices: {
    profileAvatarUrl: IDevice['profileAvatarUrl']
    name: IDevice['name']
  }[]
  totalDeviceCount: number
  whitelistedCategories: number
  blacklistedWords: number
}

interface AllFiltersPageProps {
  email: string
  isMobile: boolean
  isProd: boolean
}

const AllFiltersPage: React.FC<AllFiltersPageProps> = ({
  email,
  isMobile,
  isProd = false,
}) => {
  const { user } = useAuth(email, isProd)

  const [filters, setFilters] = useState<IGroupFilter[]>([])

  useEffect(() => {
    user?.group_id &&
      new ApiController(isProd)
        .getGroupFilters(user.group_id)
        .then((filtahs) => setFilters(_.sortBy(filtahs, (f) => f.id)))
  }, [user?.group_id])

  const [filterCreationDialogOpen, setFilterCreationDialogOpen] =
    useState<boolean>(false)

  return (
    <>
      {isMobile ? (
        <AllFiltersPageMobileBody
          filters={filters}
          setCreateFilterDialogOpen={() => setFilterCreationDialogOpen(true)}
        />
      ) : (
        <AllFiltersPageDesktopBody
          filters={filters}
          setCreateFilterDialogOpen={() => setFilterCreationDialogOpen(true)}
        />
      )}
      <FilterCreationDialog
        open={filterCreationDialogOpen}
        onClose={() => setFilterCreationDialogOpen(false)}
        onSubmit={() => {
          console.log('submitted')
        }}
        isMobile={isMobile}
      />
    </>
  )
}

export default AllFiltersPage

import React from 'react'
import { AstroContent } from '../../profile/components/ContentTab'
import { IFilterUrl } from '../../filters/contents/common'
import { IInfoButtonProps } from '../../components/InfoButton'
export interface IContentCreationDialogProps {
  open: boolean
  type: AstroContent
  title: IFilterUrl['title']
  setTitle: (title: IFilterUrl['title']) => void
  info?: IInfoButtonProps
  url: IFilterUrl['url']
  setUrl: (url: IFilterUrl['url']) => void
  onUrlFieldBlur?: () => void
  closeCallback: () => void
  onSubmit?: () => void
  editing?: boolean
  buttonDisabled?: boolean
  extraBottomElement?: React.ReactNode
  children?: React.ReactNode
}
export default function ContentCreationDialog(
  props: IContentCreationDialogProps
): import('react/jsx-runtime').JSX.Element

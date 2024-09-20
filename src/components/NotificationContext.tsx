import React, { createContext } from 'react'
import { NotificationType } from './NotificationProvider'

export interface INotificationProviderProps {
  children: React.ReactNode
}

export interface INotificationContext {
  message: string | null
  type: NotificationType | null
  success: (message: string) => any
  negativeSuccess: (message: string) => any
  error: (message: string) => any
}

const NotificationContext = createContext<INotificationContext>({
  message: null,
  type: null,
  success: (message: string) => null,
  negativeSuccess: (message: string) => null,
  error: (message: string) => null,
})

export default NotificationContext

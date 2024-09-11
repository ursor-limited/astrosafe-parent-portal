import React, { createContext, useEffect, useState } from 'react'
import NotificationContext from './NotificationContext'

export interface INotificationProviderProps {
  children: React.ReactNode
}

export type NotificationType = 'success' | 'negativeSuccess' | 'error'

export default function NotificationProvider(
  props: INotificationProviderProps
) {
  const [type, setType] = useState<NotificationType | null>(null)

  const [message, setMessage] = useState<string | null>(null)

  const success = (text: string) => {
    window.scroll(0, 0)
    setMessage(text)
    setType('success')
  }

  const negativeSuccess = (text: string) => {
    window.scroll(0, 0)
    setMessage(text)
    setType('negativeSuccess')
  }

  const error = (text: string) => {}

  useEffect(() => {
    message && setTimeout(() => setMessage(null), 2500)
  }, [message])

  return (
    <NotificationContext.Provider
      value={{
        message,
        type,
        success,
        negativeSuccess,
        error,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

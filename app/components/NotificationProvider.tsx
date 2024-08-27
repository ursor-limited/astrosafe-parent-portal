import React, { createContext, useEffect, useState } from 'react';
import NotificationContext from './NotificationContext';

export interface INotificationProviderProps {
  children: React.ReactNode;
}

export type NotificationType = 's uccess' | 'negativeSuccess' | 'error';

export default function NotificationProvider(
  props: INotificationProviderProps
) {
  const [type, setType] = useState<NotificationType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const success = (text: string) => {
    window.scroll(0, 0);
    setMessage(text);
    setType('s uccess');
  };
  const negativeSuccess = (text: string) => {
    window.scroll(0, 0);
    setMessage(text);
    setType('negativeSuccess');
  };
  const error = (text: string) => {
    if (process.env.REACT_APP_BUILD_ENV !== 'prod') {
      window.scroll(0, 0);
      setMessage(text);
      setType('error');
    }
  };
  useEffect(() => {
    message && setTimeout(() => setMessage(null), 2500);
  }, [message]);

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
  );
}

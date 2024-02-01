import React, { createContext } from "react";
import { NotificationType } from "./NotificationProvider";

export interface INotificationProviderProps {
  children: React.ReactNode;
}

export interface INotificationContext {
  message: string | null;
  type: NotificationType | null;
  success: (message: string) => void;
  negativeSuccess: (message: string) => void;
  error: (message: string) => void;
}

const NotificationContext = createContext<INotificationContext>({
  message: null,
  type: null,
  success: (message: string) => null,
  negativeSuccess: (message: string) => null,
  error: (message: string) => null,
});

export default NotificationContext;

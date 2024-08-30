import React from 'react';
import { NotificationType } from './NotificationProvider';
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
declare const NotificationContext: React.Context<INotificationContext>;
export default NotificationContext;

import React from 'react';
export interface INotificationProviderProps {
    children: React.ReactNode;
}
export type NotificationType = 'success' | 'negativeSuccess' | 'error';
export default function NotificationProvider(props: INotificationProviderProps): import("react/jsx-runtime").JSX.Element;

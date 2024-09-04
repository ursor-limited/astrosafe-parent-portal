import './globals.css'
import { Stack } from '@mui/system'
import { PALETTE } from './ui'
import NotificationProvider from './components/NotificationProvider'
import UrsorNotificationBar from './components/UrsorNotificationBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ zIndex: 999999999999 }}>
      <meta name="theme-color" content={PALETTE.secondary.grey[1]} />
      <body
        className="__className_5c20f6"
        style={{
          margin: 0,
          overflow: 'hidden',
        }}
      >
        <Stack
          height="100vh"
          minHeight="100vh"
          overflow="hidden"
          width="100vw"
          position="relative"
          bgcolor={PALETTE.secondary.grey[1]}
        >
          <NotificationProvider>
            <Stack width="100%" justifyContent="center" zIndex={999999999}>
              <UrsorNotificationBar />
            </Stack>
            {children}
          </NotificationProvider>
        </Stack>
      </body>
    </html>
  )
}

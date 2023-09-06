'use client'
import Providers from '@/app/Providers'
import {customTheme} from '@/styles/customTheme'
import {ColorModeScript} from '@chakra-ui/react'
import {enableReactUse} from '@legendapp/state/config/enableReactUse'
import {ReactNode} from 'react'
import '../styles/globals.css'

enableReactUse()

const RootLayout = ({children}: {children: ReactNode}) => (
  <html lang='en' suppressHydrationWarning={true}>
    <body suppressHydrationWarning={true}>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <Providers>{children}</Providers>
    </body>
  </html>
)

export default RootLayout

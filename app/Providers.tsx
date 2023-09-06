import {customTheme} from '@/styles/customTheme'
import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactNode} from 'react'

const queryClient = new QueryClient()

const Providers = ({children}: {children: ReactNode}) => (
  <CacheProvider>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  </CacheProvider>
)

export default Providers

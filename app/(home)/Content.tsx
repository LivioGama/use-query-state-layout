import Store from '@/store/Store'
import {Box, Divider, Heading, HStack, Text, VStack} from '@chakra-ui/react'
import NiceSwitch from '@/app/(home)/NiceSwitch'
import {ObservableQueryLayoutComponent} from '@/app/(home)/ObservableQueryLayoutComponent'
import {QueryLayoutComponent} from '@/app/(home)/QueryLayoutComponent'
import {ComponentStateDefaultLayout} from '@/app/useQueryStateLayout'

const Content = () => {
  const selectedMode = Store.mode.use()

  return (
    <>
      <HStack borderRadius='3xl' bgColor='chakra-body-bg' p={10}>
        <Text fontSize='2xl'>useQueryLayout</Text>
        <NiceSwitch isChecked={selectedMode} onValueChange={() => Store.mode.toggle()} />
        <Text fontSize='2xl'>useObservableQueryLayout</Text>
      </HStack>

      <VStack spacing={20} alignItems='start' w='full'>
        <Box maxH='500px' overflowY='scroll' w='full'>
          {selectedMode ? <ObservableQueryLayoutComponent /> : <QueryLayoutComponent />}
        </Box>

        <VStack w='full' alignItems='start'>
          <Heading>Default error layout</Heading>
          <Divider />
        </VStack>
        <ComponentStateDefaultLayout mode='error' w='full' />
        <VStack w='full' alignItems='start'>
          <Heading>Default empty layout</Heading>
          <Divider />
        </VStack>
        <ComponentStateDefaultLayout mode='empty' w='full' />
      </VStack>
    </>
  )
}

export default Content

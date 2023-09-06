'use client'
import NiceSwitch from '@/app/(home)/NiceSwitch'
import {ObservableQueryLayoutComponent} from '@/app/(home)/ObservableQueryLayoutComponent'
import {QueryLayoutComponent} from '@/app/(home)/QueryLayoutComponent'
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  useBoolean,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import {MdDarkMode, MdLightMode} from 'react-icons/md'
import styles from '../home.module.scss'

const Home = () => {
  const {colorMode} = useColorMode()
  const [isOn, {toggle}] = useBoolean(false)

  return (
    <Container maxW='1280px' p={20}>
      <VStack
        w='full'
        bgColor='chakra-subtle-bg'
        borderRadius='3xl'
        minH='90vh'
        p={10}
        spacing={10}>
        <HStack w='full' justify='space-between'>
          <Heading className={styles.threeD}>useQueryStateLayout playground</Heading>
          <Button onClick={() => alert('Wanna leave the dark mode? You should be ashamed.')}>
            {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </Button>
        </HStack>

        <HStack borderRadius='3xl' bgColor='chakra-body-bg' p={10}>
          <Text fontSize='2xl'>useQueryLayout</Text>
          <NiceSwitch isChecked={isOn} onValueChange={() => toggle()} />
          <Text fontSize='2xl'>useObservableQueryLayout</Text>
        </HStack>

        {isOn ? <ObservableQueryLayoutComponent /> : <QueryLayoutComponent />}
      </VStack>
    </Container>
  )
}

export default Home

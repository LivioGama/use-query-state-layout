'use client'
import {Button, Container, Heading, HStack, useColorMode, VStack} from '@chakra-ui/react'
import {MdDarkMode, MdLightMode} from 'react-icons/md'
import styles from '../home.module.scss'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('@/app/(home)/Content'), {ssr: false})

const Home = () => {
  const {colorMode} = useColorMode()

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
        <Content />
      </VStack>
    </Container>
  )
}

export default Home

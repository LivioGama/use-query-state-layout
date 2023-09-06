import {Box, Button, Heading, HStack, VStack} from '@chakra-ui/react'
import {ReactNode} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'

export const Body = ({layout, isObservable}: {layout: ReactNode; isObservable?: boolean}) => (
  <VStack spacing={10} w='full'>
    <HStack w='full' justifyContent='space-between'>
      <Heading as='h1'>Posts {isObservable && 'observable'}</Heading>
      <Button boxShadow='xl' size='lg' leftIcon={<AiOutlinePlus />} className='glare'>
        New post
      </Button>
    </HStack>
    <Box w='full'>{layout}</Box>
  </VStack>
)

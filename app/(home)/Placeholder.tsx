import {SimpleGrid, Skeleton} from '@chakra-ui/react'
import times from 'lodash/times'
import {Children} from 'react'

export const Placeholder = () => (
  <SimpleGrid columns={2} spacing={5} w='full'>
    {Children.toArray(times(4, () => <Skeleton w='full' h='480px' borderRadius='lg' />))}
  </SimpleGrid>
)

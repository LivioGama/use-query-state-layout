import {SimpleGrid} from '@chakra-ui/react'
import {ReactNode} from 'react'

const PostList = ({children}: {children: ReactNode}) => (
  <SimpleGrid columns={2} spacing={5}>
    {children}
  </SimpleGrid>
)

export default PostList

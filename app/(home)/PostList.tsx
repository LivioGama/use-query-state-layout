import Post from '@/models'
import {Box, Button, Center, Divider, Heading, HStack, SimpleGrid, VStack} from '@chakra-ui/react'
import {Children} from 'react'
import {FaArrowRight} from 'react-icons/fa6'

const PostList = ({posts}: {posts: Post[]}) => (
  <SimpleGrid columns={2} spacing={5}>
    {Children.toArray(
      posts.map(post => (
        <Box p={5} pos='relative' borderRadius='lg' border='solid 1px lightgray'>
          <VStack alignItems='start' spacing={4} pt={5} overflowX='hidden'>
            <HStack justifyContent='space-between' w='full'>
              <Heading w='full' flex={1} fontSize='lg' textAlign='center' whiteSpace='nowrap'>
                {post.title}
              </Heading>
            </HStack>

            <Divider />

            <Center w='full'>
              <Button variant='solid' rightIcon={<FaArrowRight />}>
                Go to post
              </Button>
            </Center>
          </VStack>
        </Box>
      )),
    )}
  </SimpleGrid>
)

export default PostList

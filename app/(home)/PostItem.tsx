import Post from '@/models'
import {Box, Button, Center, Divider, Heading, HStack, VStack} from '@chakra-ui/react'
import {FaArrowRight} from 'react-icons/fa6'

const PostItem = ({post}: {post: Post}) => (
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
)

export default PostItem

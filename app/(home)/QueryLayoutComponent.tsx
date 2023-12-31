import {Body} from '@/app/(home)/Body'
import {Placeholder} from '@/app/(home)/Placeholder'
import PostItem from '@/app/(home)/PostItem'
import PostList from '@/app/(home)/PostList'
import {useQueryLayout} from '@/app/useQueryStateLayout'
import Post from '@/models'
import api from '@/services/api'
import xor from 'lodash/xor'
import {Children, useRef} from 'react'

export const QueryLayoutComponent = () => {
  const renderCount = ++useRef(0).current
  const {layout} = useQueryLayout({
    queryKey: ['getPosts'],
    queryFn: () => api.get<Post[]>(`/posts`).then(res => res.data),
    loadingLayout: <Placeholder />,
    hydratedLayout: (posts, setPosts) => (
      <PostList>
        {Children.toArray(
          posts.map(post => <PostItem post={post} onDelete={() => setPosts(xor(posts, [post]))} />),
        )}
      </PostList>
    ),
  })

  return (
    <>
      <div>Renders: {renderCount}</div>
      <Body layout={layout} />
    </>
  )
}

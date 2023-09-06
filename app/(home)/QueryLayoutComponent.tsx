import {Body} from '@/app/(home)/Body'
import {Placeholder} from '@/app/(home)/Placeholder'
import PostItem from '@/app/(home)/PostItem'
import PostList from '@/app/(home)/PostList'
import {useQueryLayout} from '@/app/useQueryStateLayout'
import Post from '@/models'
import api from '@/services/api'
import {Children} from 'react'

export const QueryLayoutComponent = () => {
  const {layout} = useQueryLayout({
    queryKey: ['getPosts'],
    queryFn: () => api.get<Post[]>(`/posts`).then(res => res.data),
    loadingLayout: <Placeholder />,
    hydratedLayout: posts => (
      <PostList>{Children.toArray(posts.map(post => <PostItem post={post} />))}</PostList>
    ),
  })

  return <Body layout={layout} />
}

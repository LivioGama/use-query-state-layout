import {Body} from '@/app/(home)/Body'
import {Placeholder} from '@/app/(home)/Placeholder'
import PostList from '@/app/(home)/PostList'
import {useQueryLayout} from '@/app/useQueryStateLayout'
import Post from '@/models'
import api from '@/services/api'

export const QueryLayoutComponent = () => {
  const {layout} = useQueryLayout({
    queryKey: ['getPosts'],
    queryFn: () => api.get<Post[]>(`/posts`).then(res => res.data),
    loadingLayout: <Placeholder />,
    hydratedLayout: posts => <PostList posts={posts} />,
  })

  return <Body layout={layout} />
}
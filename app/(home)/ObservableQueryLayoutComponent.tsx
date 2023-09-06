import {Body} from '@/app/(home)/Body'
import {Placeholder} from '@/app/(home)/Placeholder'
import PostItem from '@/app/(home)/PostItem'
import PostList from '@/app/(home)/PostList'
import {useObservableQueryLayout} from '@/app/useQueryStateLayout'
import Post from '@/models'
import api from '@/services/api'
import {For} from '@legendapp/state/react'

export const ObservableQueryLayoutComponent = () => {
  const {layout} = useObservableQueryLayout({
    queryKey: ['getPosts'],
    queryFn: () => api.get<Post[]>(`/posts`).then(res => res.data),
    loadingLayout: <Placeholder />,
    hydratedLayout: posts => (
      <PostList>
        <For each={posts} optimized>
          {item => <PostItem post={item.get()!} />}
        </For>
      </PostList>
    ),
  })

  return <Body layout={layout} isObservable />
}

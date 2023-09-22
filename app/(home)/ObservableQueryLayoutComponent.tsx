import {Placeholder} from '@/app/(home)/Placeholder'
import PostItem from '@/app/(home)/PostItem'
import {useObservableQueryLayout} from '@/app/useQueryStateLayout'
import Post from '@/models'
import api from '@/services/api'
import {For} from '@legendapp/state/react'
import xor from 'lodash/xor'
import {useRef} from 'react'
import {Body} from '@/app/(home)/Body'
import PostList from '@/app/(home)/PostList'

export const ObservableQueryLayoutComponent = () => {
  const renderCount = ++useRef(0).current
  const {layout} = useObservableQueryLayout({
    queryKey: ['getPosts'],
    queryFn: () => api.get<Post[]>(`/posts`).then(res => res.data),
    loadingLayout: <Placeholder />,
    hydratedLayout: posts => (
      <PostList>
        <For each={posts} optimized>
          {item => (
            <PostItem
              post={item.get()!}
              onDelete={() => posts.set(xor(posts.get(), [item.get()]))}
            />
          )}
        </For>
      </PostList>
    ),
  })

  return (
    <>
      <div>Renders: {renderCount}</div>
      <Body layout={layout} isObservable />
    </>
  )
}

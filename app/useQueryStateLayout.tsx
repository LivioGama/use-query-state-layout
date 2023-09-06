import ThreeDotsWave from '@/app/LoaderFullScreen'
import {Center, Heading, VStack} from '@chakra-ui/react'
import {ObservableObject, ObservablePrimitiveChildFns} from '@legendapp/state'
import {Switch, useObservable} from '@legendapp/state/react'
import {useObservableQuery} from '@legendapp/state/react-hooks/useObservableQuery'
import {QueryKey, useQuery} from '@tanstack/react-query'
import isEmpty from 'lodash/isEmpty'
import {ReactNode} from 'react'
import {IconType} from 'react-icons'
import {FcHighPriority, FcViewDetails} from 'react-icons/fc'

export enum ComponentState {
  Loading,
  Error,
  Empty,
  Hydrated,
}

interface QueryStateProps<T> {
  queryKey: QueryKey
  queryFn: () => Promise<T>
  enabled?: boolean
}

interface QueryLayoutProps<T> {
  loadingLayout?: ReactNode | ReactNode[]
  errorLayout?: ReactNode | ReactNode[]
  emptyLayout?: ReactNode | ReactNode[]
}

interface ErrorProps {
  errorLayoutIcon?: IconType
  errorLayoutMessage?: string
}

interface EmptyProps {
  emptyLayoutIcon?: IconType
  emptyLayoutMessage?: string
}

interface SizeProps {
  iconSize?: number
  debug?: boolean
}

interface HydratedProps<T> {
  hydratedLayout: (data: T) => ReactNode | ReactNode[]
}

interface ObservableHydratedProps<T> {
  hydratedLayout: (data: ObservableObject<T>) => ReactNode | ReactNode[]
}

const useQueryState = <T extends {} | T[]>({
  queryKey,
  queryFn,
  enabled = true,
}: QueryStateProps<T>) => {
  const state = useObservable(ComponentState.Loading)
  const {isLoading, isError, data} = useQuery<T>({queryKey, queryFn, enabled})

  if (isLoading) {
    state.set(ComponentState.Loading)
  } else if (isError) {
    state.set(ComponentState.Error)
  } else if (isEmpty(data)) {
    state.set(ComponentState.Empty)
  } else {
    state.set(ComponentState.Hydrated)
  }

  return {state, data}
}

const useObservableQueryState = <T extends {} | T[]>({
  queryKey,
  queryFn,
  enabled = true,
}: QueryStateProps<T>) => {
  const state = useObservable(ComponentState.Loading)
  const {isLoading, isError, data} = useObservableQuery({
    queryKey,
    queryFn,
    enabled,
  })

  if ((isLoading as ObservablePrimitiveChildFns<boolean>).get()) {
    state.set(ComponentState.Loading)
  } else if ((isError as ObservablePrimitiveChildFns<boolean>).get()) {
    state.set(ComponentState.Error)
  } else if (isEmpty((data as ObservableObject<T>).get())) {
    state.set(ComponentState.Empty)
  } else {
    state.set(ComponentState.Hydrated)
  }

  return {state, data: data as ObservableObject<T>}
}

const useQueryLayout = <T extends {} | T[]>({
  queryKey,
  queryFn,
  loadingLayout,
  errorLayout,
  emptyLayout,
  hydratedLayout,
  errorLayoutIcon,
  errorLayoutMessage,
  emptyLayoutIcon,
  emptyLayoutMessage,
  iconSize,
  enabled,
  debug,
}: QueryStateProps<T> &
  HydratedProps<T> &
  QueryLayoutProps<T> &
  ErrorProps &
  EmptyProps &
  SizeProps) => {
  const {state, data} = useQueryState<T>({queryKey, queryFn, enabled})

  debug && console.log(state.get())

  return {
    data,
    layout: (
      <Switch value={state.get()}>
        {{
          [ComponentState.Loading]: () => loadingLayout,
          [ComponentState.Error]: () =>
            errorLayout || defaultLayout('error', errorLayoutIcon, errorLayoutMessage, iconSize),
          [ComponentState.Empty]: () =>
            emptyLayout || defaultLayout('empty', emptyLayoutIcon, emptyLayoutMessage, iconSize),
          [ComponentState.Hydrated]: () => hydratedLayout(data!),
        }}
      </Switch>
    ),
  }
}

const useObservableQueryLayout = <T extends {} | T[]>({
  queryKey,
  queryFn,
  loadingLayout,
  errorLayout,
  emptyLayout,
  hydratedLayout,
  errorLayoutIcon,
  errorLayoutMessage,
  emptyLayoutIcon,
  emptyLayoutMessage,
  iconSize,
  enabled,
  debug,
}: QueryStateProps<T> &
  ObservableHydratedProps<T> &
  QueryLayoutProps<T> &
  ErrorProps &
  EmptyProps &
  SizeProps) => {
  const {state, data} = useObservableQueryState({
    queryKey,
    queryFn,
    enabled,
  })
  data.use()

  debug && console.log(state.get())

  return {
    data: data.get(),
    layout: (
      <Switch value={state.get()}>
        {{
          [ComponentState.Loading]: () => loadingLayout || defaultLayout('loading'),
          [ComponentState.Error]: () =>
            errorLayout || defaultLayout('error', errorLayoutIcon, errorLayoutMessage, iconSize),
          [ComponentState.Empty]: () =>
            emptyLayout || defaultLayout('empty', emptyLayoutIcon, emptyLayoutMessage, iconSize),
          [ComponentState.Hydrated]: () => hydratedLayout(data),
        }}
      </Switch>
    ),
  }
}

const defaultLayout = (
  mode: 'error' | 'empty' | 'loading',
  LayoutIcon?: IconType,
  message?: string,
  iconSize = 128,
) => {
  if (mode === 'loading') return <ThreeDotsWave />
  const defaultLayoutIcon =
    mode === 'error' ? <FcHighPriority size={iconSize} /> : <FcViewDetails size={iconSize} />
  const defaultMessage = mode === 'error' ? 'Error loading data, please retry' : 'No data yet'
  return (
    <Center color='gray.500' w='full'>
      <VStack>
        {LayoutIcon ? <LayoutIcon size={iconSize} /> : defaultLayoutIcon}
        <Heading>{message || defaultMessage}</Heading>
      </VStack>
    </Center>
  )
}

export {
  useQueryState,
  useObservableQueryState,
  useQueryLayout,
  useObservableQueryLayout,
  defaultLayout,
}

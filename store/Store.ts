import {observable} from '@legendapp/state'
import {configureObservablePersistence, persistObservable} from '@legendapp/state/persist'
import {ObservablePersistLocalStorage} from '@legendapp/state/persist-plugins/local-storage'

configureObservablePersistence({
  pluginLocal: ObservablePersistLocalStorage,
})

const mode = observable(false)

persistObservable(mode, {
  local: 'mode',
})

const Store = {
  mode,
}

export default Store

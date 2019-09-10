import koalaClient from './koala-client'
import mapDispatchToPouch from './mapDispatchToPouch'

export default (remoteUrl) => store => {
  const actions = mapDispatchToPouch(store.dispatch)
  const db = koalaClient(remoteUrl, actions)

  return next => action => {
    next(action)

    const {pouch} = action
    if (pouch) {
      const operation = pouch(db, store.getState)

      operation.then(operationResult => {
        return store.dispatch(action.response(operationResult))
      }).catch(err => {
        return store.dispatch(action.error(err))
      })
    }
  }
}

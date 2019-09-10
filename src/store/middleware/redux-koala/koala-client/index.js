import PouchDB from 'pouchdb'
import Find from 'pouchdb-find'
import getUser from './getUser'
import {NOUSER_DB} from './constants'

const defaultActions = {
  onReady: () => null,
  onChange: () => null,
  onPaused: () => null,
  onActive: () => null,
  onDenied: () => null,
  onComplete: () => null,
  onError: () => null
}

PouchDB.plugin(Find)

window.PouchDB = PouchDB

export default (remoteUrl, actions) => {
  const {onReady, onChange, onDenied, onComplete, onError} = {
    ...defaultActions,
    ...actions
  }

  const {action, username, token, isFirstLoad} = getUser()
  const dbName = username || NOUSER_DB

  // provision our new database
  const db = new PouchDB(dbName)

  Promise.all([
    db.createIndex({
      index: {fields: ['modified', 'type', 'parent']}
    }),
    new Promise((resolve) => {
      // on signup, we take the special action of replicating the unauthenticated
      // database into the user's newly provisioned database
      if (action === 'signup') {
        const oldDb = new PouchDB(NOUSER_DB)
        PouchDB.replicate(oldDb, db).on('complete', () => {
          oldDb.destroy()
          resolve()
        })
      } else {
        resolve()
      }

      // sync only if this is a real user database (not unauthenticated)
      if (username) {
        const remoteDb = new PouchDB(`${remoteUrl}/${username}`, {
          headers: {
            'x-jwt': token
          }
        })
        PouchDB.sync(remoteDb, db, {live: true, retry: true})
          .on('change', onChange)
          .on('denied', onDenied)
          .on('complete', onComplete)
          .on('error', onError)
      }
    })
  ]).then(() => {
    onReady(username, dbName, isFirstLoad)
  })

  return db
}

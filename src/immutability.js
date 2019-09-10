import update from 'immutability-helper'

update.extend('$map', (f, original) => {
  return original.map(f)
})

update.extend('$filter', (f, original) => {
  return original.filter(f)
})

update.extend('$where', (arg, original) => {
  const [criteria, command] = arg
  return original.map(item =>
    criteria(item) ? update(item, command) : item
  )
})

update.extend('$mergeSort', (arg, original) => {
  const [toBeAdded, compareF] = arg
  return toBeAdded.reduce((acc, newItem) => {
    let indexOfInsertion = acc.findIndex(
      oldItem => compareF(oldItem, newItem) > 0
    )
    if (indexOfInsertion === -1) {
      return update(acc, {$push: [newItem]})
    }
    return update(acc, {$splice: [[indexOfInsertion, 0, newItem]]})
  }, original)
})

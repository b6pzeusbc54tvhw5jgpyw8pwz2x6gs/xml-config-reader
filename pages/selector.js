import map from 'lodash/map'
import { createSelector } from 'reselect'
import Fuse from 'fuse.js'
import { dot } from 'dot-object'

var options = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "val",
    "key"
]
};
var fuse = new Fuse(list, options); // "list" is the item array
var result = fuse.search("info.client");


const dotConfigSelector = createSelector([
  state => state.jsonConfig,
], (jsonConfig) => {
  const dotConfig = dot(jsonConfig)
  return dotConfig
})

export const optionArrSelector = createSelector([
  dotConfigSelector,
  (_, props) => props.key,
], (jsonConfig, key) => {

  const arr = map( jsonConfig, (val,key) => {
    key = key.split('.').slice(1).join('.')
    return { key, val }
  })
  console.log(JSON.stringify(arr,null,2))

  const options = { keys: ['val', 'key'], id: 'key' }
  const fuse = new Fuse(arr, options)
  const result = fuse.search(key)
  return result
})

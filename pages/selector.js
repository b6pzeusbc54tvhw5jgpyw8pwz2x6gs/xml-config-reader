import map from 'lodash/map'
import { createSelector } from 'reselect'
import Fuse from 'fuse.js'
import { dot } from 'dot-object'
const fuzzysort = require( 'fuzzysort')

var options = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [ "val", "key" ]
};

const keyValArrSelector = createSelector([
  state => state.jsonConfig,
], (jsonConfig) => {
  const dotConfig = dot(jsonConfig)
  const keyValArr = map( dotConfig, (val,key) => {
    key = key.split('.').slice(1).join('.')
    return { key, val }
  })
  return keyValArr
})

export const optionArrSelector = createSelector([
  keyValArrSelector,
  (_, props) => props.key,
], (keyValArr, key) => {

  // let resultArr = fuzzysort.go(key, keyValArr, { keys:['key','val']})
  if( ! key ) {
    return keyValArr.map( keyVal => {
      return { key: keyVal.key, label: keyVal.key }
    })
  }
  let resultArr = fuzzysort.go(key, keyValArr, { key: 'key' })
  // return resultArr.map( r => ({ key: r.obj.key, label: r.obj.key }))

  resultArr = resultArr.map( result => {
    const highlighted = fuzzysort.highlight(result, '<b>', '</b>')
    return { key: result.obj.key, oriLabel: result.obj.key, label: highlighted }
  })
  return resultArr
})

const LineByLineReader = require('line-by-line')
const decomment = require('decomment');
const fs = require('fs')
const path = require('path')
const temp = require("temp");

module.exports = (file, key) => new Promise( (resolve,reject) => {

  if( ! path.isAbsolute(file)) {
    file = path.resolve( process.cwd(), file )
  }

  let fullText
  try {
    fullText = fs.readFileSync(file, 'utf8')
  } catch( e ) {
    console.log(e)
    process.exit(1)
  }

  fullText = decomment.html(fullText, { space: true })
  const tmpName = temp.path({suffix: '.tmp'});
  fs.writeFileSync(tmpName, fullText, 'utf8')

  const splited = key.split('.')

  // a.b.c 에서 현재 a 뎁스를 찾고있으면 0
  let findingDepth = 0

  // <a><b> 이후 탐색 하고 있을때의 뎁스: 2
  let currentDepth = 0
  let currentLine = 0

  const tagOpenMatcher = /^\s*?<([a-zA-Z0-9][a-zA-Z0-9-_]*?)>/
  const valueWithTagCloseMatcher = /^(.+?)<\/([a-zA-Z0-9][a-zA-Z0-9-_]*?)>/
  const valueMatcher = /(.*)/
  const tagCloseMatcher = /^\s*?<\/([a-zA-Z0-9][a-zA-Z0-9-_]*?)>/
  let collectingValue = ''

  const lr = new LineByLineReader(tmpName)
  lr.on('line', (line) => {

    if( currentLine > 190 ) debugger
    currentLine++

    let waitValue = false
    let matched

    while(true) {

      if( ! line.trim() ) break

      matched = line.match(tagOpenMatcher)
      if( matched ) {
        line = line.slice(matched[0].length)
        if( matched[1] === 'config-root') continue;

        if( currentDepth === findingDepth && splited[findingDepth] === matched[1]) {
          findingDepth++
        }

        currentDepth++
        continue
      }

      matched = line.match(tagCloseMatcher)
      if( matched) {
        line = line.slice(matched[0].length)
        if( collectingValue ) {
          resolve({ line: currentLine, value: collectingValue })
          lr.close()
          break
        }
        currentDepth--
        continue
      }

      matched = line.match(valueWithTagCloseMatcher)
      if( matched) {
        line = line.slice(matched[0].length)
        if( splited.length === findingDepth) {
          if( matched[2] !== splited[findingDepth-1]) {
            console.error('wrong config. line: ' + currentLine)
            process.exit(1)
          }
          collectingValue = matched[1]
          resolve({ line: currentLine, value: collectingValue })
          lr.close()
          break
        }

        currentDepth--
        continue
      }

      matched = line.match(valueMatcher)
      if( matched) {
        line = line.slice(matched[1].length)
        if( splited.length === findingDepth) {
          collectingValue += matched[1]
        }
        continue
      }
    }

  }).on('end', () => {
    if( ! collectingValue ) {
      console.log('not found by key: ' + key)
    }
  })
})



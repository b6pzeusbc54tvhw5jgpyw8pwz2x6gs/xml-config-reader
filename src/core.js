const fs = require('fs')
const path = require('path')
const xmldoc = require('xmldoc')

module.exports = (file, key) => new Promise( (resolve,reject) => {

  if( ! path.isAbsolute(file)) {
    file = path.resolve( process.cwd(), file )
  }

  try {
    const fullText = fs.readFileSync(file, 'utf8')
    const document = new xmldoc.XmlDocument(fullText)
    const found = document.descendantWithPath(key)
    if( found ) {
      console.log(found)
      resolve({ line: found.line, value: found.val })
    } else {
      console.log(found)
      reject(new Error('NOT_FOUND'))
    }

  } catch( e ) {
    console.log(e)
    process.exit(1)
  }
})


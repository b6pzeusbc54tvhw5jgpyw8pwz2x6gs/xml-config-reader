#!/usr/bin/env node

const program = require('commander')

const cmd = `xcr files`

let paths = []

program
  .arguments('[files...]')
  .action( files => paths = files )
  .on('--help', () => {
    console.log('');
    console.log(`
Examples:
  $ ${cmd} example*
  $ ${cmd} example*.xml
  $ ${cmd} example1.xml example2.xml
    `.trim())
  })
  .parse(process.argv)



if (paths.length < 1) {
  program.outputHelp()
  process.exit(1)
}

// print
const result = paths.join(',')
console.log(result)
console.log()
console.log('Copy above and use like below:')
console.log()
console.log(`$ xcr start --files ${result} --key you.want.to.find`)

#!/usr/bin/env node

const program = require('commander')

let paths = []

program
  .arguments('[files...]')
  .action( files => paths = files )
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ ./xcr files example*')
    console.log('  $ ./xcr files example*.xml')
    console.log('  $ ./xcr files example1.xml example2.xml')
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

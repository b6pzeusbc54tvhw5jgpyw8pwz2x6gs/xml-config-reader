#!/usr/bin/env node

const program = require('commander')

let paths = []

console.log(process.cwd())

program
  .option('-d, --debug', 'enable debug mode')

program
  .version('0.1.0', '-v, --version')
  .command('start', 'find config')
  .command('files', 'get comma seperated string from blob patterns')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(0)
}


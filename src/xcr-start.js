#!/usr/bin/env node

const program = require('commander')
const findLineAndValue = require('./core')

const list = val => val.split(',')
const cmd = `xcr start`

program
  .option('-k, --key [dot.notation.key]', 'by this key find value')
  .option('-f, --files <xml-file-paths>', 'comma seperated xml config files', list)
  .on('--help', () => {
    console.log()
    console.log(`
Examples:
  $ ${cmd} --files config.xml --key a.b.c
  $ ${cmd} --files example.xml,other.xml,other2.xml --key a.b.c
  $ ${cmd} -f config.xml -k a.b.c
    `.trim())
  })
  .parse(process.argv)

// print
const { files=[], key='' } = program

if( files.length < 1 || ! key ) {
  program.outputHelp()
  process.exit(1)
}

console.log(`
  key: ${key}
  files: ${files}
`)

findLineAndValue( files[0], key ).then( result => {
  console.log('line: ' + result.line)
  console.log('value: ' + result.value)
})


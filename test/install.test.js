var extras = require('extras')

function ssh(command, silent = false, log = false) {
  var result = extras.run(`ssh default "${command}"`, { silent })
  log && console.log({ result })
  return result?.stdout
}

console.info(`\n* Setting up VM`)
extras.run(`node ./test/vm/setup.js`, true)

console.info(`\n* Running install.sh`)
ssh('sudo sh install.sh')

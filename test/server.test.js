var extras = require('extras')

function ssh(command, silent = false, log = false) {
  var result = extras.run(`ssh default "${command}"`, { silent })
  log && console.log({ result })
  return result?.stdout
}

console.info(`\n* Checking dir structure`)
ssh('ls')
console.info('\n* Checking node version')
ssh('node --version')
console.info('* Checking npm version')
ssh('npm --version')
console.info('* Checking redis version')
ssh('redis-server --version')
console.info('* Checking git version')
ssh('git --version')

console.info(`\n* Setting up test server`)
extras.run(`node ./test/vm/setup.js ./test/vm/server.js`)

console.info(`\n* Installing pm2`)
ssh('sudo npm i -g pm2')

console.info(`\n* Checking dir structure`)
ssh('ls')

console.info(`\n* Running test server`)
ssh(`pm2 start -f server.js`, true)

console.info(`\n* Curling test endpoint`)
ssh(`curl localhost:8080`)

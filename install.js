var server = require('ecmaserver')({
  host: 'default',
  provider: 'vagrant',
  os: 'ubuntu24.04'
  // sudo: true
  // ssh: true
})

var result = server.run('rm -f ./*')
console.log({ result })
result = server.prepare({ sudo: true })
console.log({ result })

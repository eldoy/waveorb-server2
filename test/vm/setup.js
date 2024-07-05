var extras = require('extras')

var [, , ...dirs] = process.argv

var config = {
  local_dir: dirs.length ? dirs : ['./install.sh'],
  remote_address: 'default',
  remote_dir: '/home/vagrant',
  remote_port: '22',
  remote_ssh_password: 'password'
}

function ssh(command) {
  return extras.run(`ssh default '${command}'`)
}

function setup() {
  var {
    local_dir,
    remote_address,
    remote_dir,
    remote_port,
    remote_ssh_password
  } = config

  if (!dirs.length) {
    console.info(`Cleaning remote dir`)
    ssh(`sudo rm -rf ${remote_dir}/*`)
  }

  for (var local of local_dir) {
    var command = `rsync -avh "ssh -p ${remote_port}" ${local} ${remote_address}:${remote_dir}`

    if (remote_ssh_password) {
      command = `sshpass -p "${remote_ssh_password}" ${command}`
    }

    console.info(`Syncing ${local} to remote`)
    extras.run(command)
  }
}

setup()

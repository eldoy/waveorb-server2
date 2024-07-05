var extras = require('extras')

var [, , ...dirs] = process.argv

var config = {
  local_dir: process.cwd(),
  remote_address: 'default',
  remote_dir: dirs.map((dir) => '/home/vagrant' + dir),
  remote_port: '22',
  remote_ssh_password: 'password'
}

function get() {
  var {
    local_dir,
    remote_address,
    remote_dir,
    remote_port,
    remote_ssh_password
  } = config

  for (var remote of remote_dir) {
    // var command = `rsync -avh "ssh -p ${remote_port}" ${remote_address}:${remote} ${local_dir}`
    var command = `scp -r ${remote_address}:${remote} ${local_dir}`

    if (remote_ssh_password) {
      command = `sshpass -p "${remote_ssh_password}" ${command}`
    }

    console.info(`Syncing ${remote} to local`)
    extras.run(command)
  }
}

get()

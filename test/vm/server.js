var http = require('http')

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('Hello World!')
  res.end()
})

var port = 8080

server.listen(port, (error) => {
  if (error) {
    return console.error(error)
  }
  console.log(`Server listening on port ${port}`)
})

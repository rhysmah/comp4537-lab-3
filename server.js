/* http is used for easier local machine testing; however,
our hosting service, which uses https, will automatically
encrypt and decrypt and requests handled by out program,
even though it's written in http. */

const http = require('http')
const url = require('url')
const utils = require('./module/utils')
const greeting = require('./lang/en/en')

/* For our local machine, we need to provide a a specific
hostname and port; but these details will be handled by
our hosting service. */
// const hostname = '127.0.0.1'
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query

  if (queryObject.name) {
    const date = utils.getDate()
    const responseMessage = greeting.replace('%1', queryObject.name) + date
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(`<div style="color: blue;">${responseMessage}</div>`)
  } else {
    res.statusCode = 400
    res.end('Name is required in query string')
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

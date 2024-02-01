// ChatGPT helped me write this code

/* http is used for easier local machine testing; however,
our hosting service, which uses https, will automatically
encrypt and decrypt requests handled by our application. */

/* Imports the Node.js 'http' module, allowing us to create 
an HTTP server, and the 'url' module, which allows for URL
parsing and resolution. */
const http = require('http')
const url = require('url')

/* User-defined imports -- functions and custom text*/
const utils = require('./module/utils')
const greeting = require('./lang/en/en')

/* For our local machine, we need to provide a specific
hostname and port; but these details will be handled by
our hosting service. When hosted on a service, the service
provides the hostname. */

const port = process.env.PORT || 3000

/* Creates an http servier. We pass in a function handler,
which is called every time the server receivers a request. */
const server = http.createServer((req, res) => {

  /* Breaks up a URL into components, such as 'protocol',
  'port', 'hostname', 'query', and so on. */  
  const queryObject = url.parse(req.url, true).query

  /* 'name' is a key within the 'query' object, a URL component. 
  If this exists, then the following code runs. */
  if (queryObject.name) {
    const date = utils.getDate()
    const responseMessage = greeting.replace('%1', queryObject.name) + date
    
    /* 'res', representing 'response', is a parameter in the createServer
    function; it's an object with different keys that we can set. 
    > 'setHeader' has a name and value keys
    > 'end' indicates the end of a response; the optional 'data' argument
    allows you to send a response body. */
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(`<div style="color: blue;">${responseMessage}</div>`)
  
  /* If 'name' does not exist, send back '400 Bad Request' response*/
  } else {
    res.statusCode = 400
    res.end('Name is required in query string')
  }
})

/* Tells the server to listen for requests on the specified
port, which, in this case, we've explicitly defined. */
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

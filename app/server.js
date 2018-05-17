process.title = 'pe-ws-epsi'

var webSocketsServerPort = 1337
var WebSocketServer = require('websocket').server
var http = require('http')

// list of currently connected clients (users)
var clients = []

var server = http.createServer(function (request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
})

server.listen(webSocketsServerPort, function () {
  console.log((new Date()) + ' Server is listening on port ' + webSocketsServerPort)
})

/**
 * WebSocket server
 */
var wsServer = new WebSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket request is just
  // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
})

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.')

  var connection = request.accept(null, request.origin)
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1
  var userName = false

  console.log((new Date()) + ' Connection accepted.')

  connection.on('message', function (message) {
    let jsonObj = JSON.parse(message.utf8Data)

    if (jsonObj.type === 'name' && userName === false) {
      userName = jsonObj.value
      console.log((new Date()) + ' User is known as: ' + userName)
    } else { // Send message to connected users
      console.log(`${(new Date())} Received Message from ${userName} : ${JSON.stringify(jsonObj.value)}`)

      // we want to keep history of all sent messages
      var obj = {
        time: (new Date()).getTime(),
        text: jsonObj.value,
        type: jsonObj.type,
        author: userName
      }

      // broadcast message to all connected clients
      var json = JSON.stringify({ type: obj.type, data: obj })

      for (var i = 0; i < clients.length; i++) {
        clients[i].sendUTF(json)
      }
    }
  })

  // user disconnected
  connection.on('close', function (connection) {
    clients.splice(index, 1)
  })
})

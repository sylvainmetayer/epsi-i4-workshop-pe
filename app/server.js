const http = require('http')
const WebSocketServer = require('websocket').server
const options = require('./config')
process.title = options.PROCESS_NAME

let clients = []
const server = http.createServer(function (request, response) {
  // Not important for us. We're writing WebSocket server, not HTTP server
})

server.listen(options.WS_PORT, function () {
  console.log(`${(new Date())} Server is listening on port ${options.WS_PORT}`)
})

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

function originIsAllowed (origin) {
  return options.ALLOWED_WS.includes(origin)
}

wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject()
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.')
    return
  }

  var connection = request.accept('echo-protocol', request.origin)
  console.log(`${(new Date())} Connection accepted from origin ${request.origin}.`)

  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1
  var userName = false

  connection.on('message', function (message) {
    let jsonObj = JSON.parse(message.utf8Data)

    if (jsonObj.type === 'name' && userName === false) {
      userName = jsonObj.value
      console.log(`${(new Date())} User is known as: ${userName}`)
      sendMessage('message', 'connecté(e)')
    } else {
      console.log(`${(new Date())} Received Message from ${userName} : ${JSON.stringify(jsonObj.value)}`)
      sendMessage(jsonObj.type, jsonObj.value)
    }
  })

  // user disconnected
  connection.on('close', function (connection) {
    sendMessage('message', 'deconnecté(e)')
    // Remove client from connected clients
    clients.splice(index, 1)
  })

  function sendMessage (type, message) {
    var obj = {
      time: (new Date()).getTime(),
      text: message,
      type: type,
      author: userName
    }

    var json = JSON.stringify({ type: obj.type, data: obj })

    for (var i = 0; i < clients.length; i++) {
      clients[i].sendUTF(json)
    }
  }
})

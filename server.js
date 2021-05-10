const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')
const cors = require('cors');

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

app.use(cors({origin: proccess.env.REACT_APP_URL}));

const SERVER_PORT = process.env.PORT

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection')
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

server.listen(SERVER_PORT, () => {
    console.log(`[HTTP] Listen => Server is running at port ${SERVER_PORT}`)
    console.log('[HTTP] Listen => Press CTRL+C to stop it')
})
const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors:{
        origin: "*"
    }
})
const PORT = 3000



server.listen(3000,()=>{
    console.log(`Listening on ${PORT} ...`)
})

io.on('connection',(socket)=>{
    console.log('A user is connected', socket.id)
})
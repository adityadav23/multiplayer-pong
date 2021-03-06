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

let readyPlayerCount =0 ;



io.on('connection',(socket)=>{
    console.log('A user is connected', socket.id)

    socket.on('ready', ()=>{
        console.log('Player ready ', socket.id)

        readyPlayerCount++;

        if(readyPlayerCount % 2 === 0){
            io.emit('startGame', socket.id)
        }
    })

    socket.on('paddleMove',(paddleData)=>{
        socket.broadcast.emit('paddleMove',paddleData)
    })

    socket.on('ballMove',(ballData)=>{
        socket.broadcast.emit('ballMove',ballData)
    })

    socket.on('disconnect',(reason)=>{
        console.log(`Client ${socket.id} disconnected: ${reason}`)
    })
})
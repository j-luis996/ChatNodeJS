var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

// mensaje desde una ruta
// app.get('/hola',function(req,res){
//     res.status(200).send('holaaaaaaaaa');
// });

var messages=[{
    id: 1,
    text: "bienvenido al chat",
    nickname: 'bot - de prueba '
}];

//conexion
io.on('connection',function(socket){
    console.log("el nodo con IP: "+socket.handshake.address+" se a conectado");
    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});
//servidor escuchando en el puerto 8080
server.listen(8080,function(){
    console.log('el servidor esta funcionando en el puerto 8080');
});
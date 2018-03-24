

module.exports = (socketServer)=>{
    var io = require('socket.io')(socketServer);
    socketServer.listen(3002, function(){
        console.log('Socket server listening on : 3002');
    });
};
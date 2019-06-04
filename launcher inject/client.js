if(Object.keys(window.launcher) !== 0) {
    socket = io('http://localhost:3000');
        socket.on('connect', function(){
            socket.emit("greet", "working from somewhere")
        });
        socket.on('code', function(code){
            socket.emit("receivedCode", code);
            try {
                var result = eval(code);
                socket.emit("return", CircularJSON.stringify(result))
            } catch(e) {
                socket.emit("eval error", CircularJSON.stringify(e))
            }
        });
        socket.on('disconnect', function(){});
}
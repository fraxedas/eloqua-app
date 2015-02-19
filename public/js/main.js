window.onload = function() {
 
    var field = document.getElementById("appName");
    var sendButton = document.getElementById("newApp");
    var socket = io.connect();

	socket.on("broadcast newApp", function(app){
		alert(app.name);
	});
 
    sendButton.onclick = function() {
    	var name = field.value;
        socket.emit('newApp', { name: name });
        console.log(name);
    };
 
}	
		
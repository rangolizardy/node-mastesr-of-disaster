var arDrone = require('ar-drone');
var client = arDrone.createClient();
var http = require('http');
var sockjs = require('sockjs');
var movement_factor = 0.7;
var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });
client.config('control:altitude_max', 3000);
client.disableEmergency();
var currently_down = [];
echo.on('connection', function(conn) {
	client.takeoff();
    conn.on('data', function(message) {
		var msg = JSON.parse(message);
		handle_input(msg.command, msg.data);
	
    });
    conn.on('close', function() {
		client.land();		
	});
});
function handle_input(command,data){

	var index = currently_down.indexOf(data.keycode);
	if (index > -1) {
		currently_down.splice(index, 1);
	}
	currently_down.push(data.keycode);
	switch_input(command,data);
}
function switch_input(command,data){
	switch(command){
			case "left":
				client.left(movement_factor);
				break;
			case "right":
				client.right(movement_factor);
				break;
			case "forward":
				client.front(movement_factor);
				break;
			case "back":
				client.back(movement_factor);
				break;
			case "up":
				client.up(movement_factor);
				break;
			case "down":
				client.down(movement_factor);
				break;
			case "rotleft":
				client.counterClockwise(movement_factor);
				break;
			case "rotright":
				client.clockwise(movement_factor); 
				break;
			case "stop":
				stop(data);
				break;
		}	
	
}
function stop(data){
				var index = currently_down.indexOf(data.keycode);
				if (index > -1) {
					currently_down.splice(index, 1);
				}
				client.stop();
				handle_up();
}
function handle_up(){
	currently_down.forEach(function(entry) {
		switch_input(entry);
	});
	
}
var server = http.createServer(function(req,res){});
echo.installHandlers(server, {prefix:'/parrot'});
server.listen(9999, '0.0.0.0');

var image_server = http.createServer(function(req,res){});
image_server.listen(9998, '0.0.0.0');

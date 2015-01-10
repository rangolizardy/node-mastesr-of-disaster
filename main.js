var arDrone = require('ar-drone');
var client = arDrone.createClient();
var http = require('http');
var sockjs = require('sockjs');
var movement_factor = 0.5;
var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });
echo.on('connection', function(conn) {
	client.takeoff();
    conn.on('data', function(message) {
        var msg = JSON.parse(message);
		switch(msg.command){
			case "leftdown":
				client.left(movement_factor);
				break;
			case "rightdown":
				client.right(movement_factor);
				break;
			case "forwarddown":
				client.front(movement_factor);
				break;
			case "backdown":
				client.back(movement_factor);
				break;
			case "updown":
				client.up(movement_factor);
				break;
			case "downdown":
				client.down(movement_factor);
				break;
			case "left":
				
				client.counterClockwise(movement_factor);
				break;
			case "right":
				client.clockwise(movement_factor); 
				break;
			case "stop":
				client.stop();
				break;
			case"test":
				client
				  .after(5000, function() {
					this.clockwise(0.5);
				  })
				  .after(3000, function() {
					this.animate('flipLeft', 15);
				  })
				  .after(1000, function() {
					this.stop();
					
				  });
				break;
			
		}
    });
    conn.on('close', function() {
		client.land();
		
	});
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/parrot'});
server.listen(9999, '0.0.0.0');



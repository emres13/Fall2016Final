var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var serial;                            // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data


app.use('/', express.static(__dirname + '/public'));

function serverUpCallback(){
	console.log("listening on port: " + port);
}

var input2, button, greeting;
var blue, red, green, orange, yellow, navy, purple, pink ;  // Declare variable 'img'.

var checkbox;

function incomingSocketHandler(socket){
	console.log('a user has connected');
	console.log(socket);
	console.log(socket.handshake.headers['user-agent']);
	console.log(socket.conn.server.clientsCount);

	socket.on('disconnect', function(){
		console.log("User has disconnected");
	});

	socket.userName = "User " + socket.conn.server.clientsCount;

	socket.emit("welcome message", "Welcome user!");
	socket.on('chat message', function(dataFromClient){
		console.log(dataFromClient);
		var dataFromServer = {
			'userName' : socket.userName,
			'message': dataFromClient.msgText
		}
		console.log(dataFromServer);
		io.emit('latest message', dataFromServer);
		socket.emit('message confirmation', {'text' : "Your message was sent"});
	});

}

io.on('connection', incomingSocketHandler);

server.listen(port, serverUpCallback);


function preload(){


	blue = loadImage("assets/colorBlue.png"); 
	red = loadImage("assets/colorRed.png");
	green = loadImage("assets/colorGreen.png");
	orange = loadImage("assets/colorOrange.png");
	yellow = loadImage("assets/colorYellow.png");
	navy = loadImage("assets/colorNavy.png");
	purple = loadImage("assets/colorPurple.png");
	pink = loadImage("assets/colorPink.png");

	
}


function setup() {

  createCanvas(displayWidth, displayHeight);
  background(255);
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('data', serialEvent);  // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
	  
  	textFont("Courier");
  	


  checkbox = createCheckbox('red', false);
  checkbox.changed(myCheckedEvent1);
  checkbox.position(180,292);
  
  checkbox = createCheckbox('orange', false);
  checkbox.changed(myCheckedEvent2);
  checkbox.position(380, 292);
  
  checkbox = createCheckbox('yellow', false);
  checkbox.changed(myCheckedEvent3);
  checkbox.position(610,292);
  
   checkbox = createCheckbox('blue', false);
  checkbox.changed(myCheckedEvent4);
  checkbox.position(170, 509);
  
  checkbox = createCheckbox('navy', false);
  checkbox.changed(myCheckedEvent5);
  checkbox.position(385, 509);

  checkbox = createCheckbox('green', false);
  checkbox.changed(myCheckedEvent6);
  checkbox.position(610, 509);
  
	
	  checkbox = createCheckbox('purple', false);
  checkbox.changed(myCheckedEvent7);
  checkbox.position(835, 509);
  
  
	  checkbox = createCheckbox('pink', false);
  checkbox.changed(myCheckedEvent8);
  checkbox.position(840,292);

	

	  
	textSize(18);
	textFont("Courier");
	text("please ; pick a color that associates with your feelings: ", 100, 68);
	
	textSize(18);
	textFont("Courier");
	text("please ; explain how you feel with a single word: ", 100, 570);
	
	input2 = createInput();
 	input2.position(100, 585);
 	input2.size(250, 14);
 	
 	button = createButton('submit color + text');
  	button.position(365, 587);
  	//button.mousePressed(greet);
  	
  	
}



function draw() {
		
  image(blue, 100, 310);
  image(green, 540, 310);
  image(yellow, 540, 90);
  image(orange, 320, 90)
  image(red, 100, 90)
  image(navy, 320, 310)
  image(purple, 760, 310)
  image(pink, 760, 90)
  
  smooth();
	  
}
  
  
function myCheckedEvent1() {
  if (this.checked()) {
    console.log("Checking Red!");
    

  } else {
    console.log("Unchecking Red!");
  }
}

function myCheckedEvent2() {
  if (this.checked()) {
    console.log("Checking Orange!");

  } else {
    console.log("Unchecking Orange!");

  }
}

function myCheckedEvent3() {
  if (this.checked()) {
    console.log("Checking Yellow!");
 
  } else {
    console.log("Unchecking Yellow!");

  }
}

function myCheckedEvent4() {
  if (this.checked()) {
    console.log("Checking Blue!");

  } else {
    console.log("Unchecking Blue!");

  }
}

function myCheckedEvent5() {
  if (this.checked()) {
    console.log("Checking Navy!");
  
  } else {
    console.log("Unchecking Navy!");

  }
}


function myCheckedEvent6() {
  if (this.checked()) {
    console.log("Checking Green!");
 
  } else {
    console.log("Unchecking Green!");

  }
}
function myCheckedEvent7() {
  if (this.checked()) {
    console.log("Checking Purple!");


  } else {
    console.log("Unchecking Purple!");

  }
}
function myCheckedEvent8() {
  if (this.checked()) {
    console.log("Checking Pink!");
   

  } else {
    console.log("Unchecking Pink!");

  }
}



function mouseDragged() {
  // map the mouseY to a range from 0 to 255:
  outByte = int(map(mouseY, 0, height, 0, 255));
  // Convert it to a string with a newline at the end,
  // and send it out the serial port:
  serial.write(outByte + '\n');
}

function keyPressed() {
  if (key ==='H' || key ==='L') {   // if the user presses H or L
    serial.write(key);      // send it out the serial port
  }
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}


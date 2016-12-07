var serial;                            // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
var input2, button, greeting;
var blue, red, green, orange, yellow, navy, purple, pink ;  // Declare variable 'img'.




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
	  
  
  
  
  
  textSize(14);
	textFont("Courier");
	text("red", 190, 304);
	
	textSize(14);
	textFont("Courier");
	text("orange", 390, 304);
	
	textSize(14);
	textFont("Courier");
	text("yellow", 610, 304);
	
	textSize(14);
	textFont("Courier");
	text("blue", 190, 523);
	
	textSize(14);
	textFont("Courier");
	text("navy", 395, 523);
	
	
	textSize(14);
	textFont("Courier");
	text("green", 185, 743);
	
	textSize(14);
	textFont("Courier");
	text("purple", 393, 743);
  
  textSize(14);
	textFont("Courier");
	text("pink", 623, 743);
	  
	textSize(18);
	textFont("Courier");
	text("please pick a color that associates with your feelings: ", 100, 68);
	
	textSize(18);
	textFont("Courier");
	text("explain your feeling with a one word answer: ", 600, 420);
	
	input2 = createInput();
 	input2.position(707, 430);
 	input2.size(250, 14);
 	
 	button = createButton('submit');
  	button.position(800, 460);
  	button.mousePressed(greet);
  	
  	
}



function draw() {
	
	
  image(blue, 100, 310);
  image(green, 100, 530);
  image(yellow, 540, 90);
  image(orange, 320, 90)
  image(red, 100, 90)
  image(navy, 320, 310)
  image(purple, 320, 530)
  image(pink, 540, 530)



  noStroke();
  
  
  }
  
  

function greet() {
  var name = input.value();
  greeting.html('hello '+name+'!');
  input.value('');
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


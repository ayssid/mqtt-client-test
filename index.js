"use strict"

const config = require('./config');

const mqtt = require('mqtt');
const client  = mqtt.connect(config.mqttUrl);
//const client = mqtt.connect('mqtt://10.10.180.208');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
let firstFlag = false;
let word = '';



const port = new SerialPort(config.serialPort, {
	baudRate: config.baudRate,
	//parser: new SerialPort.parsers.Readline('\r\n')
});

//const parser = new Readline();

//port.pipe(parser);

port.on('data', function(data) {
	
	let temp = data.toString();
	
	
	for(var i=0; i < temp.length; i++){
		//console.log(temp.length);
		//console.log('firstFlag : ', firstFlag);
		//console.log('char : ', temp.charAt(i));
		if(!firstFlag && temp.charAt(i) == '@') {
			//console.log('1');
			firstFlag = true;
			//console.log('firstFlag 1 : ', firstFlag);
		} else if(firstFlag && temp.charAt(i) == '#') {
			//console.log('2');
			firstFlag = false;
			
			const data = word.split(';');
			console.log(data);
			client.publish('aegisflanker/temperature', data[0]);
			client.publish('aegisflanker/humidity', data[1]);
			word = "";
			
		} else {
			//console.log('3');
			word += temp.charAt(i) ;
			//console.log(word);
		}
	}

	
});

client.on('connect', function(){
	console.log('connect');
});

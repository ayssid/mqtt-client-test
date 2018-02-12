var config = {};

//config.mqttUrl = 'mqtt://iot.eclipse.org';
config.mqttUrl = 'mqtt://10.10.180.208';
config.serialPort = '\\\\.\\COM4';
//config.serialPort = '/dev/ttyACM0'
config.baudRate = 9600;

module.exports = config;
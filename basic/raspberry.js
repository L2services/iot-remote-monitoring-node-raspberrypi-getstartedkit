// We consider it a valid firmware if this line exists.
'use strict';


//var CONFIG_LEDPIN = 7; // Define led pin

//var BME280 = require('./SpiBME280');
//var wpi = require('wiring-pi');
var led = require('sense-hat-led');
var nodeimu = require('nodeimu');
var shell = require('shelljs');
shell.config.silent = true;
//setup the IMU sensors
var IMU = new nodeimu.IMU();
//wpi.setup('wpi');
//wpi.pinMode(CONFIG_LEDPIN, wpi.OUTPUT);

//var bme = new BME280(wpi);
//bme.init();

//colors (RGB)
var white = [255,255,255];
var red = [255,0,0];
var green = [0,255,0];
var blue = [0,0,255];

var raspberry = exports;
raspberry.getVersion = function() {
  return '1.2';
};


raspberry.changeLightStatus = function(value) {
  // var status = wpi.digitalRead(CONFIG_LEDPIN);
  value = (value != 0) ? 1 : 0;
  //wpi.digitalWrite(CONFIG_LEDPIN, value);
  if(value == 0){ led.clear(); }
  else{ led.clear(white);}
};

raspberry.lightBlink = function() {
  var count = 5;
  setInterval(function() {
    if (count-- > 0) {
      //wpi.digitalWrite(CONFIG_LEDPIN, 1);
      led.clear(white);
      setTimeout(() => { 
        //wpi.digitalWrite(CONFIG_LEDPIN, 0);
        led.clear(); 
      }, 100);
    } else {
      clearTimeout();
    }
  }, 300);
};

raspberry.setMatrixColor = function(requestedColor) {
  var colors = {"red": [255,0,0], "green": [0,255,0], "blue": [0,0,255], "white": [255,255,255], "black": [0,0,0] };
  led.clear(colors[requestedColor]);
}


function generateRandomIncrement() {
  return ((Math.random() * 2) - 1);
}

raspberry.getSensorData = function() {
  var sensorJson;
  try {
    //var data = bme.readSensorData();
    var data = IMU.getValueSync();
    sensorJson = JSON.stringify(
        //{'temperature': data.temperature_C, 'humidity': data.humidity});
        {'temperature': data.temperature, 'humidity': data.humidity});
  } catch (error) {
    // Generate a default number if hardware error.
    sensorJson = '{"Temperature":' + generateRandomIncrement() +
        ',"Humidity":' + generateRandomIncrement() + '}';
  }
  return JSON.parse(sensorJson);
};

raspberry.updateFirmwareStep = function(step, args) {
  switch (step) {
    case 1:  // Download and verify.
      // Do not this approach in real projects, Unsafe commands may come with
      // parameters.
      var returnString =
          shell.exec('wget -O newversion "' + args + '" 2>&1').stdout;
      var suffix = returnString.substr(-20);
      if (　returnString.indexOf('Saving to:') != -1 &&
          suffix.indexOf('saved') != -1) {
        returnString = shell.exec('cat newversion 2>&1').stdout;
        if (returnString.indexOf(
                '// We consider it a valid firmware if this line exists.') ==
            0) {
          console.log('Download and verify OK: ' + args);
          return true;
        }
        console.log('Download OK but verify failed: ' + args);
      }
      return false;
      break;

    case 2:  // Replace old files
      shell.exec('mv raspberry.js raspberry.js_' + Date.now());
      shell.exec('mv newversion raspberry.js');
      return true;
      break;

    case 3:  // Restart
    	var cmd = 'node remote_monitoring.js > /dev/null &';
	console.log('reboot cmd:' + cmd);
	shell.exec(cmd, {async: true});
	process.exit();
      return true;
      break;
  }
};

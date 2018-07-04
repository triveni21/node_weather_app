const request = require('request');
const args = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = args
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var geoCodeResult = geocode.geocodeAddress(argv.a, (errorMsg, results) => {
	if (errorMsg){
		console.log(errorMsg);
	} else {
		weather.getWeather(results, (error, result) => {
			if (error){
				console.log(error);
			} else {
				console.log(JSON.stringify(result, undefined, 2));
			}
		});
	}

});




// 125428ce3e13df75a2b1df38db7e9d09
// https://api.darksky.net/forecast/125428ce3e13df75a2b1df38db7e9d09/37.8267,-122.4233

// What is callback function?
// Asynchronous processing using setTimeOut
// callStack -> Node API -> callback queue
// preety printing using JSON.stringify(obj, undefined, 2)



//********************
// Call stack: Is like DS
// We can not process callback till call stack is empty, what is it takes more time that timeout

// error is coming as null

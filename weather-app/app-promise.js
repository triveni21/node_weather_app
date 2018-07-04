const axios = require('axios');
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

var address = encodeURIComponent(argv.a);
var addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
var secretKey = '125428ce3e13df75a2b1df38db7e9d09';

axios.get(addressUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/${secretKey}/${lat},${lng}`;
	axios.get(weatherUrl).then((response) => {
		console.log('Temperature: ', response.data.currently.temperature);
		console.log('Summary: ', response.data.currently.summary);
	});
}).catch((e) => {
	if (e.code === 'ENOTFOUND'){
		console.log('Unable to connect..');
	} else {
		console.log(e.message);	
	}
});
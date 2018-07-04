const request = require('request');

var secretKey = '125428ce3e13df75a2b1df38db7e9d09';

getWeather = (geoCode, callback) => {
	console.log('weather...');
	console.log(`https://api.darksky.net/forecast/${secretKey}/${geoCode.lat},${geoCode.lng}`);
	request({
		url: `https://api.darksky.net/forecast/${secretKey}/${geoCode.lat},${geoCode.lng}`,
		json: true
	}, (error, response, body) => {
		if (error) {
				callback('Failed to connect..');
			} else if (response.statusCode === 400) {
				callback('Unable to fetch weather');
			} else if (response.statusCode === 200) { 
				callback(undefined, { 
					summary: body.currently.summary,
					temperature: body.currently.temperature
				});
			}
	})
}

module.exports = {
	getWeather
}
// var asyncAdd = (a, b) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			if (typeof a === 'number' && typeof b === 'number') {
// 				resolve(a+b);
// 			} else {
// 				reject('Arguments must be numbers');
// 			}
// 		}, 1500);
// 	});
// };

// asyncAdd(3,5).then((res) => {
// 	console.log('Result: ', res);
// }, (errorMsg) => {
// 	console.log(errorMsg);
// });

const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var address = encodeURIComponent(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
			json: true  
		},
			(error, response, body) => {
				if (error) {
					reject('Failed to connect..');
				} else if (body.status === 'ZERO_RESULTS') {
					reject('Incorrect address..');
				} else if (body.status === 'OK') { 
					resolve({ 
						address: body["results"][0]["formatted_address"],
						lat: body["results"][0]["geometry"]["location"]["lat"],
						lng: body["results"][0]["geometry"]["location"]["lng"]
					});
				}
		});
	});
};

geocodeAddress('19146').then((res) => {
	console.log(JSON.stringify(res, undefined, 2));
}, (error) => {
	console.log(error);
});


// var somePromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		// resolve('Hey.. It worked');
// 		reject('Unable to call promise');
// 	}, 2500);
// });

// somePromise.then((message) => {
// 	console.log('Success: ', message);
// }, (errorMsg) => {
// 	console.log('Error: ', errorMsg);
// });
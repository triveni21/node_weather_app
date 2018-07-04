var getUser = (id, callback) => {
	var user = {
		id: id,
		name: 'Triveni'
	};
	setTimeout(() => {
		callback(user);
	}, 3000);
};

// https://maps.googleapis.com/maps/api/geocode/json?key=val&key1=val
getUser(31, (user) => {
	console.log(`user ID: ${user.id}, Name: ${user.name}`); 
});
const uuidAPIKey = require('uuid-apikey');
const auth = require('../models/auth');

exports.genAPIKey = () => {
	const keys = uuidAPIKey.create();
	return keys['apiKey'];
}

exports.pushKey = (data) => {
	const authSchema = new auth({
		key: data['APIKey'],
		read: data['read'],
		write: data['write'],
		name: data['name']
	});
	authSchema.save((err, res) => {
		if(err) { 
			console.log(err);
		}
		console.log(res);
	});
}


const APIKeyHelper = require('../helpers/APIKey');
const auth = require('../models/auth');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		//const encrypted = APIKeyHelper.encryptKey(token);
		//const auth = APIKeyHelper.decryptKey(token, APIKeyHelper.fetchKey(encrypted));
		auth.find({key: token}).then((result) => {
			if(token === result[0]['key']) {
				if(req.method === "POST" || req.method === "DELETE" || req.method === "UPDATE" || req.method === "PUT") {
					if(result[0]['write'] === true) {
						next();
					} else {
						return res.status(405).json({
							message: "The providede API key has no write access"
						});
					}
				} else if (req.method === "GET") {
					if(result[0]['read'] === true) {
						next();
					} else {
						return res.status(405).json({
							message: "The provided API key has no read access"
						});
					}
				} 
			} else {
				return res.status(401).json({
					message: "Unauthorized! Contact Administrator"
			});
		}}).catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: "Internal Server Error"
			});
		});
	} catch(err) {
		console.log(err);
		return res.status(500).json({
			message: "Can't serve responses without API Key, Contact Administrator"
		});
	}
}

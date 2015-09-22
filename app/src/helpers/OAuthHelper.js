var Firebase = require("firebase");
var ref = new Firebase("https://learnvcs.firebaseio.com");

var OAuth = {
	login: function (callback) {
		ref.authWithOAuthPopup("github", function(error, authData) {
			callback(error, authData);
		}, {
			scope: "user,public_repo"
		});
	}
};

module.exports = OAuth;
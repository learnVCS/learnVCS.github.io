var Firebase = require("firebase");
var ref = new Firebase("https://learnvcs.firebaseio.com");

var OAuth = {
	login: function (callback) {
		var user = ref.getAuth();
		if (user == null) {
			ref.authWithOAuthPopup("github", function(error, authData) {
				callback(error, authData);
			}, {
				scope: "user,public_repo"
			});
		} else {
			callback(null, user);
		}
	}
};

module.exports = OAuth;
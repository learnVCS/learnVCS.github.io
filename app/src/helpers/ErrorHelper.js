var errors = {
	default: 'Something terrible happened',
	400: 'Bad data. Contact an admin',
	401: 'Invalid credentials',
	403: 'Rate limit exceeded',
	404: 'Repository not found',
};

var ErrorHelper = {
	appropriateResponse: function (errorCode) {
		return errors[errorCode] || errors.default
	},
	parse: function (error) {
		if (error.request.status)
			return this.appropriateResponse(error.request.status);
		return errors.default;
	}
}

module.exports = ErrorHelper;
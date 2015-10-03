var blanketResponse = 'Something terrible happened';

var ErrorHelper = {
	appropriateResponse: function (errorCode) {
		switch(errorCode)
		{
			case 404:
			return 'Repo could not be found';
			case 401:
			return 'Access not authorized';
			default:
			return blanketResponse;
		}
	},
	parse: function (error) {
		if (error.request.status)
			return this.appropriateResponse(error.request.status);
		return blanketResponse;
	}
}

module.exports = ErrorHelper;
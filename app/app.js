var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var Container = require('./src/react-components/Container');

var helper = new GitHubHelper({username:'<GH USERNAME>', password:'<GH PERSONAL ACCESS TOKEN>'}, {});

React.render(
	<Container helper={helper} />, document.getElementById('content')
);

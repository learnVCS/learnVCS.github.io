var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var Container = require('./src/react-components/Container');

var helper = new GitHubHelper({username: 'StephanieJurgiel', password: '63eec0883d4afa8801454f453d4521ad97812ba3'}, {});

React.render(
	<Container helper={helper} />, document.getElementById('graph')
);
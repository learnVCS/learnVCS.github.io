var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var Container = require('./src/react-components/Container');

var helper = new GitHubHelper({username:'StephanieJurgiel', password:'65b863d5a51adef1723100860cb752b751898e74'}, {});

React.render(
	<Container helper={helper} />, document.getElementById('graph')
);
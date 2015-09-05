var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var Container = require('./src/react-components/Container');

<<<<<<< HEAD
var helper = new GitHubHelper({username:'<GH USERNAME>', password:'<YOUR GH PASSWORD>'}, {});
=======
var helper = new GitHubHelper({username:'<GH USERNAME>', password:'<GH PERSONAL ACCESS TOKEN>'}, {});
>>>>>>> 2681f77680e09dcd253b1a6a409afb456673c9d9

React.render(
	<Container helper={helper} />, document.getElementById('content')
);

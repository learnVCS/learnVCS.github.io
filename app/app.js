var GitHubHelper = require('./scripts/helpers/GitHubHelper');

var github = new GitHubHelper('aaronsky', 'badges');
github.buildTree(function (commits) {
	console.log(JSON.stringify(commits));
});
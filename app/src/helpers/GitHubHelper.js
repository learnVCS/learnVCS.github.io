var GitHubClient = require('node-github');

function GitHubHelper (username, repo) {
	this.username = username;
	this.repo = repo;
	this.commits = [];
	this.branchCount = 0;
	this.github = new GitHubClient({
		version: "3.0.0",
		debug: true,
		protocol: "https",
		host: "api.github.com",
		timeout: 5000
	});
};

GitHubHelper.prototype.addBranchToTree = function (branch, commits) {
	this.commits.push ({
		branch: branch.name,
		commits: commits
	});
};

GitHubHelper.prototype.getCommitsFromPage = function (branch, pageNumber, branchCommits) {
	branchCommits = branchCommits || [];
	this.github.repos.getCommits({
		user: this.username,
		repo: this.repo,
		page: pageNumber,
		sha: branch.name
	}, function (err, res) {
		console.log(branchCommits.length);
		for (var i = res.length - 1; i >= 0; i--) {
			branchCommits.push(res[i]);
		}
		if (res.length == 30) {
			this.getCommitsFromPage(branch, pageNumber + 1);
		} else {
			this.addBranchToTree(branch, branchCommits);
		}
	}.bind(this));
};

GitHubHelper.prototype.buildTree = function (callback) {
	this.github.repos.getBranches({
		user: this.username,
		repo: this.repo
	}, function(err, res) {
		var i = 0,
		len = this.branchCount = res.length;
		while (i < len) {
			var branch = res[i];
			var branchCommits = [];
			this.getCommitsFromPage(branch, 0, branchCommits);
			i++;
		}
	}.bind(this));
};

module.exports = GitHubHelper;
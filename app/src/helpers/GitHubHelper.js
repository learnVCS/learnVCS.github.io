var Github = require('github-api');

/**
 * @description Creates a new GitHubHelper
 * @class Helps with certain aspects of the GitHub API not covered by the github.js library
 * @param {Object} options
 * @param {String} options.username Github username (temporary until OAuth)
 * @param {String} options.password Github Personal Access Token (Do not use real password) (temporary until OAuth)
 * @param {Number} options.perpage Overrides the default perpage value of 100;
 */
 function GitHubHelper (options) {
 	this.github = new Github({
 		token: options.token,
 		auth: "oauth"
 	});
 	this.perpage = options.perpage || 100;
 }

/**
 * @description Retrieves all commits ever made on all existing branches from GitHub
 * @param  {String}  GitHub username where repo exists
 * @param  {String}  Repository name on GitHub
 * @param  {Function}  Callback that takes an error and an array of commits as parameters
 */
 GitHubHelper.prototype.getAllCommitsInRepo = function (username, repository, callback) {
 	var perpage = this.perpage;
 	var repo = this.github.getRepo(username, repository);
 	repo.listBranches(function (error, branches) {
 		if (error) {
			callback(error, null);
			return;
		}
		
		var commits = {};

		var processCommits = function (commitsToProcess) {
			var processed = [];
			var addedHashes = [];
			for (var branch in commitsToProcess) {
				if (commitsToProcess.hasOwnProperty(branch)) {
					var branchCommits = commitsToProcess[branch];
					for (var i = 0; i < branchCommits.length; i++) {
						var commit = branchCommits[i];
						if (addedHashes.indexOf(commit.sha) !== -1)
							continue;
						processed.push({
							sha: commit.sha,
							branch: branch,
							parents: commit.parents,
							name: commit.commit.author.name,
							email: commit.commit.author.email,
							date: commit.commit.author.date,
							message: commit.commit.message,
							url: commit.html_url,
							api_url: commit.url
						});
						addedHashes.push(commit.sha);
					}
				}
			}
			processed.sort(function (a, b) {
				return new Date(b.date) - new Date(a.date);
			});
			return processed;
		};
		/**
		 * @description Manages commit loading for a given branch
		 * @param  {String} name of branch
		 * @param  {Number} branch number in branches
		 * @param  {Number} number of branches
		 */
		 var processBranch = function (branchName, isLast) {
		 	var options = {
		 		sha: branchName,
				page: 1, // VERY IMPORTANT TO START AT 1
				perpage: perpage
			};

			commits[branchName] = [];

			/**
			 * @description Callback that processes commits for a given page
			 * @param  {Object} null if no error
			 * @param  {Array} array of commits for the given page
			 */
			 var processPageOfCommits = function (error, pageCommits) {
				if (error) {
					callback(error, null);
					return;
				}
				commits[branchName] = commits[branchName].concat(pageCommits);
				/**
				 * If the number of commits for a given page is anything less than the maximum amount per page
				 * (greater than is impossible), it has to be the last page. 
				 */
				 if (pageCommits.length === perpage) {
				 	options.page += 1;
				 	repo.getCommits(options, processPageOfCommits);
				 } else {
					// If the branch number is equal to the last index in the branches
					if (isLast) {
						var processed = processCommits(commits);
						callback(null, processed);
					}
				}
			};
			repo.getCommits(options, processPageOfCommits);
		};
		
		var i = 0, len = branches.length;
		for (i, len; i < len; i++) {
			var branch = branches[i];
			processBranch(branch, (i === len - 1));
		}
	});
};


module.exports = GitHubHelper;
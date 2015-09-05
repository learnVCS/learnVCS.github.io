var Github = require('github-api');

/**
 * @description Creates a new GitHubHelper
 * @class Helps with certain aspects of the GitHub API not covered by the github.js library
 * @param {Object} options
 * @param {String} options.username Github username (temporary until OAuth)
 * @param {String} options.password Github Personal Access Token (Do not use real password) (temporary until OAuth)
 * @param {Object} debug
 * @param {Number} debug.perpage Overrides the default perpage value of 100
 */
function GitHubHelper (options, debug) {
	if (debug)
	{
		this.debug = true;
		this.perpage = debug.perpage || 100;
	}
	this.github = new Github({
		username: options.username,
		password: options.password,
		auth: 'basic'
	});
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
			//console.log(error);
			callback(error, null);
			return;
		}
		//console.log(branches);
		
		var commits = [];

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

			/**
			 * @description Callback that processes commits for a given page
			 * @param  {Object} null if no error
			 * @param  {Array} array of commits for the given page
			 */
			var processPageOfCommits = function (error, pageCommits) {
				//console.log(branchName + '/page ' + options.page + ' - ' + pageCommits.length + ' new commits');

				if (error) {
					//console.log(error);
					callback(error, null);
					return;
				}
				commits = commits.concat(pageCommits);
				/**
				 * If the number of commits for a given page is anything less than the maximum amount per page
				 * (greater than is impossible), it has to be the last page. 
				 */
				if (pageCommits.length === perpage) {
					options.page += 1;
					repo.getCommits(options, processPageOfCommits);
				} else {
					//console.log('reached end of ' + branchName + ' branch');

					// If the branch number is equal to the last index in the branches
					if (isLast) {
						callback(null, commits);
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
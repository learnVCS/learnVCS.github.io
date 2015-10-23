var React = require('react');
var OAuth = require('../helpers/OAuthHelper');
var ErrorHelper = require('../helpers/ErrorHelper');
var GitHubHelper = require('../helpers/GitHubHelper');
var CommitsGraph = require('react-commits-graph');
var localCommits = require('../local/commits.json');
var RepoForm = require('./RepoForm');
var MessageView = require('./MessageView');

var localCommits = require('../local/commits.json');

var Container = React.createClass({
	getInitialState: function () {
		return {
			commits: localCommits,
			selectedSha: null,
			selectedCommit: null,
			activeMessage: false
		};
	},
	componentDidMount: function() {
		// Toggle the search modal
		$(".searchIcon").on("click", this.onSearchClick);
		$(document).click(this.onDocumentClick);
	},
	componentWillUnmount: function() {
		$(".searchIcon").unbind("click");
		$(document).unbind("click");
	},
	onSearchClick: function (e) {
		$(".searchIcon").toggleClass("searchIcon_active");
		$(".searchModal").toggleClass("searchModal_active");
	},
	onDocumentClick: function (event) {
		/* close search modal when clicking off of the element */
        if($(event.target).parents(".searchModal").length == 0
           && !$(event.target).hasClass("searchIcon")
           && !$(event.target).hasClass("searchModal")) {

            $(".searchModal").removeClass("searchModal_active");
            $(".searchIcon").removeClass("searchIcon_active");
        }
       if($(event.target).parents(".graphModal").length == 0
            && !$(event.target).is('[class^="commits-graph-branch-"]')
            && !$(event.target).hasClass("graphModal")) {
        	this.setMessageState();
        }
	},
	toggleForm: function () {
		this.setState({
			activeForm: !this.state.activeForm
		});
	},
	setMessageState: function (sha, commit) {
		sha = sha || null;
		commit = commit || null;
		this.setState({
			selectedSha: sha,
			selectedCommit: commit,
			activeMessage: sha !== null && commit !== null
        });
	},
	showInfo: function(x, y) {
		//if we clicked a node, get the position of the clicked commit node
		var halfScreenWidth = $(window).width() / 2;
		var halfModalWidth = $(".graphModal").width() / 2;
		var halfCircleWidth = 5;
		var scrollPos = halfScreenWidth + halfModalWidth;// + halfCircleWidth;
		$(".graphModal").css("left", x - halfScreenWidth).css("marginLeft", halfScreenWidth);
		$("#graph").animate({scrollLeft: x + halfModalWidth - halfScreenWidth}, 600);
	},
	retrieveRepo: function (username, repoName) {
		var update = this.updateCommitsGraph;
		OAuth.login(function (error, authData) {
			if (error) {
				console.log("Login Failed!", error);
				update(error);
			} else {
				//console.log("Authenticated successfully with payload:", authData);
				var helper = new GitHubHelper({token: authData.github.accessToken});
				helper.getAllCommitsInRepo(username, repoName, update);
			}
		});
	},
	updateCommitsGraph: function (error, commits) {
		if (error) {
			this.setState({
				repoError: ErrorHelper.parse(error)
			});
		} else {
			this.setState({
				repoError: null,
				commits: commits,
				activeForm: false
			});
		}
	},
	/**
	 * Returns the clicked commit. Pass this method to the CommitsGraph
	 * @param  {Object} commit The commit node clicked on
	 * @param  {Number} commit.x The x position of the node
	 * @param  {Number} commit.y The y position of the node
	 * @param  {String} commit.sha The sha of the commit associated with the node
	 * @param  {Object} commit.commit The commit object associated with the node
	 */
	handleCommitsClick: function (commit) {
		this.setMessageState(commit.sha, commit.commit);
		this.setState({
			repoError: null
		});
		this.showInfo(commit.x, commit.y);
		$(".graphModal__circle").attr("cy", commit.y + 41);
	},
	render: function () {
		var graph = null;
		if (this.state.commits) {
			graph = <CommitsGraph
					commits={this.state.commits || []}
					onClick={this.handleCommitsClick}
					selected={this.state.selectedSha}
					orientation='horizontal'
					x_step={40}
					y_step={40} />;
		} else {
			graph = <svg></svg>;
		}
		return (
			<div>
				<span className={"octicon octicon-search searchIcon" + (this.state.activeForm ? " searchIcon_active" : "")} onClick={this.toggleForm}></span>
				<RepoForm onRepoDisplayClick={this.retrieveRepo} active={this.state.activeForm} error={this.state.repoError} />
				{graph}
				<MessageView active={this.state.activeMessage} commit={this.state.selectedCommit} />
			</div>
			);
	}
});

module.exports = Container;
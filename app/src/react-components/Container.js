var React = require('react');
var OAuth = require('../helpers/OAuthHelper');
var GitHubHelper = require('../helpers/GitHubHelper');
var CommitsGraph = require('react-commits-graph');
var RepoForm = require('./RepoForm');
var MessageView = require('./MessageView');

var Container = React.createClass({
	getInitialState: function () {
		return {
			commits: null,
			selectedSha: null,
			selectedCommit: null,
			activeMessage: false
		};
	},
	componentDidMount: function() {
		/*Toggle the search modal*/
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
            console.log("not graph");
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
	showInfo: function() {
		//if we clicked a node, get the position of the clicked commit node
		var trigger = $(event.target);
		var x = trigger.position().left + trigger.width() + 10; //move over full node with + a little
		var y = trigger.position().top; //move over full node with + a little
		$(".graphModal").css("left", x).css("top", y);
		$("#graph").animate({scrollLeft: x - 20 + $("#graph").scrollLeft()}, 600);
	},
	retrieveRepo: function (username, repoName) {
		var update = this.updateCommitsGraph;
		OAuth.login(function (error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				var helper = new GitHubHelper({token: authData.github.accessToken});
				helper.getAllCommitsInRepo(username, repoName, update);
			}
		});
	},
	updateCommitsGraph: function (error, commits) {
		if (error) {
			this.setState({
				repoError: error
			});
		} else {
			this.setState({
				repoError: null,
				commits: commits,
				activeForm: false
			});
		}
	},
	handleCommitsClick: function (commit) {
		this.setMessageState(commit.sha, commit.commit);
		this.setState({
			repoError: null
		});
		this.showInfo();
	},
	render: function () {
		return (
			<div>
			<span className={"octicon octicon-search searchIcon" + (this.state.activeForm ? " searchIcon_active" : "")} onClick={this.toggleForm}></span>
			<RepoForm onRepoDisplayClick={this.retrieveRepo} active={this.state.activeForm} error={this.state.repoError} />
			<CommitsGraph
				commits={this.state.commits || []}
				onClick={this.handleCommitsClick}
				selected={this.state.selectedSha}
				orientation='horizontal'
				x_step={40}
				y_step={40} />
			<MessageView active={this.state.activeMessage} commit={this.state.selectedCommit} />
			</div>
			);
	}
});

module.exports = Container;
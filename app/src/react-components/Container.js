var React = require('react');
var CommitsGraph = require('react-commits-graph');
var RepoForm = require('./RepoForm');
var MessageView = require('./MessageView');

var Container = React.createClass({
	handleClick: function (commit) {
		this.setState({
			selectedSha: commit.sha,
			selectedCommit: commit.commit
		});
		this.showInfo();
	},
	retrieveRepo: function (username, repoName) {
		this.props.helper.getAllCommitsInRepo(username, repoName, this.updateCommitsGraph);
	},
	updateCommitsGraph: function (error, commits) {
		if (error) {
				alert(JSON.stringify(error));
			} else {
				this.setState({
					commits: commits
				});
			}
	},
	getInitialState: function () {
		return {
			commits: null,
			selectedSha: null,
			selectedCommit: null
		};
	},
	render: function () {
		return (
			<div>
				<RepoForm onRepoDisplayClick={this.retrieveRepo} />
				<CommitsGraph
					commits={this.state.commits || []}
					onClick={this.handleClick}
					selected={this.state.selectedSha}
					orientation='horizontal'
					x_step={40}
					y_step={40} />
				<MessageView commit={this.state.selectedCommit} />
			</div>
			);
	}, 
	showInfo: function() {
		//if we cliced a node, get the position of the clicked commit node
		var trigger = $(event.target);
		var x = trigger.position().left + trigger.width() + 10; //move over full node with + a little
		var y = trigger.position().top;
		$(".text-wrapper").addClass("active");
		$("#graph").animate({scrollLeft: x - 20 + $("#graph").scrollLeft()}, 600);//.addClass("blur");
	}
});

module.exports = Container;
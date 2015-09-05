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
	}
});

module.exports = Container;
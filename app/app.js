var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var CommitsGraph = require('react-commits-graph');

var helper = new GitHubHelper({username:'<GH USERNAME>', password:'<GH PERSONAL ACCESS TOKEN>'}, {});

var Container = React.createClass({
	handleClick: function (commit) {
		this.state.selectedSha = commit.sha;
		this.state.selectedCommit = commit.commit;
		this.props.repaint(this.props.commits);
	},
	getInitialState: function () {
		return {
			selectedSha: null,
			selectedCommit: null
		};
	},
	render: function () {
		return (
			<div>
				<CommitsGraph
					commits={this.props.commits}
					onClick={this.handleClick}
					selected={this.state.selectedSha}
					orientation='horizontal'
					x_step={40}
					y_step={40} />
				<div className="message">
					<p>
						{this.state.selectedCommit ? this.state.selectedCommit.message : 'none selected'}
					</p>
				</div>
			</div>
		);
	}
});


function render (commits) {
	React.render(
		React.createElement(Container, {repaint: render, commits: commits}),
		document.getElementById('content')
		);
}

helper.getAllCommitsInRepo('aaronsky', 'portfolio', function (error, commits) {
	if (error) {
		console.log(JSON.stringify(error));
	} else {
		console.log(commits.length);
		render(commits);
	}
});
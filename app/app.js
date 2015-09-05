var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var Container = require('./src/react-components/Container');

var helper = new GitHubHelper({username:'StephanieJurgiel', password:'6345a14820a7a0181c145a32552adb6623a959de'}, {});


React.render(
	<Container helper={helper} />, document.getElementById('content')
);

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
				
			</div>
		);
	}
});

/*
<div className="message">
					<p>
						{this.state.selectedCommit ? this.state.selectedCommit.message : 'none selected'}
					</p>
				</div>
				*/
function render (commits) {
	React.render(
		React.createElement(Container, {repaint: render, commits: commits}),
		document.getElementById('graph')
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

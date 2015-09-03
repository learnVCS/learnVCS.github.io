var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var CommitsGraph = React.createFactory(require('react-commits-graph'));

var helper = new GitHubHelper({username:'aaronsky', password:'5088de2c7b9d9643f785c64716d42e306ce1823b'}, {});

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
			React.DOM.div(null, [
				CommitsGraph({
					commits: this.props.commits,
					onClick: this.handleClick,
					selected: this.state.selectedSha,
					orientation: 'horizontal',
					x_step: 40,
					y_step: 40
				}),
				React.DOM.div(null,
					React.DOM.p(null, this.state.selectedCommit ? this.state.selectedCommit.message : 'none selected')
					)
				]
				)
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
		console.log(error);
	}
	console.log(commits.length);
	render(commits);
});
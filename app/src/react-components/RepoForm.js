var React = require('react');

var RepoForm = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var username = React.findDOMNode(this.refs.username).value.trim();
		var repoName = React.findDOMNode(this.refs.repo).value.trim();
		if (!username || !repoName) {
			return;
		}
		this.props.onRepoDisplayClick(username, repoName);
		React.findDOMNode(this.refs.username).value = '';
		React.findDOMNode(this.refs.repo).value = '';
		return;
	},
	render: function () {
		return (
			<form className="repoForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Username" ref="username" />
				<input type="text" placeholder="Repository" ref="repo" />
				<input type="submit" value="Display" />
			</form>
		);
	}
});

module.exports = RepoForm;
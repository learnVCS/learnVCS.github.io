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
		//React.findDOMNode(this.refs.username).value = '';
		//React.findDOMNode(this.refs.repo).value = '';
		return;
	},
	render: function () {
		var error = this.props.error || '<error here>';
		return (
			<div className={"searchModal" + (this.props.active ? " searchModal_active" : "")}>
				<h2 className="searchModal__header"> Enter Repository </h2>
				<img src="./media/ic_help_black_24px.svg" className="searchModal__help"/>
				<form className="repoForm" onSubmit={this.handleSubmit}>
					<div className="searchModal__fields">
						<div className="searchModal__fields__section">
							<label className="searchModal__fields__icon"><img src="./media/ic_perm_identity_black_24px.svg"/></label>
							<input type="text" className="searchModal__fields__text" placeholder="Github Repo Owner" ref="username"/>
						</div>
						<div className="searchModal__fields__section">
							<label className="searchModal__fields__icon"><img src="./media/ic_code_black_24px.svg"/></label>
							<input type="text" className="searchModal__fields__text" placeholder="Github Repo" ref="repo"/>
						</div>
					</div>
					<div className="searchModal__submit">
						<div className="searchModal__errors">
							<span className="searchModal__submit__error">{error}</span>
						</div>
						<input type="submit" value="submit" className="searchModal__submit__button"/>
					</div>
				</form>

			</div>
		);
	}
});

module.exports = RepoForm;
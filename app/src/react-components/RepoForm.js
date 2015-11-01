var React = require('react');

var RepoForm = React.createClass({
	getInitialState: function() {
		return {
			displayHelp: false
		};
	},
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
	handleHelpClick: function (e) {
		e.preventDefault();
		this.setState({
			displayHelp: true
		});
	},
	handleCloseHelpClick: function (e) {
		e.preventDefault();
		this.setState({
			displayHelp: false
		});
		console.log(this.state.activeForm);
	},
	render: function () {
		var error = this.props.error || '';
		var helpForm = (
			<div>
				<p>
					Go to GitHub repository you want to display and copy the
					name of the repository as well as the owner.
				</p>
				<img src="media/images/help-example.png" />
				<p>
					Go to GitHub repository you want to display and copy the 
					name of the repository as well as the owner
				</p>
				<a href="#" onClick={ this.handleCloseHelpClick }> &lt; Return to Form</a>
			</div>
		);
		var realForm = (
			<div>
				<h2 className="searchModal__header"> Enter Repository </h2>
				<form className="repoForm" onSubmit={this.handleSubmit}>
					<div className="searchModal__fields">
						<div className="searchModal__fields__section">
							<label className="searchModal__fields__icon">
								<img src="./media/ic_perm_identity_black_24px.svg"/>
							</label>
							<input type="text" className="searchModal__fields__text" placeholder="Github Repo Owner" ref="username"/>
						</div>
						<div className="searchModal__fields__section">
							<label className="searchModal__fields__icon">
								<img src="./media/ic_code_black_24px.svg"/>
							</label>
							<input type="text" className="searchModal__fields__text" placeholder="Github Repo" ref="repo"/>
						</div>
						<a href="#" onClick={this.handleHelpClick}>Need Help?</a>
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

		var contents;
		if (!this.state.displayHelp) {
			contents = realForm;
		} else {
			contents = helpForm;
		}

		return (
			<div className={"searchModal" + (this.props.active ? " searchModal_active" : "")}>
				{contents}
			</div>
		);
	}
});

module.exports = RepoForm;
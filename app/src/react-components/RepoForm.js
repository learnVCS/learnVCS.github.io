var React = require('react');
var RepoSubmitButton = require('./RepoSubmitButton');

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
	},
	render: function () {
		var error = this.props.error || '';
		var helpForm = (
			<div className="searchModal__contents">
				<div className="searchModal__top" onClick={this.props.closeForm}>
					<a href="#" className="searchModal__link" onClick={ this.handleCloseHelpClick }> &lt; Return to Form</a>
					<span className="mega-octicon octicon-x searchModal__close"></span>
				</div>
				<p className="searchModal__body">
					Go to GitHub repository you want to display and copy the
					name of the repository as well as the owner.
				</p>
				<img className="searchModal__image" src="media/images/help-example.png" />
				<p className="searchModal__body">
					Enter this information in the form to display a
					visualization of the project's commit history.
				</p>
			</div>
		);
		var realForm = (
			<div className="searchModal__contents">
				<div className="searchModal__top" onClick={this.props.closeForm}>
					<span className="mega-octicon octicon-x searchModal__close"></span>
				</div>
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
						<a className="searchModal__link searchModal__link--right" href="#" onClick={this.handleHelpClick}>Need Help?</a>
					</div>
					<RepoSubmitButton 
						isLoading={this.props.isLoading}
						error={error} />
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
			<div className="searchModal searchModal_active">
				{contents}
			</div>
		);
	}
});

module.exports = RepoForm;
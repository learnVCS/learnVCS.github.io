var React = require('react');

var RepoSubmitButton = React.createClass({
	render: function() {
		var text = ""
		if (this.props.isLoading) {
			text = (
      			<span className="octicon octicon-sync searchModal__loading"></span>
      		);
		} else {
			text = "submit";
		}
		// text = (
  //     		<span className="octicon octicon-sync searchModal__loading"></span>
  //     	);

		return (
			<div className="searchModal__submit">
				<div className="searchModal__errors">
					<span className="searchModal__submit__error">{this.props.error}</span>
				</div>
				<button type="submit" className="searchModal__submit__button">
					{text}
				</button>
			</div>
		);
	}
});

module.exports = RepoSubmitButton;
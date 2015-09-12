var React = require('react');

var MessageView = React.createClass({
	render: function () {
		var messageClassName = "graphModal"
		var headerClassName = "graphModal__header"
		var pClassName = "graphModal__p"
		var authorClassName = "graphModal__p graphModal__p__author"
		console.log("props: "+ this.props)
		if (this.props.active) {
			messageClassName += ' graphModal_active';

		}
		return (
			<div className={messageClassName}>
				<circle> </circle>
				<h2 className={headerClassName}> First Commit </h2>
				<p className={authorClassName}> 
					{this.props.commit ? this.props.commit.author.name : 'no author'}
				</p>
				<p className={pClassName}>
					{this.props.commit ? this.props.commit.message : 'none selected'}
				</p>
				<h3 className={headerClassName}> New </h3>
				<h3 className={headerClassName}> Changed </h3>
			</div>

		);
	}
});

module.exports = MessageView;
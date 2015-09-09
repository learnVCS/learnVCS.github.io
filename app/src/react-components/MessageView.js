var React = require('react');

var MessageView = React.createClass({
	render: function () {
		var messageClassName = "text-wrapper"
		if (this.props.active) {
			messageClassName += ' active';
		}
		return (
			<div className={messageClassName}>
				<p>
					{this.props.commit ? this.props.commit.message : 'none selected'}
				</p>
			</div>
		);
	}
});

module.exports = MessageView;
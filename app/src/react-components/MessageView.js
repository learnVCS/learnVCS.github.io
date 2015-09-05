var React = require('react');

var MessageView = React.createClass({
	render: function () {
		return (
			<div className="message">
				<p>
					{this.props.commit ? this.props.commit.message : 'none selected'}
				</p>
			</div>
		);
	}
});

module.exports = MessageView;
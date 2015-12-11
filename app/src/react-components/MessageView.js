var React = require('react');
var MessageViewCircle = require('./MessageViewCircle');

var MessageView = React.createClass({
	render: function () {
		var commit = this.props.commit || false;
		var message = commit ? commit.message : '';
		var firstLine = message.substr(0, message.indexOf("\n")) || message;
		return (
			<div className={'graphModal' + (this.props.active ? ' graphModal_active' : '')}>
				<MessageViewCircle color={this.props.color} />
				<div className="graphModal__content">
				<h2 className='graphModal__header'>{firstLine}</h2>
				<p className='graphModal__p graphModal__p__author'> 
					{commit ? commit.name : 'no author'}
				</p>
				<p className='graphModal__p'>
					{commit ? message : 'none selected'}
				</p>
				</div>
			</div>
		);
	}
});

module.exports = MessageView;
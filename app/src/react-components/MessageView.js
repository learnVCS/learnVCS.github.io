var React = require('react');

var MessageView = React.createClass({
	render: function () {
		var commit = this.props.commit || false;
		var message = commit ? commit.message : '';
		var firstLine = message.substr(0, message.indexOf("\n"));
		return (
			<div className={'graphModal' + (this.props.active ? ' graphModal_active' : '')}>
				<circle></circle>
				<h2 className='graphModal__header'>{firstLine}</h2>
				<p className='graphModal__p graphModal__p__author'> 
					{commit ? commit.name : 'no author'}
				</p>
				<p className='graphModal__p'>
					{commit ? message : 'none selected'}
				</p>
				<h3 className='graphModal__header'>New</h3>
				<h3 className='graphModal__header'>Changed</h3>
			</div>
		);
	}
});

module.exports = MessageView;
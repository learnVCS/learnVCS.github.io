var React = require('react');

var MessageView = React.createClass({
	
	render: function () {
		var commit = this.props.commit || false;
		var message = commit ? commit.message : '';
		var firstLine = message.substr(0, message.indexOf("\n"));
		return (
			<div className={'graphModal' + (this.props.active ? ' graphModal_active' : '')}>
				<svg className="graphModal__svg">
					<circle cx="0" cy="96" r="10" fill="white" className="graphModal__circle"></circle>
					<circle cx="0" cy="96" r="6" fill="red" className="graphModal__circle"></circle>
				</svg>
				<div className="graphModal__content">
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
			</div>
		);
	}
});

module.exports = MessageView;
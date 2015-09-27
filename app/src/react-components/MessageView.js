var React = require('react');

var MessageView = React.createClass({
	render: function () {
		return (
			<div className={'graphModal' + (this.props.active ? ' graphModal_active' : '')}>
				<circle> </circle>
				<h2 className='graphModal__header'> First Commit </h2>
				<p className='graphModal__p graphModal__p__author'> 
					{this.props.commit ? this.props.commit.author.name : 'no author'}
				</p>
				<p className='graphModal__p'>
					{this.props.commit ? this.props.commit.message : 'none selected'}
				</p>
				<h3 className='graphModal__header'> New </h3>
				<h3 className='graphModal__header'> Changed </h3>
			</div>

		);
	}
});

module.exports = MessageView;
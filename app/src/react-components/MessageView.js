var React = require('react');

var MessageView = React.createClass({
	
	getInitialState: function() {
		return { badgeExpand: "" };
	},

	componentDidMount: function() {

		// var _this = this;
		// window.requestAnimationFrame(function() {
		// 	console.log("bluh");
	 //    	var node = _this.getDOMNode();
	 //    	if (node !== undefined) {
	 //    	  //and scroll them!
	 //    	  node.classList.add("graphModal__circle--active");
	 //    	}
		// });
		this.setState({badgeExpand: " graphModal__circle--active"});
	},

	render: function () {
		var commit = this.props.commit || false;
		var message = commit ? commit.message : '';
		var firstLine = message.substr(0, message.indexOf("\n")) || message;
		return (
			<div className={'graphModal' + (this.props.active ? ' graphModal_active' : '')}>
				<svg className="graphModal__svg">
					<g>
						<circle cx="0"
								cy="96" 
								r="10" 
								fill="white"
								strokeWidth="4"
								stroke="black" 
								className="graphModal__circle graphModal__circle--active">
						</circle>
						<circle cx="0" 
								cy="96" 
								r="10" 
								fill={this.props.color || 'red'} 
								className="graphModal__circle">
						</circle>
					</g>
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
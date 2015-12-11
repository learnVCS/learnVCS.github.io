var React = require('react');

var MessageViewCircle = React.createClass({
    getInitialState: function () {
        return {
            animation: false,
            active: false
        };
    },
    componentDidMount: function() {
        window.addEventListener('animationend', this.handleAnimationEnd);
        window.addEventListener('webkitAnimationEnd', this.handleAnimationEnd);
    },
    componentWillUnmount: function() {
        window.removeEventListener('animationend', this.handleAnimationEnd);
        window.removeEventListener('webkitAnimationEnd', this.handleAnimationEnd);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({animation: true, active: false});
    },
    handleAnimationEnd: function (event) {
        this.setState({animation: false, active: true});
    },
    render: function () {
        var className = 'graphModal__circle';
        var radius = null;
        if (this.state.animation && !this.state.active){
            className += ' graphModal__circle--animating';
        } else if (this.state.active && !this.state.animation) {
            className += ' graphModal__circle--active';
            radius = "16";
        }
        return (
            <svg className="graphModal__svg">
              <g>
                <circle cx="0"
                    cy="96"
                    r={radius || "16"} 
                    fill="white"
                    strokeWidth="4"
                    stroke="black"
                    className={className}>
                </circle>
                <circle cx="0"
                    cy="96" 
                    r="10" 
                    fill={this.props.color || 'red'} 
                    className="graphModal__circle">
                </circle>
              </g>
            </svg>
        );
    }
});

module.exports = MessageViewCircle;


var React = require('react');
var GitHubHelper = require('./src/helpers/GitHubHelper');
var Container = require('./src/react-components/Container');

var helper = new GitHubHelper({username:'StephanieJurgiel', password:'77151d348159115145447ec7c2101c05ff4f646b'}, {});


React.render(
	<Container helper={helper} />, document.getElementById('graph')
);

var Container = React.createClass({
	handleClick: function (commit) {
		console.log("click in app js");
		this.state.selectedSha = commit.sha;
		this.state.selectedCommit = commit.commit;
		this.props.repaint(this.props.commits);
		this.showInfo();
	},
	getInitialState: function () {
		return {
			selectedSha: null,
			selectedCommit: null
		};
	},
	render: function () {
		return (
			<div>
				<CommitsGraph
					commits={this.props.commits}
					onClick={this.handleClick}
					selected={this.state.selectedSha}
					orientation='horizontal'
					x_step={40}
					y_step={40} />
				
			</div>
		);
	}, 
	showInfo: function() {
		//if we cliced a node, get the position of the clicked commit node
		var trigger = $(event.target);
		var x = trigger.position().left + trigger.width() + 10; //move over full node with + a little
		var y = trigger.position().top;
		$(".text-wrapper").addClass("active");
		$("#graph").animate({scrollLeft: x - 20 + $("#graph").scrollLeft()}, 600);//.addClass("blur");
	}
});

/*
<div className="message">
					<p>
						{this.state.selectedCommit ? this.state.selectedCommit.message : 'none selected'}
					</p>
				</div>
				*/
function render (commits) {
	React.render(
		React.createElement(Container, {repaint: render, commits: commits}),
		document.getElementById('graph')
		);
}

helper.getAllCommitsInRepo('aaronsky', 'portfolio', function (error, commits) {
	if (error) {
		console.log(JSON.stringify(error));
	} else {
		console.log(commits.length);
		render(commits);
	}
});

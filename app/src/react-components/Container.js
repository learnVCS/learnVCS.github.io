var React = require('react');
var OAuth = require('../helpers/OAuthHelper');
var ErrorHelper = require('../helpers/ErrorHelper');
var GitHubHelper = require('../helpers/GitHubHelper');
var CommitsGraph = require('react-commits-graph');
var localCommits = require('../local/commits.json');
var RepoForm = require('./RepoForm');
var RepoFormHelp = require('./RepoFormHelp');
var MessageView = require('./MessageView');

var localCommits = require('../local/commits.json');

var Container = React.createClass({
	getInitialState: function () {
		return {
			commits: localCommits,
			selectedSha: null,
			selectedCommit: null,
			selectedColor: null,
			activeMessage: false,
			loadingForm: false,
			isMobile: window.innerWidth < 480
		};
	},
	componentDidMount: function() {
		// Toggle the search modal
		window.addEventListener('resize', this.handleResize);

		$(".searchIcon").on("click", this.onSearchClick);
		$(":not(.searchModal)").click(this.onDocumentClick);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
		$(".searchIcon").unbind("click");
		$(document).unbind("click");
	},
	handleResize: function (e) {
		this.setState({
			isMobile: window.innerWidth < 480
		});
	},
	onSearchClick: function (e) {
		$(".searchIcon").toggleClass("searchIcon_active");
		$(".searchModal").toggleClass("searchModal_active");
	},
	onDocumentClick: function (event) {
		/* close search modal when clicking off of the element */
        if($(event.target).parents(".searchModal").length == 0
           && !$(event.target).hasClass("searchIcon")
           && !$(event.target).hasClass("searchModal")) {
            this.setState({
            	activeForm: false
            });
        }
        if ($(event.target).hasClass("searchModal__close")) {
            this.setState({
            	activeForm: false
            });
        }
       if($(event.target).parents(".graphModal").length == 0
            && !$(event.target).is('[class^="commits-graph-branch-"]')
            && !$(event.target).hasClass("graphModal")) {
        	this.setMessageState();
        }
	},
	toggleForm: function () {
		this.setState({
			activeForm: !this.state.activeForm
		});
	},
	setMessageState: function (commit) {
		if (commit) {
			this.setState({
				selectedSha: commit.sha || null,
				selectedCommit: commit.commit || null,
				selectedColor: commit.colour || null,
				selectedPos: { x: commit.x || 0, y: commit.y || 0 },
				activeMessage: commit.sha !== null && commit.commit !== null
    	});
		} else {
			this.setState({
				selectedSha: null,
				selectedCommit: null,
				selectedColor: null,
				selectedPos: { x: 0, y: 0 },
				activeMessage: false
    	});
		}
	},
	showInfo: function(x, y) {
		//if we clicked a node, get the position of the clicked commit node
		var halfScreenWidth = $(window).width() / 2;
		var halfModalWidth = $(".graphModal").width() / 2;
		var halfCircleWidth = 5;
		var scrollPos = halfScreenWidth + halfModalWidth;
		var graphHeight = ($(".graph__centered").height() - 13 - 1) * -1;
		/* set positioning of graph modal */		
		$(".graphModal").css("left", x - halfScreenWidth).css("marginLeft", halfScreenWidth).css("marginTop", graphHeight);
		/* scroll graph to node */ 
		$("#graph").animate({scrollLeft: x + halfModalWidth - halfScreenWidth}, 600);
	},
	retrieveRepo: function (username, repoName) {
		var update = this.updateCommitsGraph;
		this.setState({
			loadingForm: true
		});
		OAuth.login(function (error, authData) { 
			if (error) {
				console.log("Login Failed!", error);
				update(error);
			} else {
				//console.log("Authenticated successfully with payload:", authData);
				var helper = new GitHubHelper({token: authData.github.accessToken});
				helper.getAllCommitsInRepo(username, repoName, update);
			}
		});
	},
	updateCommitsGraph: function (error, commits) {
		if (error) {
			this.setState({
				loadingForm: false,
				repoError: ErrorHelper.parse(error)
			});
		} else {
			this.setState({
				repoError: null,
				commits: commits,
				activeForm: false,
				loadingForm: false
			});
		}
	},
	/**
	 * Returns the clicked commit. Pass this method to the CommitsGraph
	 * @param  {Object} commit The commit node clicked on
	 * @param  {Number} commit.x The x position of the node
	 * @param  {Number} commit.y The y position of the node
	 * @param  {String} commit.sha The sha of the commit associated with the node
	 * @param  {Object} commit.commit The commit object associated with the node
	 */
	handleCommitsClick: function (commit) {
		this.setMessageState(commit);
		this.setState({
			repoError: null
		});
		this.showInfo(commit.x, commit.y);
		$(".graphModal__circle").attr("cy", commit.y - 14);
	},
	render: function () {
		var searchForm = null;
		var messageView = null;
		if (this.state.activeForm) {
			searchForm = <RepoForm onRepoDisplayClick={this.retrieveRepo}
								   closeForm={this.onDocumentClick}
								   error={this.state.repoError} 
								   isLoading={this.state.loadingForm} />;
		}
		var graph = null;
		if (this.state.commits) {
			var nodeOffset = 40;
			var len = this.state.commits.length;
			var offset = 0;
			if (len * nodeOffset > window.innerWidth) {
			  	offset = this.state.isMobile ? 0 : window.innerWidth / 3;
			} else {
			  	offset = (window.innerWidth / 2) - ((len * nodeOffset) / 2);
			}
			graph = <CommitsGraph
					commits={this.state.commits || []}
					onClick={this.handleCommitsClick}
					selected={this.state.selectedSha}
					orientation='horizontal'
					x_step={nodeOffset}
					y_step={nodeOffset}
					offsetPos_x={offset} />;
		}
		return (
			<div>
				<span className={"octicon octicon-search searchIcon" + (this.state.activeForm ? " searchIcon_active" : "")} onClick={this.toggleForm}></span>
				{searchForm}
				<div className="graph__centered">
					{graph}
				</div>
				<MessageView 
											active={this.state.activeMessage} 
											commit={this.state.selectedCommit} 
											color={this.state.selectedColor}
											pos={this.state.selectedPos} />
			</div>
		);
	}
});

module.exports = Container;
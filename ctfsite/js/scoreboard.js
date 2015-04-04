var schoolLim = null;
var boardCache;
$(document).ready(function() {
	spark = new Spark(Handlebars);

	renderScoreboard = function(board) {
		board = board || boardCache;
		var score_entry = Handlebars.compile($("#score-entry").html());
		board.schoolLim = schoolLim;
		$("#body").html(score_entry(board))
	}
	getScoreboard();
})

lim = function(school) {
	schoolLim = school || null;
	renderScoreboard();
}

getScoreboard = function(cb) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET","/api/stats/scoreboard")
	xhr.onload = function() {
		boardCache = JSON.parse(xhr.response).data.groups[0];      //change to public when api is working
		renderScoreboard(JSON.parse(xhr.response).data.groups[0]);
	}
	xhr.send();
}

Handlebars.registerHelper("inc", function(value, options) {
	return parseInt(value)+1;
})

Handlebars.registerHelper("display", function(school, options) {
	if (schoolLim == null || schoolLim == school) {
		return options.fn(this);
	}
})

Handlebars.registerHelper("parity", function(number, options) {
	return ["even","odd"][parseInt(number)%2];
})


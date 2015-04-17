jQuery(function($) {
    var schoolLim, boardCache, lim,
    
    schoolLim = null;

    function renderScoreboard(board) {
        board = board || boardCache;
        var score_entry = Handlebars.compile($("#score-entry").html());
        board.schoolLim = schoolLim;
        $("#body").html(score_entry(board))
    }
    getScoreboard();

    tjctf.scoreboardLimit = function(school) {
        schoolLim = school || null;
        renderScoreboard();
    }

    function getScoreboard(cb) {
        tjctf.apiQuery('GET', '/api/stats/scoreboard')
            .done(function(json) {
                boardCache = {}
		boardCache.scoreboard = json.data.public;      //change to public when api is working
                renderScoreboard(boardCache);
            })
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
})

jQuery(function($) {
    var schoolLim, boardCache, renderScoreboard, lim, getScoreboard, spark
    
    schoolLim = null;
    spark = new Spark(Handlebars);

    renderScoreboard = function(board) {
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

    getScoreboard = function(cb) {
        tjctf.apiQuery('GET', '/api/stats/scoreboard')
            .done(function(json) {
                boardCache = json;      //change to public when api is working
                renderScoreboard(json);                
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

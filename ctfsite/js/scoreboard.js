jQuery(function($) {
    var schoolLim, lim, spark
    
    schoolLim = null;
    spark = new Spark(Handlebars);

    function renderScoreboard(board) {
        board = board || tjctf.board;
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
                tjctf.board = {
                    scoreboard: json.data.public,
                }
                renderScoreboard();
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

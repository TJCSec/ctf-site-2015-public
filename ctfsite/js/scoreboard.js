jQuery(function($) {
    var schoolLim, lim
    
    schoolLim = null;

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
    tjctf.apiQuery("GET","/api/stats/top_teams/score_progression").done(function(json) {
        var baseData = {
            labels: [],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(0, 159, 218, .5)",
                    strokeColor: "rgba(0, 159, 218, 1)",
                    highlightFill: "rgba(0, 159, 218, .75)",
                    highlightStroke: "rgba(0, 159, 218, 1)",
                    data: [],
                }
            ]
        };
        for (team in json.data) {
            baseData.labels.push(json.data[team].name)
            baseData.datasets[0].data.push(json.data[team].score_progression[0] || 0)
        }
        new Chart($("#chart").get(0).getContext("2d")).Bar(baseData, {})
    })
})

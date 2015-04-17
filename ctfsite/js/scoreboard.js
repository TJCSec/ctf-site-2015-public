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
    tjctf.apiQuery("GET","/api/stats/top_teams/score_progression").done(function(TopTeams) {
        tjctf.apiQuery("GET","/api/team").done(function(myTeam) {
            var baseData = {
                labels: [],
                datasets: [
                    {
                        label: "Top Teams",
                        fillColor: "rgba(0, 159, 218, .5)",
                        strokeColor: "rgba(0, 159, 218, 1)",
                        highlightFill: "rgba(0, 159, 218, .75)",
                        highlightStroke: "rgba(0, 159, 218, 1)",
                        data: [],
                    }
                ]
            };
            var teamIndex = -1;
            var myName = myTeam.data.team_name;
            for (team in TopTeams.data) {
                if (TopTeams.data[team].name == myName) {
                    teamIndex = team;
                }
                baseData.labels.push(TopTeams.data[team].name)
                baseData.datasets[0].data.push(TopTeams.data[team].score_progression[0] || 0)
            }
            if (teamIndex < 0 && myName) {
                teamIndex = 5;
                baseData.labels.push(myName);
                baseData.datasets[0].data.push(myTeam.data.score);
            }
            chart = new Chart($("#chart").get(0).getContext("2d")).Bar(baseData, {})
            if (teamIndex > 0) {	
                chart.datasets[0].bars[teamIndex].fillColor = "rgba(253, 63, 63, .5)";
                chart.datasets[0].bars[teamIndex].highlightFill = "rgba(253, 63, 63, .75)";
                chart.datasets[0].bars[teamIndex].strokeColor = "rgba(253, 63, 63, 1)";
                chart.datasets[0].bars[teamIndex].highlightStroke = "rgba(253, 63, 63, 1)";
                chart.update();
            }
        })
    })
})

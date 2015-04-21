jQuery(function($) {
    var schoolLim, lim
    
    schoolLim = null;

    function renderScoreboard(board) {
        board = board || tjctf.board;
        var score_entry = Handlebars.compile($("#score-entry").html());
        board.schoolLim = schoolLim;
        $("#body").html(score_entry(board))
    }

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
                console.log(json)
                renderScoreboard();
            }).error(function(err) {
                console.log(arguments)
            })
    }
    a = getScoreboard
    getScoreboard();

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

    $.when(
        tjctf.apiQuery('GET', '/api/stats/top_teams/score_progression'),
        tjctf.apiQuery('GET', '/api/team')
    )
        .done(function(TopTeams, myTeam) {
            TopTeams = TopTeams[0]
            myTeam = myTeam[0]
            var baseData, teamIndex, myName, team, chart
            baseData = {
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
            teamIndex = -1;
            myName = myTeam.data.team_name;
            for (team in TopTeams.data) {
                if (TopTeams.data[team].name == myName) {
                    teamIndex = team;
                }
                baseData.labels.push(TopTeams.data[team].name)
                baseData.datasets[0].data.push(TopTeams.data[team].score_progression.slice(-1)[0].score || 0)
            }
            if (teamIndex < 0 && myName) {
                teamIndex = 5;
                baseData.labels.push(myName);
                baseData.datasets[0].data.push(myTeam.data.score);
            }
            a = baseData
            b = TopTeams
            tjctf.chart = new Chart($("#chart").get(0).getContext("2d")).Bar(baseData, {})
            if (teamIndex > 0) {	
                tjctf.chart.datasets[0].bars[teamIndex].fillColor = "rgba(253, 63, 63, .5)";
                tjctf.chart.datasets[0].bars[teamIndex].highlightFill = "rgba(253, 63, 63, .75)";
                tjctf.chart.datasets[0].bars[teamIndex].strokeColor = "rgba(253, 63, 63, 1)";
                tjctf.chart.datasets[0].bars[teamIndex].highlightStroke = "rgba(253, 63, 63, 1)";
                tjctf.chart.update();
            }
        })
})

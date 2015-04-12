jQuery(function($) {
    var teamTmpl = Handlebars.compile($("#team-template").html())
    var achievementTmpl = Handlebars.compile($("#achievement-template").html())

    tjctf.apiQuery('GET', '/api/team')
        .done(function(json) {
            $("#team-box").html(teamTmpl({team: json.data}))
        })

    tjctf.apiQuery('GET', '/api/achievements')
        .done(function(json) {
            $("#achievement-box").html(achievementTmpl({achievements: json.data}))
        })
})

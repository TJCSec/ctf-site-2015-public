jQuery(function($) {
    var teamTmpl = Handlebars.compile($("#team-template").html())
    var achievementTmpl = Handlebars.compile($("#achievement-template").html())
    var shellAccessTmpl = Handlebars.compile($('#shell-access-template').html())
    var passwordForm = $("#change-password-form")
    var passwordFields = passwordForm.find('input, select')
    var shellAccessBox = $('#shell-access')

    tjctf.apiQuery('GET', '/api/team')
        .done(function(json) {
            $("#team-box").html(teamTmpl({team: json.data}))
        })

    tjctf.apiQuery('GET', '/api/achievements')
        .done(function(json) {
            $("#achievement-box").html(achievementTmpl({achievements: json.data}))
        })

    $('#shell-show-info').on('click', function(e) {
        e.preventDefault()

        tjctf.apiQuery('GET', '/api/user/shell')
            .done(function(json) {
                if (json.status) {
                    shellAccessBox.html(shellAccessTmpl(json.data))
                } else {
                    $(e.target).apiNotify(json)
                }
            })
    })

    $('#logout-button').on('click', function(e) {
        e.preventDefault()

        tjctf.apiQuery('GET', '/api/user/logout')
            .done(function(json) {
                tjctf.notify(json, '/')
            })
    })

    $("#change-password-form").on('submit', function(e) {
        e.preventDefault()

        tjctf.apiQuery('POST', '/api/user/update_password', passwordFields.serialize())
            .done(function(json) {
                tjctf.notify(json, '/settings')
            })
    })
})

jQuery(function($) {
    var form = $('#registration-form')
    var fields = form.find('input, select')
    var newTeacher = form.find('#create-new-teacher')
    var newTeam = form.find('#create-new-team')

    var options = form.find('.team-option-dropdown')
    var teamButtons = form.find('.team-style-button')

    function selectTeamOption(option) {
        var selected = $("#"+option+"-information")
        newTeam.val((option === 'team-create')+'')
        newTeacher.val((option === 'team-teacher')+'')
        options.find('input').prop('required', false)
        selected.find('input').prop('required', true)
        options.slideUp({queue: false})
        selected.css('height','')
        selected.slideDown({queue: false})
    }

    teamButtons.on('click', function(e) {
        selectTeamOption($(e.currentTarget).val())
    })

    form.on('submit', function(e) {
        e.preventDefault()

        var data = fields.serialize()
        data['ctf-emails'] = 'true'

        tjctf.apiQuery('POST', '/api/user/create', data)
            .done(function(data) {
                options.filter(':visible').find('button[type="submit"]')
                    .apiNotify(data, data['create-new-teacher'] === 'true' ? '/classroom' : '/team')
            })
    })
})
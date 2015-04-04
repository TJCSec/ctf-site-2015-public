jQuery(function($) {
    var form = $('#registration-form')
    var fields = form.find('input, select')
    var backgroundField = form.find('#background')
    var teacherButton = form.find('#team-teacher-button')
    var newTeacher = form.find('#create-new-teacher')
    var newTeam = form.find('#create-new-team')

    var options = form.find('.team-option-dropdown')
    var teamButtons = form.find('.team-style-button')

    function selectTeamOption(option) {
        var nextOption = $("#"+option+"-information")
        var prevOption = $(options).filter(':visible')
        newTeam.val((option === 'team-create')+'')
        newTeacher.val((option === 'team-teacher')+'')
        prevOption.find('input')
            .prop('required', false)
        prevOption.slideUp({queue: false}).promise()
            .done(function() {
                nextOption.find('input')
                    .prop('required', true)
                nextOption
                    .css('height', '')
                    .slideDown({queue: false})
            })
    }

    function showTeamButtons() {
        var teacher = backgroundField.find('option:selected').data('teacher')
        if (teacher) {
            teacherButton.show()
        } else {
            teacherButton.hide()
        }
    }

    backgroundField.on('change', showTeamButtons)

    teamButtons.on('click', function(e) {
        selectTeamOption($(e.currentTarget).val())
    })

    form.on('submit', function(e) {
        e.preventDefault()

        var data = fields.serialize()
        data['ctf-emails'] = 'true'

        tjctf.apiQuery('POST', '/api/user/create', data)
            .done(function(data) {
                $(options).filter(':visible').find('button[type="submit"]')
                    .apiNotify(data, data['create-new-teacher'] === 'true' ? '/classroom' : '/team')
            })
    })

    showTeamButtons()
})
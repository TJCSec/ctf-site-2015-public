jQuery(function($) {
    var loginForm = $('#login-form')
    var loginFields = loginForm.find('input, select')
    var loginButton = loginForm.find('button[type="submit"]')
    var resetButton = loginForm.find('#password-reset-button')

    loginForm.on('submit', function(e) {
        e.preventDefault()
        tjctf.apiQuery('POST', '/api/user/login', loginFields.serialize())
            .done(function(json) {
                loginButton.apiNotify(json, '/settings')
            })
    })

    resetButton.on('click', function(e) {
        e.preventDefault()
        tjctf.apiQuery('GET', '/api/user/reset_password', loginFields.serialize())
            .done(function(json) {
                resetButton.apiNotify(json)
            })
    })
})

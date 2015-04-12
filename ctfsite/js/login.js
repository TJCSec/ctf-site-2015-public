jQuery(function($) {
    var loginForm = $('#login-form')
    var loginFields = loginForm.find('input, select')
    var loginButton = loginForm.find('#login-button')

    loginForm.on('submit', function(e) {
        e.preventDefault()
        tjctf.apiQuery('POST', '/api/user/login', loginFields.serialize())
            .done(function(json) {
                loginButtom.apiNotify(json, '/settings')
            })
    })
})

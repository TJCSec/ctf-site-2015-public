jQuery(function($) {
    var token = window.location.hash

    if (!token || token.length < 5) {
        window.location = '/'
    }

    var resetForm = $('#reset-form')
    var tokenField = resetForm.find('#reset-token')
    var resetFields = resetForm.find('input, select')
    var submitButton = resetForm.find('button[type="submit"]')

    resetForm.on('submit', function(e) {
        e.preventDefault()
        tjctf.apiQuery('POST', '/api/user/confirm_password_reset', resetFields.serialize())
            .done(function(json) {
                submitButton.apiNotify(json, '/login')
            })
    })
})

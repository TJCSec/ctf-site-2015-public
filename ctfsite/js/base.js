// Sets up window.tjctf

;(function($) {
    var B = function() {
    }

    function notifyClass(data) {
        switch (data.status) {
            case 0:
            case false:
            case 'error':
                return 'error'
            case 1:
            case true:
            case 'success':
                return 'success'
            default:
                return 'info'            
        }
    }

    B.prototype.notify = function(data, redirect, config) {
        config = config || {}
        config.className = notifyClass(data)
        var ret = $.notify(data.message, config)
        if (redirect && config.className === 'success') {
            setTimeout(function() {
                window.location = redirect
            }, 1000)
        }
        return ret
    }

    B.prototype.apiQuery = function(type, url, data) {
        data = data || {}
        if (type === 'POST') {
            data.token = $.cookie('token')
        }
        return $.ajax({
            cache: false,
            dataType: 'json',
            url: url,
            type: type,
            data: data,
        })
            .fail(function() {
                window.tjctf.notify({
                    message: "The server is currently down. Don't worry. We're trying to fix it.",
                    status: 0,
                })
            })
    }

    B.prototype.logout = function() {
        window.tjctf.apiQuery('GET', '/api/user/logout')
            .done(function(data) {
                window.location = data.status ? '/' : '/login'
            })
    }

    jQuery.fn.serialize = function() {
        var keys = {}
        this.each(function() {
            if (this.name && this.value) {
                keys[this.name] = this.value
            }
        })
        return keys
    }

    jQuery.fn.apiNotify = function(data, redirect, config) {
        config = config || {}
        config.className = notifyClass(data)
        var ret = $(this).notify(data.message, config)
        if (redirect && config.className === 'success') {
            setTimeout(function() {
                window.location = redirect
            }, 1000)
        }
        return ret
    }

    window.tjctf = new B()
})(jQuery)

jQuery(function($) {
    var statusChecks = tjctf.statusChecks || []

    function checkHardRedirects() {
        statusChecks.forEach(function(check) {
            if (check.hard) {
                setTimeout(function() {
                    window.location = url
                }, 1000)
            }
        })        
    }

    tjctf.apiQuery('GET', '/api/user/status')
        .done(function(data) {
            if (data.status === 1) {
                tjctf.userStatus = data.data
                statusChecks.forEach(function(check) {
                    if (!!data.data[check.key] === !!check.state) {
                        window.location = check.url
                    }
                })
                if (data.data.logged_in) {
                    $(document.body).addClass('logged-in')
                }
            } else {
                checkHardRedirects()
            }
        })
        .fail(checkHardRedirects)
})

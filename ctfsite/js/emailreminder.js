jQuery(function($) {
    var reValidEmail = (function() { // Credits to http://stackoverflow.com/a/16016476/3795615
        var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
        var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
        var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
        var sQuotedPair = '\\x5c[\\x00-\\x7f]';
        var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
        var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
        var sDomain_ref = sAtom;
        var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
        var sWord = '(' + sAtom + '|' + sQuotedString + ')';
        var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
        var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
        var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
        var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

        return new RegExp(sValidEmail);
    })()

    var validateEmail = function me(email) {
        return reValidEmail.test(email)
    }

    $('#submit').on('click', function() {
        var email, emailEl

        emailEl = $('#email')
        email = emailEl.val()

        if (validateEmail(email)) {
            emailEl.val('')
            $.post('/addEmail', {
                email: email,
            }, function() {
                emailEl
                    .attr('placeholder', 'Added')
                    .css('background-color', 'rgba(44, 240, 44, 0.6)')
            })
        } else {
            emailEl.css('background-color', 'rgba(44, 240, 44, 0.6')
        }
        setTimeout(function() {
            emailEl.css('background-color', '#1a7a9d')
        }, 150)
    })
})

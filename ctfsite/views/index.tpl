<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TJCTF 2015 - Home</title>
    <link rel="stylesheet" href="fonts/laconic/stylesheet.css">
    <link href='http://fonts.googleapis.com/css?family=Oxygen+Mono' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.8.1/semantic.min.css">
    <link rel="stylesheet" href="css/style.css">
    <!--debug-->
    <script src="scripts/jquery.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.8.1/semantic.min.js"></script>
    <script>
        submit = function() {
            var emailEl = $("#email");
            var email = emailEl.val();
            var regex = email.match(/([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]+)/)
            if (regex) {
                emailEl.val("");
                emailEl.attr('placeholder', 'Added');
                emailEl.css("background-color","rgba(44,240,44,0.6)");
                setTimeout(function() {
                    emailEl.css("background-color","#1A7A9D")
                },150)
                $.post("/addEmail", {email: email});
            } else {
                emailEl.css("background-color","rgba(240,44,44,0.6)");
                setTimeout(function() {
                    emailEl.css("background-color","#1A7A9D")
                },150)
            }
           
        }

        $(window).load(function() {
            $("#submit").click(submit);
        })
    </script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-59195186-1', 'auto');
        ga('send', 'pageview');
    </script>
</head>
<body>
    <div class="hero">
        <div class="background"></div>
        <div class="crt"></div>
        <img src="img/logo.svg" class="logo">
        <img src="img/giantLogo.svg" class="giant-logo">
        <h1>TJCTF</h1>
        <div class="info">
            <div class="dates">April 20-26, 2015</div>
            <div class="description">
                Put your hacking skills to the test in this online cybersecurity competition. Win prizes while developing your computer science skills!
            </div>
            <div class="email">
                Sign up for an email reminder before the competition:<br>
                <input type="email" placeholder="Your Email" id="email" spellcheck='false'><input id="submit" type="submit">
            </div>
        </div>
    </div>
    
    <div class="ui padded stackable grid main-content">
       <div class="five column centered row questions">
           <div class="column">
                <h2 class="ui header">What is TJCTF?</h2>
                TJCTF is a cybersecurity competition designed for high school students. Challenges will span various difficulty levels, so there will be problems for students who are new to computer science as well as those who are computer security experts.
                <br>
                <a href="/about">More Info &rarr;</a>
            </div>
            <div class="column">
                <h2 class="ui header">How do I register?</h2>
                TJCTF is open to all United States high school students. Students will compete on teams of up to four members, and will have just over a week to earn as many points as possible. Register using the form below and invite your friends to compete!
                <br>
                <!--a href="#">Registration Form &rarr;</a-->
                <span class="disabled">Registration is not yet open</span>
            </div>
            <div class="column">
                <h2 class="ui header">How does TJCTF work?</h2>
                TJCTF is simple. Your team is given 8 days to solve as many of the 50 provided challenges as possible. The object of each challenge is to find a short string called the "flag" by solving a computer security puzzle. You'll know when you've found it. Each flag you find earns you points and the teams with the most points win.
                <br>
                <a href="/rules">Official Rules &rarr;</a>
            </div>
            <div class="column">
                <h2 class="ui header">How do I prepare?</h2>
                TJCTF has challenges for computer science students with all levels of experience, so preparation shouldn't be necessary, but if you'd like to brush up on computer security to give your team a competitive edge, we've compiled helpful materials for review available at the link below.
                <br>
                <a href="/prepare">Preparation Materials &rarr;</a>
            </div>
        </div>
        <div class="five column centered row problem-types">
            <h2 class="ui header">Problem Types</h2>
            <div class="center aligned column">
                <h3 class="ui icon header">
                    <i class="lock icon"></i>
                    <div>
                        Cryptography
                        <div class="sub header">
                            Erirefr naq qrpbqr pvcuref naq pbqrf                        
                        </div>
                    </div>
                </h3>
            </div>
            <div class="center aligned column">
                <h3 class="ui icon header">
                    <i class="wrench icon"></i>
                    <div>
                        Reverse Engineering
                        <div class="sub header">
                            AAAAAAAA<br>
                            AAAAAAAB<br>
                            AAAAAAAC<br>
                        </div>
                    </div>
                </h3>
            </div>
            <div class="center aligned column">
                <h3 class="ui icon header">
                    <i class="globe icon"></i>
                    <div>
                        Web &amp; Networking
                        <div class="sub header">
                            http://tjctf.org?<br>getfile=/etc/shadow&<br>reason=find+web+vulns
                        </div>
                    </div>
                </h3>
            </div>
            <div class="center aligned column">
                <h3 class="ui icon header">
                    <i class="code icon"></i>
                    <div>
                        Miscellaneous
                        <div class="sub header">
                            Wait, is there a tarball in my image?
                        </div>
                    </div>
                </h3>
            </div>
        </div>
        <div class="centered row prizes">
            <h2 class="ui header">Prizes</h2>
            <div class="sixteen wide center aligned column"><!--Prizes for TJCTF are generously sponsored by the following companies-->Prize information coming soon!</div>
            <div class="eight wide center aligned column sponsors">
                <div class="ui small images">
                    <!--img src="https://www.facebook.com/images/fb_icon_325x325.png" alt="Facebook Logo">
                    <img src="http://www.bucknellosc.tk/images/github-logo.png" alt="Github Logo">
                    <img src="http://c93fea60bb98e121740fc38ff31162a8.s3.amazonaws.com/wp-content/uploads/2014/12/digital-ocean.png" alt="DigitalOcean Logo"-->
                </div>
            </div>
        </div>
        <!--div class="centered row signup">
            <h2 class="ui header">Register</h2>
            <div class="five wide column">
                <div class="ui form">
                    <div class="two fields">
                        <div class="field">
                            <label>First Name</label>
                            <input type="text" placeholder="First Name">
                        </div>
                        <div class="field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Last Name">
                        </div>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input type="text" placeholder="Email">
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <label>Confirm Password</label>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" placeholder="Confirm Password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" id="send-me-email">
                            <label for="send-me-email">Send me a reminder email before the contest</label>
                        </div>
                    </div>
                    <input type="submit" value="Register" class="ui button">
                    
                </div>
            </div>
        </div-->
        
    </div>
</body>
</html>
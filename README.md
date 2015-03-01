#TJCTF Promo Website
-------------------
The official home for the rewrite of the promotional site for [TJCTF](http://tjctf.org). Site is written in python using the bottle framework, sitting on top of sqlite and ideally behind nginx, and gunicorn, which is included in the requirements file.

##Installation
--------------
The easiest way to run the site is in a virtualenv, set up with python3.3. In the virtualenv, run:

    pip install -r requirements.txt
    
Then you need to create the database and install the schema. The schema is included; to create the db run:

    touch /path/to/db/tjctf.sqlite
    sqlite3 /path/to/db/tjctf.sqlite < db.schema


##Configuration
---------------
All necessary configuration options are included in a default configuration file; create your own .cfg and pass it to the application in order to override those values. You **MUST** override the sendgrid credentials for the app to work; they are not stored in the repo. Also, relocating the database is recommended if you want to get to it from other applications.

##Operation
-----------
You can use the site in two different modes, debug and production.

###Debug
--------
To run the site in debug mode, run:

    python server.py [-h] [--host HOST] [-p PORT] [-d] [-c CONFIG]

Use the command line options to select host, port, debug on, and a config file in that order.

###Production
-------------
To run the site in production mode, run:

    gunicorn 'ctfsite:setup_app("path/to/config/custom.cfg")'
    
I suppose this counts as a hack, but we need to pass config stuff to the app and this works just fine. Add additional options to gunicorn as desired. 

###Adding/editing pages
---------------
Adding pages (of static content, that is) and editing existing pages is a fairly trivial process. Each page has its contents in the ctfsite/content directory written in markdown, with some metadata. Editing the markdown and restarting the site should be enough to incorporate any changes an editions. If you create a page, remember to create the corresponding route in ctfsite/views.py.
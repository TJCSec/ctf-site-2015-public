from bottle import route, static_file, request, template as view
from ctfsite import app
import sendgrid
import re
import time

# configure the sendgrid client
sg = sendgrid.SendGridClient(
	app.config['sendgrid.username'], app.config['sendgrid.password'])

# set up all our default pages
@app.route('/')
def index(): return view('index')

@app.route('/about')
def about(): return view('about')

@app.route('/prepare')
def prepare(): return view('prepare')

@app.route('/rules')
def rules(): return view('rules')

# set up the email add form
@app.route('/addEmail', method='POST')
def add_email(db):
	# grab form fields
	address = request.forms.get('email')
	epoch_time = int(time.time())

	# simple email regex
	regex = re.compile('([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]+)')

	if regex.match(address):
		# see if user exists in the db
		row = db.execute('SELECT * FROM subscribers WHERE address=?', (address,)).fetchone()

		if not row:
			# add the user
			db.execute('INSERT INTO subscribers VALUES (?, ?)', (epoch_time, address))

			# create the welcome message
			welcome_message = sendgrid.Mail()
			welcome_message.add_to(address)
			welcome_message.set_from('announcements@tjctf.org')
			welcome_message.set_from_name('TJCTF Announcements')
			welcome_message.set_subject('Welcome to TJCTF!')
			welcome_message.set_html(view('email_welcome'))

			# send the welcome message
			sg.send(welcome_message)

# routes for static files used in TESTING ONLY
# production server uses nginx for these routes
@app.route('/fonts/laconic/<filename>')
def fonts(filename):
	return static_file(filename, root='./ctfsite/static/fonts/laconic')
@app.route('/css/<filename>')
def css(filename):
	return static_file(filename, root='./ctfsite/static/css')
@app.route('/img/<filename>')
def img(filename):
	return static_file(filename, root='./ctfsite/static/img')
@app.route('/js/<filename>')
def js(filename):
	return static_file(filename, root='./ctfsite/static/js')
@app.route('/images/<filename>')
def images(filename):
	return static_file(filename, root='./ctfsite/static/images')
@app.route('/scripts/<filename>')
def scripts(filename):
	return static_file(filename, root='./ctfsite/static/scripts')
@app.route('/favicon.ico')
def favicon():
	return static_file('favicon.ico', root='./ctfsite/static')
@app.route('/google4fc29faedd5d3194.html')
def google():
	return static_file('google4fc29faedd5d3194.html', root='./ctfsite/static')
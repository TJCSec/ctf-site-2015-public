import os
import bottle
import bottle.ext.sqlite
import markdown
import sendgrid

# new Bottle app
app = bottle.Bottle()

def setup_app(config_file):

	# figure out where we are
	ctfsite_path = os.path.dirname(os.path.abspath(__file__))

	# load default and custom config files
	app.config.load_config(os.path.join(ctfsite_path, 'default_config.cfg'))
	if config_file:
		app.config.load_config(config_file)

	# configure and add the sqlite plugin to the app
	sqlite_plugin = bottle.ext.sqlite.Plugin(dbfile=
			app.config['sqlite.db'] if os.path.isabs(app.config['sqlite.db'])
			else os.path.join(ctfsite_path, app.config['sqlite.db']))
	app.install(sqlite_plugin)

	# set up some variables for creating templates
	bottle.TEMPLATE_PATH = [os.path.join(ctfsite_path, './views')]
	bottle.CONTENT_PATH	= os.path.join(ctfsite_path, './content')

	# views.py needs ctfsite.app, so this import comes after app is created
	import ctfsite.views

	# look at every markdown file in the content directory
	for content in os.listdir(bottle.CONTENT_PATH):

		# use the parser to also get metadata that we need
		m = markdown.Markdown(extensions=['markdown.extensions.meta'])
		md = open(os.path.join(bottle.CONTENT_PATH, content)).read()

		# get information from the compiled template
		content = m.convert(md)
		title = m.Meta['title'][0]
		base_template = m.Meta['base_template'][0]
		output_name = m.Meta['output_name'][0]

		# create compiled file
		html = bottle.template(base_template, content=content, title=title)
		with open(os.path.join(bottle.TEMPLATE_PATH[0], output_name), 'w') as f:
			f.write(html)
			f.close()

	return app
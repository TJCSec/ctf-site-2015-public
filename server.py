import argparse
import ctfsite

# read some command line arguments
p = argparse.ArgumentParser()
p.add_argument('--host', default='0.0.0.0')
p.add_argument('-p', '--port', default='5000')
p.add_argument('-d', '--debug', action='store_true', default='False')
p.add_argument('-c', '--config', default=None)
args = p.parse_args()

# create app with given specification, including render content
app = ctfsite.setup_app(args.config)

# run app with specified args
app.run(host=args.host, port=args.port, debug=args.debug)
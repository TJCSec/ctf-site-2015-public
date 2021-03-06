# TJCTF Promo Website
-------------------
The official home for the rewrite of the promotional site for [TJCTF](http://tjctf.org). Site is written with [Jekyll](http://jekyllrb.com) and the [picoCTF platform](http://picoctf.com). The platform runs the `/api` endpoint and everything else is static generated by Jekyll. An nginx conf has yet to be written to properly serve the site.

## Notes
--------------

1. Ensure that there is a cookie domain so that Flask can save sessions
2. Double check all the config in `api/api/config.py` before deploying

## Git
--------------

### Branches

* `master` is the main branch for the site. Should *NOT* contain any sensitive information or keys
* `site` is the branch that contains important keys. This branch should *NEVER* be merged into any other branches
* `prejekyll` really should be a tag. It is the site before the switch to Jekyll

There should be no other branches :)

### Git Flow

The basic steps are listed below. They are described in more detail afterwards.

1. Update master
2. Use a work branch
3. Clean up your work before sharing
4. Pull request so that people get notified
5. Clean up your workspace to start again

When doing work, always make sure to update and checkout a new branch. This way, we keep the main branch clean.

    git checkout master
    git pull origin master
    git checkout -b my-work-branch

Before committing to the main branch, clean up your work and make sure it will fit in nicely

    git checkout master
    git pull origin master
    git checkout my-work-branch
    git rebase --interactive master

Repeat the rebase until you have achieved work that follows a nice linear history. Make sure that you are only committing the files that you want to be committed, and not some other strange files. You really should be `git add`ing the files and not `git commit -a` of all the files.

After your work is nice and rebased after the most recent master, pull request the changes so that everyone else who is working gets notified

    git push origin my-work-branch

On github, pull request with master as the main branch and your work branch as the compare branch. If it says that your branch cannot be automatically merged, then you did something wrong. Get rid of your remote branch

    git push origin :my-work-branch

and ry the clean-up steps again (`pull origin master` and `rebase --interactive master`).

Once you automatically merge your work branch, make sure to delete it either from the github interface or locally.

Then, clean up your workspace.

    git checkout master
    git pull origin master
    git branch --delete my-work-branch

## Installation
--------------
First, make sure that you have all the ruby gems (you need Ruby and Bundler to do this)

    bundle install

Server side installation coming soon...

## Configuration
---------------
The static site runs in the `ctfsite` directory. This is the jekyll base directory. Jekyll configuration will be in `ctfsite/_config.yml`.

## Operation
-----------
You can use the static site without the API using Jekyll built-in tools

    cd ctfsite
    jekyll serve --watch --destination ../tmp

## Adding Content
---------------
Refer to the Jekyll documentation for more information. Here is a brief overview.

### Pages
---
Anything in the `ctfsite` directory will be copied over as static content. If any files contain the YAML FrontMatter

    ---
    # Yaml document
    ---

then those files will be processed by Jekyll and not just copied. Any named values in the front matter will be available to the [Liquid](http://liquidmarkup.org/) templating language under the `page` namespace. All files get templated before getting translated (I think).

These documents can be markdown, textile, or plain (HTML).

Liquid includes go in the `_includes` directory and layouts go in the `_layouts` directory. 

Example page.md:

    ---
    title: My Great Page
    layout: default
    post_scripts: [] # Include urls to local '/url/to/script.js' or exterior '//rawgit.com/script.js' scripts
    stylesheets: [] # Include urls to local or exterior css stylesheets
    ---

    # Markdown

    Is getting rendered on this page named {{ page.title }}

### Styles
---

Styles go in the `css` directory. `css/main.scss` is included on every page.

Any sass files with yaml front matter are automatically compiled into css. Sass partials with the `@import` directive should go in the `_sass` directory.

Try to keep styles modularized by making an `@import` with a sass partial in `_sass`. 

### Scripts
---

Coffeescript is supported out of the box if you include yaml front matter. All scripts should go in the `js` directory. To use the script, just add the url to the `post_scripts` list in the front matter.

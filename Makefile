#!/usr/bin/env bash -c make

SRC=./menge.js
LINTSRC=./*.js ./*.json ./test/*.js
DEST=./dist/menge.min.js
UGLIFYJS=./node_modules/.bin/uglifyjs
JSDOC=./node_modules/.bin/jsdoc
MOCHA=./node_modules/.bin/mocha
JSHINT=./node_modules/.bin/jshint

DOCS_DIR=./gh-pages
DOC_HTML=./gh-pages/module-menge.html
DOCS_CSS_SRC=./assets/jsdoc.css
DOCS_CSS_DEST=./gh-pages/styles/jsdoc-default.css

all: $(DEST) jsdoc

clean:
	rm -fr $(DEST)

$(DEST): $(SRC)
	$(UGLIFYJS) $(SRC) -c -m -o $(DEST)

test: jshint $(DEST)
	$(MOCHA) -R spec test/*.js
	MENGEJS=../dist/menge.min.js $(MOCHA) -R spec test/*.js

jshint:
	$(JSHINT) $(LINTSRC)

jsdoc: $(DOC_HTML)

$(DOC_HTML): README.md $(SRC) $(DOCS_CSS_SRC)
	mkdir -p $(DOCS_DIR)
	$(JSDOC) -d $(DOCS_DIR) -R README.md $(SRC)
	rm -f $(DOCS_DIR)/*.js.html
	cat $(DOCS_CSS_SRC) >> $(DOCS_CSS_DEST)
	for f in $(DOCS_DIR)/*.html; do sed 's#</a> on .* 201.* GMT.*##' < $$f > $$f~ && mv $$f~ $$f; done
	for f in $(DOCS_DIR)/*.html; do sed 's#<a href=".*.js.html">.*line.*line.*</a>##' < $$f > $$f~ && mv $$f~ $$f; done

.PHONY: all clean test jshint jsdoc

#!/usr/bin/env bash -c make

SRC=./menge.js
DEST=./dist/menge.min.js
UGLIFYJS=./node_modules/.bin/uglifyjs
JSDOC=./node_modules/.bin/jsdoc
MOCHA=./node_modules/.bin/mocha

all: $(DEST)

clean:
	rm -fr $(DEST)

$(DEST): $(SRC)
	$(UGLIFYJS) $(SRC) -c -m -o $(DEST)

test: jshint $(DEST)
	$(MOCHA) -R spec test/*.js
	MENGEJS=../dist/menge.min.js $(MOCHA) -R spec test/*.js

jshint:
	$(JSHINT) $(JS_SRC)

.PHONY: all clean test jshint

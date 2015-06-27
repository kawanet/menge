#!/usr/bin/env bash -c make

SRC=./menge.js
LINTSRC=./*.js ./*.json
DEST=./dist/menge.min.js
UGLIFYJS=./node_modules/.bin/uglifyjs
JSDOC=./node_modules/.bin/jsdoc
MOCHA=./node_modules/.bin/mocha
JSHINT=./node_modules/.bin/JSHINT

all: $(DEST)

clean:
	rm -fr $(DEST)

$(DEST): $(SRC)
	$(UGLIFYJS) $(SRC) -c -m -o $(DEST)

test: jshint $(DEST)
	$(MOCHA) -R spec test/*.js
	MENGEJS=../dist/menge.min.js $(MOCHA) -R spec test/*.js

jshint:
	$(JSHINT) $(LINTSRC)

.PHONY: all clean test jshint

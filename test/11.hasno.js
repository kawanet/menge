#!/usr/bin/env ./node_modules/.bin/mocha -R spec

var assert = require("assert");

var OBJECT = {"object": 1};
var ARRAY = ["array"];
var NUMBER = 0;
var NULL = null;
var UNDEFINED = void 0;

var LIST1 = ["hoge", "pomu", "fuga"];
var LIST2 = [OBJECT, ARRAY, NUMBER, NULL, UNDEFINED];

var testjs = __filename.replace(/^.*\//, "");
var mengejs = process.env.MENGEJS || "../menge.js";
var short = mengejs.replace(/^.*\//, "");

describe(testjs + " with " + short + " tests", function() {
  var menge = require(mengejs);

  it("hasno(array, string)", function() {
    var hasno = menge.hasno.bind(null, new ArrayLike(LIST1));
    assert.ok(!hasno("hoge"));
    assert.ok(hasno("foo"));
    assert.ok(hasno(OBJECT));
    assert.ok(hasno(ARRAY));
    assert.ok(hasno(NUMBER));
    assert.ok(hasno(NULL));
    assert.ok(hasno(UNDEFINED));
  });

  it("hasno(array, object)", function() {
    var hasno = menge.hasno.bind(null, new ArrayLike(LIST2));
    assert.ok(hasno("hoge"));
    assert.ok(hasno("foo"));
    assert.ok(!hasno(OBJECT));
    assert.ok(!hasno(ARRAY));
    assert.ok(!hasno(NUMBER));
    assert.ok(!hasno(NULL));
    assert.ok(!hasno(UNDEFINED));
  });
});

function ArrayLike(array) {
  if (!(this instanceof ArrayLike)) return new ArrayLike(array);
  Array.prototype.push.apply(this, array);
}

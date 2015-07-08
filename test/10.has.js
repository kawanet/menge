#!/usr/bin/env mocha -R spec

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

  it("has(array, string)", function() {
    var has = menge.has.bind(null, new ArrayLike(LIST1));
    assert.ok(has("hoge"));
    assert.ok(!has("foo"));
    assert.ok(!has(OBJECT));
    assert.ok(!has(ARRAY));
    assert.ok(!has(NUMBER));
    assert.ok(!has(NULL));
    assert.ok(!has(UNDEFINED));
  });

  it("has(array, object)", function() {
    var has = menge.has.bind(null, new ArrayLike(LIST2));
    assert.ok(!has("hoge"));
    assert.ok(!has("foo"));
    assert.ok(has(OBJECT));
    assert.ok(has(ARRAY));
    assert.ok(has(NUMBER));
    assert.ok(has(NULL));
    assert.ok(has(UNDEFINED));
  });
});

function ArrayLike(array) {
  if (!(this instanceof ArrayLike)) return new ArrayLike(array);
  Array.prototype.push.apply(this, array);
}

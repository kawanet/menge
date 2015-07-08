#!/usr/bin/env mocha -R spec

var assert = require("assert");

var LIST1 = ["hoge", "pomu", "hoge", "hoge", "fuga", "fuga"];
var LIST2 = ["hoge", "pomu", "fuga"];

var testjs = __filename.replace(/^.*\//, "");
var mengejs = process.env.MENGEJS || "../menge.js";
var short = mengejs.replace(/^.*\//, "");

describe(testjs + " with " + short + " tests", function() {
  var menge = require(mengejs);

  it("unique(source)", function() {
    var source = new ArrayLike(LIST1);
    var result = menge.unique(source);

    assert.equal(source, result);
    assert.equal(join(LIST2), join(result));
    assert.equal(3, source.length); // breaking
    assert.equal(3, result.length);
  });

  it("unique(source, dest)", function() {
    var source = new ArrayLike(LIST1);
    var dest = new ArrayLike();
    var result = menge.unique(source, dest);

    assert.equal(dest, result);
    assert.equal(join(LIST2), join(result));
    assert.equal(6, source.length); // not breaking
    assert.equal(3, dest.length);
    assert.equal(3, result.length);
  });
});

function ArrayLike(array) {
  if (!(this instanceof ArrayLike)) return new ArrayLike(array);
  Array.prototype.push.apply(this, array);
}

function join(array) {
  return Array.prototype.join.call(array, ",");
}

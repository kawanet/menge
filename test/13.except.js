#!/usr/bin/env mocha -R spec

var assert = require("assert");

var LIST1 = ["foo", "bar", "baz", "qux"];
var LIST2 = ["foo", "baz", "hoge"];
var LIST3 = ["bar", "qux"];

var testjs = __filename.replace(/^.*\//, "");
var mengejs = process.env.MENGEJS || "../menge.js";
var short = mengejs.replace(/^.*\//, "");

describe(testjs + " with " + short + " tests", function() {
  var menge = require(mengejs);

  it("except(source, target, dest)", function() {
    var source = new ArrayLike(LIST1);
    var target = new ArrayLike(LIST2);
    var dest = [];
    var result = menge.except(source, target, dest);

    assert.equal(dest, result);
    assert.equal(join(LIST3), join(result));
    assert.equal(4, source.length); // not breaking
    assert.equal(3, target.length);
    assert.equal(2, result.length);
    assert.equal(2, dest.length);
  });

  it("except(source, target)", function() {
    var source = new ArrayLike(LIST1);
    var target = new ArrayLike(LIST2);
    var result = menge.except(source, target);

    assert.equal(source, result);
    assert.equal(join(LIST3), join(result));
    assert.equal(2, source.length); // breaking
    assert.equal(3, target.length);
    assert.equal(2, result.length);
  });
});

function ArrayLike(array) {
  if (!(this instanceof ArrayLike)) return new ArrayLike(array);
  Array.prototype.push.apply(this, array);
}

function join(array) {
  return Array.prototype.join.call(array, ",");
}

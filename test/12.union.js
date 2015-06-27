#!/usr/bin/env ./node_modules/.bin/mocha -R spec

var assert = require("assert");

var LIST1 = ["hoge", "pomu", "fuga"];
var LIST2 = ["foo", "bar", "baz"];
var LIST3 = [].concat(LIST1).concat(LIST2);
var LIST4 = ["qux"];
var LIST5 = [].concat("qux").concat(LIST2).concat(LIST1);

var testjs = __filename.replace(/^.*\//, "");
var mengejs = process.env.MENGEJS || "../menge.js";
var short = mengejs.replace(/^.*\//, "");

describe(testjs + " with " + short + " tests", function() {
  var menge = require(mengejs);

  it("union(source, target)", function() {
    var source = new ArrayLike(LIST1);
    var target = new ArrayLike(LIST2);
    var result = menge.union(source, target);

    assert.equal(source, result);
    assert.equal(join(LIST3), join(result));
    assert.equal(6, source.length); // breaking
    assert.equal(3, target.length);
    assert.equal(6, result.length);
  });

  it("union(source, target, dest)", function() {
    var source = new ArrayLike(LIST2);
    var target = new ArrayLike(LIST1);
    var dest = new ArrayLike(LIST4);
    var result = menge.union(source, target, dest);

    assert.equal(dest, result);
    assert.equal(join(LIST5), join(result));
    assert.equal(3, source.length); // not breaking
    assert.equal(3, target.length);
    assert.equal(7, result.length);
    assert.equal(7, dest.length);
  });
});

function ArrayLike(array) {
  if (!(this instanceof ArrayLike)) return new ArrayLike(array);
  Array.prototype.push.apply(this, array);
}

function join(array) {
  return Array.prototype.join.call(array, ",");
}

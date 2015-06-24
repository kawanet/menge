#!/usr/bin/env ./node_modules/.bin/mocha -R spec

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
    var source = [].concat(LIST1);
    var target = [].concat(LIST2);
    var dest = [];
    var result = menge.except(source, target, dest);

    assert.equal(dest, result);
    assert.equal(LIST3.join(","), result.join(","));
    assert.equal(4, source.length); // not breaking
    assert.equal(3, target.length);
    assert.equal(2, result.length);
    assert.equal(2, dest.length);
  });

  it("except(source, target)", function() {
    var source = [].concat(LIST1);
    var target = [].concat(LIST2);
    var result = menge.except(source, target);

    assert.equal(source, result);
    assert.equal(LIST3.join(","), result.join(","));
    assert.equal(2, source.length); // breaking
    assert.equal(3, target.length);
    assert.equal(2, result.length);
  });
});

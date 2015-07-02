/**
 * menge.js - Minimalist set theory operations for Array-like objects in less than 1KB
 *
 * @module menge
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @see https://github.com/kawanet/menge
 * @see http://kawanet.github.io/menge/module-menge.html
 */

(function(module, window) {

  var menge = {
    has: has,
    hasno: hasno,
    union: union,
    except: except,
    unique: unique
  };

  var array = [];

  /**
   * unique
   *
   * @function unique
   * @param source {Array|Array-like}
   * @param [dest] {Array|Array-like} default: source
   * @returns {Array|Array-like} Array or Array-like object
   */

  function unique(source, dest) {
    if (dest) {
      array.forEach.call(source, function(value) {
        if (!has(dest, value)) array.push.call(dest, value);
      });
      return dest;
    } else {
      array.reduceRight.call(source, function(prev, value, index) {
        var hit = (index > 0) && hasWithLimit(source, value, index - 1);
        if (hit) array.splice.call(source, index, 1);
      }, null);
      return source;
    }
  }

  function hasWithLimit(source, value, limit) {
    var found = false;
    array.some.call(source, eqWithLimit);
    return found;

    function eqWithLimit(test, index) {
      found = (test === value);
      return found || (index >= limit);
    }
  }

  /**
   * source - target
   *
   * @function except
   * @param source {Array|Array-like}
   * @param target {Array|Array-like}
   * @param [dest] {Array|Array-like} default: source
   * @returns {Array|Array-like} Array or Array-like object
   */

  function except(source, target, dest) {
    var targetHas = has.bind(null, target);
    var targetHasno = hasno.bind(null, target);
    if (dest) {
      array.push.apply(dest, array.filter.call(source, targetHasno));
    } else {
      array.reduceRight.call(source, iterator, null);
      dest = source;
    }
    return dest;

    function iterator(prev, current, index) {
      if (targetHas(current)) array.splice.call(source, index, 1);
    }
  }

  /**
   * source + target
   *
   * @function union
   * @param source {Array|Array-like}
   * @param target {Array|Array-like}
   * @param [dest] {Array|Array-like} default: source
   * @returns {Array|Array-like} Array or Array-like object
   */

  function union(source, target, dest) {
    var sourceHas = hasno.bind(null, source);
    if (dest) {
      array.push.apply(dest, source);
      array.push.apply(dest, array.filter.call(target, sourceHas));
    } else {
      dest = source;
      array.push.apply(dest, array.filter.call(target, sourceHas));
    }
    return dest;
  }

  /**
   * returns true when one or more rows are matched.
   *
   * @function has
   * @param source {Array|Array-like}
   * @param value {*}
   * @returns {boolean} Boolean
   */

  function has(source, value) {
    return array.some.call(source, eq);

    function eq(test) {
      return test === value;
    }
  }

  /**
   * returns false when no rows are matched.
   *
   * @function hasno
   * @param source {Array|Array-like}
   * @param value {*}
   * @returns {boolean} Boolean
   */

  function hasno(source, value) {
    // return !has(source, value);
    return array.every.call(source, ne);

    function ne(test) {
      return test !== value;
    }
  }

  if (module) module.exports = menge;
  if (!module && window) window.menge = menge;

})(("undefined" !== typeof module && module), ("undefined" !== typeof window && window));

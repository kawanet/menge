/**
 * menge.js - set theory for array-like object
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @see https://gist.github.com/kawanet/f94e51057c28b6eeff3b
 */

(function(module, window) {
  var menge = {
    has: has,
    hasno: hasno,
    union: union,
    except: except
  };

  var array = [];

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

  function union(source, target, dest) {
    var sourceHas = hasno.bind(null, source);
    if (dest) {
      array.push.apply(dest, array.filter.call(target, sourceHas));
      array.push.apply(dest, source);
    } else {
      dest = source;
      array.push.apply(dest, array.filter.call(target, sourceHas));
    }
    return dest;
  }

  function has(list, value) {
    return array.some.call(list, eq);

    function eq(test) {
      return test === value;
    }
  }

  function hasno(list, value) {
    return array.every.call(list, ne);

    function ne(test) {
      return test !== value;
    }
  }

  if (module) module.exports = menge;
  if (window) window.menge = menge;
  
})(("undefined" !== typeof module && module), ("undefined" !== typeof window && window));

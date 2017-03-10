(function() {

  window._ = {};

  // returns whatever value is passed as the argument. this function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * collections
   * ===========
   *
   * in this section, we'll have a look at functions that operate on collections
   * of values; in javascript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * important note!
   * ===========
   *
   * the .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // return an array of the first n elements of an array. if n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // like first, but for the last elements. if n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n >= array.length) return array; 
    return n === undefined ? array[array.length - 1] : array.slice(array.length-n, array.length); 
  };


  // call iterator(value, key, collection) for each element of collection.
  // accepts both arrays and objects.
  //
  // note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection))
       for(let i=0; i<collection.length; i++)
        iterator(collection[i], i, collection);
    else
      for(let key in collection)
        iterator(collection[key], key, collection);
  };


  // returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // tip: here's an example of a function that needs to iterate, which we've
    // implemented for you. instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let filteredelms = [];
      _.each(collection, (value) => {
        if(test(value))
          filteredelms.push(value);
      });
     return filteredelms;   
  };
  
  // return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // tip: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    let filteredelms = [];
    _.each(collection, (value) => {
      if(!(test(value)))
        filteredelms.push(value)
    });
    return filteredelms;
  };

  // produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let uniquevals = [];
    _.each(array, (value) => {
      if(!uniquevals.includes(value))
        uniquevals.push(value)
    });
    return uniquevals;
  };


  // return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let results = [];
    _.each(collection, (value) => {
      results.push(iterator(value));
    });
    return results;
  };

  /*
   * tip: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // takes an array of objects and returns and array of the values of
  // a certain property in it. e.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // tip: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // you can pass in a starting value for the accumulator as the third argument
  // to reduce. if no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. in other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          no accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, (value) => {
      if(accumulator === undefined){
        accumulator = collection[0];
        iterator();
      }
      else    
        accumulator = iterator(accumulator, value);
    });
    return accumulator;
  };

  // determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // tip: many iteration problems can be most easily expressed in
    // terms of reduce(). here's a freebie to demonstrate!
    return _.reduce(collection, function(wasfound, item) {
      if (wasfound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // tip: try re-using reduce() here.
    return _.reduce(collection, (acc, value) => {
     if(!iterator(value))
       return false;
    }, true);
    
  };

  // determine whether any of the elements pass a truth test. if no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // tip: there's a very clever way to re-use every() here.
    if(collection.length == 0) 
       return false;

    return _.reduce(collection, (isOneTrue, value) => {
      if(iterator === undefined)
          return value? value: isOneTrue;
      if(iterator(value))
        return true;
      return isOneTrue;
    }, false);
  };


  /**
   * objects
   * =======
   *
   * in this section, we'll look at a couple of helpers for merging objects.
   */

  // extend a given object with all the properties of the passed in
  // object(s).
  //
  // example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  };

  // like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  };


  /**
   * functions
   * =========
   *
   * now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // return a function that can be called at most one time. subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // tip: these variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadycalled = false;
    var result;

    // tip: we'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadycalled) {
        // tip: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadycalled = true;
      }
      // the new function always returns the originally computed result.
      return result;
    };
  };

  // memorize an expensive function's results by storing them. you may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to onceperuniqueargumentlist; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // the arguments for the original function are passed after the wait
  // parameter. for example _.delay(somefunction, 500, 'a', 'b') will
  // call somefunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * advanced collection operations
   * ==============================
   */

  // randomizes the order of an array's contents.
  //
  // tip: this function's test suite will ask that you not modify the original
  // input array. for a tip on how to make a copy of an array, see:
  // http://mdn.io/array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * advanced
   * =================
   *
   * note: this is the end of the pre-course curriculum. feel free to continue,
   * but nothing beyond here is required.
   */

  // calls the method named by functionorkey on each value in the list.
  // note: you will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionorkey, args) {
  };

  // sort the object's values by a criterion produced by an iterator.
  // if iterator is a string, sort objects by that property with the name
  // of that string. for example, _.sortby(people, 'name') should sort
  // an array of people by their name.
  _.sortby = function(collection, iterator) {
  };

  // zip together two or more arrays with elements of the same index
  // going together.
  //
  // example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // takes a multidimensional array and converts it to a one-dimensional array.
  // the new array should contain all elements of the multidimensional array.
  //
  // hint: use array.isarray to check if something is an array
  _.flatten = function(nestedarray, result) {
  };

  // takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // take the difference between one array and a number of other arrays.
  // only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  see the underbar readme for extra details
  // on this function.
  //
  // note: this is difficult! it may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

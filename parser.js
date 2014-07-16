var parser = (function () {

  function collection(nodes) {
    extend(this, nodes);
    this.length = nodes.length;
    this.parent = null;
  }

  /*
   * Method extend from Underscore.js 1.6.0
   * http://underscorejs.org
   * (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Underscore may be freely distributed under the MIT license.
   */
  function extend(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  function nodeMatcher(node, selectorExpr) {
    var type = typeof selectorExpr;
    if (type === "string") {
      return node.name === selectorExpr;
    } else if (type === "function") {
      return !!selectorExpr(node);
    } else {
      throw new TypeError("Cannot filter node with selector " + selectorExpr);
    }
  }

  collection.prototype = {
    toArray: function () {
      return Array.prototype.slice.call(this);
    },

    find: function (selectorExpr) {
      var foundNodes = [];
      this.traverse(function (node) {
        if (nodeMatcher(node, selectorExpr)) {
          foundNodes.push(node);
        }
      });
      return this.pushStack(foundNodes);
    },

    filter: function(selectorExpr) {
      var filteredNodes = this.toArray().filter(function(node) {
        return nodeMatcher(node, selectorExpr);
      });
      return this.pushStack(filteredNodes)
    },

    each: function (callback) {
      this.toArray().forEach(callback);
      return this;
    },

    map: function (callback) {
      return this.toArray().map(callback);
    },

    traverse: function (callback) {
      function traverse(node, index) {
        callback.call(node, node, index);
        (node.leaf || []).forEach(traverse);
      }

      this.each(traverse);
      return this;
    },

    pushStack: function (nodes) {
      var newInstance = new collection(nodes);
      newInstance.parent = this;
      return newInstance;
    },

    children: function () {
      var allChildren = [];
      this.each(function (node) {
        allChildren = allChildren.concat(node.leaf);
      });
      return this.pushStack(allChildren);
    },

    props: function (propName) {
      return this.map(function (node) {
        return node[propName];
      });
    },

    names: function () {
      return this.props("name");
    }

  };

  return function (nodes) {
    return new collection(nodes);
  }
}());

module.exports.parser = parser;
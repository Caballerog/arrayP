//begin private closure
window.ArrayP = (function() {
    'use strict';

    function ArrayP() {
        // When creating the collection, we are going to work off
        // the core array. In order to maintain all of the native
        // array features, we need to build off a native array.
        var collection = Object.create(Array.prototype);

        // Initialize the array. This line is more complicated than
        // it needs to be, but I'm trying to keep the approach
        // generic for learning purposes.
        collection = (Array.apply(collection, arguments) || collection);

        // Add all the class methods to the collection.
        ArrayP.injectClassMethods(collection);

        // Return the new collection object.
        return (collection);
    }

    /***/
    // Define the static methods.
    ArrayP.injectClassMethods = function(collection) {

        // Loop over all the prototype methods and add them
        // to the new collection.
        for (var method in ArrayP.prototype) {

            // Make sure this is a local method.
            if (ArrayP.prototype.hasOwnProperty(method)) {

                // Add the method to the collection.
                collection[method] = ArrayP.prototype[method];

            }

        }

        // Return the updated collection.
        return (collection);

    };


    // I create a new collection from the given array.
    ArrayP.fromArray = function(array) {

        // Create a new collection.
        var collection = ArrayP.apply(null, array);

        // Return the new collection.
        return (collection);

    };


    // I determine if the given object is an array.
    ArrayP.isArray = function(value) {

        // Get it's stringified version.
        var stringValue = Object.prototype.toString.call(value);

        // Check to see if the string represtnation denotes array.
        return (stringValue.toLowerCase() === "[object array]");

    };


    // ------------------------------------------------------ //
    // ------------------------------------------------------ //


    // Define the class methods.
    /*  ArrayP.prototype = {

        // I add the given item to the collection. If the given item
        // is an array, then each item within the array is added
        // individually.
        add: function( value ){

            // Check to see if the item is an array.
            if (ArrayP.isArray( value )){

                // Add each item in the array.
                for (var i = 0 ; i < value.length ; i++){

                    // Add the sub-item using default push() method.
                    Array.prototype.push.call( this, value[ i ] );

                }

            } else {

                // Use the default push() method.
                Array.prototype.push.call( this, value );

            }

            // Return this object reference for method chaining.
            return( this );

        },


        // I add all the given items to the collection.
        addAll: function(){

            // Loop over all the arguments to add them to the
            // collection individually.
            for (var i = 0 ; i < arguments.length ; i++){

                // Add the given value.
                this.add( arguments[ i ] );

            }

            // Return this object reference for method chaining.
            return( this );

        }
      };


/****/
    // Constructor
    function TreeNode(level, left, right, key, value) {
        this.level = level;
        this.left = left;
        this.right = right;
        this.key = key;
        this.value = value;
    }

    TreeNode.nil = new TreeNode(0);
    TreeNode.nil.left = TreeNode.nil;
    TreeNode.nil.right = TreeNode.nil;

    /* Private methods*/
    function skew(root) {
        var save;
        if (root.level !== 0) {
            if (root.left.level === root.level) {
                save = root;
                root = root.left;
                save.left = root.right;
                root.right = save;
            }
            root.right = skew(root.right);
        }
        return root;
    }

    function split(root) {
        var save;
        if (root.right.right.level === root.level && root.level !== 0) {
            save = root;
            root = root.right;
            save.right = root.left;
            root.left = save;
            root.level += 1;
            root.right = split(root.right);
        }
        return root;
    }

    function insert(root, key, value) {
        if (root === TreeNode.nil) {
            return new TreeNode(1, TreeNode.nil, TreeNode.nil, key, value);
        } else if (root.key < key) {
            root.right = insert(root.right, key, value);
        } else {
            root.left = insert(root.left, key, value);
        }
        return split(skew(root));
    }

    function insertIterative(node, key, value) {
        var root = node;
        if (node === TreeNode.nil) {
            node = new TreeNode(1, TreeNode.nil, TreeNode.nil, key, value);
            return node;
        }

        var currentNode = root;
        var newNode = new TreeNode(1, TreeNode.nil, TreeNode.nil, key, value);

        while (true) {
            if (key < currentNode.key) {
                if (typeof currentNode.left.key === 'undefined') {
                    currentNode.left = newNode;
                    return split(skew(root));
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                if (typeof currentNode.right.key === 'undefined') {
                    currentNode.right = newNode;
                    return split(skew(root));
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    }

    function remove(root, key) {
        var heir;
        if (root !== TreeNode.nil) {
            if (root.key == key) {
                if (root.left !== TreeNode.nil && root.right !== TreeNode.nil) {
                    heir = root.left;
                    while (heir.right !== TreeNode.nil) {
                        heir = heir.right;
                    }
                    root.key = heir.key;
                    root.value = heir.value;
                    root.left = remove(root.left, root.key);
                } else if (root.left === TreeNode.nil) {
                    root = root.right;
                } else {
                    root = root.left;
                }
            } else if (root.key < key) {
                root.right = remove(root.right, key);
            } else {
                root.left = remove(root.left, key);
            }
        }

        if (root.left.level < (root.level - 1) ||
            root.right.level < (root.level - 1)
        ) {
            root.level -= 1;
            if (root.right.level > root.level) {
                root.right.level = root.level;
            }
            root = split(skew(root));
        }

        return root;
    }

    function walk(root, callback, level) {
        if (root === TreeNode.nil) {
            return;
        }
        walk(root.left, callback, level + 1);
        callback.call(root, root, level);
        walk(root.right, callback, level + 1);
        return;
    }

    function searchNode(node, key) {
        //console.log(node);
        if (node.key === null) {
            return null;
        }
        if (key < node.key) {
            return searchNode(node.left, key);
        } else if (key > node.key) {
            return searchNode(node.right, key);
        } else { // key is equal to node key
            return node.value;
        }
    }


    //Array.prototype.length = 0;
    // container class
    // container class
    ArrayP.prototype.constructor = function() {
        //infinite parameters read
        /*this.root = TreeNode.nil;
        var args = arguments;
        for (var i = 0; i < args.length; i++) {
            this.push(args[i]);
        }*/
        //this.root = TreeNode.nil;
        //this.root = TreeNode.nil;
    };
    ArrayP.prototype.root = TreeNode.nil;
    /*function ArrayP() {
        this.root = TreeNode.nil;

    }*/
    ArrayP.prototype.insert = function(value, key) {
        key = (typeof key === 'undefined') ? this.length : key;

        this.root = insert(this.root, key, value);
        //  this.root = insertIterative(this.root, key, value);
        this.length++;
    };

    ArrayP.prototype.insertIterative = function(value, key) {
        key = (typeof key === 'undefined') ? this.length : key;

        //  this.root = insert(this.root, key, value);
        this.root = insertIterative(this.root, key, value);
        this.length++;
    };
    ArrayP.prototype.push = function(value, key) {

        key = (typeof key === 'undefined') ? this.length : key;
        this.root = insert(this.root, key, value);
        //  this.root = insertIterative(this.root, key, value);
        this.length++;
    };

    ArrayP.prototype.pushIterative = function(value, key) {

        key = (typeof key === 'undefined') ? this.length : key;
        this.root = insertIterative(this.root, key, value);
        //  this.root = insertIterative(this.root, key, value);
        this.length++;
    };

    ArrayP.prototype.remove = function(key, value) {
        this.root = remove(this.root, key, value);
        this.length--;
    };

    // Búsca por el índice y devuelve el nodo
    ArrayP.prototype.search = function(key) {
        //  if (isNaN(keyInt)) {
        //      return undefined; // key must be a number
        //  } else {
        //console.log(this.root);
        return searchNode(this.root, key);
        //  }
    };

    ArrayP.prototype.searchIterative = function(key) {
        var node = this.root;
        while (true) {
            if (node.key === null) {
                return null;
            }
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else { // key is equal to node key
                return node.value;
            }
        }
    };

    ArrayP.prototype.indexOf = function(value) {
        var index = -1;
        var internalCallback = function(root, level) {

            if (root.value === value) {
                index = root.key;
            }
            //console.log('por aqui', root);
            //callback.call(root, root, index++, level);
        };
        walk(this.root, internalCallback, 0);
        return index;

    };


    ArrayP.prototype.forEach = function(callback) {
        var index = 0;
        var internalCallback = function(root, level) {
            callback.call(root, root, index++, level);
        };
        walk(this.root, internalCallback, 0);
    };
    Array.prototype.linealSearch = function(searchElement) {
        var encontrado = false;
        var limite = this.length;
        var contador = 0;
        while (!encontrado && contador < limite) {
            if (this[contador] == searchElement) encontrado = true;
            else contador++;
        }

    };

    Array.prototype.indexOf2 = function(item, propiedad) {
        var i = 0,
            len = this.length;
        if (typeof propiedad === 'undefined') {
            for (; i != len; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
        } else {
            for (; i != len; i++) {
                if (this[i].propiedad === item) {
                    return i;
                }
            }
        }
        return -1;
    };

    Array.prototype.binarySearch = function(searchElement) {


        var minIndex = 0;
        var maxIndex = this.length - 1;
        var currentIndex;
        var currentElement;
        var resultIndex;

        while (minIndex <= maxIndex) {
            resultIndex = currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = this[currentIndex];

            if (currentElement < searchElement) {
                minIndex = currentIndex + 1;
            } else if (currentElement > searchElement) {
                maxIndex = currentIndex - 1;
            } else {
                return currentIndex;
            }
        }
        return ~maxIndex;
    };

    // Return the collection constructor.
    return (ArrayP);

    //window.Tree = new Tree();
    /*= {

        insert: function(key, value) {
            this.root = insert(this.root, key, value);
        },
        remove: function(key, value) {
            this.root = remove(this.root, key, value);
        }
    };
    */
    //window.ArrayP = ArrayP;
    //end private closure then run the closure, localized to My.Namespace
})({}); //.call(); //(My.Namespace);

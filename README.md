JSON query parser
=================

Tool for build chainable queries to retrive data from JSON structure.

Supported methods
-----------------

* `find`
* `children`
* `names`

Examples of use
---------------

`parser(JSON).find('foo').find('bar').children().name() // [ 'Apple' ]`

Run tests
---------

* `make test` – runs test and wathing for changes in JS files


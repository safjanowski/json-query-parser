JSON query parser
=================

Tool for build chainable queries to retrive data from JSON structure.

Supported methods
-----------------

* `find(string || funtion)`
* `filter(string || funtion)`
* `children()`
* `names()`

Examples of use
---------------

```
drinks = [
  {
    "name": "Soft Drinks",
    "leaf": [
      {
        "name": "Bottled",
        "leaf": [
          {
            "name": "Apple",
            "leaf": [
              {
                "name": "Apple 500 ML"
              },
              {
                "name": "Apple 1 Ltr"
              }
            ]
          }
        ]
      },
      {
        "name": "Fountain",
        "leaf": [
          {
            "name": "Apple",
            "leaf": [
              {
                "name": "Apple Regular, 500 ML"
              }
            ]
          }
        ]
      },
      {
        "name": "Tin",
        "leaf": [
          {
            "name": "Apple",
            "leaf": [
              {
                "name": "Apple Regular, 300 ML"
              }
            ]
          }
        ]
      }
    ]
  }
];
```

`parser(drinks).find('Soft Drinks').find('Fountain').children().names(); // [ 'Apple' ]`
`parser(drinks).find('Soft Drinks').find('Fountain').find('Apple').children().names(); // [ 'Apple Regular, 500 ML' ]`
`parser(drinks).find('Soft Drinks').find('Apple')
     .children().filter(function(node) {
         return node.name.match(/500/);
      }).names(); // [ 'Apple 500 ML', 'Apple Regular, 500 ML' ]`

Run tests
---------

* `make test` – runs test and wathing for changes in JS files


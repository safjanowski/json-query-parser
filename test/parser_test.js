var assert = require('assert')
  , parser = require('../parser').parser;


describe('QueryParser', function() {
    var drinks;

    beforeEach(function() {
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
    });

    it('throws error if node mather is not supported', function() {
        assert.throws(function () { parser(drinks).find({}) });
    });

    it('.children() returns children of selected leaf', function() {
        assert.equal(parser(drinks).find('Soft Drinks').children().length, 3);
        assert.equal(parser(drinks).find('Soft Drinks').find('Fountain')
            .children().length, 1);
    });

    it('.find() nodes', function() {
        assert.deepEqual(parser(drinks).find('Soft Drinks').find('Bottled')
            .find('Apple').children().names(), [ "Apple 500 ML","Apple 1 Ltr" ]);
    });

    it('.filter() nodes', function() {
        assert.deepEqual(parser(drinks).find('Soft Drinks').find('Apple')
            .children().filter(function(node) {
            return node.name.match(/500/);
        }).names(), [ 'Apple 500 ML', 'Apple Regular, 500 ML' ])
    });

    it('.map() nodes', function() {
        console.log(parser(drinks).find('Soft Drinks').find('Fountain').find('Apple').children().names())
        assert.deepEqual(parser(drinks).find('Soft Drinks').find('Bottled')
            .find('Apple').children().map(function(drink) {
            return drink.name.toLowerCase()
        }), [ "apple 500 ml", "apple 1 ltr" ]);
    });
});
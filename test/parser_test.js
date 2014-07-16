var assert = require('assert')
  , parser = require('../parser').parser;


describe('.find()', function() {
    var drinks;

    before(function() {
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

    it('.children() returns children of selected leaf', function() {
        assert.equal(parser(drinks).find('Soft Drinks').children().length, 3);
        assert.equal(parser(drinks).find('Soft Drinks').find('Fountain').children().length, 1);
    });
    
    it('findes nodes according to passed values', function() {
        assert.deepEqual(parser(drinks).find('Soft Drinks').find('Bottled').children().names(), ['Apple']);
    });

    it('findes nodes according to passed values', function() {
        assert.deepEqual(parser(drinks).find('Soft Drinks').find('Bottled').find('Apple').children().names(), ["Apple 500 ML","Apple 1 Ltr"]);
    });
});
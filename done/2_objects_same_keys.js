'use strict'

const obj1 = {
  'bananas': 25,
  'mangos': 5,
  'straws': 55,
  'berries': 20,
};

const obj2 = {
  'straws': 5,
  'berries': 3,
  'bananas': 15,
  'mangos': 89,
};

let keys1 = Object.keys(obj1);
let keys2 = Object.keys(obj2);

let equalKeys = [];

keys1.map(key1 => {

  keys2.map(key2 => {
    if (key1 == key2) {
      equalKeys.push(key1)
    }
  })
})
console.log('keys', equalKeys);
console.log('do the 2 objects have the same keys?', equalKeys.length == Object.keys(obj1).length);

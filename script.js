'use strict'


function SHA1(msg) {


  function rotate_left(n, s) {

    var t4 = (n << s) | (n >>> (32 - s));

    return t4;

  };


  function lsb_hex(val) {

    var str = "";

    var i;

    var vh;

    var vl;


    for (i = 0; i <= 6; i += 2) {

      vh = (val >>> (i * 4 + 4)) & 0x0f;

      vl = (val >>> (i * 4)) & 0x0f;

      str += vh.toString(16) + vl.toString(16);

    }

    return str;

  };


  function cvt_hex(val) {

    var str = "";

    var i;

    var v;


    for (i = 7; i >= 0; i--) {

      v = (val >>> (i * 4)) & 0x0f;

      str += v.toString(16);

    }

    return str;

  };



  function Utf8Encode(string) {

    string = string.replace(/\r\n/g, "\n");

    var utftext = "";


    for (var n = 0; n < string.length; n++) {


      var c = string.charCodeAt(n);


      if (c < 128) {

        utftext += String.fromCharCode(c);

      } else if ((c > 127) && (c < 2048)) {

        utftext += String.fromCharCode((c >> 6) | 192);

        utftext += String.fromCharCode((c & 63) | 128);

      } else {

        utftext += String.fromCharCode((c >> 12) | 224);

        utftext += String.fromCharCode(((c >> 6) & 63) | 128);

        utftext += String.fromCharCode((c & 63) | 128);

      }


    }


    return utftext;

  };


  var blockstart;

  var i, j;

  var W = new Array(80);

  var H0 = 0x67452301;

  var H1 = 0xEFCDAB89;

  var H2 = 0x98BADCFE;

  var H3 = 0x10325476;

  var H4 = 0xC3D2E1F0;

  var A, B, C, D, E;

  var temp;


  msg = Utf8Encode(msg);


  var msg_len = msg.length;


  var word_array = new Array();

  for (i = 0; i < msg_len - 3; i += 4) {

    j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |

      msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);

    word_array.push(j);

  }


  switch (msg_len % 4) {

    case 0:

      i = 0x080000000;

      break;

    case 1:

      i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;

      break;


    case 2:

      i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;

      break;


    case 3:

      i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;

      break;

  }


  word_array.push(i);


  while ((word_array.length % 16) != 14) word_array.push(0);


  word_array.push(msg_len >>> 29);

  word_array.push((msg_len << 3) & 0x0ffffffff);



  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {


    for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];

    for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);


    A = H0;

    B = H1;

    C = H2;

    D = H3;

    E = H4;


    for (i = 0; i <= 19; i++) {

      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;

      E = D;

      D = C;

      C = rotate_left(B, 30);

      B = A;

      A = temp;

    }


    for (i = 20; i <= 39; i++) {

      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;

      E = D;

      D = C;

      C = rotate_left(B, 30);

      B = A;

      A = temp;

    }


    for (i = 40; i <= 59; i++) {

      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;

      E = D;

      D = C;

      C = rotate_left(B, 30);

      B = A;

      A = temp;

    }


    for (i = 60; i <= 79; i++) {

      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;

      E = D;

      D = C;

      C = rotate_left(B, 30);

      B = A;

      A = temp;

    }


    H0 = (H0 + A) & 0x0ffffffff;

    H1 = (H1 + B) & 0x0ffffffff;

    H2 = (H2 + C) & 0x0ffffffff;

    H3 = (H3 + D) & 0x0ffffffff;

    H4 = (H4 + E) & 0x0ffffffff;


  }


  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);


  return temp.toLowerCase();

}


class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // INSERT - insert a new node to the tree
  insertNode(value, node) {
    let newNode = new Node(value);

    // if tree empty, set as root
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // set currentnode (for recursion)
    let currentNode = node || this.root;

    // check if currentnode value is bigger than the new value
    if (currentNode.value > newNode.value) {
      // check if the currentnode has a node in left
      if (currentNode.left) {
        // if a node exists, do recursion on the existing node
        this.insertNode(newNode.value, currentNode.left)
      } else {
        // if the node doesnt exist, add it here
        currentNode.left = newNode;
      }
    } else {
      if (currentNode.right) {
        this.insertNode(newNode.value, currentNode.right)
      } else {
        currentNode.right = newNode;
      }
    }
  }

  deleteNode(value, currentNode) {

  }

}

function swapArray(first, second, array) {
  let firstKey = 0;
  let secondKey = 0;

  // iterate once to find the keys of the elements
  // wouldn't work if the array had duplicates
  for (let i = 0; i < array.length; i++) {
    if (array[i] == first) {
      firstKey = i;
    }
    if (array[i] == second) {
      secondKey = i;
    }
  }

  // swap the elements
  let swappedArray = array;
  swappedArray[firstKey] = second;
  swappedArray[secondKey] = first;
  return swappedArray;
}





// console.log('values', values);
// console.log('swapparray', swapArray(4, 8, values));

// console.log('values length', values.length);

// #####################################################################
// #####################################################################
// #####################################################################
// #####################################################################
// #####################################################################


function bubbleSort(values) {
  let counter = 0;
  for (let i = 0; i < values.length; i++) {
    // values.length - 1; no reason to check the last item in array
    // because there is no ii+1; when ii = 7, ii+1 = 8, and there's no
    // item in the array at the index = 8; arr[8] == null
    // values.length - i; because after first iteration it is guaranteed
    // that the biggest value will be the last
    // and on the second iteration it is guaranteed that the second biggest
    // value will be before the last one and so on
    for (let ii = 0; ii < values.length - i - 1; ii++) {
      counter += 1;
      let a = values[ii];
      let b = values[ii + 1];
      if (a > b) {
        values = swapArray(a, b, values);
        // console.log('values after swap', values);
      }
      // console.log(`check with ii=${ii}`, values);
    }
    // console.log('end iteration of i=', i);
  }
  // console.log('counter', counter);
  return values;
}

// const unsortedArray = [3, 4, 8, 6, 5, 2, 1, 7];
// let sortedArray = bubbleSort(unsortedArray);
// console.log('unsortedArray', JSON.parse(JSON.stringify(unsortedArray)));
// console.log('sortedArray', sortedArray);
// let bst = new BinarySearchTree;
// let stackToAdd = [12, 7, 5, 2, 6, 13, 8, 19];
//
// for (let value of stackToAdd){
//   bst.insertNode(value)
//   console.log(`tree after inserting ${value}:`, JSON.parse(JSON.stringify(bst)));
// }

// #####################################################################
// #####################################################################
// #####################################################################
// #####################################################################
// #####################################################################

class Queue {
  constructor() {
    this.queue = [];
  }

  push(value) {
    let q = this.queue;

    // add 0 to the end of the array
    q.push(value);

    // move 0 to the start of the array by switching one element
    // with the last, one by one
    // 1, 3, 5, 4, 0
    // 0, 3, 5, 4, 1
    // 0, 1, 5, 4, 3
    // 0, 1, 3, 4, 5
    // 0, 1, 3, 5, 4
    for (let i = 0; i < q.length; i++) {
      let tmp = q[i];
      q[i] = q[q.length - 1];
      q[q.length - 1] = tmp;
    }

    this.queue = q;

    console.log(`adding ${value} in queue   ` + this.queue);
  }

  pop() {
    this.queue.pop();
    this.count--;
    console.log('Queue after pop: ---> ' + this.queue + ' --->');
  }

  count() {
    console.log('Counter', this.count);
  }
}


// let q = new Queue();
//
// let add = [4, 5, 3, 0, 1, 9, 12, 5, 9];
// add.map(el => {
//   q.push(el)
// })

// #####################################################################
// #####################################################################
// #####################################################################
// #####################################################################
// #####################################################################

class SingleListNode {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(head) {
    this.head = null;
    this.count = 0;
  }

  addToHead(value) {
    let newNode = new SingleListNode(value);

    if (!this.head) {
      this.head = newNode;

    } else {
      let currentNode = this.head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = newNode;
    }
    this.count++;
  }
}

// let list = new LinkedList;
// console.log('list', JSON.parse(JSON.stringify(list)));
//
// let toAdd = [5, 4, 3, 2, 1];
// toAdd.forEach((el)=>{
//   list.addToHead(el);
//   console.log('list', JSON.parse(JSON.stringify(list)));
// })

//
// You a given a number N. You need to print
// the pattern for the given value of N.
// for N=2 the pattern will be
// 2 2 1 1
// 2 1
// for N=3 the pattern will be
// 3 3 3 2 2 2 1 1 1
// 3 3 2 2 1 1
// 3 2 1

function pattern(n) {
  let linePrint = '';
  let currentN = n;
  for (let ii = n; ii > 0; ii--) {
    let m = currentN;
    for (let i = n; i > 0; i--) {
      let print = ' ';
      while (m !== 0) {
        print += i
        m--;
      }
      linePrint += print;
      m = currentN;
    }
    currentN--;
    console.log(linePrint);
    linePrint = '';
  }
}

// pattern(5);

function patternP(n) {
  for (let count = n; count > 0; count--) {
    let result = '';
    for (let i = n; i > 0; i--) {
      for (let j = 0; j < count; j++) {
        result += i + ' ';
      }
    }
    console.log('result', result);
  }
}

function pattern_third(num) {
  for (let i = num; i > 0; i--) {
    let result = '';
    for (let j = num; j > 0; j--) {
      // result += j + ' ';
      for (let k = 0; k < i; k++) {
        result += j + '';
      }
    }
    // result += '\n'
    console.log('result:\n', result);
  }
}
// patternP(3);
// pattern_third(3);


// hash table

class HashTable {
  constructor() {
    this.data = {};
    this.hash = 12;
  }

  _hashFunction(value) {
    return value % this.hash
  }

  addValue(values) {

    let arr = [...values];
    // console.log('add arr', arr);

    arr.map((item, index) => {
      let key = this._hashFunction(item);
      if (!this.data[key]) {
        this.data[key] = [item];
      } else {
        // this.data[key] = this.data[key].concat(item)
        this.data[key].push(item)
      }
    })
  }

  setHashValue(value) {
    this.hash = value;
  }

  getData() {
    console.log('Data: ', this.data);
  }
}

let numberCount = 10000;
let toAdd = [];

for (let i = 0; i < numberCount; i++) {
  let number = 2*Math.floor(Math.random() * 10);
  toAdd.push(number)
}

let table = new HashTable;
let start = performance.now();
table.addValue(toAdd);
let end = performance.now();
table.getData();
console.log(`adding took ${(end-start)/1000}s`);

// console.log(SHA1('1'));

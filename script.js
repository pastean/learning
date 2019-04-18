'use strict'


class Node {
  constructor(value){
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
    if (currentNode.value > newNode.value){
      // check if the currentnode has a node in left
      if (currentNode.left){
        // if a node exists, do recursion on the existing node
        this.insertNode(newNode.value, currentNode.left)
      } else {
        // if the node doesnt exist, add it here
        currentNode.left = newNode;
      }
    } else {
      if (currentNode.right){
        this.insertNode(newNode.value, currentNode.right)
      } else {
        currentNode.right = newNode;
      }
    }
  }

  deleteNode(value, currentNode){

  }

}

function swapArray(first, second, array){
  let firstKey = 0;
  let secondKey = 0;

  // iterate once to find the keys of the elements
  // wouldn't work if the array had duplicates
  for (let i = 0; i < array.length; i++){
    if (array[i] == first){
      firstKey = i;
    }
    if (array[i] == second){
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


function bubbleSort(values){
  let counter = 0;
  for (let i = 0; i < values.length; i++){
    // values.length - 1; no reason to check the last item in array
    // because there is no ii+1; when ii = 7, ii+1 = 8, and there's no
    // item in the array at the index = 8; arr[8] == null
    // values.length - i; because after first iteration it is guaranteed
    // that the biggest value will be the last
    // and on the second iteration it is guaranteed that the second biggest
    // value will be before the last one and so on
    for (let ii = 0; ii < values.length-i-1; ii++){
      counter += 1;
      let a = values[ii];
      let b = values[ii+1];
      if (a > b){
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
  constructor(){
    this.queue = [];
  }

  push(value){
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
    for (let i = 0; i < q.length; i++){
      let tmp = q[i];
      q[i] = q[q.length-1];
      q[q.length-1] = tmp;
    }

    this.queue = q;

    console.log(`adding ${value} in queue   `+this.queue);
  }

  pop(){
    this.queue.pop();
    this.count--;
    console.log('Queue after pop: ---> ' + this.queue + ' --->');
  }

  count(){
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

class SingleListNode{
  constructor(value){
    this.data = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(head){
    this.head = null;
    this.count = 0;
  }

  addToHead(value){
    let newNode = new SingleListNode(value);

    if(!this.head){
      this.head = newNode;

    } else {
      let currentNode = this.head;

      while (currentNode.next){
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

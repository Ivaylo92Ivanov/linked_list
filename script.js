// You will need two classes or factories:

// 1. LinkedList class / factory, which will represent the full list.
// 2. Node class / factory, containing a value property and a link to the nextNode, set both as null by default.

// Build the following functions in your linked list class:

// - head returns the first node in the list
// - tail returns the last node in the list
// - size returns the total number of nodes in the list
// - append(value) adds a new node containing value to the end of the list
// - prepend(value) adds a new node containing value to the start of the list
// - at(index) returns the node at the given index
// - pop removes the last element from the list
// - contains(value) returns true if the passed in value is in the list and otherwise returns false.
// - find(value) returns the index of the node containing value, or null if not found.

// - toString represents your LinkedList objects as strings, so you can print them out and preview 
//   them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null .
// ---
// Extra credit:
// - insertAt(value, index) that inserts a new node with the provided value at the given index.
// - removeAt(index) that removes the node at the given index.
// - Extra Credit Tip: When you insert or remove a node, consider how it will affect the existing nodes. Some of the nodes will need their nextNode link updated.

const linkedListFactory = (() => {
  let head = null;
  let tail = null;
  let size = 0;

  const getTail = () => {
    let tmpNode = head;
    while (tmpNode!=null) tmpNode = tmpNode.next;
    tail = tmpNode;
    return tail;
  };

  // - append(value) adds a new node containing value to the end of the list
  const append = (value) => {
    let newNode = nodeFactory(value);
    tailNode = getTail();
    if (tailNode==null) {
      head = newNode;
    } else {
      tailNode.next = newNode;
      size += 1;
    }
  };

  // - prepend(value) adds a new node containing value to the start of the list
  const prepend = (value) => {
    let newNode = nodeFactory(value, head);
    head = newNode;
    size += 1;
  };
  
  // - at(index) returns the node at the given index
  const at = (idx) => {
    if((idx<0) || (idx>=size)) return undefined;
    if (idx==0) return head;

    let tmpNode = head;
    for(let i=1; i<idx+1; i++) {
      tmpNode = tmpNode.next;
    };
    return tmpNode;
  };
  
  // - pop removes the last element from the list and returns it
  const pop = () => {
    let poppedNode;
    if (head===null) {return undefined};
    size-=1;
    if (head.next==null) {
      poppedNode = head;
      head = null; 
      return poppedNode;
    };

    let tmpNode = head;
    while (tmpNode.next!=null) {
      if (tmpNode.next.next==null) break; 
      tmpNode = tmpNode.next;
    };
    poppedNode = tmpNode.next;
    tail = tmpNode;
    tail.next = null;
    return poppedNode;
  };

  // - contains(value) returns true if the passed in value is in the list and otherwise returns false.
  const contains = (value) => {
    let tmpNode = head;
    while (tmpNode!=null) {
      if (tmpNode.value==value) return true;
      if (tmpNode.next==null) break;
      tmpNode = tmpNode.next;
    };
    return false;
  };
  // - find(value) returns the index of the node containing value, or null if not found.
  const find = (value) => {
    let idx = 0;
    let tmpNode = head;
    while (tmpNode!=null) {
      if (tmpNode.value==value) return idx;
      if (tmpNode.next==null) break;
      tmpNode = tmpNode.next;
      idx += 1;
    };
    return null;
  };

  // - toString represents your LinkedList objects as strings, 
  //   so you can print them out and preview them in the console. 
  //   The format should be: ( value ) -> ( value ) -> ( value ) -> null
  const toString = () => {
    let stringValue = '';
    if (head==null) stringValue = 'null';

    let tmpNode = head;
    while (tmpNode!=null) {
      stringValue += `( ${tmpNode.value} ) -> `;
      if (tmpNode.next==null) {
        stringValue += 'null';
        break;
      };
      tmpNode = tmpNode.next;
    };

    console.log(stringValue)
  };

  // - insertAt(value, index) that inserts a new node with the provided value at the given index.
  const insertAt = (value, idx) => {
    if ( (idx < 0) || (idx >= size) ) return undefined;
    if (idx===0) {
      prepend(value);
      return;
    };

    tmpNode = head;
    for (let curIdx = 1; curIdx<idx; curIdx++) {
      tmpNode = tmpNode.next;
    }

    let newNode = nodeFactory(value);
    let nextNode = tmpNode.next;

    tmpNode.next = newNode;
    newNode.next = nextNode;
    size += 1;
    toString();
  }

  //- removeAt(index) that removes the node at the given index.
  const removeAt = (idx) => {
    if ( (idx < 0) || (idx >= size) ) return undefined;

    size-=1;
    if (idx===0) {
      head=head.next;
      return;
    };

    tmpNode = head;
    for(let curIdx=1; curIdx<idx; curIdx++) {
      tmpNode=tmpNode.next;
    }
    let removedNode = tmpNode.next
    tmpNode.next = tmpNode.next.next;
    return removedNode
  }

  return { 
    get head() { return head; }, 
    get tail() { return getTail() }, 
    get size() { return size; },
    prepend,
    append,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,

   };
});

const nodeFactory = ((value=null, next=null) => {
  return {value, next};
});

let testList = linkedListFactory();
testList.prepend(1);
testList.prepend(2);
testList.prepend(3);
testList.prepend(4);
testList.prepend(5);

testList.toString();
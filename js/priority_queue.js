function PriorityQueue(compare, queue) {
  if (!(this instanceof PriorityQueue)) return new PriorityQueue(compare, queue);

  compare = compare || min_first;
  queue   = queue   || [];

  function swap(i, j) {
    var t = queue[i];
    queue[i] = queue[j];
    queue[j] = t;
  }

  function heapify(i) {
    var length = queue.length, x, l, r;
    while (true) {
      x = i; l = left(i); r = right(i);
      if (l < length && compare(queue[l], queue[x]) < 0) x = l;
      if (r < length && compare(queue[r], queue[x]) < 0) x = r;
      if (x === i) break;
      swap(i, x);
      i = x;
    }
  }

  function remove(i) {
    var t = queue[i], b = queue.pop();
    if (queue.length > 0) {
      queue[i] = b;
      heapify(i);
    }
    return t;
  }

  this.peek = () => {
    return queue[0];
  };

  // this.deleteAt = (idx) => {
  //   remove(idx);
  // };


  this.push = function push(/* element, ... */) {
    var i = queue.length, e = i + arguments.length, j, p;
    queue.push.apply(queue, arguments);
    for (; i < e; ++i) {
      j = i; p = parent(i);
      for (; j > 0 && compare(queue[j], queue[p]) < 0; j = p, p = parent(j)) {
        swap(j, p);
      }
    }
    return queue.length;
  };

  this.rescoreElement = (elToChange) => {
    oldElIndex = queue.findIndex((el) => {
      return el.id === elToChange.id;
    });
    console.log(oldElIndex);
    remove(oldElIndex);
    this.push(elToChange);
  };

  this.shift = function shift() { return remove(0); };
  this.__defineGetter__('length', function length() { return queue.length; });

  for (var i = parent(queue.length - 1); i >= 0; --i) { heapify(i); }
}

function left(i)   { return 2 * i + 1; }
function right(i)  { return 2 * i + 2; }
function parent(i) { return Math.floor((i + 1) / 2) - 1; }


function min_first(a, b) { return a.f - b.f; }


export default PriorityQueue;









//

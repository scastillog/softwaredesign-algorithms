class Item {
  constructor(public value: any, public priority: number) {
    this.priority = priority;
    this.value = value;
  }
}

class PriorityQueue {
  items: Array<Item>;
  constructor() {
    this.items = [];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  front(): Item {
    return this.items[0];
  }

  rear(): Item {
    return this.items[this.items.length - 1];
  }

  enqueue(newItem: Item) {
    if (this.isEmpty()) {
      this.items.push(newItem);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > newItem.priority) {
          this.items.splice(i, 0, newItem);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(newItem);
      }
    }
  }

  dequeue() {
    return this.items.shift();
  }

  print() {
    let str = "";
    for (let i = 0; i < this.items.length; i++)
      str += this.items[i].value + " ";
    return str;
  }
}

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue(new Item("Job 1", 2));
priorityQueue.enqueue(new Item("Job 2", 1));
priorityQueue.enqueue(new Item("Job 3", 1));
priorityQueue.enqueue(new Item("Job 4", 2));
priorityQueue.enqueue(new Item("Job 5", 3));

console.log(priorityQueue.print());

priorityQueue.dequeue();
priorityQueue.dequeue();

console.log(priorityQueue.print());

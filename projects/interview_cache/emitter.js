// 这里有个需要注意的是Math.random()没有给seed是伪随机数。
const uniqueKey = () => Math.random().toString().slice(2);

/**
 * A sample emitter for test
 */
class Emitter {
  constructor() {
    this.listeners = {};
  }

  on(type, callback, options) {
    const id = uniqueKey();
    const newItem = { callback, id, ...options };
    if (!this.listeners[type]) {
      this.listeners[type] = [newItem];
    } else {
      this.listeners[type].push(newItem);
    }
    return id;
  }

  once(type, callback) {
    this.on(type, callback, { isOnce: true });
  }

  clear(type, ids) {
    if (!this.listeners[type]) {
      throw new Error('Can not clear unknown event.');
    }
    if (ids) {
      const targetIds = ids instanceof Array ? ids : [ids];
      const len = this.listeners[type].length;
      this.listeners[type] = this.listeners[type].filter(item => targetIds.indexOf(item.id) === -1);
      if (this.listeners[type].length === len) {
        throw new Error(`No event callback of type ${type} with id ${targetIds.toString()} is found.`);
      }
    } else {
      delete this.listeners[type];
    }
  }

  fire(type, data) {
    if (!this.listeners[type]) {
      throw new Error('Can not fire unknown event.');
    }
    const items = this.listeners[type].filter(item => !item.isOnce);
    
    while(this.listeners[type].length) {
      const item = this.listeners[type].shift();
      item.callback(data);
    }
    this.listeners[type] = items;
  }
}

const eventBus = new Emitter();

const say = word => data => {
  console.log('------->');
  console.log('data: ', data);
  console.log('word: ', word);
};

const id1 = eventBus.on('hello', say(1));
const id2 = eventBus.on('hello', say(2));
const id3 = eventBus.on('hello', say(3));
eventBus.on('hello', say(4));
eventBus.on('hello', say(5));
eventBus.once('hello', say('once ~'));

console.log('ids -> ', [id1, id2, id3]);

eventBus.clear('hello', [id1, id2, id3]);
console.log('eventbus listeners -> ', eventBus.listeners);

eventBus.fire('hello', '巴拉巴拉');
console.log('##################');
eventBus.fire('hello', '巴拉巴拉');


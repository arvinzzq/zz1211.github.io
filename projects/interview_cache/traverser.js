const noop = () => {};

/**
 * Traverser class used to traverse tree like data by bfs or dfs search
 * @param {String} [childrenName='children'] alias of subtree that used for traverse
 * @param {Function} [callback=noop] callback function invoked on each traversed node with parameters node data
 * @return {Array} collected array of result of traverser, and callback invoked result of each traversed node
 */
class Traverser {
  constructor(options = {}) {
    const { childrenName = 'children', callback = noop } = options;
    this.childrenName = childrenName;
    this.callback = callback;
  }

  _dfs(treeData, dfsResult) {
    if (treeData && !(treeData instanceof Array)) {
      throw new Error('Tree and subtree must be array');
    } else if (treeData) {
      treeData.forEach(node => {
        this.callback(node);
        dfsResult.push(node);
        this._dfs(node[this.childrenName], dfsResult);
      });
    }
  }

  dfs(treeData) {
    const dfsResult = [];
    this._dfs(treeData, dfsResult);
    return dfsResult;
  }

  _bfs(treeData, bfsResult) {
    if (treeData && !(treeData instanceof Array)) {
      throw new Error('Tree root must be array');
    } else if (treeData) {
      let queue = [...treeData];
      while (queue.length) {
        const node = queue.shift();
        this.callback(node);
        bfsResult.push(node);
        queue = queue.concat(node[this.childrenName] || []);
      }
    }
  }

  bfs(treeData) {
    const bfsResult = [];
    this._bfs(treeData, bfsResult);
    return bfsResult;
  }
}

export default Traverser;


const traverser = new Traverser({
  callback: data => {
    console.log(`data -> ${data.title}\n`);
  }
});

const treeData = [{
  title: '1',
  children: [{
    title: '2',
    children: [{
      title: '4'
    }, {
      title: '5'
    }, {
      title: '6'
    }, {
      title: '7'
    }]
  }, {
    title: '3',
    children: [{
      title: '8'
    }, {
      title: '9'
    }, {
      title: '10'
    }]
  }]
}];

console.log('dfs --------------->\n');
const dfsRes = traverser.dfs(treeData);
console.log('result of dfs => ', dfsRes);

console.log('bfs --------------->\n');
const bfsRes = traverser.bfs(treeData);
console.log('result of bfs => ', bfsRes);
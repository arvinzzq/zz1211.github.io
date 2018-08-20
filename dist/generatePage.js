'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewRender = new _render2.default();
var compMap = {
  stick: 10,
  top: 1
};
function calCompWeight(a) {
  var weight = 0;
  a.labels.forEach(function (item) {
    weight += compMap[item] || 0;
  });
  return -weight;
}

function comp(a, b) {
  return calCompWeight(a) - calCompWeight(b);
}

console.info('render template into page ->');
var issueList = JSON.parse(_fs2.default.readFileSync(_path2.default.resolve(process.cwd(), './issues.json')));
// issueList.sort(comp);
console.log('issueList ----> ', issueList);
var view = viewRender.render('index', { issueList: issueList });
_fs2.default.writeFileSync(_path2.default.resolve(process.cwd(), './index.html'), view, 'utf8');
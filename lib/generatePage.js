import fs from 'fs';
import path from 'path';
import ViewRender from './render';
const viewRender = new ViewRender();
const compMap = {
  stick: 10,
  top: 1
};
function calCompWeight(a) {
  let weight = 0;
  a.labels.forEach(item => {
    weight += (compMap[item] || 0);
  });
  return -weight;
}

function comp(a, b) {
  return calCompWeight(a) - calCompWeight(b);
}

console.info('render template into page ->');
const issueList = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './issues.json')));
// issueList.sort(comp);
console.log('issueList ====> ', issueList);
const slideList = [{
  filename: 'Class&extends.pdf',
  title: 'Class & extends'
}, {
  filename: 'npm-worm.pdf',
  title: 'Npm Worm'
}, {
  filename: 'koa.pdf',
  title: 'Koa'
}, {
  filename: 'webpack-bundlejs.pdf',
  title: 'Webpack Bundlejs'
}];
console.log('slideList ====> ', slideList);
const view = viewRender.render('index', { issueList, slideList });
fs.writeFileSync(path.resolve(process.cwd(), './index.html'), view, 'utf8');
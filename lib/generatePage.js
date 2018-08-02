import fs from 'fs';
import path from 'path';
import ViewRender from './render';
const viewRender = new ViewRender();
const compMap = { 'top': 1 };
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
console.log();
issueList.sort(comp);
const view = viewRender.render('index', { issueList });
fs.writeFileSync(path.resolve(process.cwd(), './index.html'), view, 'utf8');
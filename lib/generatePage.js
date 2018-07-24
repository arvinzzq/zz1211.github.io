import fs from 'fs';
import path from 'path';
import ViewRender from './render';
const viewRender = new ViewRender();

console.info('render template into page ->');
const issueList = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './issues.json')));
const view = viewRender.render('index', { issueList });
fs.writeFileSync(path.resolve(process.cwd(), './index.html'), view, 'utf8');